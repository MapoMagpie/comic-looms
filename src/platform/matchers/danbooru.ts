import { transient } from "../../config";
import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { evLog } from "../../utils/ev-log";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";


abstract class DanbooruMatcher extends BaseMatcher<Document> {
  tags: Record<string, string[]> = {};
  blacklistTags: string[] = [];
  count: number = 0;
  abstract nextPage(doc: Document): string | null;

  async *fetchPagesSource(): AsyncGenerator<Result<Document>> {
    let doc = document;
    this.blacklistTags = this.getBlacklist(doc);
    yield Result.ok(doc);
    // find next page
    let tryTimes = 0;
    while (true) {
      const url = this.nextPage(doc);
      if (!url) break;
      try {
        doc = await window.fetch(url).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      } catch (e) {
        tryTimes++;
        if (tryTimes > 3) yield Result.err(new Error(`fetch next page failed, ${e}`));
        continue;
      }
      tryTimes = 0;
      yield Result.ok(doc);
    }
  }

  abstract getOriginalURL(doc: Document): string | null;
  abstract getNormalURL(doc: Document): string | null;
  abstract extractIDFromHref(href: string): string | undefined;
  abstract getBlacklist(doc: Document): string[];

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    const cached = this.cachedOriginMeta(node.href);
    if (cached) return cached;
    let url: string | null = null;
    const doc = await window.fetch(node.href).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
    if (ADAPTER.conf.fetchOriginal) {
      url = this.getOriginalURL(doc);
    }
    if (!url) {
      url = this.getNormalURL(doc);
    }
    if (!url) throw new Error("Cannot find origin image or video url");
    let title: string | undefined;
    // extract ext from url
    const ext = url.split(".").pop()?.match(/^\w+/)?.[0];
    // extract id from href
    const id = this.extractIDFromHref(node.href);
    if (ext && id) {
      title = `${id}.${ext}`;
    }
    return { url, title };
  }

  cachedOriginMeta(_href: string): OriginMeta | null {
    return null;
  }

  abstract queryList(doc: Document): HTMLElement[];
  abstract toImgNode(ele: HTMLElement): [ImageNode | null, string];

  async parseImgNodes(doc: Document): Promise<ImageNode[] | never> {
    const list: ImageNode[] = [];
    this.queryList(doc).forEach(ele => {
      const [imgNode, tags] = this.toImgNode(ele);
      if (!imgNode) return;
      this.count++;
      if (tags !== "") {
        const tagList = tags.trim().replaceAll(": ", ":").split(" ").map(v => v.trim()).filter(v => v !== "");
        if (this.blacklistTags.findIndex(t => tagList.includes(t)) >= 0) return;
        this.tags[imgNode.title.split(".")[0]] = tagList;
      }
      list.push(imgNode);
    });
    return list;
  }

  abstract site(): string;

  galleryMeta(): GalleryMeta {
    const url = new URL(window.location.href);
    const tags = url.searchParams.get("tags")?.trim();
    const meta = new GalleryMeta(window.location.href, `${this.site().toLowerCase().replace(" ", "-")}_${tags}_${this.count}`);
    meta.tags = this.tags;
    return meta;
  }
}

class DanbooruDonmaiMatcher extends DanbooruMatcher {
  site(): string {
    return "danbooru";
  }
  nextPage(doc: Document): string | null {
    return doc.querySelector<HTMLAnchorElement>(".paginator a.paginator-next")?.href || null;
  }
  queryList(doc: Document): HTMLElement[] {
    // .post-preview.blacklisted-active, .image-container.blacklisted-active, #c-comments .post.blacklisted-active
    return Array.from(doc.querySelectorAll(".posts-container > article"));
  }
  getBlacklist(doc: Document): string[] {
    return doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content")?.split(",") || [];
  }
  toImgNode(ele: HTMLElement): [ImageNode | null, string] {
    const anchor = ele.querySelector<HTMLAnchorElement>("a");
    if (!anchor) {
      evLog("error", "warn: cannot find anchor element", anchor);
      return [null, ""];
    }
    const img = anchor.querySelector<HTMLImageElement>("img");
    if (!img) {
      evLog("error", "warn: cannot find img element", img);
      return [null, ""];
    }
    const href = anchor.getAttribute("href");
    if (!href) {
      evLog("error", "warn: cannot find href", anchor);
      return [null, ""];
    }
    return [new ImageNode(img.src, href, `${ele.getAttribute("data-id") || ele.id}.jpg`), ele.getAttribute("data-tags") || ""];
  }
  getOriginalURL(doc: Document): string | null {
    return doc.querySelector<HTMLAnchorElement>("#image-resize-notice > a")?.href || null;
  }
  getNormalURL(doc: Document): string | null {
    return doc.querySelector<HTMLElement>("#image")?.getAttribute("src") || null;
  }
  extractIDFromHref(href: string): string | undefined {
    return href.match(/posts\/(\d+)/)?.[1];
  }
}

class Rule34Matcher extends DanbooruMatcher {
  site(): string {
    return "rule34";
  }
  nextPage(doc: Document): string | null {
    if (window.location.search.includes("page=favorites")) {
      const u = doc.querySelector<HTMLAnchorElement>("#paginator a[name=next]")?.getAttribute("onclick")?.match(/location='(.*)?'/)?.[1] || null;
      return u ? window.location.origin + "/" + u : u;
    } else {
      return doc.querySelector<HTMLAnchorElement>(".pagination a[alt=next]")?.href || null;
    }
  }
  queryList(doc: Document): HTMLElement[] {
    if (window.location.search.includes("page=favorites")) {
      return Array.from(doc.querySelectorAll("#content .thumb a"));
    } else {
      return Array.from(doc.querySelectorAll(".image-list > .thumb:not(.blacklisted-image) > a"));
    }
  }
  getBlacklist(doc: Document): string[] {
    return doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content")?.split(",") || [];
  }
  toImgNode(ele: HTMLElement): [ImageNode | null, string] {
    const img = ele.querySelector<HTMLImageElement>("img");
    if (!img) {
      evLog("error", "warn: cannot find img element", img);
      return [null, ""];
    }
    const href = ele.getAttribute("href");
    if (!href) {
      evLog("error", "warn: cannot find href", ele);
      return [null, ""];
    }
    return [new ImageNode(img.src, href, `${ele.id}.jpg`), img.getAttribute("alt") || ""];
  }
  getOriginalURL(doc: Document): string | null {
    // image = {'domain':'https://wimg.rule34.xxx/', 'width':1700, 'height':2300,'dir':3347, 'img':'xxx.jpeg', 'base_dir':'images', 'sample_dir':'samples', 'sample_width':'850', 'sample_height':'1150'};	
    const raw = doc.querySelector("#note-container + script")?.textContent?.trim().replace("image = ", "").replace(";", "").replaceAll("'", "\"");
    try {
      if (raw) {
        const info = JSON.parse(raw) as { domain: string, base_dir: string, dir: number, img: string };
        return `${info.domain}/${info.base_dir}/${info.dir}/${info.img}`;
      }
    } catch (error) {
      evLog("error", "get original url failed", error);
    }
    return null;
  }
  getNormalURL(doc: Document): string | null {
    const element = doc.querySelector<HTMLElement>("#image,#gelcomVideoPlayer > source");
    return element?.getAttribute("src") || element?.getAttribute("data-cfsrc") || null;
  }
  extractIDFromHref(href: string): string | undefined {
    return href.match(/id=(\d+)/)?.[1];
  }
}

class GelBooruMatcher extends DanbooruMatcher {
  site(): string {
    return "gelbooru";
  }
  nextPage(doc: Document): string | null {
    const href = doc.querySelector<HTMLAnchorElement>("#paginator a[alt=next]")?.href;
    if (href) return href;
    return doc.querySelector<HTMLAnchorElement>("#paginator b + a")?.href || null;
  }
  queryList(doc: Document): HTMLElement[] {
    return Array.from(doc.querySelectorAll(".thumbnail-container > article.thumbnail-preview:not(.blacklisted-image) > a"));
  }
  getBlacklist(doc: Document): string[] {
    return doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content")?.split(",") || [];
  }
  toImgNode(ele: HTMLElement): [ImageNode | null, string] {
    const img = ele.querySelector<HTMLImageElement>("img");
    if (!img) {
      evLog("error", "warn: cannot find img element", img);
      return [null, ""];
    }
    const href = ele.getAttribute("href");
    if (!href) {
      evLog("error", "warn: cannot find href", ele);
      return [null, ""];
    }
    const node = new ImageNode(img.src, href, `${ele.id}.jpg`);
    const tags = img.title.split(" ").map(t => t.trim()).filter(t => (t) && !(t.startsWith("score") || t.startsWith("rating"))).map(t => "tag:" + t);
    node.setTags(...tags);
    return [node, img.getAttribute("alt") || ""];
  }
  getOriginalURL(doc: Document): string | null {
    return doc.querySelector("head > meta[property='og:image']")?.getAttribute("content") || null;
  }
  getNormalURL(doc: Document): string | null {
    const img = doc.querySelector<HTMLImageElement>("#image");
    if (img?.src) return img.src;
    const vidSources = Array.from(doc.querySelectorAll<HTMLSourceElement>("#gelcomVideoPlayer > source"));
    if (vidSources.length === 0) return null;
    return vidSources.find(s => s.type.endsWith("mp4"))?.src || vidSources[0].src;
  }
  extractIDFromHref(href: string): string | undefined {
    return href.match(/id=(\d+)/)?.[1];
  }
}

class E621Matcher extends DanbooruMatcher {
  cache: Map<string, { normal: string, original: string, id: string, fileExt?: string }> = new Map();
  nextPage(doc: Document): string | null {
    return doc.querySelector<HTMLAnchorElement>(".pagination #paginator-next")?.href ?? null;
  }
  getOriginalURL(): string | null {
    throw new Error("Method not implemented.");
  }
  getNormalURL(): string | null {
    throw new Error("Method not implemented.");
  }
  extractIDFromHref(): string | undefined {
    throw new Error("Method not implemented.");
  }
  getBlacklist(doc: Document): string[] {
    const content = doc.querySelector("meta[name='blacklisted-tags']")?.getAttribute("content");
    if (!content) return [];
    return content.slice(1, -1).split(",").map(s => s.slice(1, -1))
  }
  queryList(doc: Document): HTMLElement[] {
    transient.imgSrcCSP = true;
    return Array.from(doc.querySelectorAll<HTMLElement>(".posts-container > article"));
  }
  toImgNode(ele: HTMLElement): [ImageNode | null, string] {
    const src = ele.getAttribute("data-preview-url");
    if (!src) return [null, ""];
    const tags = ele.getAttribute("data-tags");
    const id = ele.getAttribute("data-id");
    const normal = ele.getAttribute("data-sample-url");
    const original = ele.getAttribute("data-file-url");
    const fileExt = ele.getAttribute("data-file-ext") || undefined;
    if (!normal || !original || !id) return [null, ""];
    const href = `${window.location.origin}/posts/${id}`;
    const width = ele.getAttribute("data-width");
    const height = ele.getAttribute("data-height");
    let wh = undefined;
    if (width && height) {
      wh = { w: parseInt(width), h: parseInt(height) };
    }
    this.cache.set(href, { normal, original, id, fileExt });
    return [new ImageNode(src, href, `${id}.jpg`, undefined, undefined, wh), tags || ""];
  }
  cachedOriginMeta(href: string): OriginMeta | null {
    const cached = this.cache.get(href);
    if (!cached) throw new Error("miss origin meta: " + href);
    const ext = cached.fileExt ?? cached.original.split(".").pop() ?? "jpg";
    if (ADAPTER.conf.fetchOriginal || ["webm", "webp", "mp4"].includes(ext)) {
      return { url: cached.original, title: `${cached.id}.${ext}` };
    }
    return { url: cached.normal, title: `${cached.id}.${cached.normal.split(".").pop()}` };
  }
  site(): string {
    return "e621";
  }
}

ADAPTER.addSetup({
  name: "e621",
  workURLs: [
    /e621.net\/((posts|favorites)(?!\/)|$)/
  ],
  match: ["https://e621.net/*"],
  constructor: () => new E621Matcher(),
});

ADAPTER.addSetup({
  name: "rule34",
  workURLs: [
    /rule34.xxx\/index.php\?page=(post&s=list|favorites&s=view)/
  ],
  match: ["https://rule34.xxx/*"],
  constructor: () => new Rule34Matcher(),
});

ADAPTER.addSetup({
  name: "gelbooru",
  workURLs: [
    /gelbooru.com\/index.php\?page=post&s=list/
  ],
  match: ["https://gelbooru.com/*"],
  constructor: () => new GelBooruMatcher(),
});

ADAPTER.addSetup({
  name: "danbooru",
  workURLs: [
    /danbooru.donmai.us\/(posts(?!\/)|$)/
  ],
  match: ["https://danbooru.donmai.us/*"],
  constructor: () => new DanbooruDonmaiMatcher(),
});
