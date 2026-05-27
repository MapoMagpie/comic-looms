import { IMGFetcher } from "../../img-fetcher";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { evLog } from "../../utils/ev-log";
import { BaseMatcher, OriginMeta, Result } from "../platform";

// @ts-ignore
class MangaParkMatcher extends BaseMatcher<string> {

  preferServer: { server: string, done: number }[] = [];

  constructor() {
    super();
    const ls = window.localStorage.getItem("prefer-services");
    this.preferServer = ls ? JSON.parse(ls) : [];
  }

  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    let list = Array.from(document.querySelectorAll<HTMLAnchorElement>("div[data-name='chapter-list'] .flex-col > .px-2 > .space-x-1 > a"));
    if (list.length === 0) {
      list = Array.from(document.querySelectorAll<HTMLAnchorElement>("div[data-name='chapter-list'] .flex-col-reverse > .px-2 > .space-x-1 > a"));
      list = list.reverse();
    }
    return list.map((elem, i) => new Chapter(i, elem.textContent ?? "Chapter" + (i + 1), elem.href));
  }

  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(source.source);
  }

  async parseImgNodes(href: string): Promise<ImageNode[]> {
    const doc = await window.fetch(href).then(resp => resp.text()).then(text => new DOMParser().parseFromString(text, "text/html")).catch(Error);
    if (doc instanceof Error) throw doc;
    const elements = Array.from(doc.querySelectorAll<HTMLDivElement>("div[data-name='image-item'] > div"));
    const digits = elements.length.toString().length;
    return elements.map((elem, i) => {
      const src = elem.querySelector<HTMLImageElement>("img")?.src;
      if (!src) throw new Error("cannot find image from chapter: " + href);
      const ext = src.split(".").pop() ?? "jpg";
      const title = (i + 1).toString().padStart(digits, "0") + "." + ext;
      const [w, h] = [parseInt(elem.style.width), parseInt(elem.style.height)];
      const node = new ImageNode("", href, title, undefined, src, { w, h });
      return node;
    });
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

  async fetchImageData(imf: IMGFetcher): Promise<[Blob, number] | null> {
    let ret = await super.fetchImageData(imf).catch(Error);
    const url = new URL(imf.node.originSrc!);
    if (ret === null || ret instanceof Error || ret?.[0].type.startsWith("text")) { // server down
      this.updatePerferServer(url.host, true);
      evLog("info", "server down, try other servers", this.preferServer);
      for (const server of this.preferServer) {
        url.host = server.server;
        imf.node.originSrc = url.href;
        ret = await super.fetchImageData(imf);
        if (ret?.[0].type.startsWith("image")) {
          break;
        };
        this.updatePerferServer(url.host, true);
      }
    }
    if (ret instanceof Error) throw ret;
    if (ret?.[0].type.startsWith("image")) {
      this.updatePerferServer(url.host);
    }
    return ret;
  }

  updatePerferServer(server: string, failed?: boolean) {
    const found = this.preferServer.findIndex(v => v.server === server);
    let changed = false;
    if (found > -1) {
      this.preferServer[found].done = Math.min(20, (this.preferServer[found].done + (failed ? -1 : 1)));
      changed = true;
    } else if (!failed) {
      this.preferServer.push({ server: server, done: 1 });
      changed = true;
    }
    if (changed) {
      this.preferServer = this.preferServer.sort((a, b) => {
        if (a.done === b.done) return Math.random() - 0.5;
        return b.done - a.done;
      });
      this.preferServer = this.preferServer.slice(0, 30);
      window.localStorage.setItem("prefer-services", JSON.stringify(this.preferServer));
    }
  }

}
// ADAPTER.addSetup({
//   name: "MangaPark",
//   workURLs: [
//     /(mangapark|comicpark|readpark|mpark).(net|com|org|me|io|to)\/title\/[^/]+$/
//   ],
//   match: ["https://mangapark.com/*"],
//   constructor: () => new MangaParkMatcher(),
// });
