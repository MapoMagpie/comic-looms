import { Oriented } from "./config";
import { CherryPick } from "./download/downloader";
import { IMGFetcherQueue } from "./fetcher-queue";
import { IMGFetcher } from "./img-fetcher";
import { Chapter } from "./page-fetcher";
import { evLog } from "./utils/ev-log";

export class EventManager {
  private events: Map<EventID, Events[EventID][]>;
  constructor() {
    this.events = new Map();
  }
  emit<ID extends EventID>(id: ID, ...args: Parameters<Events[ID]>) {
    // evLog("event bus emitted: ", id, ", args: ", ...args);
    if (!["imf-download-state-change", "imf-check-picked"].includes(id)) {
      evLog("debug", "event bus emitted: ", id);
    }
    const cbs = this.events.get(id);
    let ret: ReturnType<Events[ID]> | undefined;
    if (cbs) {
      cbs.forEach((cb) => ret = (cb as any)(...args));
    }
    return ret;
  }
  subscribe<ID extends EventID>(id: ID, cb: Events[ID]) {
    // evLog("info", "event bus subscribed: ", id);
    const cbs = this.events.get(id);
    if (cbs) {
      cbs.push(cb);
    } else {
      this.events.set(id, [cb]);
    }
  }
  reset() {
    this.events = new Map();
  }
}

export interface Events {
  "downloader-canvas-on-click": (index: number) => void;
  "bifm-on-show": () => void;
  "bifm-on-hidden": () => void;
  "bifm-rotate-image": () => void;
  "pf-on-appended": (total: number, nodes: IMGFetcher[], chapterIndex: number, done?: boolean) => void;
  "pf-update-chapters": (chapters: Chapter[], slient?: boolean) => void;
  "pf-change-chapter": (index: number, chapter: Chapter) => void;
  "pf-append-chapters": (url: string) => Promise<Chapter[]>;
  "pf-try-extend": () => void;
  "pf-retry-extend": () => void;
  "pf-step-chapters": (oriented: Oriented) => void;
  "imf-on-finished": (index: number, success: boolean, imf: IMGFetcher) => void;
  "imf-on-click": (imf: IMGFetcher) => void;
  "imf-download-state-change": (imf: IMGFetcher) => void;
  "ifq-do": (index: number, imf: IMGFetcher, oriented: Oriented) => void;
  "ifq-on-do": (index: number, queue: IMGFetcherQueue, downloading: boolean) => void;
  "ifq-on-finished-report": (index: number, queue: IMGFetcherQueue) => void;
  "downloader-canvas-resize": () => void;
  "notify-message": (level: "error" | "info", message: string, duration?: number) => void;
  "cherry-pick-changed": (chapaterIndex: number, cherryPick: CherryPick) => void;
  "add-cherry-pick-range": (chapterIndex: number, index: number, positive: boolean, shiftKey: boolean) => void;
  "imf-check-picked": (chapterIndex: number, index: number) => boolean;
  "pf-init": (cb: () => void) => void;
  "toggle-main-view": (open?: boolean) => void;
  "toggle-auto-play": () => void;
  "start-download": (cb: () => void) => void;
  "fvg-layout-resize": () => void;
  "fvg-layout-change": () => void;
  "imf-resize": (imf: IMGFetcher) => void;
  "filter-update-all-tags": () => void;
}

export type EventID = keyof Events;

const EBUS = new EventManager();
export default EBUS;

