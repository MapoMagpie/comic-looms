import { GM_xmlhttpRequest } from "$";
import { conf } from "./config";
import { GalleryMeta } from "./download/gallery-meta";
import EBUS from "./event-bus";
import { IMGFetcherQueue } from "./fetcher-queue";
import { Filter } from "./filter";
import { IMGFetcher } from "./img-fetcher";
import ImageNode, { NodeAction } from "./img-node";
import { Matcher, Result } from "./platform/platform";
import { Debouncer } from "./utils/debouncer";
import { evLog } from "./utils/ev-log";

export class Chapter {
  id: number;
  title: string | string[];
  source: string; // url
  queue: IMGFetcher[];
  filteredQueue: IMGFetcher[];
  thumbimg?: string;
  sourceIter?: AsyncGenerator<Result<any>>;
  done?: boolean;
  onclick?: (index: number) => void;
  meta?: GalleryMeta;
  constructor(id: number, title: string | string[], source: string, thumbimg?: string) {
    this.id = id;
    this.title = title;
    this.source = source;
    this.queue = [];
    this.thumbimg = thumbimg;
    this.filteredQueue = [];
  }
}

export class PageFetcher {
  chapters: Chapter[] = [];
  chapterIndex: number = 0;
  queue: IMGFetcherQueue;
  matcher: Matcher<any>;
  filter: Filter;
  beforeInit?: () => void;
  afterInit?: () => void;
  nodeActionDesc: { icon: string; description: string, fun: Function }[] = [];
  private appendPageLock: boolean = false;
  private abortb: boolean = false;

  constructor(queue: IMGFetcherQueue, matcher: Matcher<any>, filter: Filter) {
    this.queue = queue;
    this.matcher = matcher;
    this.filter = filter;
    this.filter.onChange = () => this.changeToChapter(this.chapterIndex);
    const debouncer = new Debouncer();
    // triggered then ifq finished
    EBUS.subscribe("ifq-on-finished-report", (index) => debouncer.addEvent("APPEND-NEXT-PAGES", () => this.appendPages(index), 5));
    EBUS.subscribe("imf-on-finished", (index, success, imf) => {
      if (index === 0 && success) {
        this.chapters[imf.chapterIndex].thumbimg = imf.node.blobSrc;
      }
    });
    // triggered when scrolling
    EBUS.subscribe("pf-try-extend", () => debouncer.addEvent("APPEND-NEXT-PAGES", () => !this.queue.downloading?.() && this.appendNextPage(), 5));
    EBUS.subscribe("pf-retry-extend", () => !this.queue.downloading?.() && this.appendNextPage(true));
    EBUS.subscribe("pf-init", (cb) => this.init().then(cb));
    EBUS.subscribe("pf-append-chapters", (url) => this.appendNewChapters(url).then(() => this.chapters));
    EBUS.subscribe("pf-step-chapters", (oriented) => {
      if (oriented === "prev") {
        const newChapterIndex = this.chapterIndex - 1;
        if (newChapterIndex < 0) return;
        this.changeToChapter(newChapterIndex);
        EBUS.emit("notify-message", "info", "switch to chapter: " + this.chapters[newChapterIndex].title, 2000);
      } else if (oriented === "next") {
        const newChapterIndex = this.chapterIndex + 1;
        if (newChapterIndex >= this.chapters.length) return;
        this.changeToChapter(newChapterIndex);
        EBUS.emit("notify-message", "info", "switch to chapter: " + this.chapters[newChapterIndex].title, 2000);
      }
    });

    EBUS.subscribe("filter-update-all-tags", async () => {
      const chapter = this.chapters[this.chapterIndex];
      const set = new Set<string>();
      chapter.filteredQueue.forEach(imf => imf.node.tags.forEach(t => set.add(t)));
      this.filter.allTags = set;
    });
  }

  appendToView(total: number, nodes: IMGFetcher[], chapterIndex: number, done?: boolean) {
    EBUS.emit("pf-on-appended", total, nodes, chapterIndex, done);
  }

  abort() {
    this.abortb = true;
  }

  async appendNewChapters(url: string) {
    try {
      const chapters = await this.matcher.appendNewChapters(url, this.chapters);
      if (chapters && chapters.length > 0) {
        chapters.forEach(c => {
          c.sourceIter = this.matcher.fetchPagesSource(c);
          c.onclick = (index) => this.changeToChapter(index);
        });
        this.chapters.push(...chapters);
        EBUS.emit("pf-update-chapters", this.chapters, true);
      }
    } catch (error) {
      EBUS.emit("notify-message", "error", `${error}`);
    }
  }

  async init() {
    this.beforeInit?.();
    try {
      if (conf.imgNodeActions.length > 0) {
        const AsyncFunction = async function() { }.constructor;
        this.nodeActionDesc = conf.imgNodeActions.map(ina => {
          return {
            icon: ina.icon,
            description: ina.description,
            fun: AsyncFunction("imf", "imn", "gm_xhr", "EBUS", ina.funcBody),
          }
        });
      }
    } catch (err) {
      console.error(err);
      EBUS.emit("notify-message", "error", "cannot create your node actions, " + err);
    }
    this.chapters = await this.matcher.fetchChapters().catch(reason => EBUS.emit("notify-message", "error", reason) || []);
    this.afterInit?.();
    this.chapters.forEach(c => {
      c.sourceIter = this.matcher.fetchPagesSource(c);
      c.onclick = (index) => this.changeToChapter(index);
    });
    EBUS.emit("pf-update-chapters", this.chapters);
    if (this.chapters.length === 1) {
      this.changeToChapter(0);
    }
  }

  changeToChapter(index: number) {
    this.chapterIndex = index;
    EBUS.emit("pf-change-chapter", index, this.chapters[index]);
    const chapter = this.chapters[index];
    chapter.filteredQueue = [...this.filter.filterNodes(chapter.queue, true)];
    chapter.filteredQueue.forEach((node, i) => node.index = i);
    if (chapter.filteredQueue.length > 0) {
      this.appendToView(chapter.filteredQueue.length, chapter.filteredQueue, index, this.chapters[index].done);
    }
    if (!this.queue.downloading?.()) {
      this.beforeInit?.();
      this.restoreChapter(index).then(this.afterInit).catch(this.onFailed);
    }
  }

  /**
   * Switch to the specified chapter, and restore the previously loaded elements or load new ones
  */
  async restoreChapter(index: number) {
    this.chapterIndex = index;
    const chapter = this.chapters[this.chapterIndex];
    this.queue.restore(index, chapter.filteredQueue);
    if (!chapter.sourceIter) {
      evLog("error", "chapter sourceIter is not set!");
      return;
    }
    if (chapter.queue.length === 0) {
      const first = await chapter.sourceIter.next();
      if (!first.done) {
        if (first.value.error) throw first.value.error;
        await this.appendImages(first.value.value);
      }
      this.appendPages(this.queue.length);
    }
  }

  // append next page until the queue length is 60 more than finished
  private async appendPages(appendedCount: number) {
    while (true) {
      if (appendedCount + 60 < this.queue.length) break;
      if (!await this.appendNextPage()) break;
    }
  }

  async appendNextPage(force?: boolean): Promise<boolean> {
    if (this.appendPageLock) return false;
    try {
      this.appendPageLock = true;
      const chapter = this.chapters[this.chapterIndex];
      if (force) chapter.done = false; // FIXME: reset the iter
      if (chapter.done || this.abortb) return false;
      const next = await chapter.sourceIter!.next();
      if (next.done) {
        chapter.done = true;
        this.appendToView(this.queue.length, [], this.chapterIndex, true);
        return false;
      } else {
        if (next.value.error) {
          chapter.done = true;
          throw next.value.error;
        }
        return await this.appendImages(next.value.value);
      }
    } catch (error) {
      evLog("error", "PageFetcher:appendNextPage error: ", error);
      this.onFailed?.(error);
      return false;
    } finally {
      this.appendPageLock = false;
    }
  }

  async appendImages(pageSource: any): Promise<boolean> {
    try {
      const nodes = await this.obtainImageNodeList(pageSource);
      if (this.abortb) return false;
      if (nodes.length === 0) return false;
      const chapter = this.chapters[this.chapterIndex];
      const len = chapter.filteredQueue.length;
      const IFs = nodes.map(
        (imgNode, index) => {
          const imf = new IMGFetcher(index + len, imgNode, this.matcher, this.chapterIndex, this.chapters[this.chapterIndex].id);
          // add node actions
          this.nodeActionDesc.forEach(nad => {
            const f = async (node: ImageNode) => {
              const result = await nad.fun(imf, node, GM_xmlhttpRequest, EBUS) as { data?: Blob };
              if (result?.data) {
                imf.contentType = result.data.type;
                imf.data = new Uint8Array(await result.data.arrayBuffer());
                imf.node.blobSrc = URL.createObjectURL(new Blob([imf.data], { type: imf.contentType }));
                imf.render(true);
                EBUS.emit("imf-on-finished", imf.index, true, imf);
              }
            };
            imgNode.actions.push(new NodeAction(nad.icon, nad.description, f));
          });
          return imf;
        }
      );
      chapter.queue.push(...IFs);
      const filteredIFs = this.filter.filterNodes(IFs, false);
      filteredIFs.forEach((node, i) => node.index = len + i);
      chapter.filteredQueue.push(...filteredIFs);
      this.queue.push(...filteredIFs);
      this.appendToView(this.queue.length, filteredIFs, this.chapterIndex);
      return true;
    } catch (error) {
      evLog("error", `page fetcher append images error: `, error);
      this.onFailed?.(error)
      return false;
    }
  }

  //从文档的字符串中创建缩略图元素列表
  async obtainImageNodeList(pageSource: any): Promise<ImageNode[]> {
    let tryTimes = 0;
    let err: any;
    while (tryTimes < 3) {
      try {
        return await this.matcher.parseImgNodes(pageSource, this.chapters[this.chapterIndex].id);
      } catch (error) {
        evLog("error", "warn: parse image nodes failed, retrying: ", error)
        tryTimes++;
        err = error;
      }
    }
    evLog("error", "warn: parse image nodes failed: reached max try times!");
    throw err;
  }

  //通过地址请求该页的文档
  async fetchDocument(pageURL: string): Promise<string> {
    return await window.fetch(pageURL).then((response) => response.text());
  }

  onFailed(reason: any) {
    EBUS.emit("notify-message", "error", reason.toString());
  }

}

