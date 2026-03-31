import { GalleryMeta } from "../../download/gallery-meta";
import { evLog } from "../../utils/ev-log";
import { BaseMatcher, OriginMeta, Result, SubData } from "../platform";
import { FFmpegConvertor } from "../../utils/ffmpeg";
import ImageNode, { NodeAction } from "../../img-node";
import * as zip_js from "@zip.js/zip.js";
import { batchFetch } from "../../utils/query";
import { Chapter } from "../../page-fetcher";
import EBUS from "../../event-bus";
import { ADAPTER } from "../adapt";
import { i18n } from "../../utils/i18n";
import { HTMLUgoiraElement } from "../../utils/ugoira";
import { replaceHost } from "../../utils/url";

type ArtistPIDs = {
  id?: string,
  pids: string[],
}

type Page = {
  urls: {
    thumb_mini: string,
    small: string,
    regular: string,
    original: string,
  },
  width: number,
  height: number
}

type Work = {
  id: string,
  title: string,
  alt: string,
  // 0: illustration, 1: manga, 2: ugoira
  illustType: 0 | 1 | 2,
  description: "",
  tags: string[],
  pageCount: number,
}

type UgoiraMeta = {
  error: boolean,
  message: string,
  body: {
    // mime_type: "image\/jpeg",
    src: string,
    originalSrc: string,
    mime_type: string,
    frames: { file: string, delay: number }[]
  }
}

interface PixivAPI {
  fetchChapters(): AsyncGenerator<Chapter[]>;
  next(source: Chapter): AsyncGenerator<Result<ArtistPIDs[]>>;
  title(): string;
}
type PixivTop = {
  page: {
    follow: number[]
    recommend: { ids: string[] },
    recommendByTag: { tag: string, ids: string[] }[],
  },
  thumbnails: {
    illust: { id: string, url: string, userId: string }[],
  },
};

class PixivHomeAPI implements PixivAPI {
  homeData?: PixivTop;
  thumbnails: Record<string, PixivTop["thumbnails"]["illust"][0]> = {};
  pids: Record<string, string[]> = {};
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    const { error, body } = (await window.fetch("https://www.pixiv.net/ajax/top/illust?mode=all&lang=en")
      .then(res => res.json())) as { error: boolean, message: string, body: PixivTop };
    if (error) throw new Error("fetch your home data error, check you have already logged in");
    this.homeData = body;
    this.thumbnails = body.thumbnails.illust.reduce<PixivHomeAPI["thumbnails"]>((prev, curr) => {
      prev[curr.id] = curr;
      return prev;
    }, {});
    const chapters: Chapter[] = [];
    const byTag = body.page.recommendByTag.reduce<Record<string, string[]>>((prev, curr) => {
      prev[curr.tag] = curr.ids;
      return prev;
    }, {})
    this.pids = { "follow": body.page.follow.map(id => id.toString()), "for you": body.page.recommend.ids, ...byTag };
    let id = 0;
    for (const [t, pids] of Object.entries(this.pids)) {
      chapters.push(new Chapter(
        id,
        t === "follow" ? "Your Following" : "Recommend " + t,
        t,
        this.thumbnails[pids[0] ?? ""]?.url,
      ));
      id++;
    };
    return chapters;
  }
  async *next(chapter: Chapter): AsyncGenerator<Result<ArtistPIDs[]>> {
    const pidList = this.pids[chapter.source];
    if (pidList.length === 0) {
      yield Result.ok([]);
      return;
    };
    while (pidList.length > 0) {
      const pids = pidList.splice(0, 20);
      const grouped = pids.reduce<Record<string, string[]>>((prev, curr) => {
        const userId = this.thumbnails[curr]?.userId ?? "unk";
        if (!prev[userId]) prev[userId] = [];
        prev[userId].push(curr);
        return prev;
      }, {});
      const ret = Object.entries(grouped).map(([userID, pids]) => ({ id: userID === "unk" ? undefined : userID, pids }));
      yield Result.ok(ret);
    }
  }
  title(): string {
    return "home"
  }

}

class PixivArtistWorksAPI implements PixivAPI {
  artist?: string;
  chapterPids: Map<number, string[]> = new Map();
  title(): string {
    return this.artist ?? "artist-unknown";
  }
  constructor() {
    if (ADAPTER.conf.pixivRecordReading) {
      EBUS.subscribe("ifq-do", (_index, imf) => window.localStorage.setItem(`cl-${this.artist}-last-read`, imf.node.href));
    }
  }
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    this.artist = await this.findArtistID();
    if (!this.artist) throw new Error("Cannot find artist id!");

    const currArtWork = window.location.href.match(/artworks\/(\d+)$/)?.[1];
    if (currArtWork) {
      const chapter = new Chapter(1, i18n.currentArtWorks.get(), "");
      this.chapterPids.set(chapter.id, [currArtWork]);
      yield [chapter];
    }

    // request all illusts from https://www.pixiv.net/ajax/user/{artist}/profile/all
    const res = await window.fetch(`https://www.pixiv.net/ajax/user/${this.artist}/profile/all`).then(resp => resp.json()).catch(Error);
    if (res instanceof Error) throw res;
    if (res.error) throw new Error(`Fetch illust list error: ${res.message}`);
    let pidList = [...Object.keys(res.body.illusts), ...Object.keys(res.body.manga)];
    pidList = pidList.sort((a, b) => parseInt(b) - parseInt(a));
    const latest = window.localStorage.getItem(`cl-${this.artist}-latest`);
    // save latest art work pid
    window.localStorage.setItem(`cl-${this.artist}-latest`, pidList[0]);
    const chapters = [];

    const latestIndex = latest ? pidList.indexOf(latest) : -1;
    if (latestIndex > 0) {
      const chapter = new Chapter(chapters.length + 2, i18n.latestArtWorks, "");
      const sliced = [...pidList.slice(0, latestIndex)];
      this.chapterPids.set(chapter.id, sliced);
      chapters.push(chapter);
    }

    if (ADAPTER.conf.pixivRecordReading) {
      const lastRead = window.localStorage.getItem(`cl-${this.artist}-last-read`)?.match(/artworks\/(\d+)$/)?.[1];
      const lastReadIndex = lastRead ? pidList.indexOf(lastRead) : -1;
      if (lastReadIndex > 0 && lastReadIndex < pidList.length - 1) {
        const chapterAfterRead = new Chapter(chapters.length + 2, ADAPTER.conf.pixivAscendWorks ? i18n.beforeLastReading.get() : i18n.afterLastReading.get(), "");
        const slicedAfter = [...pidList.slice(lastReadIndex)];
        this.chapterPids.set(chapterAfterRead.id, slicedAfter);
        chapters.push(chapterAfterRead);

        const chapterBeforeRead = new Chapter(chapters.length + 2, ADAPTER.conf.pixivAscendWorks ? i18n.afterLastReading.get() : i18n.beforeLastReading.get(), "");
        const slicedBefore = [...pidList.slice(0, lastReadIndex + 1)];
        this.chapterPids.set(chapterBeforeRead.id, slicedBefore);
        chapters.push(chapterBeforeRead);
      }
    }

    const chapter = new Chapter(chapters.length + 2, i18n.allArtWorks.get(), "");
    this.chapterPids.set(chapter.id, pidList);
    chapters.push(chapter);
    return chapters;
  }

  async *next(chapter: Chapter): AsyncGenerator<Result<ArtistPIDs[]>> {
    let pidList = this.chapterPids.get(chapter.id);
    if (!pidList) throw new Error("cannot get pid list of " + chapter.title);
    if (ADAPTER.conf.pixivAscendWorks) {
      pidList = pidList.reverse();
    }
    while (pidList.length > 0) {
      const pids = pidList.splice(0, 20);
      yield Result.ok([{ id: this.artist, pids }]);
    }
  }

  async findArtistID(): Promise<string | undefined> {
    // find artist eg. https://www.pixiv.net/en/users/xxx
    let href: string | undefined = window.location.href;
    const artistID = /users\/(\d+)/.exec(href)?.[1];
    if (artistID) return artistID;
    const pid = /artworks\/(\d+)/.exec(href)?.[1];
    if (!pid) return;
    href = document.querySelector<HTMLAnchorElement>("a[data-gtm-value][href*='/users/']")?.href ||
      document.querySelector<HTMLAnchorElement>("a.user-details-icon[href*='/users/']")?.href;
    if (href) {
      const artistID = /users\/(\d+)/.exec(href)?.[1];
      if (artistID) return artistID;
    }
    return await window.fetch(`${window.location.origin}/ajax/illust/${pid}?lang=en`).then(res => res.json()).then(data => data.body?.userId as string | undefined);
  }
}

const PID_EXTRACT = /\/(\d+)_([a-z]+)\d*\.\w*$/;
type PageData = { error: boolean, message: string, body: Page[] };
class PixivMatcher extends BaseMatcher<ArtistPIDs[]> {
  api: PixivAPI;
  meta: GalleryMeta;
  pageCount: number = 0;
  works: Record<string, Work> = {};
  ugoiraMetas: Record<string, UgoiraMeta> = {};
  convertor?: FFmpegConvertor;
  csrfToken?: string;
  pidDatas: Map<string, PageData | Error> = new Map();

  constructor() {
    super();
    this.meta = new GalleryMeta(window.location.href, "UNTITLE");
    if (/pixiv.net(\/en\/?|\/illustration)?$/.test(window.location.href)) {
      this.api = new PixivHomeAPI();
    } else {
      this.api = new PixivArtistWorksAPI();
    }
  }

  async processData(data: Uint8Array<ArrayBuffer>, contentType: string, node: ImageNode): Promise<[Uint8Array<ArrayBuffer> | SubData, string]> {
    const meta = this.ugoiraMetas[node.originSrc!];
    if (!meta) return [data, contentType];
    const zipReader = new zip_js.ZipReader(new zip_js.Uint8ArrayReader(data));
    if (!this.convertor) this.convertor = await new FFmpegConvertor().init();
    const promises = await zipReader.getEntries()
      .then(
        entries => {
          const ret = [];
          for (const entry of entries) {
            if (entry.directory) continue;
            ret.push(entry.getData(new zip_js.Uint8ArrayWriter())
              .then(data => ({ name: entry.filename, data })));
          }
          return ret;
        }
      );
    const files = await Promise.all(promises).then((entries => entries.filter(f => f && f.data.length > 0).map(f => f!)));
    if (files.length !== meta.body.frames.length) {
      throw new Error("unpack ugoira file error: file count not equal to meta");
    }

    if (ADAPTER.conf.pixivUgoiraMode === "ugoira") {
      const mimeType = meta.body.mime_type;
      const list = files.map(f => ({ name: f.name, data: f.data, contentType: mimeType }));
      const metaStr = meta.body.frames.map(m => `file '${m.file}'\nduration ${m.delay / 1000}`).join('\n');
      const metaStrRaw = new TextEncoder().encode(metaStr);
      list.unshift({ name: "frames.txt", contentType: "text/plain", data: metaStrRaw });
      return [new SubData(node.title, list, meta.body.frames), "ugoira/ugoira"];
    } else {
      const format = ADAPTER.conf.pixivUgoiraMode === "gif" ? "GIF" : "MP4";
      const blob = await this.convertor.convertTo(files, format, meta.body.frames);
      return blob.arrayBuffer().then(buf => [new Uint8Array(buf), blob.type]);
    }
  }

  galleryMeta(): GalleryMeta {
    this.meta.title = `pixiv_${this.api.title()}_w${Object.keys(this.works).length}_p${this.pageCount}` || "UNTITLE";
    this.meta.tags = Object.entries(this.works).reduce<Record<string, string[]>>((tags, work) => {
      tags[work[0]] = work[1].tags;
      return tags;
    }, {});
    return this.meta;
  }


  private async fetchTagsByPids(artistID: string, pids: string[]): Promise<void> {
    try {
      const raw = await window.fetch(`https://www.pixiv.net/ajax/user/${artistID}/profile/illusts?ids[]=${pids.join("&ids[]=")}&work_category=illustManga&is_first_page=0&lang=en`).then(resp => resp.json());
      const data = raw as { error: boolean, message: string, body: { works: Record<string, Work> } }
      if (!data.error) {
        // just pick up the fields we need
        const works: Record<string, Work> = {};
        Object.entries(data.body.works).forEach(([k, w]) => {
          works[k] = {
            id: w.id,
            title: w.title,
            alt: w.alt,
            illustType: w.illustType,
            description: w.description,
            tags: w.tags,
            pageCount: w.pageCount
          };
        })
        this.works = { ...this.works, ...works };
      } else {
        evLog("error", "WARN: fetch tags by pids error: ", data.message);
      }
      // console.log("fetch tags by pids: ", data);
    } catch (error) {
      evLog("error", "ERROR: fetch tags by pids error: ", error);
    }
  }


  fetchChapters(): AsyncGenerator<Chapter[]> {
    this.csrfToken = document.querySelector("#__NEXT_DATA__")?.textContent?.match(/\\"api\\":\{\\"token\\":\\"(\w+)\\"/)?.[1];
    return this.api.fetchChapters();
  }

  fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<ArtistPIDs[]>> {
    return this.api.next(chapter);
  }

  async fetchPidAndData(pids: string[]): Promise<[string, PageData | Error][]> {
    const needFetched = pids.filter(p => !this.pidDatas.has(p));
    const dataList = await batchFetch<PageData>(needFetched.map(p => `https://www.pixiv.net/ajax/illust/${p}/pages?lang=en`), 5, "json");
    for (let i = 0; i < needFetched.length; i++) {
      this.pidDatas.set(needFetched[i], dataList[i]);
    }
    return pids.map(p => ([p, this.pidDatas.get(p)!]));
  }

  async parseImgNodes(aps: ArtistPIDs[]): Promise<ImageNode[]> {
    const list: ImageNode[] = [];
    if (aps.length === 0) return list;
    // async function but no await, it will fetch tags in background
    const pids = [];
    for (const ap of aps) {
      if (ap.id) {
        this.fetchTagsByPids(ap.id, ap.pids);
      }
      pids.push(...ap.pids);
    }
    if (pids.length === 0) return list;
    if (ADAPTER.conf.pixivAscendWorks) {
      pids.sort((a, b) => parseInt(a) - parseInt(b));
    } else {
      pids.sort((a, b) => parseInt(b) - parseInt(a));
    }
    const pidDatas = await this.fetchPidAndData(pids);
    for (let i = 0; i < pidDatas.length; i++) {
      const [pid, data] = pidDatas[i];
      if (!data || data instanceof Error || data.error) {
        const reason = `pid:[${pid}], ${data?.message}`;
        evLog("error", reason);
        EBUS.emit("notify-message", "error", reason, 8000);
        continue;
      }
      const actionLike = new NodeAction("☺", "like this illust", async () => {
        if (this.csrfToken) {
          await fetch("https://www.pixiv.net/ajax/illusts/like", {
            "headers": {
              "content-type": "application/json; charset=utf-8",
              "x-csrf-token": this.csrfToken,
            },
            "body": "{\"illust_id\":\"" + pid + "\"}",
            "method": "POST",
            "mode": "cors"
          });
        } else {
          EBUS.emit("notify-message", "error", "cannot find csrf_token from this page");
        }
      });
      const actionBookmark = new NodeAction("♥", "bookmark this illust", async () => {
        if (this.csrfToken) {
          await fetch("https://www.pixiv.net/ajax/illusts/bookmarks/add", {
            "credentials": "include",
            "headers": {
              "content-type": "application/json; charset=utf-8",
              "x-csrf-token": this.csrfToken,
            },
            "body": "{\"illust_id\":\"" + pid + "\",\"restrict\":0,\"comment\":\"\",\"tags\":[]}",
            "method": "POST",
            "mode": "cors"
          });
        } else {
          EBUS.emit("notify-message", "error", "cannot find csrf_token from this page");
        }
      });
      this.pageCount += data.body.length;
      const digits = data.body.length.toString().length;
      let j = -1;
      for (const p of data.body) {
        let title = p.urls.original.split("/").pop() || `${pid}_p${j.toString().padStart(digits)}.jpg`
        const matches = p.urls.original.match(PID_EXTRACT);
        if (matches && matches.length > 2 && matches[2] && matches[2] === "ugoira") {
          title = title.replace(/\.\w+$/, ".gif");
        }
        j++;
        const node = new ImageNode(
          replaceHost(p.urls.small, ADAPTER.conf.pixivMirrorHost),
          `${window.location.origin}/artworks/${pid}`,
          title,
          undefined,
          replaceHost(p.urls.original, ADAPTER.conf.pixivMirrorHost),
          { w: p.width, h: p.height }
        );
        node.actions.push(actionLike);
        node.actions.push(actionBookmark);
        list.push(node);
      }
    }
    return list;
  }


  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    const matches = node.originSrc!.match(PID_EXTRACT);
    if (!matches || matches.length < 2) {
      return { url: node.originSrc! }; // cannot extract pid, should throw an error
    }
    const pid = matches[1];
    const p = matches[2];
    if (this.works[pid]?.illustType === 2 || p === "ugoira") {
      const meta = await window.fetch(`https://www.pixiv.net/ajax/illust/${pid}/ugoira_meta?lang=en`).then(resp => resp.json()) as UgoiraMeta;
      const original = replaceHost(meta.body.src, ADAPTER.conf.pixivMirrorHost);
      this.ugoiraMetas[original] = meta;
      return { url: original };
    } else {
      return { url: node.originSrc! };
    }
  }
}


ADAPTER.addSetup({
  name: "Pixiv",
  workURLs: [
    /pixiv.net\/(\w*\/|illustration)?(artworks\/.*|users\/.*|$)/
  ],
  match: ["https://www.pixiv.net/*"],
  constructor: () => {
    if (!customElements.get("ugoira-element")) {
      customElements.define("ugoira-element", HTMLUgoiraElement);
    }
    return new PixivMatcher();
  },
});
