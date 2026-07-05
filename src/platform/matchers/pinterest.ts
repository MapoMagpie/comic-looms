import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type PinterestImage = {
  height: number,
  url: string,
  width: number,
}

type PinterestImageMap = Record<string, PinterestImage | PinterestImage[] | undefined>;

type PinterestPin = {
  id: string,
  type: string,
  title?: string,
  grid_title?: string,
  description?: string,
  images?: PinterestImageMap,
}

type PinterestResource = {
  data?: {
    results?: PinterestPin[],
  } & PinterestPin,
  nextBookmark?: string,
}

type PinterestInitialProps = {
  initialReduxState?: {
    pins?: Record<string, PinterestPin>,
    resources?: Record<string, Record<string, PinterestResource>>,
  },
}

type PinterestPage = {
  pins?: PinterestPin[],
  domPins?: PinterestDomPin[],
  nextBookmark?: string,
}

const RESOURCE_NAME = "BaseSearchResource";
const PIN_ID_REGEXP = /\/pin\/([^/]+)/;
const PIN_IMG_SELECTOR = "a[href*='/pin/'] img[src*='pinimg.com']";
const DOM_PIN_BATCH_SIZE = 16;

type PinterestDomPin = {
  id: string,
  href: string,
  title: string,
  thumbnailSrc: string,
  originSrc?: string,
  rect: {
    w: number,
    h: number,
  },
}

class PinterestMatcher extends BaseMatcher<PinterestPage> {
  private resourceOptions?: Record<string, unknown>;
  private nextBookmark?: string;
  private seenPinIDs: Set<string> = new Set();
  private pinCount = 0;

  async *fetchPagesSource(): AsyncGenerator<Result<PinterestPage>> {
    try {
      if (isHomePage()) {
        for await (const page of this.fetchDomPinPages()) {
          yield Result.ok(page);
        }
        return;
      }

      if (isPinPage()) {
        const initial = tryParseInitialProps();
        if (initial) {
          const pins = extractPinPagePins(initial);
          pins.forEach(pin => this.seenPinIDs.add(pin.id));
          yield Result.ok({ pins });
        }
        for await (const page of this.fetchDomPinPages()) {
          yield Result.ok(page);
        }
        return;
      }

      const initial = tryParseInitialProps();
      const resource = initial ? tryExtractSearchResource(initial) : undefined;
      if (!resource) {
        for await (const page of this.fetchDomPinPages()) {
          yield Result.ok(page);
        }
        return;
      }
      this.resourceOptions = resource.options;
      this.nextBookmark = resource.nextBookmark;
      resource.pins.forEach(pin => this.seenPinIDs.add(pin.id));
      yield Result.ok({ pins: resource.pins, nextBookmark: resource.nextBookmark });

      while (this.nextBookmark && this.nextBookmark !== "-end-") {
        try {
          const next = await this.fetchSearchPage(this.nextBookmark);
          this.nextBookmark = next.nextBookmark;
          next.pins?.forEach(pin => this.seenPinIDs.add(pin.id));
          yield Result.ok(next);
        } catch {
          this.nextBookmark = undefined;
          for await (const page of this.fetchDomPinPages()) {
            yield Result.ok(page);
          }
        }
      }
    } catch (error) {
      yield Result.err(error as Error);
    }
  }

  async parseImgNodes(page: PinterestPage): Promise<ImageNode[]> {
    const list: ImageNode[] = [];
    for (const pin of page.pins ?? []) {
      if (pin.type !== "pin" || !pin.images) continue;
      const thumb = pickImage(pin.images, ["236x", "474x", "736x", "1200x", "orig"]);
      const origin = pickImage(pin.images, ["orig", "1200x", "736x", "564x", "474x", "236x"]);
      if (!thumb?.url || !origin?.url) continue;
      const title = buildTitle(pin, origin.url);
      list.push(new ImageNode(
        thumb.url,
        `${window.location.origin}/pin/${pin.id}/`,
        title,
        undefined,
        origin.url,
        { w: origin.width || thumb.width, h: origin.height || thumb.height },
      ));
      this.pinCount++;
    }
    for (const pin of page.domPins ?? []) {
      list.push(new ImageNode(
        pin.thumbnailSrc,
        pin.href,
        buildTitleFromText(pin.title, pin.id, pin.thumbnailSrc),
        undefined,
        pin.originSrc,
        pin.rect,
      ));
      this.pinCount++;
    }
    return list;
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    if (node.originSrc) return { url: node.originSrc };
    const doc = await window.fetch(node.href, { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error(`Pinterest pin request failed: ${res.status} ${res.statusText}`);
        return res.text();
      })
      .then(text => new DOMParser().parseFromString(text, "text/html"));
    const initial = parseInitialProps(doc);
    const pinID = node.href.match(PIN_ID_REGEXP)?.[1];
    const pin = extractPinPagePins(initial, pinID)[0];
    if (!pin?.images) throw new Error("cannot find Pinterest pin origin image");
    const origin = pickImage(pin.images, ["orig", "1200x", "736x", "564x", "474x", "236x"]);
    if (!origin?.url) throw new Error("cannot find Pinterest pin origin image url");
    return { url: origin.url };
  }

  galleryMeta(): GalleryMeta {
    const pageTitle = document.title && document.title !== "Pinterest" ? document.title : "pinterest";
    return new GalleryMeta(window.location.href, `${pageTitle}-${this.pinCount}`);
  }

  private async fetchSearchPage(bookmark: string): Promise<PinterestPage> {
    if (!this.resourceOptions) throw new Error("Pinterest search resource options are missing");
    const params = new URLSearchParams();
    params.set("source_url", window.location.pathname + window.location.search);
    params.set("data", JSON.stringify({
      options: { ...this.resourceOptions, bookmarks: [bookmark] },
      context: {},
    }));
    params.set("_", Date.now().toString());
    const json = await window.fetch(`/resource/${RESOURCE_NAME}/get/?${params.toString()}`, {
      credentials: "include",
      headers: {
        "Accept": "application/json, text/javascript, */*, q=0.01",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then(res => {
      if (!res.ok) throw new Error(`Pinterest resource request failed: ${res.status} ${res.statusText}`);
      return res.json();
    });
    const data = json?.resource_response?.data;
    const pins = Array.isArray(data?.results) ? data.results.filter(isPin) : [];
    const nextBookmark = json?.resource?.options?.bookmarks?.[0] ?? json?.resource_response?.bookmark ?? json?.resource_response?.nextBookmark;
    return { pins, nextBookmark };
  }

  private async *fetchDomPinPages(): AsyncGenerator<PinterestPage> {
    let idleTimes = 0;
    while (idleTimes < 4) {
      const domPins = this.collectRelatedPins();
      if (domPins.length > 0) {
        idleTimes = 0;
        for (let i = 0; i < domPins.length; i += DOM_PIN_BATCH_SIZE) {
          yield { domPins: domPins.slice(i, i + DOM_PIN_BATCH_SIZE) };
        }
        continue;
      } else {
        idleTimes++;
      }
      window.scrollBy(0, Math.max(window.innerHeight, 900));
      await sleep(1200);
    }
  }

  private collectRelatedPins(): PinterestDomPin[] {
    const currentID = window.location.pathname.match(PIN_ID_REGEXP)?.[1];
    const pins: PinterestDomPin[] = [];
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(PIN_IMG_SELECTOR));
    for (const img of imgs) {
      const href = img.closest<HTMLAnchorElement>("a[href*='/pin/']")?.href;
      const id = href?.match(PIN_ID_REGEXP)?.[1];
      const srcs = pickDomImageSrcs(img);
      if (!href || !id || !srcs.thumbnail || id === currentID || this.seenPinIDs.has(id)) continue;
      this.seenPinIDs.add(id);
      pins.push({
        id,
        href,
        title: img.alt || `pinterest-${id}`,
        thumbnailSrc: srcs.thumbnail,
        originSrc: srcs.origin,
        rect: {
          w: img.naturalWidth || img.width || 236,
          h: img.naturalHeight || img.height || 236,
        },
      });
    }
    return pins;
  }
}

function isPinPage(): boolean {
  return PIN_ID_REGEXP.test(window.location.pathname);
}

function isHomePage(): boolean {
  return /^\/?$/.test(window.location.pathname);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

function parseInitialProps(doc: Document = document): PinterestInitialProps {
  const raw = doc.querySelector<HTMLScriptElement>("#__PWS_INITIAL_PROPS__")?.textContent;
  if (!raw) throw new Error("cannot find Pinterest initial props");
  return JSON.parse(raw) as PinterestInitialProps;
}

function tryParseInitialProps(doc: Document = document): PinterestInitialProps | undefined {
  try {
    return parseInitialProps(doc);
  } catch {
    return undefined;
  }
}

function extractSearchResource(initial: PinterestInitialProps): { options: Record<string, unknown>, pins: PinterestPin[], nextBookmark?: string } {
  const resources = initial.initialReduxState?.resources?.[RESOURCE_NAME];
  const entry = resources ? Object.entries(resources)[0] : undefined;
  if (!entry) throw new Error("cannot find Pinterest search resource");
  const [optionsRaw, resource] = entry;
  const options = Object.fromEntries(JSON.parse(optionsRaw) as [string, unknown][]);
  const pins = Array.isArray(resource.data?.results) ? resource.data.results.filter(isPin) : [];
  return { options, pins, nextBookmark: resource.nextBookmark };
}

function tryExtractSearchResource(initial: PinterestInitialProps): { options: Record<string, unknown>, pins: PinterestPin[], nextBookmark?: string } | undefined {
  try {
    return extractSearchResource(initial);
  } catch {
    return undefined;
  }
}

function extractPinPagePins(initial: PinterestInitialProps, expectedID?: string): PinterestPin[] {
  const pathID = expectedID ?? window.location.pathname.match(PIN_ID_REGEXP)?.[1];
  const pins = Object.values(initial.initialReduxState?.pins ?? {}).filter(isPin);
  if (!pathID) return pins;
  const current = pins.find(pin => pin.id === pathID);
  return current ? [current] : pins;
}

function isPin(value: unknown): value is PinterestPin {
  const pin = value as PinterestPin | undefined;
  return !!pin && pin.type === "pin" && !!pin.id && !!pin.images;
}

function pickImage(images: PinterestImageMap, keys: string[]): PinterestImage | undefined {
  for (const key of keys) {
    const image = images[key];
    if (Array.isArray(image)) {
      const found = image.find(img => img?.url);
      if (found) return found;
    } else if (image?.url) {
      return image;
    }
  }
  return Object.values(images).flat().find(img => img?.url);
}

function pickDomImageSrcs(img: HTMLImageElement): { thumbnail: string, origin?: string } {
  const srcset = (img.getAttribute("srcset") ?? "")
    .split(",")
    .map(src => src.trim().split(/\s+/)[0])
    .filter(Boolean);
  const current = img.currentSrc || img.src;
  const sources = [...srcset, current].filter(Boolean);
  const origin = sources.find(src => src.includes("/originals/")) ?? sources.find(src => src.includes("/736x/")) ?? current;
  const thumbnail = current || sources.find(src => src.includes("/474x/")) || sources.find(src => src.includes("/236x/")) || origin;
  return { thumbnail, origin };
}

function buildTitle(pin: PinterestPin, src: string): string {
  const rawTitle = pin.title || pin.grid_title || pin.description || `pinterest-${pin.id}`;
  return buildTitleFromText(rawTitle, pin.id, src);
}

function buildTitleFromText(rawTitle: string, id: string, src: string): string {
  const ext = src.match(/\.(\w+)(?:\?|$)/)?.[1] ?? "jpg";
  const title = rawTitle.trim().replaceAll(/\s+/g, " ").replaceAll(/[\\/:*?"<>|]/g, "_");
  return `${title || `pinterest-${id}`}-${id}.${ext}`;
}

ADAPTER.addSetup({
  name: "Pinterest",
  workURLs: [
    /pinterest\.[^/]+\/?([?#].*)?$/,
    /pinterest\.[^/]+\/search\/pins\/.*[?&]q=/,
    /pinterest\.[^/]+\/pin\/\d+/,
  ],
  match: ["https://*.pinterest.com/*"],
  constructor: () => new PinterestMatcher(),
});
