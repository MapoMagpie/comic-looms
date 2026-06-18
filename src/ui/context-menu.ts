import EBUS from "../event-bus";
import { i18n } from "../utils/i18n";
import q from "../utils/query-element";
import { AppEventDesc, AppEventIDInBigImgFrame, AppEventIDInFullViewGrid, AppEvents } from "./event";
import { FullViewGridManager } from "./full-view-grid-manager";
import { Elements } from "./html";

type VisibleMode = "alway" | "onBig" | "onGrid";

class MenuItem {
  id: AppEventIDInBigImgFrame | AppEventIDInFullViewGrid;
  desc: AppEventDesc;
  visible: VisibleMode;
  closeAfter: boolean;
  constructor(id: AppEventIDInBigImgFrame | AppEventIDInFullViewGrid, desc: AppEventDesc, visible: VisibleMode, closeAfter: boolean) {
    this.id = id;
    this.visible = visible;
    this.desc = desc;
    this.closeAfter = closeAfter;
  }
};

export class ContextMenu {
  root: HTMLElement;
  menu?: HTMLElement;
  items: MenuItem[];
  scrolled: boolean = false;
  getTarget: (x: number, y: number) => HTMLElement | undefined;
  isBigMode: () => boolean;
  pointerDownListener: (evt: MouseEvent) => void;
  constructor(html: Elements, fvgm: FullViewGridManager, events: AppEvents) {
    this.root = html.root;
    // this.events = events;
    html.root.addEventListener("contextmenu", (event) => {
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
      event.preventDefault();
      if (!this.scrolled) {
        this.open(event);
      }
      this.scrolled = false;
    });
    html.root.addEventListener("wheel", (event) => { if (event.buttons === 2) this.scrolled = true });
    this.pointerDownListener = (event) => {
      if (!this.menu) return;
      const path = event.composedPath();
      if (!path.includes(this.menu)) this.close();
    };

    this.getTarget = (x, y) => {
      if (!html.bigImageFrame.classList.contains("big-img-frame-collapse")) {
        return undefined;
      } else {
        return fvgm.mouseOn(x, y);
      }
    };
    this.isBigMode = () => !html.bigImageFrame.classList.contains("big-img-frame-collapse");
    this.items = [];
    const inBigList: [AppEventIDInBigImgFrame, VisibleMode, boolean][] = [
      ["exit-big-image-mode", "onBig", true],
      ["round-read-mode", "onBig", false],
      ["toggle-reverse-pages", "onBig", false],
      ["scale-image-increase", "onBig", false],
      ["scale-image-decrease", "onBig", false],
      ["rotate-image", "onBig", false],
      ["step-image-prev", "onBig", false],
      ["step-image-next", "onBig", false],
    ];
    inBigList.forEach(([id, hideOnBigMode, closeAfter]) => this.items.push(new MenuItem(id, events.inBigImageMode[id], hideOnBigMode, closeAfter)));
    const inGridList: [AppEventIDInFullViewGrid, VisibleMode, boolean][] = [
      ["open-big-image-mode", "onGrid", true],
      ["open-in-new-tab", "onGrid", true],
      ["toggle-auto-play", "alway", false],
      ["pause-auto-load-temporarily", "onGrid", true],
      ["resize-flow-vision", "onGrid", false],
      ["columns-decrease", "onGrid", false],
      ["columns-increase", "onGrid", false],
      ["retry-fetch-next-page", "onGrid", false],
      ["cherry-pick-select", "onGrid", true],
      ["cherry-pick-select-range", "onGrid", true],
      ["cherry-pick-exclude", "onGrid", true],
      ["cherry-pick-exclude-range", "onGrid", true],
      ["reload-image", "onGrid", true],
      ["go-prev-chapter", "alway", false],
      ["go-next-chapter", "alway", false],
      ["start-download", "alway", true],
      ["exit-full-view-grid", "alway", true],
    ];
    inGridList.forEach(([id, hideOnBigMode, closeAfter]) => this.items.push(new MenuItem(id, events.inFullViewGrid[id], hideOnBigMode, closeAfter)));
  }

  open(event: MouseEvent) {
    // console.log("event", event);
    this.close();
    const target = this.getTarget(event.clientX, event.clientY);
    this.menu = this.create(new MouseEvent("contextmenu", { relatedTarget: target, clientX: event.clientX, clientY: event.clientY }));
    this.root.appendChild(this.menu);
    const [w, h] = [this.menu.offsetWidth, this.menu.offsetHeight];
    let top = event.clientY - (h / 2);
    top = Math.max(0, top);
    top = Math.min(window.innerHeight - h, top);
    let left = event.clientX - (w / 2);
    left = Math.max(0, left);
    left = Math.min(window.innerWidth - w, left);
    this.menu.style.top = top + "px";
    this.menu.style.left = left + "px";
    document.addEventListener('pointerdown', this.pointerDownListener);
  }

  close() {
    this.menu?.remove();
    document.removeEventListener('pointerdown', this.pointerDownListener);
  }

  private create(mev: MouseEvent): HTMLElement {
    const div = document.createElement("div");
    div.classList.add("ehvp-context-menu");
    // tooltip
    div.innerHTML = `
      <div class="ehvp-context-menu-tooltip"><span class="ehvp-context-menu-tooltip-span">Context Menu</span></div>
      <div class="ehvp-context-menu-grid"></div>
      <div style="color: white; font-size: 12px; text-align: center;"><span>${i18n.contextMenuTooltip.get()}</span></div>
    `;
    const tooltip = q<HTMLSpanElement>(".ehvp-context-menu-tooltip-span", div);
    const isBigMode = this.isBigMode();
    const items = this.items.filter(item => {
      switch (item.visible) {
        case "alway": return true;
        case "onBig": return isBigMode;
        case "onGrid": return !isBigMode;
      }
    }).map<HTMLElement>(item => {
      const elem = document.createElement("div");
      elem.classList.add("ehvp-context-menu-item");
      elem.innerHTML = `<span style="display: flex; align-items: center;">${item.desc.icon}</span>`;
      let addition = "";
      if (item.id === "cherry-pick-select-range" || item.id === "cherry-pick-exclude-range") {
        const lastIndex = EBUS.emit("get-cherry-pick-last-index");
        const currIndex = parseInt((mev.relatedTarget as HTMLElement)?.getAttribute("data-index") ?? "");
        if (lastIndex !== undefined && !isNaN(currIndex)) addition = ` [${lastIndex + 1}-${currIndex + 1}]`;
      }
      elem.addEventListener("mouseover", () => {
        const textContent = i18n.keyboard[item.id].get();
        tooltip.textContent = textContent.replace(/\s*\(.*?\)/, "") + addition;
      });
      elem.addEventListener("click", () => {
        item.desc.cb(mev);
        if (item.closeAfter) div.remove();
      });
      return elem;
    });
    q(".ehvp-context-menu-grid", div).append(...items);
    div.addEventListener("mouseleave", () => div.remove());
    return div;
  }

}
