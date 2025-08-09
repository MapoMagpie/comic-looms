import { saveConf } from "../config";
import { Downloader } from "../download/downloader";
import { dragElement, dragElementWithLine } from "../utils/drag-element";
import q from "../utils/query-element";
import { Events } from "./event";
import { PageHelper } from "./page-helper";
import { styleCSS } from "./style";
import { BigImageFrameManager } from "./big-image-frame-manager";
import icons from "../utils/icons";
import queryCSSRules from "../utils/query-cssrules";
import { DownloaderPanel } from "./downloader-panel";
import { ConfigPanel } from "./config-panel";
import EBUS from "../event-bus";
import { ChaptersPanel } from "./chapters-panel";
import { FilterPanel } from "./filter-panel";
import { Filter } from "../filter";
import { linkify } from "../utils/linkify";
import { ADAPTER } from "../platform/adapt";
import { getDisplayText } from "./style-custom-panel";

export type Elements = ReturnType<typeof createHTML>;

export function createHTML(filter: Filter) {
  const base = document.createElement("div");
  const dt = getDisplayText();
  base.id = "ehvp-base";
  // base.setAttribute("tabindex", "5");
  base.setAttribute("style", "all: initial");
  document.body.after(base);
  const HTML_STRINGS = `
<div id="page-loading" class="page-loading" style="display: none;">
    <div class="page-loading-text border-ani">Loading...</div>
</div>
<div id="message-box" class="ehvp-message-box"></div>
<div id="ehvp-nodes-container" class="full-view-grid" tabindex="6"></div>
<div id="big-img-frame" class="big-img-frame big-img-frame-collapse" tabindex="7">
   <a id="img-land-left" class="img-land img-land-left"></a>
   <a id="img-land-right" class="img-land img-land-right"></a>
</div>
<div id="p-helper" class="p-helper">
    <div>
        ${ConfigPanel.html()}
        ${DownloaderPanel.html()}
        ${ChaptersPanel.html()}
        ${FilterPanel.html()}
    </div>
    <div id="b-main" class="b-main">
        <a id="entry-btn" class="b-main-item clickable" data-display-texts="${dt.entry},${dt.collapse}">${dt.entry}</a>
        <div id="page-status" class="b-main-item" hidden>
            <a class="clickable" id="p-curr-page" style="color:#ffc005;">1</a><span id="p-slash-1">/</span><span id="p-total">0</span>
        </div>
        <div id="fin-status" class="b-main-item" hidden>
            <span>${dt.fin}:</span><span id="p-finished">0</span>
        </div>
        <a id="auto-page-btn" class="b-main-item clickable" hidden data-status="paused" data-display-texts="${dt.autoPagePlay},${dt.autoPagePause}">
           <span>${dt.autoPagePlay}</span>
           <div id="auto-page-progress"></div>
        </a>
        <a id="config-panel-btn" class="b-main-item clickable" hidden>${dt.config}</a>
        <a id="downloader-panel-btn" class="b-main-item clickable" hidden>${dt.download}</a>
        <a id="chapters-panel-btn" class="b-main-item clickable" hidden>${dt.chapters}</a>
        <a id="filter-panel-btn" class="b-main-item clickable" hidden>${dt.filter}</a>
        <div id="read-mode-bar" class="b-main-item" hidden>
            <div id="read-mode-select"
            ><a class="b-main-option clickable ${ADAPTER.conf.readMode === "pagination" ? "b-main-option-selected" : ""}" data-value="pagination">${dt.pagination}</a
            ><a class="b-main-option clickable ${ADAPTER.conf.readMode === "continuous" ? "b-main-option-selected" : ""}" data-value="continuous">${dt.continuous}</a
            ><a class="b-main-option clickable ${ADAPTER.conf.readMode === "horizontal" ? "b-main-option-selected" : ""}" data-value="horizontal">${dt.horizontal}</a></div>
        </div>
        <div id="pagination-adjust-bar" class="b-main-item" hidden>
            <span>
              <a id="paginationStepPrev" class="b-main-btn clickable" type="button">&lt;</a>
              <a id="paginationMinusBTN" class="b-main-btn clickable" type="button">-</a>
              <span id="paginationInput" class="b-main-input">${ADAPTER.conf.paginationIMGCount}</span>
              <a id="paginationAddBTN" class="b-main-btn clickable" type="button">+</a>
              <a id="paginationStepNext" class="b-main-btn clickable" type="button">&gt;</a>
            </span>
        </div>
        <div id="scale-bar" class="b-main-item" hidden>
            <span>
              <span>${icons.zoomIcon}</span>
              <a id="scaleMinusBTN" class="b-main-btn clickable" type="button">-</a>
              <span id="scaleInput" class="b-main-input" style="width: 3rem; cursor: move;">${ADAPTER.conf.imgScale}</span>
              <a id="scaleAddBTN" class="b-main-btn clickable" type="button">+</a>
            </span>
        </div>
    </div>
</div>
`;

  const shadowRoot = base.attachShadow({ mode: "open" });
  const root = document.createElement("div");
  root.classList.add("ehvp-root");
  root.classList.add("ehvp-root-collapse");
  root.innerHTML = HTML_STRINGS;
  const style = document.createElement("style");
  style.innerHTML = styleCSS();
  const styleCustom = document.createElement("style");
  styleCustom.id = "ehvp-style-custom";
  styleCustom.innerHTML = ADAPTER.conf.customStyle;
  shadowRoot.append(style);
  root.append(styleCustom);
  shadowRoot.append(root);
  return {
    root,
    fullViewGrid: q("#ehvp-nodes-container", root),
    bigImageFrame: q("#big-img-frame", root),
    pageHelper: q("#p-helper", root),
    configPanelBTN: q("#config-panel-btn", root),
    downloaderPanelBTN: q("#downloader-panel-btn", root),
    chaptersPanelBTN: q("#chapters-panel-btn", root),
    filterPanelBTN: q("#filter-panel-btn", root),
    entryBTN: q("#entry-btn", root),
    currPageElement: q("#p-curr-page", root),
    totalPageElement: q("#p-total", root),
    finishedElement: q("#p-finished", root),
    imgLandLeft: q("#img-land-left", root),
    imgLandRight: q("#img-land-right", root),
    autoPageBTN: q("#auto-page-btn", root),
    pageLoading: q("#page-loading", root),
    messageBox: q("#message-box", root),
    config: new ConfigPanel(root),
    downloader: new DownloaderPanel(root),
    chapters: new ChaptersPanel(root),
    filter: new FilterPanel(root, filter),
    readModeSelect: q<HTMLDivElement>("#read-mode-select", root),
    paginationAdjustBar: q<HTMLDivElement>("#pagination-adjust-bar", root),
    styleSheet: style.sheet!,
  };
}

export function addEventListeners(events: Events, HTML: Elements, BIFM: BigImageFrameManager, DL: Downloader, PH: PageHelper) {
  HTML.config.initEvents(events);

  const panelElements: Record<string, { panel: HTMLElement, btn: HTMLElement, cb?: () => void }> = {
    "config": { panel: HTML.config.panel, btn: HTML.configPanelBTN },
    "downloader": { panel: HTML.downloader.panel, btn: HTML.downloaderPanelBTN, cb: () => DL.check() },
    "chapters": { panel: HTML.chapters.panel, btn: HTML.chaptersPanelBTN },
    "filter": { panel: HTML.filter.panel, btn: HTML.filterPanelBTN },
  };

  function collapsePanel(panel: HTMLElement) {
    if (ADAPTER.conf.autoCollapsePanel && !panel.classList.contains("p-panel-large")) {
      events.collapsePanelEvent(panel, panel.id);
    }
    if (BIFM.visible) {
      HTML.bigImageFrame.focus();
    } else {
      HTML.fullViewGrid.focus();
    }
  }
  Object.entries(panelElements).forEach(([key, elements]) => {
    elements.panel.addEventListener("mouseleave", () => collapsePanel(elements.panel));
    elements.panel.addEventListener("blur", () => collapsePanel(elements.panel));
    elements.btn.addEventListener("click", () => {
      events.togglePanelEvent(key, undefined, elements.btn);
      elements.cb?.()
    });
  })

  let hovering = false;
  HTML.pageHelper.addEventListener("mouseover", () => {
    hovering = true;
    events.abortMouseleavePanelEvent();
    PH.minify(PH.lastStage, true);
  });
  HTML.pageHelper.addEventListener("mouseleave", () => {
    hovering = false;
    Object.values(panelElements).forEach((elements) => collapsePanel(elements.panel));
    setTimeout(() => !hovering && PH.minify(PH.lastStage, false), 700);
  });

  // entry 入口
  HTML.entryBTN.addEventListener("click", () => {
    let stage = HTML.entryBTN.getAttribute("data-stage") || "exit";
    stage = stage === "open" ? "exit" : "open";
    HTML.entryBTN.setAttribute("data-stage", stage);
    EBUS.emit("toggle-main-view", stage === "open")
  });

  HTML.currPageElement.addEventListener("wheel", (event) => {
    BIFM.callbackOnWheel?.();
    BIFM.stepNext(event.deltaY > 0 ? "next" : "prev", event.deltaY > 0 ? -1 : 1, parseInt(HTML.currPageElement.textContent!) - 1)
  });

  // Shortcut
  document.addEventListener("keydown", (event) => events.keyboardEvent(event));
  document.addEventListener("mouseup", (event) => events.keyboardEvent(event));
  HTML.fullViewGrid.addEventListener("keydown", (event) => {
    events.fullViewGridKeyBoardEvent(event)
    event.stopPropagation();
  });
  HTML.fullViewGrid.addEventListener("mouseup", (event) => {
    events.fullViewGridKeyBoardEvent(event)
    event.stopPropagation();
  });
  HTML.bigImageFrame.addEventListener("keydown", (event) => {
    events.bigImageFrameKeyBoardEvent(event);
    event.stopPropagation();
  });
  HTML.bigImageFrame.addEventListener("mouseup", (event) => {
    events.bigImageFrameKeyBoardEvent(event);
    event.stopPropagation();
  });

  // Side Navigation Buttons
  HTML.imgLandLeft.addEventListener("click", (event) => {
    BIFM.callbackOnWheel?.();
    BIFM.stepNext(ADAPTER.conf.reversePages ? "next" : "prev");
    event.stopPropagation();
  });
  HTML.imgLandRight.addEventListener("click", (event) => {
    BIFM.callbackOnWheel?.();
    BIFM.stepNext(ADAPTER.conf.reversePages ? "prev" : "next");
    event.stopPropagation();
  });

  dragElement(HTML.pageHelper, {
    onFinish: () => {
      ADAPTER.conf.pageHelperAbTop = HTML.pageHelper.style.top;
      ADAPTER.conf.pageHelperAbLeft = HTML.pageHelper.style.left;
      ADAPTER.conf.pageHelperAbBottom = HTML.pageHelper.style.bottom;
      ADAPTER.conf.pageHelperAbRight = HTML.pageHelper.style.right;
      saveConf({
        pageHelperAbTop: ADAPTER.conf.pageHelperAbTop,
        pageHelperAbLeft: ADAPTER.conf.pageHelperAbLeft,
        pageHelperAbBottom: ADAPTER.conf.pageHelperAbBottom,
        pageHelperAbRight: ADAPTER.conf.pageHelperAbRight,
      }, ADAPTER.conf.selectedSiteNameConfig);
    },
    onMoving: (pos) => {
      HTML.pageHelper.style.top = pos.top === undefined ? "unset" : `${pos.top}px`;
      HTML.pageHelper.style.bottom = pos.bottom === undefined ? "unset" : `${pos.bottom}px`;
      HTML.pageHelper.style.left = pos.left === undefined ? "unset" : `${pos.left}px`;
      HTML.pageHelper.style.right = pos.right === undefined ? "unset" : `${pos.right}px`;
      const rule = queryCSSRules(HTML.styleSheet, ".b-main");
      if (rule) rule.style.flexDirection = pos.left === undefined ? "row-reverse" : "row";

    }
  }, q("#dragHub", HTML.pageHelper));

  HTML.readModeSelect.addEventListener("click", (event) => {
    const value = (event.target as HTMLElement).getAttribute("data-value");
    if (value) {
      events.changeReadModeEvent(value, ADAPTER.matcher!.name);
      PH.minify(PH.lastStage);
    }
  });

  q("#paginationStepPrev", HTML.pageHelper).addEventListener("click", () => {
    BIFM.callbackOnWheel?.();
    BIFM.stepNext(ADAPTER.conf.reversePages ? "next" : "prev", ADAPTER.conf.reversePages ? -1 : 1);
  });
  q("#paginationStepNext", HTML.pageHelper).addEventListener("click", () => {
    BIFM.callbackOnWheel?.();
    BIFM.stepNext(ADAPTER.conf.reversePages ? "prev" : "next", ADAPTER.conf.reversePages ? 1 : -1);
  });
  q("#paginationMinusBTN", HTML.pageHelper).addEventListener("click", () => events.modNumberConfigEvent("paginationIMGCount", "minus", undefined, ADAPTER.matcher!.name));
  q("#paginationAddBTN", HTML.pageHelper).addEventListener("click", () => events.modNumberConfigEvent("paginationIMGCount", "add", undefined, ADAPTER.matcher!.name));
  q("#paginationInput", HTML.pageHelper).addEventListener("wheel", (event) => events.modNumberConfigEvent("paginationIMGCount", event.deltaY < 0 ? "add" : "minus", undefined, ADAPTER.matcher!.name));

  q("#scaleInput", HTML.pageHelper).addEventListener("mousedown", (event) => {
    const element = event.target as HTMLElement;
    const scale = ADAPTER.conf.imgScale || (ADAPTER.conf.readMode === "continuous" ? ADAPTER.conf.defaultImgScaleModeC : 100);
    dragElementWithLine(event, element, { y: true }, (data) => {
      if (data.distance === 0) return;
      const fix = (data.direction & 3) === 1 ? 1 : -1; // 4bit: UDLR,  data.direction & 3 means remove UD
      BIFM.scaleBigImages(1, 0, Math.floor(scale + data.distance * 0.6 * fix));
      element.textContent = ADAPTER.conf.imgScale.toString();
    });
  });
  q("#scaleMinusBTN", HTML.pageHelper).addEventListener("click", () => BIFM.scaleBigImages(-1, 10));
  q("#scaleAddBTN", HTML.pageHelper).addEventListener("click", () => BIFM.scaleBigImages(1, 10));
  q("#scaleInput", HTML.pageHelper).addEventListener("wheel", (event) => BIFM.scaleBigImages(event.deltaY > 0 ? -1 : 1, 5));
}

export function showMessage(box: HTMLElement, level: "info" | "error", message: string, duration?: number) {
  message = linkify(message);
  const element = document.createElement("div");
  element.classList.add("ehvp-message");
  element.innerHTML = `<span ${level === "error" ? "style='color: red;'" : ""}>${message}</span><button>X</button><div class="ehvp-message-duration-bar"></div>`;
  box.appendChild(element);
  element.querySelector("button")?.addEventListener("click", () => element.remove());
  const durationBar = element.querySelector<HTMLDivElement>("div.ehvp-message-duration-bar")!;
  if (duration) {
    durationBar.style.animation = `${duration}ms linear main-progress`;
    durationBar.addEventListener("animationend", () => element.remove());
  }
}
