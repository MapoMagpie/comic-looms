import { Debouncer } from "./utils/debouncer";
import { FetchState, IMGFetcher } from "./img-fetcher";
import { Oriented } from "./config";
import EBUS from "./event-bus";
import { CherryPick } from "./download/downloader";
import { ADAPTER } from "./platform/adapt";

/** Manages IMGFetcher with concurrency control for requests
 *  `IMGFetcherQueue` extends `Array`, where each element is an `IMGFetcher`.<br>
 *  In the UI, when the user clicks to read or flips through large images,  
 *  the core method `do(start: number)` is called to find several unfinished `IMGFetcher` instances (based on `threads` configuration)  
 *  and execute `IMGFetcher.start()` to download large images.<br>
 *  Additionally:<br>
 *  `IMGFetcherQueue` can also be controlled by `IdleLoader`.  
 *  When the user is inactive, `IdleLoader` will control `IMGFetcherQueue` to load images gradually.<br>
 *  `IMGFetcherQueue` can also be controlled by `Downloader`.  
 *  When the user clicks "Download", `Downloader` will control `IMGFetcherQueue` to load all unfinished `IMGFetcher` instances.<br>
 */
export class IMGFetcherQueue extends Array<IMGFetcher> {
  executableQueue: number[];
  currIndex: number;
  finishedIndex: Set<number> = new Set();
  private debouncer: Debouncer;
  downloading?: () => boolean;
  dataSize: number = 0;
  chapterIndex: number = 0;
  cherryPick?: (chapterIndex: number) => CherryPick;

  clear() {
    this.length = 0;
    this.executableQueue = [];
    this.currIndex = 0;
    this.finishedIndex.clear();
  }

  restore(chapterIndex: number, imfs: IMGFetcher[]) {
    this.clear();
    this.chapterIndex = chapterIndex;
    imfs.forEach((imf, i) => imf.stage === FetchState.DONE && this.finishedIndex.add(i));
    this.push(...imfs);
  }

  static newQueue() {
    const queue = new IMGFetcherQueue();
    // avoid Array.slice or similar methods triggering Array.constructor
    EBUS.subscribe("imf-on-finished", (index, success, imf) => queue.chapterIndex === imf.chapterIndex && queue.finishedReport(index, success, imf));
    EBUS.subscribe("ifq-do", (index, imf, oriented) => {
      if (imf.chapterIndex !== queue.chapterIndex) return;
      queue.do(index, oriented);
    });
    EBUS.subscribe("pf-change-chapter", () => queue.forEach(imf => imf.unrender()));
    EBUS.subscribe("add-cherry-pick-range", (chIndex, index, positive, _shiftKey) => {
      if (chIndex !== queue.chapterIndex) return;
      if (positive) return;
      // TODO: range
      if (queue[index]?.stage === FetchState.DATA) {
        queue[index].abort();
        queue[index].stage = FetchState.URL;
      }
    });
    return queue;
  }

  constructor() {
    super();
    this.executableQueue = [];
    this.currIndex = 0;
    this.debouncer = new Debouncer();
  }

  isFinished(): boolean {
    const picked = this.cherryPick?.(this.chapterIndex);
    if (picked && picked.values.length > 0) {
      for (let index = 0; index < this.length; index++) {
        if (picked.picked(index) && !this.finishedIndex.has(index)) {
          return false;
        }
      }
      return true;
    } else {
      return this.finishedIndex.size === this.length;
    }
  }

  /** Core method
   *  Finds unfinished `IMGFetcher` instances before or after `start` (including `start`),  
   *  puts them into `this.executableQueue`, and then calls `IMGFetcher.start()` for all of them.
   */
  do(start: number, oriented?: Oriented) {
    oriented = oriented || "next";
    // check bounds
    this.currIndex = this.fixIndex(start);
    EBUS.emit("ifq-on-do", this.currIndex, this, this.downloading?.() || false);
    if (this.downloading?.()) return;

    // Starting from the this.currIndex, add the specified number of `IMGFetcher` instances to the queue.  
    // If an `IMGFetcher` is already completed, extend the search further.  
    // If no items are added, it means there are no more executable `IMGFetcher` instances —  
    // possibly because all subsequent images are already loaded, or an error occurred in between.
    if (!this.pushInExecutableQueue(oriented)) return;

    // Delay 300ms to avoid too many requests.  
    // If the user scrolls quickly through large images, it could otherwise trigger excessive requests.
    this.debouncer.addEvent("IFQ-EXECUTABLE", () => {
      const executableQueue = [...this.executableQueue];
      console.log("IFQ-EXECUTABLE: ", executableQueue);
      Promise.all(executableQueue.splice(0, ADAPTER.conf.paginationIMGCount).map(imfIndex => this[imfIndex].start()))
        .then(() => {
          const picked = this.cherryPick?.(this.chapterIndex);
          executableQueue.filter(i => !picked || picked.picked(i)).forEach(imfIndex => this[imfIndex].start());
        });
    }, 300);
  }

  /**
   * Wait for the image fetcher to report success
   * If the reported index matches the `currIndex` in the execution queue, update the displayed large image.
   */
  finishedReport(index: number, success: boolean, imf: IMGFetcher) {
    // Changing chapter will clear this
    if (this.length === 0) return;
    // evLog("ifq finished report, index: ", index, ", success: ", success, ", current index: ", this.currIndex);
    if (!success || imf.stage !== FetchState.DONE) return;
    this.finishedIndex.add(index);
    if (this.dataSize < 1000000000) { // 1GB
      this.dataSize += imf.data?.byteLength || 0;
    }
    EBUS.emit("ifq-on-finished-report", index, this);
  }

  fixIndex(start: number) {
    return start < 0 ? 0 : start > this.length - 1 ? this.length - 1 : start;
  }

  /**
   * Adds unfinished `IMGFetcher` instances in the given direction (prev | next) to the execution queue.  
   * Starting from the this.currIndex, it traverses forward or backward:  
   * - Skips already completed `IMGFetcher` instances  
   * - Adds `IMGFetcher` instances that are fetching or have not yet fetched large image data
   * @param oriented Direction (forward | backward)
   * @returns Whether items were successfully added
   */
  pushInExecutableQueue(oriented: Oriented): boolean {
    // Put fetchers into the queue for delayed execution
    this.executableQueue = [];
    for (let count = 0, index = this.currIndex; this.checkOutbounds(index, oriented, count); oriented === "next" ? ++index : --index) {
      if (this[index].stage === FetchState.DONE) continue;
      this.executableQueue.push(index);
      count++;
    }
    return this.executableQueue.length > 0;
  }

  /**
   * Checks if the index has reached bounds,  
   * while the number of added items is still within the configured simultaneous fetch limit.
   */
  checkOutbounds(index: number, oriented: Oriented, count: number) {
    let ret = false;
    if (oriented === "next") ret = index < this.length;
    if (oriented === "prev") ret = index > -1;
    if (!ret) return false;
    const threads = ADAPTER.conf.threads + ADAPTER.conf.paginationIMGCount - 1;
    const distance = Math.abs(index - this.currIndex);
    if (ADAPTER.conf.maxPreloadDistance > 0 && distance > ADAPTER.conf.maxPreloadDistance) return false;
    if (threads >= distance || (ADAPTER.conf.threads > 0 && count < threads)) return true;
    return false;
  }

  findImgIndex(ele: HTMLElement): number {
    for (let index = 0; index < this.length; index++) {
      if (this[index].node.equal(ele)) {
        return index;
      }
    }
    return 0;
  }

}
