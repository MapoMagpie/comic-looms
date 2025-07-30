import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

const REGEXP_EXTRACT_GALLERY_ID = /niyaniya.moe\/\w+\/(\d+\/\w+)/;
const NIYANIYA_API_HOST = "api.schale.network";

type BookDataDetail = {
  id?: string, key?: string, size: number,
}

type BookData = {
  base: string,
  fallback: string,
  entries: BookItem[],
}

type BookItem = {
  path: string,
  dimensions: [number, number],
}

type BookTag = {
  name: string,
  count: number,
  namespace?: number,
}

type BookDetail = {
  id: number,
  key: string,
  created_at: number,
  title: string,
  data: Record<string, BookDataDetail>,
  thumbnails: BookData,
  tags: BookTag[],
  // updated_at: number,
}

const NAMESPACE_MAP: Record<number, string> = {
  0: "misc",
  1: "artist",
  2: "circle",
  7: "uploader",
  8: "male",
  9: "female",
  10: "mixed",
  11: "language",
};

class NiyaniyaMatcher extends BaseMatcher<string> {
  meta?: GalleryMeta;

  galleryMeta(): GalleryMeta {
    return this.meta || new GalleryMeta(window.location.href, "koharu-unknows");
  }

  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(source.source);
  }

  createMeta(detail: BookDetail) {
    const tags: Record<string, any[]> = detail.tags.reduce<Record<string, any[]>>((map, tag) => {
      const category = NAMESPACE_MAP[tag.namespace || 0] || "misc";
      if (!map[category]) map[category] = [];
      map[category].push(tag.name);
      return map;
    }, {});
    this.meta = new GalleryMeta(window.location.href, detail.title);
    this.meta.tags = tags;
  }

  async parseImgNodes(source: string): Promise<ImageNode[]> {
    const matches = source.match(REGEXP_EXTRACT_GALLERY_ID);
    const crt = window.localStorage.getItem("clearance");
    if (!crt) throw new Error("cannot get clearance from localStorage");
    if (!matches || matches.length < 2) {
      throw new Error("invaild url: " + source);
    }
    const galleryID = matches[1];
    const detailAPI = `https://${NIYANIYA_API_HOST}/books/detail/${galleryID}`;
    const detailDataAPI = `https://${NIYANIYA_API_HOST}/books/detail/${galleryID}?crt=${crt}`;
    const [detail, detailData] = await Promise.all([
      window.fetch(detailAPI).then(res => res.json()).then(j => j as BookDetail).catch(Error),
      window.fetch(detailDataAPI, { method: "POST" }).then(res => res.json()).then(j => j as Pick<BookDetail, "data">).catch(Error),
    ]);
    if (detail instanceof Error || detailData instanceof Error) {
      throw new Error("failed to obtain data, perhaps the API of this site has changed");
    }
    detail.data = detailData.data;
    this.createMeta(detail);
    const [w, data] = Object.entries(detail.data).sort((a, b) => b[1].size - a[1].size).find(([_, v]) => v.id !== undefined && v.key !== undefined) ?? [undefined, undefined];
    if (w === undefined && data === undefined) throw new Error("cannot find resolution from gallery detail");
    const dataAPI = `https://${NIYANIYA_API_HOST}/books/data/${galleryID}/${data.id}/${data.key}/${w}?crt=${crt}`;
    const items = await window.fetch(dataAPI).then(res => res.json()).then(j => j as BookData).catch(Error);
    if (items instanceof Error) {
      throw new Error("failed to obtain data, perhaps the API of this site has changed");
    }
    if (items.entries.length !== detail.thumbnails.entries.length) {
      throw new Error("thumbnails length not match");
    }

    const thumbs = detail.thumbnails.entries;
    const thumbBase = detail.thumbnails.base;
    const itemBase = items.base;
    const pad = items.entries.length.toString().length;
    return items.entries.map((item, i) => {
      const href = `${window.location.origin}/reader/${galleryID}/${i + 1}`;
      const title = (i + 1).toString().padStart(pad, "0") + "." + item.path.split(".").pop();
      const src = itemBase + item.path;
      return new ImageNode(thumbBase + thumbs[i].path, href, title, undefined, src, { w: item.dimensions[0], h: item.dimensions[1] });
    });
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }
  headers(): Record<string, string> {
    return {
      "Referer": "https://niyaniya.moe/",
      "Origin": window.location.origin,
    }
  }

}
ADAPTER.addSetup({
  name: "niyaniya.moe",
  workURLs: [
    /(niyaniya.moe|shupogaki.moe|hoshino.one)\/(g|reader)\/\d+\/\w+/
  ],
  match: ["https://niyaniya.moe/*"],
  constructor: () => new NiyaniyaMatcher(),
});
