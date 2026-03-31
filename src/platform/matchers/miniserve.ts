import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { isImage, isVideo } from "../../utils/media-helper";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";
import * as zip_js from "@zip.js/zip.js";

class MiniServeMatcher extends BaseMatcher<string> {
  map: Map<number, Map<string, Promise<Blob>>> = new Map();
  currentDirectorMedias: ImageNode[] = [];
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    const list = Array.from(document.querySelectorAll<HTMLAnchorElement>("table tbody a.file"));
    const chapters: Chapter[] = [];
    let id = 1;
    for (const a of list) {
      const href = a.href;
      const ext = href.split(".").pop()?.toLowerCase();
      if (ext === "zip") {
        chapters.push(new Chapter(id, a.textContent ?? ("unknown-" + id), href));
        id++;
      } else if (isImage(ext ?? "") || isVideo(ext ?? "")) {
        const node = new ImageNode(a.href, a.href, a.textContent ?? "", undefined, a.href);
        if (isImage(ext!)) {
          node.mimeType = "image/" + ext;
        } else if (isVideo(ext!)) {
          node.mimeType = "video/" + ext;
        }
        this.currentDirectorMedias.push(node);
      }
    }
    if (this.currentDirectorMedias.length > 0) {
      chapters.unshift(new Chapter(0, "Current Directory", ""));
    }
    if (chapters.length === 0) throw new Error("can not found zip files or current directory has empty image list");
    return chapters;
  }
  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(source.source);
  }
  async parseImgNodes(href: string, chapterID: number): Promise<ImageNode[]> {
    if (!href && this.currentDirectorMedias.length > 0) return this.currentDirectorMedias;

    const blob = await window.fetch(href).then(res => res.blob());
    const zipReader = new zip_js.ZipReader(new zip_js.BlobReader(blob));
    const entries = await zipReader.getEntries();
    const map = new Map<string, Promise<Blob>>;
    this.map.set(chapterID, map);
    return entries.filter(e => {
      const ext = (e.filename.split(".").pop() ?? "jpg").toLowerCase();
      return isImage(ext) || isVideo(ext);
    }
    ).map(e => {
      const promise = (e as any).getData!(new zip_js.BlobWriter());
      map.set(e.filename, promise);
      const ext = (e.filename.split(".").pop() ?? "jpg").toLowerCase();
      const node = new ImageNode("", e.filename, e.filename, undefined);
      if (isImage(ext)) {
        node.mimeType = "image/" + ext;
      } else if (isVideo(ext)) {
        node.mimeType = "video/" + ext;
      }
      return node;
    });
  }
  async fetchOriginMeta(node: ImageNode, _retry: boolean, chapterID: number): Promise<OriginMeta> {
    if (node.originSrc) {
      return { url: node.originSrc };
    }
    const dataPromise = this.map.get(chapterID)?.get(node.href);
    if (!dataPromise) throw new Error("cannot read image from zip");
    const data = await dataPromise;
    return { url: URL.createObjectURL(data) };
  }
  async processData(data: Uint8Array<ArrayBuffer>, _contentType: string, node: ImageNode): Promise<[Uint8Array<ArrayBuffer>, string]> {
    return [data, node.mimeType!];
  }
}
ADAPTER.addSetup({
  name: "Mini Serve",
  workURLs: [
    /.*:41021/
  ],
  // match: ["http://*::41021",]
  constructor: () => new MiniServeMatcher(),
});
