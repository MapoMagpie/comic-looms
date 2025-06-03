import { conf } from "../config";
import { GalleryMeta } from "../download/gallery-meta";
import ImageNode from "../img-node";
import { Chapter } from "../page-fetcher";
import { evLog } from "../utils/ev-log";
import { parseImagePositions, splitImagesFromUrl } from "../utils/sprite-split";
import { BaseMatcher, OriginMeta, Result, } from "./platform";

// EHMatcher
const regulars = {
  /** 有压缩的大图地址 */
  normal: /\<img\sid=\"img\"\ssrc=\"(.*?)\"\sstyle/,
  /** 原图地址 */
  original: /\<a\shref=\"(http[s]?:\/\/e[x-]?hentai(55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad)?\.(org|onion)\/fullimg?[^"\\]*)\"\>/,
  /** 大图重载地址 */
  nlValue: /\<a\shref=\"\#\"\sid=\"loadfail\"\sonclick=\"return\snl\(\'(.*)\'\)\"\>/,
  /** 是否开启自动多页查看器 */
  isMPV: /https?:\/\/e[-x]hentai(55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad)?\.(org|onion)\/mpv\/\w+\/\w+\/#page\w/,
  /** 多页查看器图片列表提取 */
  mpvImageList: /imagelist\s=\s(\[.*?\])/,
  /** 精灵图地址提取 */
  sprite: /url\((.*?)\)/,
}
type MPVImgInfo = {
  n: string,
  k: string,
  t: string,
}

type NodeInfo = {
  title: string,
  href: string,
  thumbnailImage: string,
  wh: { w: number, h: number },
  style: CSSStyleDeclaration,
  backgroundImage: string | null,
  delaySrc: Promise<string> | undefined,
};

type GetNodeInfo = (node: HTMLElement) => NodeInfo;

export class EHMatcher extends BaseMatcher<string> {
  name(): string {
    return "e-hentai"
  }
  docMap: Record<number, Document> = {};
  // "http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion/*",
  workURL(): RegExp {
    return /e[-x]hentai(.*)?.(org|onion)\/g\/\w+/;
  }

  title(chapters: Chapter[]): string {
    const meta = chapters[0].meta || this.galleryMeta(chapters[0]);
    let title = "";
    if (conf.ehentaiTitlePrefer === "japanese") {
      title = meta.originTitle || meta.title || "UNTITLE";
    } else {
      title = meta.title || meta.originTitle || "UNTITLE";
    }
    if (chapters.length > 1) {
      title += ("+" + chapters.length + "chapters");
    }
    return title;
  }

  galleryMeta(chapter: Chapter): GalleryMeta {
    if (chapter.meta) return chapter.meta;
    const doc = this.docMap[chapter.id];
    const titleList = doc.querySelectorAll<HTMLElement>("#gd2 h1");
    let title: string | undefined;
    let originTitle: string | undefined;
    if (titleList && titleList.length > 0) {
      title = titleList[0].textContent || undefined;
      if (titleList.length > 1) {
        originTitle = titleList[1].textContent || undefined;
      }
    }
    chapter.meta = new GalleryMeta(window.location.href, title || "UNTITLE");
    chapter.meta.originTitle = originTitle;
    const tagTrList = doc.querySelectorAll<HTMLElement>("#taglist tr");
    const tags: Record<string, string[]> = {};
    tagTrList.forEach((tr) => {
      const tds = tr.childNodes;
      const cat = tds[0].textContent;
      if (cat) {
        const list: string[] = [];
        tds[1].childNodes.forEach((ele) => {
          if (ele.textContent) list.push(ele.textContent);
        });
        tags[cat.replace(":", "")] = list;
      }
    });
    chapter.meta.tags = tags;
    return chapter.meta;
  }

  async fetchChapters(): Promise<Chapter[]> {
    const chapter = new Chapter(0, "Default", window.location.href);
    this.docMap[0] = document;
    this.galleryMeta(chapter);
    chapter.title = chapter.meta!.title!;
    return [chapter];
  }

  async appendNewChapters(url: string, old: Chapter[]): Promise<Chapter[]> {
    // check url is legal
    if (!this.workURL().test(url)) throw new Error("invaild gallery url");
    const doc = await window.fetch(url).then((response) => response.text()).then(text => new DOMParser().parseFromString(text, "text/html"));
    let lastID = old[old.length - 1]?.id || 0;
    lastID = lastID + 1;
    const chapter = new Chapter(lastID, "NewChapter-" + lastID, url);
    this.docMap[lastID] = doc;
    this.galleryMeta(chapter);
    chapter.title = chapter.meta!.title!;
    return [chapter];
  }

  async parseImgNodes(source: string): Promise<ImageNode[] | never> {
    const list: ImageNode[] = [];
    const doc = await window.fetch(source).then((response) => response.text()).then(text => new DOMParser().parseFromString(text, "text/html"));
    if (!doc) {
      throw new Error("warn: eh matcher failed to get document from source page!")
    }
    let isSprite = false;
    let getNodeInfo: GetNodeInfo = (node) => {
      const anchor = node.firstElementChild as HTMLAnchorElement;
      const image = anchor.firstElementChild as HTMLImageElement;
      const title = image.getAttribute("title")?.replace(/Page\s\d+[:_]\s*/, "") || "untitle.jpg";
      const ret: NodeInfo = {
        thumbnailImage: image.src,
        title,
        href: anchor.getAttribute("href")!,
        wh: extractRectFromSrc(image.src) || { w: 100, h: 100 },
        style: node.style,
        backgroundImage: null,
        delaySrc: undefined
      };
      return ret;
    };
    let query = doc.querySelectorAll<HTMLDivElement>("#gdt .gdtl");
    if (!query || query.length == 0) {
      query = doc.querySelectorAll<HTMLDivElement>("#gdt .gdtm > div");
      isSprite = query?.length > 0;
      getNodeInfo = (node) => {
        const anchor = node.firstElementChild as HTMLAnchorElement;
        const image = anchor.firstElementChild as HTMLImageElement;
        const title = image.getAttribute("title")?.replace(/Page\s\d+[:_]\s*/, "") || "untitle.jpg";
        const backgroundImage = node.style.background.match(regulars.sprite)?.[1]?.replaceAll("\"", "") || null;
        const ret: NodeInfo = {
          backgroundImage,
          title,
          href: anchor.getAttribute("href")!,
          wh: extractRectFromStyle(node.style) ?? { w: 100, h: 100 },
          style: node.style,
          thumbnailImage: "",
          delaySrc: undefined
        };
        return ret;
      };
    }
    if (!query || query.length == 0) {
      query = doc.querySelectorAll<HTMLDivElement>("#gdt > a");
      isSprite = query?.length > 0;
      getNodeInfo = (node) => {
        const anchor = node as HTMLAnchorElement;
        let div = anchor.firstElementChild as HTMLDivElement;
        if (!div.style.background || div.childElementCount > 0) {
          div = div.firstElementChild as HTMLDivElement;
        }
        const title = div.getAttribute("title")?.replace(/Page\s\d+[:_]\s*/, "") || "untitle.jpg";
        const backgroundImage = div.style.background.match(regulars.sprite)?.[1]?.replaceAll("\"", "") || null;
        const ret: NodeInfo = {
          backgroundImage,
          title,
          href: anchor.getAttribute("href")!,
          wh: extractRectFromStyle(div.style) ?? { w: 100, h: 100 },
          style: div.style,
          thumbnailImage: "",
          delaySrc: undefined
        };
        return ret;
      };
    }
    if (!query || query.length == 0) {
      throw new Error("warn: failed query image nodes!")
    }
    const nodeInfos: NodeInfo[] = [];

    // Multi-page viewer
    const nodes = Array.from(query);
    const n0 = getNodeInfo(nodes[0]);
    if (regulars.isMPV.test(n0.href)) {
      isSprite = true;
      const mpvDoc = await window.fetch(n0.href).then((response) => response.text()).then(text => new DOMParser().parseFromString(text, "text/html"));
      const imageList = JSON.parse(mpvDoc.querySelector("#pane_outer + script")?.innerHTML.match(regulars.mpvImageList)?.[1] ?? "[]") as MPVImgInfo[];
      const thumbnails = Array.from(mpvDoc.querySelectorAll<HTMLElement>("#pane_thumbs > a > div"));
      const gid = location.pathname.split("/")[2];
      // TODO: MPV query image url from https://s.exhentai.org/api.php
      for (let i = 0; i < imageList.length; i++) {
        const info = imageList[i];
        const backgroundImage = info.t.match(/\((http.*)\)/)?.[1] || null;
        thumbnails[i].style.background = "url" + info.t;
        const ni = {
          backgroundImage,
          title: info.n,
          href: `${location.origin}/s/${info.k}/${gid}-${i + 1}`,
          wh: extractRectFromStyle(thumbnails[i].style) ?? { w: 100, h: 100 },
          style: thumbnails[i].style,
          thumbnailImage: "",
          delaySrc: undefined,
        };
        nodeInfos.push(ni);
      }
    } else {
      nodes.forEach(node => nodeInfos.push(getNodeInfo(node)));
    }
    // sprite thumbnails
    if (isSprite) {
      const spriteURLs: { url: string, range: { index: number, style: CSSStyleDeclaration }[] }[] = [];
      for (let i = 0; i < nodeInfos.length; i++) {
        const info = nodeInfos[i];
        if (!info.backgroundImage) {
          evLog("error", "e-hentai miss node, ", info);
          continue;
        }
        if (spriteURLs.length === 0 || spriteURLs[spriteURLs.length - 1].url !== info.backgroundImage) {
          spriteURLs.push({ url: info.backgroundImage, range: [{ index: i, style: info.style }] });
        } else {
          spriteURLs[spriteURLs.length - 1].range.push({ index: i, style: info.style });
        }
      }
      spriteURLs.forEach(({ url, range }) => {
        url = url.startsWith("http") ? url : window.location.origin + url;
        if (range.length === 1) {
          nodeInfos[range[0].index].thumbnailImage = url;
        } else {
          const reso: { resolve: (str: string | PromiseLike<string>) => void, reject: (reason?: any) => void }[] = [];
          for (let i = 0; i < range.length; i++) {
            nodeInfos[range[i].index].delaySrc = new Promise<string>((resolve, reject) => reso.push({ resolve, reject }));
          }
          splitImagesFromUrl(url, parseImagePositions(range.map(n => n.style))).then((ret) => {
            for (let i = 0; i < ret.length; i++) {
              reso[i].resolve(ret[i]);
            }
          }).catch(err => reso.forEach(r => r.reject(err)));
        }
      });
    }
    for (let i = 0; i < nodeInfos.length; i++) {
      const info = nodeInfos[i];
      list.push(new ImageNode(info.thumbnailImage, info.href, info.title, info.delaySrc, undefined, info.wh));
    }
    return list;
  }

  async *fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<string>> {
    const doc = this.docMap[chapter.id];
    // const doc = document;
    const fristImageHref = doc.querySelector("#gdt a")?.getAttribute("href");
    // MPV
    if (fristImageHref && regulars.isMPV.test(fristImageHref)) {
      yield Result.ok(window.location.href);
      return;
    }
    // Normal
    const pages = Array.from(doc.querySelectorAll(".gtb td a")).filter(a => a.getAttribute("href")).map(a => a.getAttribute("href")!);
    if (pages.length === 0) {
      throw new Error("cannot found next page elements");
    }
    let lastPage = 0;
    let url: URL | undefined;
    for (const page of pages) {
      const u = new URL(page);
      const num = parseInt(u.searchParams.get("p") || "0");
      if (num >= lastPage) {
        lastPage = num;
        url = u;
      }
    }
    if (!url) {
      throw new Error("cannot found next page elements again");
    }
    url.searchParams.delete("p");
    yield Result.ok(url.href);
    for (let p = 1; p < lastPage + 1; p++) {
      url.searchParams.set("p", p.toString());
      yield Result.ok(url.href);
    }
  }

  async fetchOriginMeta(node: ImageNode, retry: boolean): Promise<OriginMeta> {
    const text: string | Error = await window.fetch(node.href).then(resp => resp.text()).catch(reason => new Error(reason));
    if (text instanceof Error || !text) throw new Error(`fetch source page error, ${text.toString()}`);

    // TODO: Your IP address has been temporarily banned for excessive pageloads which indicates that you are using automated mirroring/harvesting software. The ban expires in 2 days and 23 hours
    let src: string | undefined;

    if (conf.fetchOriginal) {
      src = regulars.original.exec(text)?.[1].replace(/&amp;/g, "&");
      const nl = node.href.includes("?") ? node.href.split("?").pop() : undefined;
      if (src && nl) {
        src += "?" + nl;
      }
    }
    if (!src) src = regulars.normal.exec(text)?.[1];
    // EH change the url
    if (retry) {
      const nlValue = regulars.nlValue.exec(text)?.[1];
      if (nlValue) {
        node.href = node.href + (node.href.includes("?") ? "&" : "?") + "nl=" + nlValue;
        evLog("info", `IMG-FETCHER retry url:${node.href}`);
        const newMeta = await this.fetchOriginMeta(node, false);
        src = newMeta.url;
      } else {
        evLog("error", `Cannot matching the nlValue, content: ${text}`);
      }
    }

    if (!src) {
      evLog("error", "cannot matching the image url from content:\n", text);
      throw new Error(`cannot matching the image url from content. (the content is showing up in console(F12 open it)`);
    }
    // check src has host prefix
    if (!src.startsWith("http")) {
      src = window.location.origin + src;
    }
    if (src.endsWith("509.gif")) {
      throw new Error("509, Image limits Exceeded, Please reset your Quota!");
    }
    return { url: src, href: node.href };
  }

  async processData(data: Uint8Array, contentType: string): Promise<[Uint8Array, string]> {
    if (contentType.startsWith("text")) {
      if (data.byteLength === 1329) {
        throw new Error("fetching the raw image requires being logged in, please try logging in or disable \"raw image\"");
      }
    }
    return [data, contentType];
  }
}

function extractRectFromSrc(src?: string): { w: number, h: number } | undefined {
  if (!src) return undefined;
  const matches = src.match(/\/\w+-\d+-(\d+)-(\d+)-/);
  if (matches && matches.length === 3) {
    return ({ w: parseInt(matches[1]), h: parseInt(matches[2]) });
  } else {
    return undefined;
  }
}
function extractRectFromStyle(style: CSSStyleDeclaration): { w: number, h: number } | undefined {
  const wh = { w: parseInt(style.width), h: parseInt(style.height) };
  if (isNaN(wh.w) || isNaN(wh.h)) return undefined;
  return wh;
}
