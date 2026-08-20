import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type HentaiZapGalleryImage = {
  thumb: string,
  href: string,
  page: number,
  ext: string,
  width: number,
  height: number,
}
type HentaiZapGalleryPageInfo = {
  page: number,
  ext: string,
  width: number,
  height: number,
}
type HentaiZapGalleryThumbnail = {
  page: number,
  alt: string,
  href: string,
  thumb: string,
}
type HentaiZapGalleryThumbs = {
  ok: boolean,
  gallery_id: number,
  from: number,
  count: number,
  thumbs: HentaiZapGalleryThumbnail[],
  thumb_template: string,
  pages_total: number,
}

class HentaiZapMatcher extends BaseMatcher<HentaiZapGalleryImage[]> {
  meta?: GalleryMeta;

  galleryMeta(): GalleryMeta {
    if (this.meta) return this.meta;
    const title = document.querySelector("#gallery-title")?.textContent ?? document.title;
    const originTitle = document.querySelector("p.hz-gallery-description")?.textContent;
    this.meta = new GalleryMeta(window.location.href, title);
    this.meta.originTitle = originTitle;
    Array.from(document.querySelectorAll<HTMLElement>(".hz-gallery-metadata > div.hz-gallery-entity-group")).forEach(elem => {
      const category = elem.querySelector("span.hz-gallery-entity-label")?.textContent?.replace(":", "")?.toLowerCase();
      if (!category) return;
      const tags = Array.from(elem.querySelectorAll<HTMLElement>("a.hz-gallery-tag > span.hz-gallery-tag__name")).map(e => e.textContent).filter(Boolean) as string[];
      this.meta!.tags[category] = tags;
    });
    return this.meta;
  }

  async *fetchPagesSource(): AsyncGenerator<Result<HentaiZapGalleryImage[]>> {
    // https://hentaizap.com/gallery/1626345/
    const gid = window.location.href.match(/gallery\/(\d+)/)?.[1];
    if (!gid) throw new Error("cannot match gallery id from href: " + window.location.href);
    // fetch thumbs api
    const qs = new URLSearchParams();
    qs.set("from", "1");
    qs.set("all", "1");
    const apiUrl = `${window.location.origin}/api/gallery/${gid}/thumbs?${qs.toString()}`;
    const data = await window.fetch(apiUrl).then(resp => resp.json()).then(data => data as HentaiZapGalleryThumbs).catch(Error);
    if (data instanceof Error) throw data;
    if (!data.ok || data.thumbs.length === 0) throw new Error("fetch thumbs api error, response not ok");
    let firstHref = data.thumbs[0].href;
    if (!firstHref.startsWith("http")) {
      firstHref = window.location.origin + firstHref;
    }
    // find first picture href, query document, find pageInfo from script
    const firstDoc = await window.fetch(firstHref).then(resp => resp.text()).catch(Error);
    if (firstDoc instanceof Error) throw firstDoc;
    const pageInfoRaw = firstDoc.match(/id="readerPagesJson"\>(\[.*?\])/)?.[1];
    if (!pageInfoRaw) throw new Error("cannot match pageInfo from " + firstHref);
    const pageInfos = JSON.parse(pageInfoRaw) as HentaiZapGalleryPageInfo[];
    if (pageInfos.length !== data.thumbs.length) throw new Error("thumbs length not equals page infos length");
    const ret: HentaiZapGalleryImage[] = [];
    for (let i = 0; i < pageInfos.length; i++) {
      const info = pageInfos[i];
      const thumb = data.thumbs[i];
      ret.push({
        thumb: thumb.thumb,
        href: thumb.href,
        page: thumb.page,
        ext: info.ext,
        width: info.width,
        height: info.height
      });
    }
    yield Result.ok(ret);
  }

  async parseImgNodes(images: HentaiZapGalleryImage[]): Promise<ImageNode[]> {
    const nodes: ImageNode[] = [];
    const digits = images.length.toString().length;
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const title = img.page.toString().padStart(digits, "0");
      const thumb = img.thumb;
      const idx = thumb.lastIndexOf("/");
      const origin = `${thumb.substring(0, idx)}/${img.page}.${img.ext ?? "webp"}`;
      let href = img.href;
      if (!href.startsWith("http")) {
        href = window.location.origin + href;
      }
      const node = new ImageNode(thumb, href, `${title}.${img.ext}`, undefined, origin, { w: img.width, h: img.height });
      nodes.push(node);
    }
    return nodes;
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

}

ADAPTER.addSetup({
  name: "HentaiZap",
  workURLs: [
    /hentaizap.com\/gallery\/\w+\/?/
  ],
  match: ["https://hentaizap.com/*"],
  constructor: () => new HentaiZapMatcher(),
});
