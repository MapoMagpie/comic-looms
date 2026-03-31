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

type NHImage = {
  number: number,
  path: string,
  width: number,
  height: number,
  thumbnail: string,
  thumbnail_width: number,
  thumbnail_height: number,
};

type NHGalleryInfo = {
  id: number,
  media_id: string,
  num_pages: number,
  tags: {
    id: number,
    type: string,
    name: string,
    url: string,
    count: number
  }[],
  title: {
    english: string,
    japanese?: string,
    pretty?: string,
  },
  pages: NHImage[],
}

class NHMatcher extends BaseMatcher<Document> {
  meta?: GalleryMeta;
  imageCDNUrls: string[] = ["https://i1.nhentai.net", "https://i2.nhentai.net", "https://i3.nhentai.net", "https://i4.nhentai.net"];
  thumbCDNUrls: string[] = ["https://t1.nhentai.net", "https://t2.nhentai.net", "https://t3.nhentai.net", "https://t4.nhentai.net"];
  galleryMeta(): GalleryMeta {
    return this.meta!;
  }
  createMeta(info: NHGalleryInfo) {
    const meta = new GalleryMeta(window.location.href, info.title?.english || document.title);
    meta.originTitle = info.title?.japanese;
    if (info.tags && info.tags.length > 0) {
      meta.tags = info.tags.reduce<Record<string, any[]>>((prev, curr) => {
        if (!prev[curr.type]) {
          prev[curr.type] = [];
        }
        prev[curr.type].push(curr.name);
        return prev;
      }, {});
    }
    this.meta = meta;
  }
  async getImageServers() {
    const config = await window.fetch(`${window.origin}/api/v2/config`).then(res => res.json()).catch(Error);
    if (config instanceof Error) throw config;
    this.imageCDNUrls = config.image_servers;
    this.thumbCDNUrls = config.thumb_servers;
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
  async parseImgNodes(): Promise<ImageNode[]> {
    await this.getImageServers();
    const galleryID = window.location.href.match(/g\/(\d+)/)?.[1];
    if (!galleryID) throw new Error("cannot match gallery id from url");
    const resp = await window.fetch(`${window.location.origin}/api/v2/galleries/${galleryID}`).then(res => res.json()).catch(Error);
    if (resp instanceof Error) throw resp;
    const data = resp as NHGalleryInfo;
    this.createMeta(data);
    const digits = data.pages.length.toString().length;
    const ret = [];
    for (let i = 0; i < data.pages.length; i++) {
      const node = data.pages[i];
      const title = (i + 1).toString().padStart(digits, "0");
      const ext = node.path.split(".").pop() ?? ".guess.webp";
      const href = `${window.location.origin}/g/${galleryID}/${node.number}/`;
      const originCDN = this.imageCDNUrls[i % this.imageCDNUrls.length];
      const originSrc = `${originCDN}/${node.path}`;
      const thumbCDN = this.thumbCDNUrls[i % this.thumbCDNUrls.length];
      const thumbnail = `${thumbCDN}/${node.thumbnail}`;
      const wh = { w: node.thumbnail_width, h: node.thumbnail_height };
      ret.push(new ImageNode(thumbnail, href, title + "." + ext, undefined, originSrc, wh));
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
