import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { sleep } from "../../utils/sleep";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

function nhParseExt(str: string): string {
  switch (str.slice(0, 1)) {
    case "j": return "jpg";
    case "g": return "gif";
    case "p": return "png";
    case "w": return "webp";
    case "a": return "avif";
    case "m": return "mp4";
    default: throw new Error("cannot parse image extension from info: " + str);
  }
}

type NHGalleryInfo = {
  id: number,
  images: {
    cover: { t: string, w: number, h: number, }
    pages: { t: string, w: number, h: number }[],
    thumbnail: { t: string, w: number, h: number, }
  },
  media_id: string,
  num_pages: number,
  tags: { id: number, type: string, name: string, url: string, count: number }[],
  title: { english: string, japanese?: string },
}

class NHMatcher extends BaseMatcher<Document> {
  meta?: GalleryMeta;
  imageCDNUrls?: string[];
  galleryMeta(): GalleryMeta {
    return this.meta!;
  }
  parseInfo() {
    let nRaw = "";
    let gRaw = "";
    Array.from(document.querySelectorAll("body > script")).forEach(ele => {
      const textContent = ele.textContent;
      if (textContent) {
        if (textContent.trimStart().startsWith("window._n_app")) {
          nRaw = textContent;
        }
        if (textContent.trimStart().startsWith("window._gallery")) {
          gRaw = textContent;
        }
      }
    });
    // const csrfToken = nRaw.match(/csrf_token:\s?"(.*?)",/)?.[1];
    const thumbCDNUrls = nRaw.match(/thumb_cdn_urls:\s?\[(.*?)\],/)?.[1]?.split(",").map(t => t.trim().replaceAll("\"", ""));
    const imageCDNUrls = nRaw.match(/image_cdn_urls:\s?\[(.*?)\],/)?.[1]?.split(",").map(t => t.trim().replaceAll("\"", ""));
    if (!thumbCDNUrls || thumbCDNUrls.length === 0) throw new Error("cannot find thumb_cdn_urls from script");
    if (!imageCDNUrls || imageCDNUrls.length === 0) throw new Error("cannot find image_cdn_urls from script");
    const jsonRaw = gRaw.match(/parse\((.*)\);/)?.[1];
    if (!jsonRaw) throw new Error("cannot find images info");
    const info = JSON.parse(JSON.parse(jsonRaw)) as NHGalleryInfo;
    // parse gallery meta
    const meta = new GalleryMeta(window.location.href, info.title.english);
    meta.originTitle = info.title.japanese;
    meta.tags = info.tags.reduce<Record<string, any[]>>((prev, curr) => {
      if (!prev[curr.type]) {
        prev[curr.type] = [];
      }
      prev[curr.type].push(curr.name);
      return prev;
    }, {});
    this.meta = meta;
    return { info, thumbCDNUrls, imageCDNUrls };
  }
  async fetchOriginMeta(node: ImageNode, retry: boolean): Promise<OriginMeta> {
    if (retry) {
      const regex = /https:\/\/(.*?)\//;
      const cdn = node.originSrc?.match(regex)?.[1];
      const index = this.imageCDNUrls?.indexOf(cdn ?? "") ?? -1;
      if (index > -1) {
        const originSrc = node.originSrc!.replace(regex, `https://${this.imageCDNUrls![(index + 1) % this.imageCDNUrls!.length]}/`)
        return { url: originSrc };
      }
    }
    return { url: node.originSrc! };
  }
  async parseImgNodes(doc: Document): Promise<ImageNode[]> {
    await sleep(200);
    const nodes = Array.from(doc.querySelectorAll<HTMLElement>(".thumb-container > .gallerythumb"));
    if (nodes.length == 0) throw new Error("cannot find image nodes")
    const { info, imageCDNUrls } = this.parseInfo();
    this.imageCDNUrls = imageCDNUrls;
    const digits = nodes.length.toString().length;
    const ret = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const thumbSrc = node.querySelector<HTMLImageElement>("img")?.getAttribute("data-src") ?? "";
      const title = (i + 1).toString().padStart(digits, "0");
      const ext = nhParseExt(info.images.pages[i].t);
      const href = location.origin + node.getAttribute("href");
      const cdn = imageCDNUrls[i % imageCDNUrls.length];
      const originSrc = `https://${cdn}/galleries/${info.media_id}/${i + 1}.${ext}`;
      const wh = { w: info.images.pages[i].w, h: info.images.pages[i].h };
      ret.push(new ImageNode(thumbSrc, href, title + "." + ext, undefined, originSrc, wh));
    }
    return ret;
  }
  async *fetchPagesSource(): AsyncGenerator<Result<Document>> {
    yield Result.ok(document);
  }

}

class NHxxxMatcher extends BaseMatcher<Document> {
  meta?: GalleryMeta;
  galleryMeta(): GalleryMeta {
    return this.meta!;
  }
  parseMeta() {
    const title = document.querySelector(".info h1")?.textContent;
    const originTItle = document.querySelector(".info h2")?.textContent;
    const meta = new GalleryMeta(window.location.href, title ?? document.title);
    meta.originTitle = originTItle ?? undefined;
    Array.from(document.querySelectorAll(".info > ul > li.tags")).forEach(ele => {
      let cat = ele.querySelector("span.text")?.textContent ?? "misc";
      cat = cat.trim().replace(":", "");
      const tags = Array.from(ele.querySelectorAll("a.tag_btn > .tag_name")).map(t => t.textContent?.trim()).filter(Boolean) as string[];
      meta.tags[cat] = tags;
    });
    this.meta = meta;
  }
  async *fetchPagesSource(): AsyncGenerator<Result<Document>> {
    this.parseMeta();
    yield Result.ok(document);
  }
  async parseImgNodes(page: Document): Promise<ImageNode[]> {
    const doc = page as Document;
    await sleep(200);
    const [files, thumbs] = this.parseInfo(doc);
    if (files.length !== thumbs.length) throw new Error("thumbs length not eq images length");
    const cover = doc.querySelector<HTMLImageElement>(".cover img")?.src;
    if (!cover) throw new Error("cannot find cover src");
    const base = cover.slice(0, cover.lastIndexOf("/") + 1);
    const ret = [];
    const digits = files.length.toString().length;
    let href = window.location.href;
    if (href.endsWith("/")) href = href.slice(0, -1);
    for (let i = 0; i < files.length; i++) {
      const title = (i + 1).toString().padStart(digits, "0");
      const thumb = thumbs[i];
      const thumbSrc = base + thumb[0] + "." + nhParseExt(thumb[1]);
      const file = files[i];
      const originSrc = base + file[0] + "." + nhParseExt(file[1]);
      const splits = file[1].split(",");
      let wh = undefined;
      if (splits.length === 3) {
        wh = { w: parseInt(splits[1].trim()), h: parseInt(splits[2].trim()) };
      }
      ret.push(new ImageNode(thumbSrc, href + "/" + (i + 1), title + "." + nhParseExt(file[1]), undefined, originSrc, wh));
    }
    return ret;
  }
  parseInfo(doc: Document) {
    const matches = Array.from(doc.querySelectorAll("script[type]"))
      .find(ele => ele.textContent?.trimStart().startsWith("var g_th"))
      ?.textContent?.match(/\('(.*)'\);/);
    if (!matches || matches.length !== 2) throw new Error("cannot find images info from script");
    const info = JSON.parse(matches[1]) as { fl: Record<string, string>, th: Record<string, string> };
    const files = Object.entries(info.fl);
    const thumbs = Object.entries(info.th);
    return [files, thumbs];
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }
}

ADAPTER.addSetup({
  name: "nhentai",
  workURLs: [
    /nhentai.net\/g\/\d+\/?$/,
  ],
  match: ["https://nhentai.net/*"],
  constructor: () => new NHMatcher(),
});

ADAPTER.addSetup({
  name: "nhentai.xxx",
  workURLs: [
    /nhentai.xxx\/g\/\d+\/?$/,
  ],
  match: ["https://nhentai.xxx/*"],
  constructor: () => new NHxxxMatcher(),
});
