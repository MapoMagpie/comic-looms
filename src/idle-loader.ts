import { CherryPick } from "./download/downloader";
import EBUS from "./event-bus";
import { IMGFetcherQueue } from "./fetcher-queue";
import { FetchState } from "./img-fetcher";
import { ADAPTER } from "./platform/adapt";
import { Debouncer } from "./utils/debouncer";
import { evLog } from "./utils/ev-log";

export class IdleLoader {
  queue: IMGFetcherQueue;
  processingIndexList: number[];
  restartId?: number;
  maxWaitMS: number;
  minWaitMS: number;
  onFailedCallback?: () => void;
  autoLoad: boolean = false;
  debouncer: Debouncer;
  cherryPick?: () => CherryPick;
  constructor(queue: IMGFetcherQueue) {
    //图片获取器队列
    this.queue = queue;
    //当前处理的索引列表
    this.processingIndexList = [0];
    this.maxWaitMS = 1000;
    this.minWaitMS = 300;
    this.autoLoad = ADAPTER.conf.autoLoad;
    this.debouncer = new Debouncer();
    EBUS.subscribe("ifq-on-do", (currIndex, _, downloading) => !downloading && this.abort(currIndex));
    EBUS.subscribe("imf-on-finished", (index) => {
      // this.processingIndexList not include index mean curr task dont go continue, it aborted
      if (!this.processingIndexList.includes(index)) return;
      this.wait().then(() => {
        this.checkProcessingIndex();
        this.start();
      });
    });
    // if not downloading, abort idle loader, if chapter index < 0, mean back to the chapters selection, then abort without restart
    EBUS.subscribe("pf-change-chapter", (index) => !this.queue.downloading?.() && this.abort(index > 0 ? 0 : undefined));
    window.addEventListener("focus", () => {
      if (ADAPTER.conf.autoLoadInBackground) return;
      this.debouncer.addEvent("Idle-Load-on-focus", () => {
        console.log("[ IdleLoader ] window focus, document.hidden:", document.hidden);
        if (document.hidden) return;
        this.abort(0, 10);
      }, 100);
    });
    EBUS.subscribe("pf-on-appended", (_total, _nodes, _chapterIndex, done) => {
      if (done || this.processingIndexList.length > 0) return;
      this.abort(this.queue.currIndex, 100);
    });
  }

  onFailed(cb: () => void) {
    this.onFailedCallback = cb;
  }

  start() {
    if (!this.autoLoad) return;
    // FIXME: document.hidden abort idle loader, if downloading, after refocus, it will not resume
    if (document.hidden && !ADAPTER.conf.autoLoadInBackground) return;
    // processingIndexList.length === 0 means idle loader aborted
    if (this.processingIndexList.length === 0) return;
    if (this.queue.length === 0) return;
    evLog("info", "Idle Loader start at: " + this.processingIndexList.toString());
    for (const processingIndex of this.processingIndexList) {
      // start sereval img fetchers, when img fetcher is done, it will triggered event:imf-on-finished
      this.queue[processingIndex].start();
    }
  }

  checkProcessingIndex() {
    if (this.queue.length === 0) {
      return;
    }
    // Skip found Fetcher
    const picked = this.cherryPick?.() || new CherryPick();
    const foundFetcherIndex = new Set<number>();
    let hasFailed = false;
    for (let i = 0; i < this.processingIndexList.length; i++) {
      const processingIndex = this.processingIndexList[i];
      const imf = this.queue[processingIndex];
      if (imf.stage === FetchState.FAILED) {
        hasFailed = true;
      }
      // img fetcher still fetching, or not yet fetching, continue.
      if (imf.lock || imf.stage === FetchState.URL) {
        continue;
      }
      // find unfinished imgFetcher
      for (
        let j = Math.min(processingIndex + 1, this.queue.length - 1), limit = this.queue.length;
        (j < limit);
        j++
      ) {
        if (picked.picked(j)) {
          const imf = this.queue[j];
          // find img fetcher that hasn't been fetching
          if (!imf.lock && imf.stage === FetchState.URL && !foundFetcherIndex.has(j)) {
            foundFetcherIndex.add(j);
            this.processingIndexList[i] = j;
            break;
          }
          if (imf.stage === FetchState.FAILED) {
            hasFailed = true;
          }
        }
        // begin from the frist, stop at the processingIndex
        if (j >= this.queue.length - 1) {
          limit = processingIndex;
          j = 0;
        }
      }
      // can not find any img fetcher that hasn't been fetching
      if (foundFetcherIndex.size === 0) {
        this.processingIndexList.length = 0;
        if (hasFailed && this.onFailedCallback) {
          this.onFailedCallback();
          this.onFailedCallback = undefined;
        }
        return;
      }
    }
  }

  async wait(): Promise<boolean> {
    const { maxWaitMS, minWaitMS } = this;
    return new Promise(function (resolve) {
      const time = Math.floor(Math.random() * maxWaitMS + minWaitMS);
      window.setTimeout(() => resolve(true), time);
    });
  }

  abort(newIndex?: number, delayRestart?: number) {
    // set empty to abort the old task
    this.processingIndexList = [];
    // 中止空闲加载后，会在等待一段时间后再次重启空闲加载
    this.debouncer.addEvent("IDLE-LOAD-ABORT", () => {
      if (!this.autoLoad) return;
      if (newIndex === undefined) return;
      // check if we are downloading
      // In case we change to a Big image, and click Download button before conf.restartIdleLoader seconds
      if (this.queue.downloading?.()) return;
      const idleThreads = ADAPTER.conf.maxIdleThreads;
      this.processingIndexList = [];
      for (let i = 0; i < idleThreads; i++) {
        if (newIndex + i >= this.queue.length) break;
        this.processingIndexList.push(newIndex + i);
      }
      this.checkProcessingIndex();
      this.start();
    }, delayRestart || ADAPTER.conf.restartIdleLoader);
  }
}

