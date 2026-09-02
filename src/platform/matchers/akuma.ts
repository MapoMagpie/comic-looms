import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { ADAPTER } from "../adapt";
import { BaseMatcher, Result, OriginMeta } from "../platform";

class AkumaMatcher extends BaseMatcher<Document> {
  originImages?: string[];
  index: number = 0;
  meta?: GalleryMeta;
  title(): string {
    return this.galleryMeta().title!;
  }
  galleryMeta(): GalleryMeta {
    if (!this.meta) {
      this.meta = this.initGalleryMeta(document);
    }
    return this.meta!;
  }
  initGalleryMeta(doc: Document): GalleryMeta {
    const title = doc.querySelector("header.entry-header > h1")?.textContent ?? doc.title;
    const meta = new GalleryMeta(window.location.href, title);
    meta.originTitle = doc.querySelector("header.entry-header > span")?.textContent || undefined;
    meta.tags = Array.from(doc.querySelectorAll("ul.info-list > li.meta-data"))
      .reduce<Record<string, string[]>>((prev, curr) => {
        const cat = curr.querySelector("span.data")?.textContent?.replace(":", "").toLowerCase().trim();
        if (cat) {
          prev[cat] = Array.from(curr.querySelectorAll("span.value")).map(v => v.textContent?.trim()).filter(Boolean) as string[];
        }
        return prev;
      }, {});
    return meta;
  }
  async *fetchPagesSource(): AsyncGenerator<Result<Document>> {
    // fetch origin images;
    const csrf = document.querySelector<HTMLMetaElement>("meta[name='csrf-token'][content]")?.content;
    if (!csrf) throw new Error("cannot get csrf token form this page");
    this.originImages = await window.fetch(window.location.href, {
      headers: { "X-CSRF-TOKEN": csrf, "X-Requested-With": "XMLHttpRequest", "Sec-Fetch-Dest": "empty", },
      method: "POST",
    }).then(res => res.json()) as string[];
    // find page info
    const pagRaw = Array.from(document.querySelectorAll<HTMLScriptElement>("body > script"))
      .find(s => s.textContent?.trimStart().startsWith("var ajx"))
      ?.textContent?.match(/pag = (\{.*?\}),/s)?.[1];
    if (!pagRaw) throw new Error("cannot get page info");
    const pag = JSON.parse(pagRaw.replaceAll(/(\w+) :/g, "\"$1\":")) as { act: string, cnt: number, idx: number, stp: number };
    let idx = pag.idx;
    yield Result.ok(document);
    while (idx * pag.stp < pag.cnt) {
      const res = await window.fetch(pag.act, {
        headers: {
          "X-CSRF-TOKEN": csrf,
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Fetch-Dest": "empty",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: "POST",
        body: `index=${idx}`
      })
      if (!res.ok) yield Result.err(new Error(`fetch thumbnails failed, status: ${res.statusText}`));
      idx++;
      yield Result.ok(await res.text().then(text => new DOMParser().parseFromString(text, "text/html")));
    }
  }
  async parseImgNodes(doc: Document): Promise<ImageNode[]> {
    const items = Array.from(doc.querySelectorAll<HTMLAnchorElement>("li > a.page-item"));
    if (items.length === 0) throw new Error("cannot find thumbnails");
    const ret: ImageNode[] = [];
    const digits = this.originImages!.length.toString().length;
    for (const item of items) {
      const origin = this.originImages![this.index];
      const href = item.href;
      const thumb = (item.firstElementChild as HTMLImageElement).src;
      const ext = origin.split(".").pop() ?? "jpg";
      const originSrc = thumb.slice(0, thumb.indexOf("tbn")) + origin;
      const title = (this.index + 1).toString().padStart(digits, "0");
      ret.push(new ImageNode(thumb, href, `${title}.${ext}`, undefined, originSrc));
      this.index++;
    }
    return ret;
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }
}
ADAPTER.addSetup({
  name: "Akuma.moe",
  workURLs: [
    /akuma.moe\/g\/\w+\/?$/
  ],
  match: ["https://akuma.moe/*"],
  preloadAllPages: true,
  constructor: () => new AkumaMatcher(),
});
