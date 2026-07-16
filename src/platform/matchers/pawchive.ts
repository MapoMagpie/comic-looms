import ImageNode from "../../img-node";
import { isImage, isVideo } from "../../utils/media-helper";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform"

interface PawchiveList {
  next(): AsyncGenerator<Result<PawchiveResult[]>>;
}

type PawchiveResult = {
  id: string,
  user: string,
  service: string,
  title: string,
  substring: string,
  file?: PawchiveFile,
  attachments: PawchiveFile[],
}

type PawchiveFile = {
  name?: string,
  path?: string,
  server?: string,
  type: "thumbnail",
}

abstract class PawchiveListAbstract implements PawchiveList {

  async *next(): AsyncGenerator<Result<PawchiveResult[]>> {
    const url = new URL(window.location.href);
    let page = parseInt(url.searchParams.get("o") ?? "0");
    page = isNaN(page) ? 0 : page;
    const query = url.searchParams.get("q");
    while (true) {
      const ret = await window.fetch(this.getURL(page, query), {
        headers: { "Accept": "text/css" }
      }).then(res => res.json()).catch(Error);
      if (ret instanceof Error) {
        yield Result.err(ret);
        continue;
      }
      if (ret.error) {
        yield Result.err(new Error(ret.error));
        continue;
      }
      const results = this.getPosts(ret);
      if (!results || results.length === 0) break;
      page += results.length;
      // const infoMap = kemonoInfoPathMap(this.getList(ret));
      // if (infoMap.size > 0) {
      //   results.forEach(r => {
      //     if (r.file?.path) {
      //       const info = infoMap.get(r.file.path);
      //       r.file.name = info?.name;
      //       r.file.server = info?.server;
      //     }
      //     if (r.attachments && r.attachments.length > 0) {
      //       r.attachments.forEach(a => {
      //         if (a.path) {
      //           const info = infoMap.get(a.path);
      //           a.name = info?.name;
      //           a.server = info?.server;
      //         }
      //       })
      //     }
      //   })
      // }
      const resultLen = results.length;
      // yield Result.ok(results);
      while (results.length > 0) {
        yield Result.ok(results.splice(0, 10));
      }
      // offset not multiple of 150 or too large
      if (resultLen < 50) break;
    }
  }

  abstract getURL(pages: number, query: string | null): string;
  abstract getList(res: any): any[];
  abstract getPosts(res: any): PawchiveResult[];

}

class PawchiveListArtist extends PawchiveListAbstract {
  getURL(pages: number, query: string | null): string {
    // https://kemono.cr/api/v1/fanbox/user/38401163/posts
    const u = new URL(`${window.location.origin}/api/v1${window.location.pathname}/posts`);
    if (pages > 0) {
      u.searchParams.set("o", pages.toString());
    }
    if (query) {
      u.searchParams.set("q", query);
    }
    return u.href;
  }
  getPosts(res: any): PawchiveResult[] {
    return res;
  }
  getList(_response: any): any[] {
    return [];
  }
}
// class KemonoListPosts extends KemonoListAbstract {
//   getURL(pages: number, query: string | null): string {
//     const u = new URL(`${window.location.origin}/api/v1${window.location.pathname}`);
//     if (pages > 0) {
//       u.searchParams.set("o", pages.toString());
//     }
//     if (query) {
//       u.searchParams.set("q", query);
//     }
//     return u.href;
//   }
//   getPosts(res: any): KemonoResult[] {
//     return res.posts;
//   }
//   getList(): any[] {
//     return [];
//   }
// }

class PawchiveListSinglePost extends PawchiveListAbstract {
  getPosts(res: any): PawchiveResult[] {
    if (res?.post) return [res.post];
    if (res?.attachments) return [res];
    throw new Error("single post cannot find post attachments");
  }
  getURL(): string {
    return `${window.location.origin}/api/v1${window.location.pathname}`;
  }
  getList(response: any): any[] {
    return [...(response.previews ?? []), ...(response.attachments ?? [])];
  }
}

class PawchiveMatcher extends BaseMatcher<PawchiveResult[]> {
  list?: PawchiveList;
  constructor() {
    super();
    // if (window.location.href.includes("/posts")) {
    //   this.list = new KemonoListPosts();
    // } else
    if (/user\/\w+/.test(window.location.href)) {
      if (/post\/\w+/.test(window.location.href)) {
        this.list = new PawchiveListSinglePost();
      } else {
        this.list = new PawchiveListArtist();
      }
    }
  }
  fetchPagesSource(): AsyncGenerator<Result<PawchiveResult[]>> {
    if (!this.list) {
      throw new Error("Current path is not supported");
    }
    return this.list.next();
  }
  async parseImgNodes(results: PawchiveResult[]): Promise<ImageNode[]> {
    const nodes = [];
    const newImageNode = (id: string, user: string, service: string, path: string, name: string, server?: string) => {
      const thumb = `https://img.${window.location.hostname}/thumbnail/data/${path}`;
      const href = `${window.location.origin}/${service}/user/${user}/post/${id}`;
      let src = server ? `${server}/data/${path}?f=${name}` : `https://file.${window.location.hostname}/data/${path}?f=${name}`;
      const node = new ImageNode(thumb, href, name, undefined, src);
      if (path.indexOf(".mp4") > 1) {
        node.mimeType = "video/mp4";
        node.thumbnailSrc = "";
      }
      // if attachment is not media file, just skip;
      const ext = path.split(".").pop() ?? "";
      if (!isImage(ext)) {
        if (ADAPTER.conf.excludeVideo || !isVideo(ext)) {
          return undefined;
        }
      }
      return node;
    }
    const chunks: { res: PawchiveResult, list: PawchiveFile[], needFetchPost: boolean }[] = [];
    for (const res of results) {
      const list = [];
      if (res.file?.path) list.push(res.file);
      list.push(...(res.attachments ?? []));
      chunks.push({ res, list, needFetchPost: !list[0]?.server && list.length > 0 });
    }
    // await this.batchFetchPathServerMap(chunks);
    // deduplicates
    const originSrcMap = new Map();
    for (const chunk of chunks) {
      for (const file of chunk.list) {
        if (!file.path) throw new Error("cannot find image file path");
        // if (!file.name || !file.server) throw new Error("cannot find image or video name and server");
        if (!file.name) throw new Error("cannot find image file name");
        const node = newImageNode(chunk.res.id, chunk.res.user, chunk.res.service, file.path, file.name);
        if (node) {
          if (originSrcMap.has(node.originSrc!)) {
            continue;
          }
          originSrcMap.set(node.originSrc!, true);
          nodes.push(node);
        }
      }
    }
    return nodes;
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    if (!node.originSrc) throw new Error("cannot find pawchive image file: " + node.href);
    return { url: node.originSrc };
  }
  // async batchFetchPathServerMap(chunks: { res: KemonoResult; list: KemonoFile[]; needFetchPost: boolean; }[]) {
  //   const urls = chunks.filter(chunk => chunk.needFetchPost).map(chunk =>
  //     new Request(`${window.location.origin}/api/v1/${chunk.res.service}/user/${chunk.res.user}/post/${chunk.res.id}`, {
  //       headers: { "Accept": "text/css" }
  //     })
  //   );
  //   const infos = await batchFetch<any>(urls, 5, "json");
  //   const list = infos.reduce((list, info) => {
  //     return [...list, ...[...(info.previews ?? []), ...(info.attachments ?? [])]];
  //   }, []);
  //   const map = kemonoInfoPathMap(list);
  //   chunks.filter(chunk => chunk.needFetchPost).forEach(chunk => chunk.list.forEach(file => {
  //     if (file.path) {
  //       const info = map.get(file.path);
  //       file.name = info?.name;
  //       file.server = info?.server;
  //     }
  //   }));
  // }

}

// function kemonoInfoPathMap(list: any[]): Map<string, { name: string, server: string }> {
//   const map = new Map();
//   for (const info of (list ?? [])) {
//     if (info.path && info.server) {
//       map.set(info.path, { server: info.server, name: info.name });
//     }
//   }
//   return map;
// }
ADAPTER.addSetup({
  name: "pawchive",
  workURLs: [
    /pawchive.pw\/\w+\/user\/\w+(\/post\/\w+)?(\?\w=.*)?$/
  ],
  match: ["https://pawchive.pw/*"],
  constructor: () => new PawchiveMatcher(),
});
