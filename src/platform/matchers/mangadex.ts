import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type MangaDexChapterAttr = {
  volume?: string,
  chapter?: string,
  title?: string,
  translatedLanguage: string,
  externalUrl?: string,
  isUnavailable: boolean,
  publishAt: string,
  readableAt: string,
  createdAt: string,
  updatedAt: string,
  version: number,
  pages: number,
};
type MangaDexChapterData = {
  id: string,
  type: "chapter",
  attributes: MangaDexChapterAttr
};
type MangaDexChapters = {
  result: "ok",
  response: "collection",
  data: MangaDexChapterData[],
  limit: number,
  offset: number,
  total: number,
};

type MangaDexChapterImages = {
  result: "ok",
  baseUrl: string,
  chapter: {
    hash: string,
    data: string[],
    dataSaver: string[],
  }
}

class MangaDexMatcher extends BaseMatcher<string> {
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    const galleryId = window.location.href.match(/title\/([^\/]+)\//)?.[1];
    if (!galleryId) throw new Error("cannot match gallery id from href");
    const data = await window.fetch(`https://api.mangadex.org/manga/${galleryId}/feed?limit=96&includes[]=scanlation_group&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=0&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&includeUnavailable=0`)
      .then<MangaDexChapters>(resp => resp.json()).catch(Error);
    if (data instanceof Error) throw data;
    if (data.result !== "ok") throw new Error(`query chapters error: ${data.response}`);
    const chapters: Chapter[] = [];
    let chId = 1;
    for (const ch of data.data) {
      // TODO: support externalUrl
      if (ch.attributes.externalUrl) continue;
      const vol = ch.attributes.volume ? ("vol." + ch.attributes.volume) : "";
      const chNo = ch.attributes.chapter ? ("ch." + ch.attributes.chapter) : "";
      const title = ch.attributes.title ?? ch.id;
      const lang = ch.attributes.translatedLanguage ?? "";
      chapters.push(new Chapter(chId, [lang, vol, chNo, title], ch.id));
      chId++;
    }
    yield chapters;
  }
  async *fetchPagesSource(ch: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(ch.source);
  }
  async parseImgNodes(id: string): Promise<ImageNode[]> {
    const data = await window.fetch(`https://api.mangadex.org/at-home/server/${id}`)
      .then<MangaDexChapterImages>(resp => resp.json()).catch(Error);
    if (data instanceof Error) throw data;
    const baseUrl = data.baseUrl;
    const hash = data.chapter.hash;
    const digits = data.chapter.data.length.toString().length;
    const nodes = data.chapter.data.map((url, i) => {
      const href = `https://mangadex.org/chapter/${id}/${i + 1}`;
      const ext = url.split(".").pop() ?? "jpg";
      const title = (i + 1).toString().padStart(digits, "0");
      const src = `${baseUrl}/data/${hash}/${url}`;
      return new ImageNode("", href, title + "." + ext, undefined, src);
    });
    return nodes;
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }
  headers(_node: ImageNode): Record<string, string> {
    return {
      "Origin": "https://mangadex.org",
      "Referer": "https://mangadex.org",
    };
  }

}

// https://mangadex.org/title/cc049e8b-d766-4120-8a63-218f299686bb/the-crushing-weight-of-this-universe
ADAPTER.addSetup({
  name: "MangaDex",
  workURLs: [
    /mangadex.org\/title\/[^\/]+\//,
  ],
  match: ["https://mangadex.org/*"],
  constructor: () => new MangaDexMatcher(),
});
