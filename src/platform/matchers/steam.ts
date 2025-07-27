import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

const STEAM_THUMB_IMG_URL_REGEX = /background-image:\surl\(.*?(h.*\/).*?\)/;
class SteamMatcher extends BaseMatcher<string> {
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    let raw = "";
    try {
      raw = await window.fetch(node.href).then(resp => resp.text());
      if (!raw) throw new Error("[text] is empty");
    } catch (error) {
      throw new Error(`Fetch source page error, expected [text]！ ${error}`);
    }
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(raw, "text/html");
    const imgURL = doc.querySelector(".actualmediactn > a")?.getAttribute("href");
    if (!imgURL) {
      throw new Error("Cannot Query Steam original Image URL");
    }
    return { url: imgURL };
  }

  async parseImgNodes(source: string): Promise<ImageNode[] | never> {
    const list: ImageNode[] = [];
    const doc = await window.fetch(source).then((resp) => resp.text()).then(raw => new DOMParser().parseFromString(raw, "text/html"));
    if (!doc) {
      throw new Error("warn: steam matcher failed to get document from source page!")
    }
    const nodes = doc.querySelectorAll(".profile_media_item");
    if (!nodes || nodes.length == 0) {
      throw new Error("warn: failed query image nodes!")
    }
    for (const node of Array.from(nodes)) {
      const src = STEAM_THUMB_IMG_URL_REGEX.exec(node.innerHTML)?.[1];
      if (!src) {
        throw new Error(`Cannot Match Steam Image URL, Content: ${node.innerHTML}`);
      }
      const newNode = new ImageNode(
        src,
        node.getAttribute("href")!,
        node.getAttribute("data-publishedfileid")! + ".jpg",
      );
      list.push(newNode);
    }
    return list;
  }

  async *fetchPagesSource(): AsyncGenerator<Result<string>> {
    let totalPages = -1;
    document.querySelectorAll(".pagingPageLink").forEach(ele => {
      totalPages = Number(ele.textContent);
    });
    const url = new URL(window.location.href);
    url.searchParams.set("view", "grid");
    if (totalPages === -1) {
      const doc = await window.fetch(url.href).then((response) => response.text()).then((text) => new DOMParser().parseFromString(text, "text/html")).catch(() => null);
      if (!doc) {
        throw new Error("warn: steam matcher failed to get document from source page!")
      }
      doc.querySelectorAll(".pagingPageLink").forEach(ele => totalPages = Number(ele.textContent));
    }
    if (totalPages > 0) {
      for (let p = 1; p <= totalPages; p++) {
        url.searchParams.set("p", p.toString());
        yield Result.ok(url.href);
      }
    } else {
      yield Result.ok(url.href);
    }
  }

  parseGalleryMeta(): GalleryMeta {
    const url = new URL(window.location.href);
    const appid = url.searchParams.get("appid");
    return new GalleryMeta(window.location.href, "steam-" + appid || "all");
  }

}
ADAPTER.addSetup({
  name: "Steam Screenshots",
  workURLs: [
    /steamcommunity.com\/id\/[^/]+\/screenshots.*/
  ],
  match: ["https://steamcommunity.com/*"],
  constructor: () => new SteamMatcher(),
});
