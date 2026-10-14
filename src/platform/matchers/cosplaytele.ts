import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode, { DEFAULT_THUMBNAIL, NodeAction } from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { IMGFetcher } from "../../img-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";
import { cosplayAlbums, cosplayImages, cosplayPlayers, videosFirst, CosplayMedia } from "./cosplaytele-parser";

const PLAYER_CARD = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#171717"/><text x="320" y="165" text-anchor="middle" fill="white" font-size="34">JW PLAYER VIDEO</text><text x="320" y="215" text-anchor="middle" fill="white" font-size="22">Hover thumbnail and click ▶ to play</text></svg>';
const PLAYER_THUMB = `data:image/svg+xml,${encodeURIComponent(PLAYER_CARD)}`;

// Runs before the main reader's iframe guard. Only the known embed can notify its host.
if (location.hostname === "cossora.stream" && location.pathname.startsWith("/embed/") && window.parent !== window) {
  let parentOrigin = "";
  try { parentOrigin = new URL(document.referrer).origin; } catch { /* no parent */ }
  if (/^https:\/\/(?:www\.)?cosplaytele\.com$/.test(parentOrigin)) {
    window.addEventListener("message", event => {
      if (event.source !== window.parent || event.origin !== parentOrigin || event.data?.type !== "comic-looms-get-poster") return;
      const preview = document.querySelector<HTMLElement>(".jw-preview");
      const poster = document.querySelector("video")?.poster || preview?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
      if (poster && /^https:\/\//.test(poster)) window.parent.postMessage({ type: "comic-looms-poster", poster }, parentOrigin);
    });
    window.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      event.preventDefault(); event.stopImmediatePropagation();
      window.parent.postMessage({ type: "comic-looms-close-player" }, parentOrigin);
    }, true);
  }
}

let activePlayer: HTMLDialogElement | undefined;

// Read only an already-present original player; do not load hidden player/ad frames.
async function playerPoster(embed: string): Promise<string | undefined> {
  const frame = Array.from(document.querySelectorAll<HTMLIFrameElement>(".entry-content iframe"))
    .find(frame => frame.src === embed);
  if (!frame?.contentWindow) return undefined;
  return new Promise(resolve => {
    const finish = (poster?: string) => {
      window.removeEventListener("message", receive);
      clearInterval(retry); clearTimeout(timeout);
      resolve(poster);
    };
    const receive = (event: MessageEvent) => {
      if (event.origin !== "https://cossora.stream" || event.source !== frame.contentWindow || event.data?.type !== "comic-looms-poster") return;
      try {
        const url = new URL(event.data.poster);
        if (url.protocol === "https:" && (url.hostname === "cossora.stream" || url.hostname.endsWith(".cossora.stream"))) finish(url.href);
      } catch { /* invalid poster */ }
    };
    const request = () => frame.contentWindow?.postMessage({ type: "comic-looms-get-poster" }, "https://cossora.stream");
    const retry = setInterval(request, 200);
    const timeout = setTimeout(() => finish(), 1200);
    window.addEventListener("message", receive);
    request();
  });
}

function openPlayer(url: string, sourcePage: string) {
  if (activePlayer?.open) return;
  const previousFocus = document.activeElement as HTMLElement | null;
  const dialog = document.createElement("dialog");
  activePlayer = dialog;
  const abort = new AbortController();
  dialog.style.cssText = "padding:12px;background:#171717;color:white;border:0;width:90vw;max-width:1200px;";
  const close = document.createElement("button");
  close.textContent = "关闭视频 / Close";
  const original = document.createElement("a");
  original.textContent = "在新标签页打开原文章播放 / Open original article";
  original.href = sourcePage;
  original.target = "_blank";
  original.rel = "noopener";
  original.style.cssText = "display:inline-block;margin:8px 16px;color:#9bd5ff;";
  const frame = document.createElement("iframe");
  frame.src = url;
  frame.title = "Cosplaytele JW Player";
  frame.allowFullscreen = true;
  frame.allow = "fullscreen; picture-in-picture";
  // Match the original site's unsandboxed embed: this provider rejects sandboxed frames.
  frame.style.cssText = "display:block;width:100%;height:75vh;border:0;margin-top:8px;";
  dialog.append(close, original, frame);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  close.onclick = () => dialog.close();
  dialog.addEventListener("cancel", event => { event.preventDefault(); dialog.close(); });
  window.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    event.preventDefault(); event.stopImmediatePropagation(); dialog.close();
  }, { capture: true, signal: abort.signal });
  window.addEventListener("message", event => {
    if (event.origin === "https://cossora.stream" && event.source === frame.contentWindow && event.data?.type === "comic-looms-close-player") dialog.close();
  }, { signal: abort.signal });
  dialog.addEventListener("close", () => {
    abort.abort(); frame.remove(); dialog.remove(); activePlayer = undefined;
    previousFocus?.focus();
  }, { once: true });
  document.body.append(dialog);
  dialog.showModal();
  close.focus();
}

class CosplayteleMatcher extends BaseMatcher<CosplayMedia[]> {
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    if (document.querySelector('.entry-content .gallery, .entry-content .wp-block-gallery') || cosplayPlayers(document, location.href).length) {
      return [new Chapter(0, document.querySelector("h1.entry-title, h1")?.textContent?.trim() || document.title, location.href)];
    }
    const albums = cosplayAlbums(document, location.href);
    if (!albums.length) throw new Error("Cosplaytele: no galleries found on this page");
    return albums.map((album, id) => new Chapter(id, album.title, album.url, album.cover));
  }

  async *fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<CosplayMedia[]>> {
    let doc = document;
    if (chapter.source !== location.href) {
      const response = await fetch(chapter.source);
      if (!response.ok) throw new Error(`Cosplaytele HTTP ${response.status}`);
      doc = new DOMParser().parseFromString(await response.text(), "text/html");
    }
    const images = cosplayImages(doc, chapter.source);
    const videos: CosplayMedia[] = [];
    if (!ADAPTER.conf.excludeVideo) {
      const players = cosplayPlayers(doc, chapter.source);
      const posters = await Promise.all(players.map(playerPoster));
      for (const [index, embed] of players.entries()) {
        const poster = posters[index];
        const cover = doc.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content;
        const thumbnail = poster || (cover && /^https:\/\//.test(cover) ? cover : images[0]?.thumbnail) || PLAYER_THUMB;
        videos.push({ url: thumbnail === PLAYER_THUMB ? DEFAULT_THUMBNAIL : thumbnail, thumbnail,
          title: `JW Player ${index + 1} — hover and click ▶ (stream, not a download)`, embed, sourcePage: chapter.source });
      }
    }
    if (!images.length && !videos.length) throw new Error("Cosplaytele: no gallery images or videos found");
    yield Result.ok(videosFirst(videos, images));
  }

  async parseImgNodes(images: CosplayMedia[]): Promise<ImageNode[]> {
    return images.map(img => {
      const node = new ImageNode(img.thumbnail, img.embed ?? img.url, img.title, undefined, img.url);
      if (img.embed) {
        node.picked = false;
        node.openEmbeddedMedia = () => openPlayer(img.embed!, img.sourcePage ?? location.href);
        node.actions.push(new NodeAction("▶", "Play in original JW Player", async () => openPlayer(img.embed!, img.sourcePage ?? location.href), true));
      }
      return node;
    });
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }

  async fetchImageData(imf: IMGFetcher): Promise<[Blob, number] | null> {
    if (/^https:\/\/cossora\.stream\/embed\//.test(imf.node.href) && imf.node.originSrc === DEFAULT_THUMBNAIL) {
      return [new Blob([PLAYER_CARD], { type: "image/svg+xml" }), 200];
    }
    return super.fetchImageData(imf);
  }

  galleryMeta(chapter: Chapter): GalleryMeta {
    return new GalleryMeta(chapter.source, Array.isArray(chapter.title) ? chapter.title.join(" ") : chapter.title);
  }
}

ADAPTER.addSetup({
  name: "Cosplaytele",
  workURLs: [/^https:\/\/(?:www\.)?cosplaytele\.com\//],
  match: ["https://cosplaytele.com/*", "https://www.cosplaytele.com/*"],
  constructor: () => new CosplayteleMatcher(),
});
