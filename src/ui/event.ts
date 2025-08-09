import { ConfigBooleanType, ConfigTextType, ConfigNumberType, ConfigSelectType, ReadMode, saveConf } from "../config";
import EBUS from "../event-bus";
import { IMGFetcherQueue } from "../fetcher-queue";
import { IdleLoader } from "../idle-loader";
import parseKey from "../utils/keyboard";
import q from "../utils/query-element";
import relocateElement from "../utils/relocate-element";
import createSiteProfilePanel from "./site-profiles";
import createHelpPanel from "./help";
import { Elements } from "./html";
import createKeyboardCustomPanel from "./keyboard-custom";
import { PageHelper } from "./page-helper";
import { BigImageFrameManager } from "./big-image-frame-manager";
import { createStyleCustomPanel } from "./style-custom-panel";
import queryCSSRules from "../utils/query-cssrules";
import { createActionCustomPanel } from "./actions-custom";
import { ADAPTER } from "../platform/adapt";

export type Events = ReturnType<typeof initEvents>;

export type KeyboardInBigImageModeId = "step-image-prev"
  | "step-image-next"
  | "exit-big-image-mode"
  | "step-to-first-image"
  | "step-to-last-image"
  | "scale-image-increase"
  | "scale-image-decrease"
  | "scroll-image-up"
  | "scroll-image-down"
  | "toggle-auto-play"
  | "round-read-mode"
  | "toggle-reverse-pages"
  | "rotate-image"
  | "cherry-pick-current"
  | "exclude-current"
  | "go-prev-chapter"
  | "go-next-chapter";
export type KeyboardInFullViewGridId = "open-big-image-mode"
  | "pause-auto-load-temporarily"
  | "exit-full-view-grid"
  | "columns-increase"
  | "columns-decrease"
  | "toggle-auto-play"
  | "retry-fetch-next-page"
  | "resize-flow-vision"
  | "start-download"
  | "go-prev-chapter"
  | "go-next-chapter";
export type KeyboardInMainId = "open-full-view-grid" | "start-download";
export type KeyboardEvents = {
  inBigImageMode: Record<KeyboardInBigImageModeId, KeyboardDesc>,
  inFullViewGrid: Record<KeyboardInFullViewGridId, KeyboardDesc>,
  inMain: Record<KeyboardInMainId, KeyboardDesc>,
}
type KBCallback = (event: KeyboardEvent | MouseEvent) => void;
export class KeyboardDesc {
  defaultKeys: string[];
  cb: KBCallback;
  noPreventDefault?: boolean = false;
  constructor(defaultKeys: string[], cb: (event: KeyboardEvent | MouseEvent) => void, noPreventDefault?: boolean) {
    this.defaultKeys = defaultKeys;
    this.cb = cb;
    this.noPreventDefault = noPreventDefault || false;
  }
}

export function initEvents(HTML: Elements, BIFM: BigImageFrameManager, IFQ: IMGFetcherQueue, IL: IdleLoader, PH: PageHelper) {
  // modify config
  function modNumberConfigEvent(key: ConfigNumberType, data?: "add" | "minus", value?: number, siteName?: string) {
    if (!value) {
      const range = {
        colCount: [1, 12],
        rowHeight: [50, 4096],
        threads: [1, 10],
        downloadThreads: [1, 10],
        timeout: [8, 40],
        autoPageSpeed: [1, 100],
        preventScrollPageTime: [-1, 90000],
        paginationIMGCount: [1, 3],
        scrollingDelta: [1, 5000],
        scrollingSpeed: [1, 100],
      };
      let mod = 1;
      if (key === "preventScrollPageTime" || key === "rowHeight" || key === "scrollingDelta") {
        mod = ADAPTER.conf[key] === 1 ? 9 : 10;
      };
      if (data === "add") {
        value = Math.min(ADAPTER.conf[key] + mod, range[key][1]);
      } else if (data === "minus") {
        value = Math.max(ADAPTER.conf[key] - mod, range[key][0]);
      }
    }
    if (value === undefined) return;
    ADAPTER.conf[key] = value;
    const inputElement = q<HTMLInputElement>(`#${key}Input`, HTML.config.panel);
    inputElement.value = ADAPTER.conf[key].toString();
    if (key === "colCount" || key === "rowHeight") {
      EBUS.emit("fvg-layout-resize");
    }
    if (key === "paginationIMGCount") {
      q("#paginationInput", HTML.paginationAdjustBar).textContent = ADAPTER.conf.paginationIMGCount.toString();
      const imgRule = queryCSSRules(HTML.styleSheet, ".bifm-container-page .bifm-img");
      if (imgRule) {
        imgRule.style.maxWidth = (ADAPTER.conf.imgScale === 100 && ADAPTER.conf.paginationIMGCount === 1) ? "100%" : "";
      }
      BIFM.setNow(IFQ[IFQ.currIndex]);
    }
    saveConf({ [key]: value }, siteName ?? ADAPTER.conf.selectedSiteNameConfig);
  }

  // modify config
  function modBooleanConfigEvent(key: ConfigBooleanType, value?: boolean) {
    const inputElement = q<HTMLInputElement>(`#${key}Checkbox`, HTML.config.panel);
    if (value !== undefined) {
      inputElement.checked = value;
    } else {
      value = inputElement.checked || false;
    }
    if (value === undefined) return;
    ADAPTER.conf[key] = value;
    saveConf({ [key]: value }, ADAPTER.conf.selectedSiteNameConfig);
    if (key === "autoLoad") {
      IL.autoLoad = ADAPTER.conf.autoLoad;
      IL.abort(0, ADAPTER.conf.restartIdleLoader / 3);
    }
    if (key === "reversePages") {
      BIFM.changeLayout();
    }
    // TODO
    // if (key === "magnifier") {
    //   BIFM.elements.curr.forEach(ele => ele.draggable = !(conf.magnifier && conf.readMode === "pagination"));
    // }
  }

  function changeReadModeEvent(value?: string, siteName?: string) {
    if (value) ADAPTER.conf.readMode = value as any;

    BIFM.changeLayout();

    ADAPTER.conf.autoPageSpeed = ADAPTER.conf.readMode === "pagination" ? 5 : 1;
    saveConf({ readMode: ADAPTER.conf.readMode, autoPageSpeed: ADAPTER.conf.autoPageSpeed }, siteName ?? ADAPTER.conf.selectedSiteNameConfig);

    q<HTMLInputElement>("#autoPageSpeedInput", HTML.config.panel).value = ADAPTER.conf.autoPageSpeed.toString();
    Array.from(HTML.readModeSelect.querySelectorAll(".b-main-option")).forEach((element) => {
      if (element.getAttribute("data-value") === ADAPTER.conf.readMode) {
        element.classList.add("b-main-option-selected");
      } else {
        element.classList.remove("b-main-option-selected");
      }
    });
    if (ADAPTER.conf.readMode === "pagination") {
      HTML.root.querySelectorAll<HTMLElement>(".img-land").forEach(element => element.style.display = "");
    } else {
      HTML.root.querySelectorAll<HTMLElement>(".img-land").forEach(element => element.style.display = "none");
    }
  }

  // modify config
  function modSelectConfigEvent(key: ConfigSelectType, value?: string) {
    const inputElement = q<HTMLSelectElement>(`#${key}Select`, HTML.config.panel);
    if (value) {
      inputElement.value = value;
    } else {
      value = inputElement.value;
    }
    if (!value) return;
    (ADAPTER.conf[key] as any) = value;
    if (key === "readMode") {
      changeReadModeEvent();
      return;
    }
    saveConf({ [key]: value }, ADAPTER.conf.selectedSiteNameConfig);
    if (key === "minifyPageHelper") {
      switch (ADAPTER.conf.minifyPageHelper) {
        case "always":
          PH.minify("bigImageFrame");
          break;
        case "inBigMode":
        case "never":
          PH.minify(BIFM.visible ? "bigImageFrame" : "fullViewGrid");
          break;
      }
    }
    if (key === "gridMode") {
      EBUS.emit("fvg-layout-change");
    }
  }

  // modify config
  function modTextConfigEvent(key: ConfigTextType, value?: string) {
    const inputElement = q<HTMLSelectElement>(`#${key}TextInput`, HTML.config.panel);
    if (value) {
      inputElement.value = value;
    } else {
      value = inputElement.value;
    }
    (ADAPTER.conf[key] as any) = value;
    saveConf({ [key]: value }, ADAPTER.conf.selectedSiteNameConfig);
  }

  const cancelIDContext: Record<string, number> = {};
  function collapsePanelEvent(target: HTMLElement, id: string) {
    // FIX: in firefox, mouseleave event will be triggered when mouse move to child element, like <option>
    if (id) {
      abortMouseleavePanelEvent(id);
    }
    const timeoutId = window.setTimeout(() => target.classList.add("p-collapse"), 100);
    if (id) {
      cancelIDContext[id] = timeoutId;
    }
  }

  function abortMouseleavePanelEvent(id?: string) {
    (id ? [id] : [...Object.keys(cancelIDContext)]).forEach(k => {
      window.clearTimeout(cancelIDContext[k]);
      delete cancelIDContext[k];
    });
  }

  function togglePanelEvent(idPrefix: string, collapse?: boolean, target?: HTMLElement) {
    const id = `${idPrefix}-panel`;
    const element = q("#" + id, HTML.pageHelper);
    if (!element) return;

    // collapse not specified, toggle
    if (collapse === undefined) {
      togglePanelEvent(idPrefix, !element.classList.contains("p-collapse"), target);
      return;
    }
    if (collapse) {
      collapsePanelEvent(element, id);
    } else {
      Array.from(HTML.root.querySelectorAll<HTMLElement>(".p-panel"))
        .filter(ele => ele !== element).forEach(ele => collapsePanelEvent(ele, ele.id));
      // extend
      element.classList.remove("p-collapse");
      if (target) {
        relocateElement(element, target, HTML.root.clientWidth, HTML.root.clientHeight);
      }
    }
    // PH.minify(true, BIFM.visible ? "bigImageFrame" : "fullViewGrid");
  }

  const bodyOverflow = document.body.style.overflow;
  function showFullViewGrid() {
    HTML.root.classList.remove("ehvp-root-collapse");
    if (BIFM.visible) {
      BIFM.root.focus();
      PH.minify("bigImageFrame");
    } else {
      HTML.fullViewGrid.focus();
      PH.minify("fullViewGrid");
    }
    document.body.style.overflow = "hidden";
  }


  function hiddenFullViewGrid() {
    PH.minify("exit");
    HTML.entryBTN.setAttribute("data-stage", "exit");
    HTML.root.classList.add("ehvp-root-collapse");
    if (BIFM.visible) {
      BIFM.root.blur();
    } else {
      HTML.fullViewGrid.blur();
    }
    document.body.style.overflow = bodyOverflow;
    // document.body.focus();
  }

  function initKeyboardEvent(): KeyboardEvents {
    const inBigImageMode: Record<KeyboardInBigImageModeId, KeyboardDesc> = {
      "exit-big-image-mode": new KeyboardDesc(
        ["escape", "enter"],
        () => BIFM.hidden()
      ),
      "step-image-prev": new KeyboardDesc(
        ["arrowleft"],
        () => {
          BIFM.callbackOnWheel?.();
          BIFM.stepNext(ADAPTER.conf.reversePages ? "next" : "prev");
        }
      ),
      "step-image-next": new KeyboardDesc(
        ["arrowright"],
        () => {
          BIFM.callbackOnWheel?.();
          BIFM.stepNext(ADAPTER.conf.reversePages ? "prev" : "next");
        }
      ),
      "step-to-first-image": new KeyboardDesc(
        ["home"],
        () => BIFM.stepNext("next", 0, 1)
      ),
      "step-to-last-image": new KeyboardDesc(
        ["end"],
        () => BIFM.stepNext("prev", 0, -1)
      ),
      "scale-image-increase": new KeyboardDesc(
        ["="],
        () => BIFM.scaleBigImages(1, 5)
      ),
      "scale-image-decrease": new KeyboardDesc(
        ["-"],
        () => BIFM.scaleBigImages(-1, 5)
      ),
      "scroll-image-up": new KeyboardDesc(
        ["pageup", "arrowup", "shift+space"],
        (event) => {
          const key = parseKey(event);
          const noPrevent = ["pageup", "shift+space"].includes(key);
          let customKey = !["pageup", "arrowup", "shift+space"].includes(key);
          BIFM.onWheel(new WheelEvent("wheel", { deltaY: ADAPTER.conf.scrollingDelta * -1 }), noPrevent, customKey, undefined, event);
        }, true
      ),
      "scroll-image-down": new KeyboardDesc(
        ["pagedown", "arrowdown", "space"],
        (event) => {
          const key = parseKey(event);
          const noPrevent = ["pagedown", "space"].includes(key);
          const customKey = !["pagedown", "arrowdown", "space"].includes(key);
          BIFM.onWheel(new WheelEvent("wheel", { deltaY: ADAPTER.conf.scrollingDelta }), noPrevent, customKey, undefined, event);
        }, true
      ),
      "toggle-auto-play": new KeyboardDesc(
        ["p"],
        () => EBUS.emit("toggle-auto-play")
      ),
      "round-read-mode": new KeyboardDesc(
        ["alt+m"],
        () => {
          const readModeList: ReadMode[] = ["pagination", "continuous", "horizontal"];
          const index = (readModeList.indexOf(ADAPTER.conf.readMode) + 1) % readModeList.length;
          modSelectConfigEvent("readMode", readModeList[index]);
        }, true
      ),
      "toggle-reverse-pages": new KeyboardDesc(
        ["alt+f"],
        () => modBooleanConfigEvent("reversePages", !ADAPTER.conf.reversePages), true
      ),
      "rotate-image": new KeyboardDesc(
        ["alt+r"],
        () => EBUS.emit("bifm-rotate-image"), true
      ),
      "cherry-pick-current": new KeyboardDesc(
        ["alt+x"],
        () => BIFM.cherryPickCurrent(false), true
      ),
      "exclude-current": new KeyboardDesc(
        ["shift+alt+x"],
        () => BIFM.cherryPickCurrent(true), true
      ),
      "go-prev-chapter": new KeyboardDesc(
        ["shift+alt+w"],
        () => EBUS.emit("pf-step-chapters", "prev"), true
      ),
      "go-next-chapter": new KeyboardDesc(
        ["alt+w"],
        () => EBUS.emit("pf-step-chapters", "next"), true
      ),
    };
    const inFullViewGrid: Record<KeyboardInFullViewGridId, KeyboardDesc> = {
      "open-big-image-mode": new KeyboardDesc(
        ["enter"], () => {
          let start = IFQ.currIndex;
          if (numberRecord && numberRecord.length > 0) {
            start = Number(numberRecord.join("")) - 1;
            numberRecord = null;
            if (isNaN(start)) return;
            start = Math.max(0, Math.min(start, IFQ.length - 1));
          }
          IFQ[start].node.root?.querySelector<HTMLAnchorElement>("a")?.dispatchEvent(new MouseEvent("click", { bubbles: false, cancelable: true }));
        }
      ),
      "pause-auto-load-temporarily": new KeyboardDesc(
        ["alt+p"],
        () => {
          IL.autoLoad = !IL.autoLoad;
          if (IL.autoLoad) {
            IL.abort(IFQ.currIndex, ADAPTER.conf.restartIdleLoader / 3);
            EBUS.emit("notify-message", "info", "Auto load Restarted", 3 * 1000);
          } else {
            EBUS.emit("notify-message", "info", "Auto load Pause", 3 * 1000);
          }
        }
      ),
      "exit-full-view-grid": new KeyboardDesc(
        ["escape"],
        () => EBUS.emit("toggle-main-view", false)
      ),
      "columns-increase": new KeyboardDesc(
        ["="],
        () => modNumberConfigEvent("colCount", "add")
      ),
      "columns-decrease": new KeyboardDesc(
        ["-"],
        () => modNumberConfigEvent("colCount", "minus")
      ),
      "toggle-auto-play": new KeyboardDesc(
        ["p"],
        () => EBUS.emit("toggle-auto-play")
      ),
      "retry-fetch-next-page": new KeyboardDesc(
        ["alt+n"],
        () => EBUS.emit("pf-retry-extend")
      ),
      "resize-flow-vision": new KeyboardDesc(
        ["alt+r"],
        () => EBUS.emit("fvg-layout-resize")
      ),
      "start-download": new KeyboardDesc(
        ["shift+alt+d"],
        () => EBUS.emit("start-download", () => PH.minify("fullViewGrid", false))),
      "go-prev-chapter": new KeyboardDesc(
        ["shift+alt+w"],
        () => EBUS.emit("pf-step-chapters", "prev"), true
      ),
      "go-next-chapter": new KeyboardDesc(
        ["alt+w"],
        () => EBUS.emit("pf-step-chapters", "next"), true
      ),
    };
    const inMain: Record<KeyboardInMainId, KeyboardDesc> = {
      "open-full-view-grid": new KeyboardDesc(["enter"], () => {
        // check focus element is not input Elements
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement || activeElement instanceof HTMLSelectElement) return;
        EBUS.emit("toggle-main-view", true)
      }, true),
      "start-download": new KeyboardDesc(["shift+alt+d"], () => {
        EBUS.emit("start-download", () => PH.minify("exit", false));
      }, true),
    };
    return { inBigImageMode, inFullViewGrid, inMain }
  }
  const keyboardEvents = initKeyboardEvent();

  // use keyboardEvents
  let numberRecord: number[] | null = null;

  function bigImageFrameKeyBoardEvent(event: KeyboardEvent | MouseEvent) {
    if (HTML.bigImageFrame.classList.contains("big-img-frame-collapse")) return;
    const key = parseKey(event);
    const found = Object.entries(keyboardEvents.inBigImageMode).find(([id, desc]) => {
      const override = ADAPTER.conf.keyboards.inBigImageMode[id as KeyboardInBigImageModeId];
      return ((override !== undefined && override.length > 0) ? override.includes(key) : desc.defaultKeys.includes(key));
    });
    if (!found) return;
    const [_, desc] = found;
    if (!desc.noPreventDefault) event.preventDefault();
    desc.cb(event);
  }

  function fullViewGridKeyBoardEvent(event: KeyboardEvent | MouseEvent) {
    if (HTML.root.classList.contains("ehvp-root-collapse")) return;
    const key = parseKey(event);
    const found = Object.entries(keyboardEvents.inFullViewGrid).find(([id, desc]) => {
      const override = ADAPTER.conf.keyboards.inFullViewGrid[id as KeyboardInFullViewGridId];
      return ((override !== undefined && override.length > 0) ? override.includes(key) : desc.defaultKeys.includes(key));
    });
    if (found) {
      const [_, desc] = found;
      if (!desc.noPreventDefault) event.preventDefault();
      desc.cb(event);
    } else if (event instanceof KeyboardEvent && event.key.length === 1 && event.key >= "0" && event.key <= "9") {
      numberRecord = numberRecord ? [...numberRecord, Number(event.key)] : [Number(event.key)];
      event.preventDefault();
    }
  }

  function keyboardEvent(event: KeyboardEvent | MouseEvent) {
    if (!HTML.root.classList.contains("ehvp-root-collapse")) return;
    if (!HTML.bigImageFrame.classList.contains("big-img-frame-collapse")) return;
    const key = parseKey(event);
    const found = Object.entries(keyboardEvents.inMain).find(([id, desc]) => {
      const override = ADAPTER.conf.keyboards.inMain[id as KeyboardInMainId];
      return ((override !== undefined && override.length > 0) ? override.includes(key) : desc.defaultKeys.includes(key));
    });
    if (!found) return;
    const [_, desc] = found;
    if (!desc.noPreventDefault) event.preventDefault();
    desc.cb(event);
  }

  function focus() {
    BIFM.visible ? HTML.bigImageFrame.focus() : HTML.fullViewGrid.focus();
  }

  // 显示简易指南事件
  function showGuideEvent() {
    createHelpPanel(HTML.root, focus);
  }

  function showKeyboardCustomEvent() {
    createKeyboardCustomPanel(keyboardEvents, HTML.root, focus);
  }

  function showSiteProfilesEvent() {
    createSiteProfilePanel(HTML.root, focus);
  }

  function showStyleCustomEvent() {
    createStyleCustomPanel(HTML.root, focus);
  }

  function showActionCustomEvent() {
    createActionCustomPanel(HTML.root, focus);
  }

  return {
    modNumberConfigEvent,
    modBooleanConfigEvent,
    modSelectConfigEvent,
    modTextConfigEvent,

    togglePanelEvent,
    showFullViewGrid,
    hiddenFullViewGrid,

    fullViewGridKeyBoardEvent,
    bigImageFrameKeyBoardEvent,
    keyboardEvent,
    showGuideEvent,
    collapsePanelEvent,
    abortMouseleavePanelEvent,
    showKeyboardCustomEvent,
    showSiteProfilesEvent,
    showStyleCustomEvent,
    showActionCustomEvent,

    changeReadModeEvent,
  }
}

// function generateOnePixelURL() {
//   const href = window.location.href;
//   const meta = { href, version: _VERSION_, id: conf.id }
//   const base = window.btoa(JSON.stringify(meta));
//   return `https://1308291390-f8z0v307tj-hk.scf.tencentcs.com/onepixel.png?v=${Date.now()}&base=${base}`;
// }
