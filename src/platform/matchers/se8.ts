import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

class Se8Matcher extends BaseMatcher<string> {

  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    const elements = Array.from(document.querySelectorAll<HTMLAnchorElement>(".catalog-list li.chapter-item > a"));
    yield elements.map((elem, i) => new Chapter(i, elem.textContent ?? "", elem.href));
  }

  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(source.source);
  }

  async parseImgNodes(href: string): Promise<ImageNode[]> {
    const doc = await window.fetch(href).then(resp => resp.text()).then(text => new DOMParser().parseFromString(text, "text/html")).catch(Error);
    if (doc instanceof Error) throw doc;
    const elements = Array.from(doc.querySelectorAll<HTMLImageElement>("#mainView > .comic-list > .comic-page > img"));
    return elements.map(elem => new ImageNode("", href, elem.alt, undefined, elem.src));
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

}

ADAPTER.addSetup({
  name: "韩漫库",
  workURLs: [
    /se8.us\/index.php\/comic\/[^/]*$/
  ],
  match: ["https://se8.us/*"],
  constructor: () => new Se8Matcher(),
});
