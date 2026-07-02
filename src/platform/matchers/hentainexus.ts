import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type HNImageInfo = {
  image?: string,
  image_avif?: string,
  image_webp?: string,
  image_fallback?: string,
  label: string, // "1"
  type: "image",
  url_label: string, // "001"
}
const REGEXP_EXTRACT_INIT_ARGUMENTS = /initReader\("(.*?)\",\s?"(.*?)",\s?(.*?)\)/;
const REGEXP_EXTRACT_HASH = /read\/\d+\/(\d+)$/;
class HentaiNexusMatcher extends BaseMatcher<Document> {
  meta?: GalleryMeta;
  baseURL?: string;
  readerData?: HNImageInfo[];
  // readDirection?: string;

  async *fetchPagesSource(): AsyncGenerator<Result<Document>> {
    this.meta = this.pasrseGalleryMeta(document);
    yield Result.ok(document);
  }

  async parseImgNodes(doc: Document): Promise<ImageNode[]> {
    const result: ImageNode[] = [];
    const list = Array.from(doc.querySelectorAll<HTMLAnchorElement>(".section .container + .container > .box > .columns > .column a"));
    list.forEach((li, i) => {
      const img = li.querySelector<HTMLImageElement>("img");
      if (!img) return;
      const num = li.href.split("/").pop() || i.toString();
      const ext = img.src.split(".").pop();
      const title = num + "." + ext;
      result.push(new ImageNode(img.src, li.href, title));
    });
    return result;
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    if (!this.readerData) {
      const doc = await window.fetch(node.href).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      const args = doc.querySelector("body > script")?.textContent?.match(REGEXP_EXTRACT_INIT_ARGUMENTS)?.slice(1);
      if (!args || args.length !== 3) throw new Error("cannot find reader data");
      // args[2] :string = {"direction":"rtl","smooth_scroll":"enabled","fit_to_screen":"disabled"}
      try {
        this.initReader(args[0], args[1]);
      } catch (_error) {
        throw new Error("hentainexus updated decryption function");
      }
    }
    if (!this.readerData) throw new Error("cannot find reader data");
    const hash = node.href.match(REGEXP_EXTRACT_HASH)?.[1];
    if (!hash) throw new Error("cannot find image url_label");
    const data = this.readerData.find(d => d.url_label === hash);
    if (!data) throw new Error("cannot find image data by url_label");
    const url = data.image_avif ?? data.image_webp ?? data.image ?? data.image_fallback;
    if (!url) throw new Error("cannot find image url");
    const ext = url.split(".").pop();
    return { url, title: hash + "." + ext };
  }

  galleryMeta(chapter: Chapter): GalleryMeta {
    return this.meta || super.galleryMeta(chapter);
  }

  private pasrseGalleryMeta(doc: Document): GalleryMeta {
    const title = doc.querySelector("h1.title")?.textContent || "UNTITLED"
    const meta = new GalleryMeta(this.baseURL || window.location.href, title);
    doc.querySelectorAll(".view-page-details tr").forEach(tr => {
      const category = tr.querySelector(".viewcolumn")?.textContent?.trim();
      if (!category) return;
      let values = Array.from(tr.querySelector(".viewcolumn + td")?.childNodes || []).map(c => c?.textContent?.trim()).filter(Boolean) as string[];
      if (values.length === 0) return;
      if (category === "Tags") {
        values = values.map(v => v.replace(/\s?\([0-9,]*\)$/, ""));
      }
      meta.tags[category] = values;
    });
    return meta;
  }

  private initReader(data: string, originTitle: string) {
    if (this.meta) {
      this.meta.originTitle = originTitle.replace(/::\s?HentaiNexus/, "");
    }
    // this.readDirection = readDirection;

    const hostname = window.location.hostname.split("");
    const hostnameLen = Math.min(hostname.length, 64);
    const rawSplits = window.atob(data).split("");
    for (let i = 0; i < hostnameLen; i++) {
      rawSplits[i] = String.fromCharCode(
        rawSplits[i].charCodeAt(0) ^ hostname[i].charCodeAt(0)
      );
    }
    const decoded = rawSplits.join("");

    const poses: boolean[] = [];
    const list: number[] = [];
    for (let step = 2; list.length < 16; ++step) {
      if (!poses[step]) {
        list.push(step);
        for (let j = step << 1; j <= 256; j += step) {
          poses[j] = true;
        }
      }
    }
    let a = 0;
    for (let step = 0; step < 64; step++) {
      a = a ^ decoded.charCodeAt(step);
      for (let i = 0; i < 8; i++) {
        a = a & 1 ? a >>> 1 ^ 12 : a >>> 1;
      }
    }
    a = a & 7;
    const step = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      step[i] = i;
    }
    let raw = '';
    let c = 0;
    for (let i = 0, b = 0; i < 256; i++) {
      b = (b + step[i] + decoded.charCodeAt(i % 64)) % 256;
      c = step[i];
      step[i] = step[b];
      step[b] = c;
    }

    for (let d = list[a], e = 0, f = 0, j = 0, k = 0, i = 0;
      i + 64 < decoded.length;
      i++
    ) {
      j = (j + d) % 256;
      k = (f + step[(k + step[j]) % 256]) % 256;
      f = (f + j + step[j]) % 256;
      c = step[j];
      step[j] = step[k];
      step[k] = c;
      e = step[(k + step[(j + step[(e + f) % 256]) % 256]) % 256];
      raw += String.fromCharCode(decoded.charCodeAt(i + 64) ^ e);
    }
    this.readerData = JSON.parse(raw) as HNImageInfo[];
  }
}
ADAPTER.addSetup({
  name: "hentainexus",
  workURLs: [
    /hentainexus.com\/view\/\d+/
  ],
  match: ["https://hentainexus.com/*"],
  constructor: () => new HentaiNexusMatcher(),
});
