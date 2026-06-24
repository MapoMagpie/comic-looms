import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import q from "../../utils/query-element";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type IMHentaiData = {
  server: string, uid: string, gid: string, imgDir: string, total: number, gth: Record<string, string>,
}

class IMHentaiMatcher extends BaseMatcher<IMHentaiData> {
  meta?: GalleryMeta;

  async fetchOriginMeta(node: ImageNode, _: boolean): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

  async parseImgNodes(data: IMHentaiData): Promise<ImageNode[]> {
    const ret: ImageNode[] = [];
    const digits = data.total.toString().length;
    for (let i = 1; i <= data.total; i++) {
      const url = `https://m${data.server}.imhentai.xxx/${data.imgDir}/${data.gid}/${i}t.jpg`;
      const href = `https://imhentai.xxx/view/${data.uid}/${i}/`;
      const ext = imParseExt(data.gth[i.toString()]);
      const originSrc = `https://m${data.server}.imhentai.xxx/${data.imgDir}/${data.gid}/${i}.${ext}`;
      let wh = undefined;
      const splits = data.gth[i.toString()].split(",");
      if (splits.length === 3) {
        wh = { w: parseInt(splits[1]), h: parseInt(splits[2]) };
      }
      const node = new ImageNode(url, href, `${i.toString().padStart(digits, "0")}.${ext}`, undefined, originSrc, wh);
      ret.push(node);
    }
    return ret;
  }

  async *fetchPagesSource(): AsyncGenerator<Result<IMHentaiData>> {
    const server = q<HTMLInputElement>("#load_server", document).value;
    const uid = q<HTMLInputElement>("#gallery_id", document).value;
    const gid = q<HTMLInputElement>("#load_id", document).value;
    const imgDir = q<HTMLInputElement>("#load_dir", document).value;
    const total = q<HTMLInputElement>("#load_pages", document).value;
    const gthRaw = Array.from(document.querySelectorAll("script"))
      .find(s => s.textContent?.trimStart().startsWith("var g_th"))
      ?.textContent?.match(/\('(\{.*?\})'\)/)?.[1];
    if (!gthRaw) throw new Error("cannot match gallery images info");
    const gth = JSON.parse(gthRaw) as Record<string, string>; // 1: "w,1280,963" ​ 2: "w,1280,963"
    const data = { server, uid, gid, imgDir, total: Number(total), gth };
    yield Result.ok(data);
  }

  title(): string {
    const meta = this.galleryMeta();
    let title = "";
    if (ADAPTER.conf.ehentaiTitlePrefer === "japanese") {
      title = meta.originTitle || meta.title || "UNTITLE";
    } else {
      title = meta.title || meta.originTitle || "UNTITLE";
    }
    return title;
  }

  galleryMeta(): GalleryMeta {
    if (this.meta) return this.meta;
    const title = document.querySelector(".right_details > h1")?.textContent || undefined;
    const originTitle = document.querySelector(".right_details > p.subtitle")?.textContent || undefined;
    const meta = new GalleryMeta(window.location.href, title || "UNTITLE");
    meta.originTitle = originTitle;
    meta.tags = {};
    const list = Array.from(document.querySelectorAll<HTMLElement>(".galleries_info > li"));
    for (const li of list) {
      let cat = li.querySelector(".tags_text")?.textContent;
      if (!cat) continue;
      cat = cat.replace(":", "").trim();
      if (!cat) continue;
      const tags = Array.from(li.querySelectorAll("a.tag")).map(a => a.firstChild?.textContent?.trim()).filter(v => Boolean(v));
      meta.tags[cat] = tags;
    }
    this.meta = meta;
    return this.meta;
  }

}

function imParseExt(str: string): string {
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
ADAPTER.addSetup({
  name: "im-hentai",
  workURLs: [
    /imhentai.xxx\/gallery\/\d+\//
  ],
  match: ["https://imhentai.xxx/*"],
  constructor: () => new IMHentaiMatcher(),
});
