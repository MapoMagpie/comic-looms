import { saveConf } from "./config";
import { Downloader } from "./download/downloader";
import EBUS from "./event-bus";
import { IMGFetcherQueue } from "./fetcher-queue";
import { IdleLoader } from "./idle-loader";
import { PageFetcher } from "./page-fetcher";
import { ADAPTER } from "./platform/adapt";
import { initEvents } from "./ui/event";
import { FullViewGridManager } from "./ui/full-view-grid-manager";
import { createHTML, addEventListeners, showMessage } from "./ui/html";
import { PageHelper } from "./ui/page-helper";
import { BigImageFrameManager } from "./ui/big-image-frame-manager";
import { Debouncer } from "./utils/debouncer";
import revertMonkeyPatch from "./utils/revert-monkey-patch";
import { sleep } from "./utils/sleep";
import { evLog } from "./utils/ev-log";
import { Filter } from "./filter";

type DestoryFunc = () => Promise<void>;

function setup(): DestoryFunc {
  const MATCHER = ADAPTER.matcher!.constructor();
  const FL: Filter = new Filter();
  const HTML = createHTML(FL);
  [HTML.fullViewGrid, HTML.bigImageFrame].forEach(e => revertMonkeyPatch(e));

  const IFQ: IMGFetcherQueue = IMGFetcherQueue.newQueue();
  const IL: IdleLoader = new IdleLoader(IFQ);
  const PF: PageFetcher = new PageFetcher(IFQ, MATCHER, FL);
  const DL: Downloader = new Downloader(HTML, IFQ, IL, PF, MATCHER);

  // UI Manager
  const PH: PageHelper = new PageHelper(HTML, () => PF.chapters, () => DL.downloading);
  const BIFM: BigImageFrameManager = new BigImageFrameManager(HTML, (index) => PF.chapters[index]);
  new FullViewGridManager(HTML, BIFM);

  const events = initEvents(HTML, BIFM, IFQ, IL, PH);
  addEventListeners(events, HTML, BIFM, DL, PH);

  EBUS.subscribe("downloader-canvas-on-click", (index) => {
    IFQ.currIndex = index;
    if (IFQ.chapterIndex !== BIFM.chapterIndex) return;
    BIFM.show(IFQ[index]);
  });
  EBUS.subscribe("notify-message", (level, msg, duration) => showMessage(HTML.messageBox, level, msg, duration));

  PF.beforeInit = () => HTML.pageLoading.style.display = "flex";
  PF.afterInit = () => {
    HTML.pageLoading.style.display = "none";
    IL.processingIndexList = [0];
    IL.start();
    if (ADAPTER.conf.autoEnterBig || BIFM.visible) {
      const imf = IFQ[BIFM.getPageNumber()];
      if (imf) BIFM.show(imf);
    }
  };

  if (ADAPTER.conf.first) {
    events.showGuideEvent();
    ADAPTER.conf.first = false;
    saveConf({ first: false });
  }
  // 入口Entry
  EBUS.subscribe("start-download", (cb) => {
    signal.first = false;
    if (PF.chapters.length === 0) {
      EBUS.emit("pf-init", () => {
        DL.start();
        cb();
      });
    } else {
      DL.start();
      sleep(20).then(cb);
    }
  });
  const signal = { first: true };
  function entry(expand?: boolean) {
    if (HTML.pageHelper) {
      if (expand) {
        events.showFullViewGrid();
        if (signal.first) {
          signal.first = false;
          EBUS.emit("pf-init", () => { });
        }
      } else {
        ["config", "downloader"].forEach(id => events.togglePanelEvent(id, true));
        events.hiddenFullViewGrid();
      }
    }
  }
  EBUS.subscribe("toggle-main-view", entry);
  if (ADAPTER.conf.autoOpen) {
    HTML.entryBTN.setAttribute("data-stage", "open");
    entry(true);
  }

  return () => {
    console.log("destory eh-view-enhance");
    entry(false);
    PF.abort();
    IL.abort();
    IFQ.length = 0;
    EBUS.reset();
    document.querySelector("#ehvp-base")?.remove();
    return sleep(500);
  }
}

let destoryFunc: DestoryFunc | undefined;
const debouncer = new Debouncer();
function start() {
  debouncer.addEvent("LOCATION-CHANGE", () => {
    const newStart = () => {
      if (window.self !== window.top) {
        evLog("error", "in iframe");
        return;
      }
      if (document.querySelector(".ehvp-base")) return;
      ADAPTER.ready.then(() => {
        destoryFunc = setup()
      });
    };
    if (destoryFunc) {
      destoryFunc().then(newStart);
    } else {
      newStart();
    }
  }, 20);
}

// https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript
// the firefox in twitter.com has a bug that it doesn't work with history.pushState when open the new tab
setTimeout(() => {
  const oldPushState = history.pushState;
  history.pushState = function pushState(...args: any) {
    start();
    return oldPushState.apply(this, args);
  };
  const oldReplaceState = history.replaceState;
  history.replaceState = function replaceState(...args: any) {
    return oldReplaceState.apply(this, args);
  }
  window.addEventListener("popstate", start);
  start();
}, 300);
