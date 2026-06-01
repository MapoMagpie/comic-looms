import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

class SeqingmanMatcher extends BaseMatcher<string> {

  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("#chapterlist > ul > li"));
    const ret: Chapter[] = [];
    for (const elem of elements) {
      const a = elem.querySelector<HTMLAnchorElement>("a")!;
      const href = a.href;
      const title = a.textContent;
      const num = parseInt(elem.getAttribute("data-num") ?? "0");
      ret.push(new Chapter(num, title, href));
    }
    yield ret;
  }

  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(source.source);
  }
  async parseImgNodes(source: string): Promise<ImageNode[]> {
    const doc = await window.fetch(source).then(resp => resp.text()).then(text => new DOMParser().parseFromString(text, "text/html")).catch(Error);
    if (doc instanceof Error) throw doc;
    const images = Array.from(doc.querySelectorAll<HTMLImageElement>("#ch_img_container > img"));
    const digits = images.length.toString().length;
    return images.map((img, i) => {
      const src = img.src;
      const ext = src.split(".").pop() ?? "jpg";
      const title = (i + 1).toString().padStart(digits, "0");
      return new ImageNode("", source, title + "." + ext, undefined, src);
    });
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

}

ADAPTER.addSetup({
  name: "色情漫",
  workURLs: [
    /seqingman.com\/series\/[^/]*$/,
  ],
  match: ["seqingman.com"],
  constructor: () => new SeqingmanMatcher(),
});
