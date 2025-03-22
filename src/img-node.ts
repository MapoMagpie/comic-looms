import { conf } from "./config";
import { DownloadState } from "./img-fetcher";
import { Debouncer } from "./utils/debouncer";
import { resizing } from "./utils/image-resizing";

export const DEFAULT_THUMBNAIL = "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

const DEFAULT_NODE_TEMPLATE = document.createElement("div");
DEFAULT_NODE_TEMPLATE.classList.add("img-node");
DEFAULT_NODE_TEMPLATE.innerHTML = `
<a>
  <img decoding="async" loading="eager" title="untitle.jpg" src="" style="display: none;" />
  <canvas id="sample-canvas" width="100" height="100"></canvas>
</a>`;

const OVERLAY_TIP = document.createElement("div");
OVERLAY_TIP.classList.add("overlay-tip");
OVERLAY_TIP.innerHTML = `<span>GIF</span>`;

type Rect = {
  w: number;
  h: number;
}

type Onfailed = (reason: string, source?: string, error?: Error) => void;
type OnResize = () => void;

type TagCategory = "mime-type" | "misc" | "author" | "language";

export class Tag {
  category: TagCategory;
  value: string;
  constructor(category: TagCategory, value: string) {
    this.category = category;
    this.value = value;
  }
  static fromRaw(raw: string): Tag {
    const split = raw.indexOf(":");
    if (split !== -1) {
      return new Tag(raw.slice(0, split) as TagCategory, raw.slice(split + 1))
    } else {
      return new Tag("misc", raw);
    }
  }
  static from(category: string, value: string): Tag {
    return new Tag(category as TagCategory, value);
  }

  toString(): string {
    return `${this.category}:"${this.value}"`;
  }

  search(_term: string): number {
    // TODO
    return 1;
  }

}

export default class ImageNode {
  root?: HTMLElement;
  thumbnailSrc: string;
  href: string;
  title: string;
  onclick?: (event: MouseEvent) => void;
  imgElement?: HTMLImageElement;
  canvasElement?: HTMLCanvasElement;
  canvasCtx?: CanvasRenderingContext2D;
  delaySRC?: Promise<string>;
  originSrc?: string;
  blobSrc?: string;
  mimeType?: string;
  private downloadBar?: HTMLElement;
  picked: boolean = true;
  private debouncer: Debouncer = new Debouncer();
  rect?: Rect;
  tags: Set<Tag>;
  imgIndex?: number;
  constructor(thumbnailSrc: string, href: string, title: string, delaySRC?: Promise<string>, originSrc?: string, wh?: { w: number, h: number }) {
    this.thumbnailSrc = thumbnailSrc;
    this.href = href;
    this.title = title;
    this.delaySRC = delaySRC;
    this.originSrc = originSrc;
    this.rect = wh;
    this.tags = new Set();
  }

  setTags(...tags: Tag[]) {
    tags.forEach(this.tags.add);
  }

  hasTag(tag: Tag) {
    return this.tags.has(tag);
  }

  create(): HTMLElement {
    this.root = DEFAULT_NODE_TEMPLATE.cloneNode(true) as HTMLElement;
    const anchor = this.root.firstElementChild as HTMLAnchorElement;
    anchor.href = this.href;
    anchor.target = "_blank";
    this.imgElement = anchor.firstElementChild as HTMLImageElement;
    this.canvasElement = anchor.lastElementChild as HTMLCanvasElement;
    this.imgElement.setAttribute("title", this.title);
    this.canvasElement.id = "canvas-" + this.title.replaceAll(/[^\w]/g, "_");

    const ratio = this.ratio();
    this.root.style.aspectRatio = ratio.toString();
    this.root.setAttribute("data-ratio", ratio.toString());
    this.canvasElement.width = 512;
    this.canvasElement.height = Math.floor(512 / ratio);

    this.canvasCtx = this.canvasElement.getContext("2d")!;
    this.canvasCtx.fillStyle = "#aaa";
    this.canvasCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    if (this.onclick) {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        this.onclick!(event);
      });
    }
    return this.root;
  }

  resize(onfailed: Onfailed, onResize: OnResize) {
    if (!this.root || !this.imgElement || !this.canvasElement) return onfailed("undefined elements");
    if (!this.imgElement.src || this.imgElement.src === DEFAULT_THUMBNAIL) return onfailed("empty or default src");
    if (this.root.offsetWidth <= 1) return onfailed("element too small");
    if (this.imgElement.src === this.imgElement.getAttribute("data-rendered")) return; // already resized image from this src to canvas
    this.imgElement.onload = null;
    this.imgElement.onerror = null;

    const oldRatio = this.ratio();
    this.rect = { w: this.imgElement.naturalWidth, h: this.imgElement.naturalHeight };
    const newRatio = this.ratio();

    const flowVision = this.root.parentElement?.classList.contains("fvg-sub-container");
    // console.log("ratio diff: ", Math.abs(newRatio - oldRatio));
    if (Math.abs(newRatio - oldRatio) > 0.07) {
      this.root.style.aspectRatio = newRatio.toString();
      this.root.setAttribute("data-ratio", newRatio.toString());
      if (flowVision) {
        this.canvasElement.height = this.root.offsetHeight;
        this.canvasElement.width = Math.floor(this.root.offsetHeight / newRatio);
      } else {
        this.canvasElement.width = this.root.offsetWidth;
        this.canvasElement.height = Math.floor(this.root.offsetWidth * newRatio);
      }
      onResize();
    }
    const resized = (src: string) => {
      this.imgElement!.src = "";
      this.imgElement!.setAttribute("data-rendered", src);
    }
    if (this.imgElement.src === this.thumbnailSrc || newRatio < 0.1) {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
      this.canvasCtx?.drawImage(this.imgElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
      resized(this.imgElement.src);
    } else {
      // FIXME: pica wasm resizing image lagging if images ratio very low, so if newRatio < 0.1(1/10) use native
      resizing(this.imgElement, this.canvasElement)
        .then(() => window.setTimeout(() => resized(this.imgElement!.src), 100))
        .catch(() => resized(this.canvasCtx?.drawImage(this.imgElement!, 0, 0, this.canvasElement!.width, this.canvasElement!.height) || ""));
    }
  }

  ratio(): number {
    if (this.rect) {
      return Math.floor((this.rect.w / this.rect.h) * 1000) / 1000;
    }
    return 1;
  }

  render(onfailed: Onfailed, onResize: OnResize) {
    this.debouncer.addEvent("IMG-RENDER", () => {
      if (!this.imgElement) return onfailed("element undefined");
      let justThumbnail = !conf.hdThumbnails || !this.blobSrc;
      if (this.mimeType === "image/gif" || this.mimeType?.startsWith("video")) {
        const tip = OVERLAY_TIP.cloneNode(true);
        tip.firstChild!.textContent = this.mimeType.split("/")[1].toUpperCase();
        this.root?.appendChild(tip);
        justThumbnail = true;
      }
      this.imgElement.onload = () => this.resize(onfailed, onResize);
      this.imgElement.onerror = () => onfailed("img load error");
      if (justThumbnail) {
        const delaySRC = this.delaySRC;
        this.delaySRC = undefined;
        if (delaySRC) {
          delaySRC.then(src => (this.thumbnailSrc = src) && this.render(onfailed, onResize)).catch(onfailed);
        } else { // normally set src
          this.imgElement.src = this.thumbnailSrc || this.blobSrc || DEFAULT_THUMBNAIL;
        }
      } else {
        this.imgElement.src = this.blobSrc || this.thumbnailSrc || DEFAULT_THUMBNAIL;
      }
    }, 30);
  }

  unrender() {
    if (!this.imgElement) return;
    this.imgElement.src = "";
  }

  progress(state: DownloadState) {
    if (!this.root) return;
    if (state.readyState === 4) {
      if (this.downloadBar && this.downloadBar.parentNode) {
        // this.downloadBar.remove(); // in steam, it randomly throw parentNode is null
        this.downloadBar.parentNode.removeChild(this.downloadBar);
      }
      return;
    }
    if (!this.downloadBar) {
      const downloadBar = document.createElement("div");
      downloadBar.classList.add("download-bar");
      downloadBar.innerHTML = `<div style="width: 0%"></div>`;
      this.downloadBar = downloadBar;
      this.root.firstElementChild!.appendChild(this.downloadBar);
    }
    if (this.downloadBar) {
      (this.downloadBar.firstElementChild as HTMLDivElement).style.width = (state.loaded / state.total) * 100 + "%";
    }
  }

  changeStyle(fetchStatus?: "fetching" | "fetched" | "failed" | "init", failedReason?: string) {
    if (!this.root) return;
    const clearClass = () => this.root!.classList.forEach(cls => ["img-excluded", "img-fetching", "img-fetched", "img-fetch-failed"].includes(cls) && this.root?.classList.remove(cls));
    if (!this.picked) {
      clearClass();
      this.root.classList.add("img-excluded");
    } else {
      switch (fetchStatus) {
        case "fetching":
          clearClass();
          this.root.classList.add("img-fetching");
          break
        case "fetched":
          clearClass();
          this.root.classList.add("img-fetched");
          break;
        case "failed":
          clearClass();
          this.root.classList.add("img-fetch-failed");
          break;
        case "init":
          clearClass();
          break;
        default:
          break;
      }
    }
    this.root.querySelector(".img-node-error-hint")?.remove();
    if (failedReason) {
      // create error hint element
      const errorHintElement = document.createElement("div");
      errorHintElement.classList.add("img-node-error-hint");
      errorHintElement.innerHTML = `<span>${failedReason}</span><br><span style="color: white;">You can click here retry again,<br>Or press mouse middle button to open origin image url</span>`;
      this.root.firstElementChild!.appendChild(errorHintElement);
    }
  }

  equal(ele: HTMLElement) {
    if (ele === this.root) {
      return true;
    }
    if (ele === this.root?.firstElementChild) {
      return true;
    }
    if (ele === this.canvasElement || ele === this.imgElement) {
      return true;
    }
    return false;
  }
}

