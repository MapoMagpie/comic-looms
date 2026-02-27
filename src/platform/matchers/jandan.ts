import ImageNode, { NodeAction } from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type JandanComment = {
  id: number,
  post_id: number,
  author: string,
  // author_type: number,
  // date_gmt: string,
  // user_id: number,
  // content: "<img src=\"https://img.toto.im/mw600/00745YaMgy1iaof1252izj30go0lc47b.jpg\" />",
  content: string,
  vote_positive: number,
  vote_negative: number,
  // sub_comment_count: number,
  // images: null,
  // post_title: string,
  // ip_location: string,
  // avatar_ref: string,
  // avatar_type: number,
};
interface JandanList {
  fetchChapters(): AsyncGenerator<Chapter[]>;
  fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<JandanComment[]>>;
}

class JandanPagesList implements JandanList {
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    yield [new Chapter(0, "Default", window.location.href)];
  }
  fetchPagesSource(): AsyncGenerator<Result<JandanComment[]>> {
    throw new Error("Method not implemented.");
  }
}
class JandanTopList implements JandanList {
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    yield [
      new Chapter(0, "4小时热门", `${window.location.origin}/api/top/4hr`),
    ];
    const chapters = [
      new Chapter(1, "无聊图", `${window.location.origin}/api/top/post/26402`),
      new Chapter(2, "随手拍", `${window.location.origin}/api/top/post/21183`),
      new Chapter(3, "3日最佳", `${window.location.origin}/api/top/pic3days`),
      new Chapter(4, "7日最佳", `${window.location.origin}/api/top/pic7days`),
    ];
    yield chapters;
  }
  async *fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<JandanComment[]>> {
    const data = await window.fetch(chapter.source).then(res => res.json()).catch(Error);
    if (data instanceof Error) throw data;
    const list = data.data as JandanComment[] | undefined;
    if (!list) throw new Error("cannot find comments");
    yield Result.ok(list);
  }
}

class JandanMatcher extends BaseMatcher<JandanComment[]> {
  list: JandanList;
  constructor() {
    super();
    if (/jandan.net\/top/.test(window.location.href)) {
      this.list = new JandanTopList();
    } else {
      this.list = new JandanPagesList();
    }
  }
  fetchChapters(): AsyncGenerator<Chapter[]> {
    return this.list.fetchChapters();
  }
  fetchPagesSource(source: Chapter): AsyncGenerator<Result<JandanComment[]>> {
    return this.list.fetchPagesSource(source);
  }
  // like_type: pos | neg
  async parseImgNodes(comments: JandanComment[]): Promise<ImageNode[]> {
    const ret: ImageNode[] = [];
    for (const comment of comments) {
      const images = Array.from(comment.content.matchAll(/src="(.*?)"/gm).map(m => m[1]));
      if (images.length === 0) continue;
      const href = `${window.location.origin}/t/${comment.id}`;
      const ooAction = new NodeAction("oo" + comment.vote_positive, "xxoo", async () => {
        await fetch("https://jandan.net/api/comment/vote", {
          "headers": { "Content-Type": "application/json", },
          "referrer": "https://jandan.net",
          "body": `{"comment_id":${comment.id},"like_type":"pos","data_type":"comment"}`,
          "method": "POST",
        })
      });
      const xxAction = new NodeAction("xx" + comment.vote_negative, "xxoo", async () => {
        await fetch("https://jandan.net/api/comment/vote", {
          "headers": { "Content-Type": "application/json", },
          "referrer": "https://jandan.net",
          "body": `{"comment_id":${comment.id},"like_type":"neg","data_type":"comment"}`,
          "method": "POST",
        })
      });
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const [thumb, origin, ext, isGIF] = this.parseURL(img);
        const node = new ImageNode(thumb, href, `${comment.id}-${i + 1}.${ext}`, undefined, origin);
        node.actions.push(ooAction);
        node.actions.push(xxAction);
        if (isGIF) {
          node.mimeType = "video/mp4";
        }
        ret.push(node);
      }
    }
    return ret;
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

  parseURL(src: string): [string, string, string, boolean] {
    src = src.replace(/img\.wangmoyu\.com/, 'wangmoyuimg.cdn.dfyun.com.cn');
    src = src.replace(/img\.moyu\.im/, 'moyuimg.cdn.dfyun.com.cn');
    src = src.replace(/img\.toto\.im/, 'totoimg.cdn.dfyun.com.cn');
    const isGIF = /gif$/.test(src);
    if (isGIF) {
      const t = src.replace(/(https?:\/\/[^/]+)\/\w+\/(.+?\.gif)/, '$1/thumb180/$2') + '.webp';
      const i = src.replace(/(https?:\/\/[^/]+)\/\w+\/(.+?)\.gif/, '$1/large/$2.mp4');
      return [t, i, "mp4", true];
    } else {
      let origin = src.replace(/(https?:\/\/[^/]+)\/\w+\/(.+?)/, '$1/large/$2');
      if (/\.(jpg|png|jpeg)$/.test(src)) {
        src = src + '.webp';
      }
      // TODO: option enableThumbnail
      return ["", origin, "webp", false];
    }
  }
}

ADAPTER.addSetup({
  name: "煎蛋网",
  match: [
    "https://jandan.net/*",
    "https://i.jandan.net/*"
  ],
  workURLs: [
    /jandan.net\/(pic|xxoo|top)/
  ],
  constructor: () => new JandanMatcher(),
});
