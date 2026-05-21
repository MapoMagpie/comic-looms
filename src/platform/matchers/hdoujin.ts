import { GalleryMeta } from "../../download/gallery-meta";
import { IMGFetcher } from "../../img-fetcher";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type HDoujinImg = {
  thumb: string,
  large: string,
  href: string,
  width: number,
  height: number,
  title: string,
}

type HDoujinEntry = {
  path: string,
  dimensions: [number, number],
}

type HDoujinTag = {
  namespace: number, name: string, count: number
}

type HDoujinArchiveImages = {
  base: string,
  entries: HDoujinEntry[],
}

type HDoujinGallery = {
  id: number,
  key: string,
  created_at: number,
  category: number,
  title: string,
  title_short: string,
  subtitle: string,
  subtitle_short: string,
  parent: { id: number, key: string, },
  thumbnails: {
    base: string,
    main: HDoujinEntry,
    entries: HDoujinEntry[],
  },
  tags: HDoujinTag[],
}

type HDoujinArchive = {
  source: string,
  data: Record<number, {
    id: number, key: string, size: number,
  }>,
}



class HDoujinMatcher extends BaseMatcher<HDoujinImg[]> {

  meta?: GalleryMeta;

  galleryMeta(): GalleryMeta {
    return this.meta!;
  }

  tagNamespace(namespace: number): string {
    const map: Record<number, string> = {
      1: "artist",
      2: "cricle",
      3: "parody",
      7: "uploader",
      8: "male_tags",
      9: "female_tags",
      11: "languages",
    };
    return map[namespace] ?? namespace.toString();
  }

  createMeta(gallery: HDoujinGallery): GalleryMeta {
    const meta = new GalleryMeta(window.location.href, gallery.title);
    meta.originTitle = gallery.subtitle;
    for (const tag of gallery.tags) {
      const tagName = this.tagNamespace(tag.namespace);
      if (!meta.tags[tagName]) {
        meta.tags[tagName] = [];
      }
      meta.tags[tagName].push(tag.name)
    }
    return meta;
  }

  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<HDoujinImg[]>> {
    const crt = window.localStorage.getItem("clearance");
    if (!crt) throw new Error("cannot get clearance from local storage");

    const id = source.source.match(/\/g\/(\d+\/\w+)/)?.[1];
    const gallery = await window.fetch(`https://api.hdoujin.org/books/detail/${id}`).then(resp => resp.json()).then(data => data as HDoujinGallery).catch(Error);
    if (gallery instanceof Error) throw gallery;
    this.meta = this.createMeta(gallery);

    const archives = await window.fetch(`https://api.hdoujin.org/books/detail/${id}?crt=${crt}`, { method: "POST" }).then(resp => resp.json()).then(data => data as HDoujinArchive).catch(Error);
    if (archives instanceof Error) throw archives;
    let archive = archives.data[0];
    let size = "0";
    if (!ADAPTER.conf.fetchOriginal) {
      const resolution = JSON.parse(window.localStorage.getItem("reader") ?? '{"resolution":1280}').resolution as number ?? 1280;
      if (archives.data[resolution]) {
        archive = archives.data[resolution];
        size = resolution.toString();
      }
    }

    const largeImages = await window.fetch(`https://api.hdoujin.org/books/data/${id}/${archive.id}/${archive.key}/${size}?crt=${crt}`).then(resp => resp.json()).then(data => data as HDoujinArchiveImages).catch(Error);
    if (largeImages instanceof Error) throw largeImages;

    const ret: HDoujinImg[] = [];
    const total = gallery.thumbnails.entries.length;
    const digits = total.toString().length;
    const thumb_base = gallery.thumbnails.base;
    const large_base = largeImages.base;
    for (let i = 0; i < total; i++) {
      const entry = gallery.thumbnails.entries[i];
      const largeEntry = largeImages.entries[i];
      const ext = largeEntry.path.split(".").pop() ?? "jpg";
      ret.push({
        thumb: thumb_base + entry.path,
        large: large_base + largeImages.entries[i].path,
        href: source.source + "/read/" + (i + 1),
        width: entry.dimensions[0],
        height: entry.dimensions[1],
        title: (i + 1).toString().padStart(digits, "0") + "." + ext,
      })
    }
    yield Result.ok(ret);
  }

  async fetchImageData(imf: IMGFetcher): Promise<[Blob, number] | null> {
    const data = await window.fetch(imf.node.originSrc!).then(resp => resp.blob());
    return [data, data.size];
  }

  async parseImgNodes(images: HDoujinImg[],): Promise<ImageNode[]> {
    return images.map(img => {
      return new ImageNode(img.thumb, img.href, img.title, undefined, img.large, { w: img.width, h: img.height });
    });
  }
  // headers(_node: ImageNode): Record<string, string> {
  //   return {
  //     "Accept": "*/*",
  //     "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8",
  //     "Sec-Fetch-Dest": "empty",
  //     "Sec-Fetch-Mode": "cors",
  //     "Sec-Fetch-Site": "cross-site",
  //     "Priority": "u=4",
  //     "Pragma": "no-cache",
  //     "Cache-Control": "no-cache",
  //     "referrer": "https://hdoujin.org/",
  //     "Referrer": "https://hdoujin.org/",
  //     "Referer": "https://hdoujin.org/",
  //   };
  // }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

}

ADAPTER.addSetup({
  name: "hdoujin",
  workURLs: [
    /hdoujin.org\/g\/\d+\/\w+$/,
  ],
  match: ["hdoujin.org"],
  constructor: () => new HDoujinMatcher(),
});

