import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { evLog } from "../../utils/ev-log";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

/** how many pages an album index page lists, only used to guess the chunk size when an
 *  album index page cannot be fetched */
const PAGES_PER_INDEX_PAGE = 12;

/** a thumbnail parsed from an album index page */
type Thumbnail = {
  /** The page number of this thumbnail, counted by the album index page order and the position
   *  inside that page. It is not read from the page markup, see `extractThumbnails()`. */
  pageNumber: number,
  url: string,
}

class WnacgMatcher extends BaseMatcher<GalleryImage[]> {
  meta?: GalleryMeta;
  baseURL?: string;
  galleryURL?: string;

  /** A series page has no image of its own, it lists chapters and each chapter is a normal album.
   *  The chapter list is paginated, 12 chapters per page. Its order and layout follow the viewer's
   *  cookie preference, so request it with explicit query params to always get the ascending list. */
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    if (!document.querySelector("#sr_pub")) {
      return [new Chapter(0, "Default", window.location.href)];
    }
    const id = this.extractIDFromHref(window.location.href);
    if (!id) {
      throw new Error("Cannot find series ID");
    }
    const chapters: Chapter[] = [];
    const seen = new Set<string>();
    let cover: string | undefined;
    for (let page = 1; ; page++) {
      const doc = await this.requestDocument(`${window.location.origin}/photos-index-aid-${id}-page-${page}.html?order=asc&mode=list`);
      if (page === 1) {
        this.meta = this.pasrseGalleryMeta(doc);
        const coverSrc = doc.querySelector<HTMLImageElement>(".asTBcell.uwthumb img")?.getAttribute("src");
        if (coverSrc) cover = this.toAbsoluteURL(coverSrc);
      }
      let added = 0;
      doc.querySelectorAll<HTMLAnchorElement>(".sr_compact a[data-chid]").forEach((ele) => {
        const chid = ele.getAttribute("data-chid")!;
        if (seen.has(chid)) return;
        seen.add(chid);
        added++;
        const title = ele.textContent?.trim() || chid;
        chapters.push(new Chapter(chapters.length, title, `${window.location.origin}/photos-index-aid-${chid}.html`, cover));
      });
      if (added === 0 || !doc.querySelector(".bot_toolbar .paginator .next")) break;
    }
    if (chapters.length === 0) throw new Error("Cannot find any chapter in this series");
    yield chapters;
  }

  async *fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<GalleryImage[]>> {
    const id = this.extractIDFromHref(chapter.source);
    if (!id) {
      throw new Error("Cannot find gallery ID");
    }
    this.baseURL = `${window.location.origin}/photos-index-page-1-aid-${id}.html`;
    this.galleryURL = `${window.location.origin}/photos-gallery-aid-${id}.html`;

    // The first album index page is also the page holding the gallery meta.
    let indexDoc = await this.requestDocument(this.baseURL);
    chapter.meta = this.pasrseGalleryMeta(indexDoc);

    // The gallery page only provides the large image urls
    const imageList = await this.requestGalleryImages(this.galleryURL);
    if (imageList.length === 0) throw new Error("Cannot find any image in this gallery");

    // Take thumbnail page by page
    const indexPageCount = this.extractIndexPageCount(indexDoc, imageList.length);
    let position = 0;
    for (let page = 1; page <= indexPageCount; page++) {
      let thumbnails: Thumbnail[] = [];
      if (page === 1) {
        // Reuse the base doc (which includes first 12 thumbnail)
        thumbnails = this.extractThumbnails(indexDoc, position);
      } else {
        const thumbnailPage = `${window.location.origin}/photos-index-page-${page}-aid-${id}.html`;
        const doc = await this.requestDocument(thumbnailPage)
          .catch((error) => {
            evLog("error", `wnacg: cannot fetch album index page ${page}, thumbnails are skipped:`, error);
            return undefined;
          });
        if (doc) thumbnails = this.extractThumbnails(doc, position);
      }

      thumbnails.forEach((thumbnail) => {
        const img = imageList[thumbnail.pageNumber - 1];
        if (img) img.thumbnail = thumbnail.url;
      });

      // If any thumbnail page failed to get, use PAGES_PER_INDEX_PAGE as default (align position)
      const count = thumbnails.length || PAGES_PER_INDEX_PAGE
      const chunk = imageList.slice(position, position + count);
      position += chunk.length;

      if (chunk.length > 0) yield Result.ok(chunk);
    }
    // Shoud not happen
    if (position < imageList.length) yield Result.ok(imageList.slice(position));
  }

  async parseImgNodes(list: GalleryImage[]): Promise<ImageNode[]> {
    return list.map((img) => new ImageNode(img.thumbnail || "", img.url, img.caption, undefined, img.url));
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    const url = node.originSrc ?? node.thumbnailSrc;
    const ext = url.includes(".") ? url.split(".").pop() : "jpg";
    const realext = ext?.split("?verify")[0];
    const title = node.title.replace("[", "").replace("]", "") + "." + realext;
    return { url, title }
  }

  galleryMeta(chapter: Chapter): GalleryMeta {
    return chapter.meta || this.meta || super.galleryMeta(chapter);
  }

  /** Name a series after itself rather than after its first chapter */
  title(chapters: Chapter[]): string {
    return this.meta?.title || super.title(chapters);
  }

  // https://www.hm19.lol/photos-index-page-1-aid-253297.html
  // https://www.wnacg.com/photos-index-aid-253297-page-2.html?order=desc
  private extractIDFromHref(href: string): string | undefined {
    const match = href.match(/aid-(\d+)/);
    if (!match) return undefined;
    return match[1];
  }

  private pasrseGalleryMeta(doc: Document): GalleryMeta {
    const title = doc.querySelector<HTMLTitleElement>("#bodywrap > h2")?.textContent || "unknown";
    const meta = new GalleryMeta(this.baseURL || window.location.href, title);
    const tags = Array.from(doc.querySelectorAll(".asTB .tagshow")).map(ele => ele.textContent).filter(Boolean);
    const description = Array.from(doc.querySelector(".asTB > .asTBcell.uwconn > p")?.childNodes || []).map(e => e.textContent).filter(Boolean) as string[];
    meta.tags = { "tags": tags, "description": description }
    return meta;
  }

  private async requestDocument(url: string): Promise<Document> {
    return window.fetch(url)
      .then((res) => res.text())
      .then((text) => new DOMParser().parseFromString(text, "text/html"));
  }

  /** The album index pages list every page of the album, 12 pages per index page. */
  private extractIndexPageCount(doc: Document, imageCount: number): number {
    let lastPage = 1;
    doc.querySelectorAll<HTMLAnchorElement>(".paginator a").forEach((ele) => {
      const page = ele.getAttribute("href")?.match(/photos-index-page-(\d+)-aid-/)?.[1];
      if (page) lastPage = Math.max(lastPage, parseInt(page, 10));
    });
    const perPage = doc.querySelectorAll(".gallary_wrap li.gallary_item").length || PAGES_PER_INDEX_PAGE;
    return Math.max(lastPage, Math.ceil(imageCount / perPage));
  }

  /** Parse the thumbnails of an album index page */
  private extractThumbnails(doc: Document, offset: number): Thumbnail[] {
    const thumbnails: Thumbnail[] = [];
    doc.querySelectorAll<HTMLLIElement>(".gallary_wrap li.gallary_item").forEach((ele, indexInPage) => {
      const src = ele.querySelector<HTMLImageElement>(".pic_box img")?.getAttribute("src");
      if (!src) return;
      thumbnails.push({
        pageNumber: offset + indexInPage + 1,
        url: this.toAbsoluteURL(src),
      });
    });
    return thumbnails;
  }

  /** Thumbnail urls are protocol relative, eg: //baseURL/data/t/3860/55/xxx.webp */
  private toAbsoluteURL(src: string): string {
    try {
      return new URL(src, this.baseURL).href;
    } catch (error) {
      evLog("error", "wnacg: invalid thumbnail url:", src, error);
      return src;
    }
  }

  private async requestGalleryImages(galleryURL: string): Promise<GalleryImage[]> {
    const text = await window.fetch(galleryURL).then((res) => res.text());
    let js = "";
    for (let line of text.split("\n")) {
      line = line.replace("document.writeln(\"", "");
      line = line.replace("\");", "");
      if (line.includes("var imglist")) {
        line = line.replace("var imglist = ", "");
        line = line.replaceAll("fast_img_host+\\", "");
        line = line.replaceAll("\\", "");
        js += line;
      }
    }
    return this.extractUrlsAndCaptions(js);
  }

  /*
  document.writeln("	<script type=\"text/javascript\"> ");
  document.writeln("		var sns_sys_id = '';");
  document.writeln("		var sns_view_point_token = '';");
  document.writeln("		var hash = window.location.hash;");
  document.writeln("		if(!hash){");
  document.writeln("			hash = 0;");
  document.writeln("		}else{");
  document.writeln("			hash = parseInt(hash.replace(\"#\",\"\")) - 1;");
  document.writeln("		}");
  document.writeln("		var fast_img_host=\"\";");
  document.writeln("		var imglist = [{ url: fast_img_host+\"//img5.qy0.ru/data/2940/25/001.jpg\", caption: \"[001]\"},{ url: fast_img_host+\"/themes/weitu/images/bg/shoucang.jpg\", caption: \"喜歡紳士漫畫的同學請加入收藏哦！\"}];");
  document.writeln("");
  document.writeln("		$(function(){");
  document.writeln("			imgscroll.beLoad($(\"#img_list\"),imglist,hash);");
  document.writeln("		});");
  document.writeln("	
  </script>
  ");
  */

  private extractUrlsAndCaptions(inputStr: string) {
    const regex = /url:\s*"(.*?)",\s*caption:\s*"(.*?)"/gs;
    let match;
    const results = [];

    while ((match = regex.exec(inputStr)) !== null) {
      results.push({ url: match[1], caption: match[2] });
    }

    if (results.length > 0) {
      if (results[results.length - 1].caption.includes("加入收藏")) {
        results.pop();
      }
    }

    return results;
  }

}

type GalleryImage = {
  url: string;
  caption: string;
  thumbnail?: string;
}
ADAPTER.addSetup({
  name: "绅士漫画",
  workURLs: [
    /(wnacg.com|wn\d{2}.(cc|ru))\/photos-index/
  ],
  match: ["https://www.wnacg.com/*"],
  preloadAllPages: true,
  constructor: () => new WnacgMatcher(),
});
