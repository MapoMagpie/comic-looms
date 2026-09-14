import ImageNode from "../../img-node";
import { ADAPTER } from "../adapt";
import { BaseMatcher, Result, OriginMeta } from "../platform";

class KoneMatcher extends BaseMatcher<Document> {
  async *fetchPagesSource(): AsyncGenerator<Result<Document>> {
    yield Result.ok(document);
  }
  async parseImgNodes(doc: Document): Promise<ImageNode[]> {
    const images = Array.from(doc.querySelectorAll<HTMLImageElement>('#post-article img[src*="gimel.mittere.io"]'));
    const digits = images.length.toString().length;
    return images.map((img, i) => {
      const src = img.src;
      const title = (i + 1).toString().padStart(digits, "0") + ".webp";
      const wh = img.width > 0 && img.height > 0 ? { w: img.width, h: img.height } : undefined;
      return new ImageNode(src, src, title, undefined, src, wh);
    });
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc ?? node.href };
  }
}
ADAPTER.addSetup({
  name: "Kone",
  workURLs: [
    /kone\.gg\/s\/[\w-]+\/[\w-]+/
  ],
  match: ["https://kone.gg/*"],
  constructor: () => new KoneMatcher(),
});
