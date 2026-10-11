import { clamp, MediaAction } from "./media-actions";
import { i18n } from "../utils/i18n";

// ImageDecoder is not yet included in every TypeScript DOM library.
interface DecodedImage extends VideoFrame { duration: number | null; }
interface Decoder {
  tracks: { ready: Promise<void>; selectedTrack?: { animated: boolean; frameCount: number } | null };
  completed: Promise<void>;
  decode(options: { frameIndex: number }): Promise<{ image: DecodedImage }>;
  close(): void;
}
interface DecoderConstructor {
  new(options: { data: ArrayBuffer; type: string; preferAnimation: boolean }): Decoder;
  isTypeSupported(type: string): Promise<boolean>;
}

export class AnimationControl {
  readonly img: HTMLImageElement;
  ready = false;
  paused = true;
  private disposed = false;
  private decoder?: Decoder;
  private canvas?: HTMLCanvasElement;
  private bar?: HTMLDivElement;
  private button?: HTMLButtonElement;
  private progress?: HTMLInputElement;
  private label?: HTMLSpanElement;
  private index = 0;
  private requestedIndex = 0;
  private count = 0;
  private delay = 100;
  private version = 0;
  private timer?: ReturnType<typeof setTimeout>;
  private queue: Promise<void> = Promise.resolve();
  private abort = new AbortController();
  private display: string;
  private src: string;
  private root: HTMLElement;

  constructor(img: HTMLImageElement, root: HTMLElement) {
    this.img = img;
    this.root = root;
    this.src = img.src;
    this.display = img.style.display;
  }

  async init(): Promise<void> {
    const ImageDecoder = (globalThis as typeof globalThis & { ImageDecoder?: DecoderConstructor }).ImageDecoder;
    // Only use the already downloaded original image; never fetch thumbnails again.
    if (!ImageDecoder || !this.src.startsWith("blob:")) return;
    try {
      const response = await fetch(this.src, { signal: this.abort.signal });
      const blob = await response.blob();
      if (!this.live()) return;
      const type = await this.animationType(blob, ImageDecoder);
      if (!type) return;
      const data = await blob.arrayBuffer();
      if (!this.live()) return;
      const decoder = this.decoder = new ImageDecoder({ data, type, preferAnimation: true });
      await decoder.tracks.ready;
      await decoder.completed;
      if (!this.live()) return;
      const track = decoder.tracks.selectedTrack;
      if (!track?.animated || track.frameCount < 2) { decoder.close(); this.decoder = undefined; return; }
      this.count = track.frameCount;
      this.createCanvas();
      // Draw before hiding the original so a failed decoder always leaves a visible image.
      await this.draw(0, ++this.version);
      if (!this.live()) return;
      this.img.after(this.canvas!);
      this.img.style.display = "none";
      this.createBar();
      this.ready = true;
      this.play();
    } catch (error) {
      if (!this.disposed) console.debug("Comic Looms: animated image control unavailable", error);
      this.destroy();
    }
  }

  private async animationType(blob: Blob, decoder: DecoderConstructor) {
    const header = new Uint8Array(await blob.slice(0, 12).arrayBuffer());
    const text = String.fromCharCode(...header);
    let type = "";
    if (text.startsWith("GIF8")) type = "image/gif";
    if (text.startsWith("RIFF") && text.slice(8) === "WEBP") type = "image/webp";
    if (!type || !await decoder.isTypeSupported(type) || !this.live()) return;
    return type;
  }

  private createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = this.img.className;
    this.canvas.style.cssText = this.img.style.cssText;
    this.canvas.setAttribute("role", "img");
    this.canvas.setAttribute("aria-label", this.img.alt || "Animated image");
  }

  private live() {
    const live = !this.disposed && this.img.isConnected && this.img.src === this.src;
    if (!live && !this.disposed) this.destroy();
    return live;
  }

  private createBar() {
    const bar = this.bar = document.createElement("div");
    bar.className = "bifm-animation-control";
    const button = this.button = document.createElement("button");
    button.type = "button";
    button.title = i18n.keyboard["video-play-pause"].get();
    button.setAttribute("aria-label", button.title);
    button.addEventListener("click", () => this.action("video-play-pause"));
    const progress = this.progress = document.createElement("input");
    progress.type = "range";
    progress.min = "0";
    progress.max = String(this.count - 1);
    progress.step = "1";
    progress.setAttribute("aria-label", "Animation frame");
    progress.addEventListener("input", () => this.seek(Number(progress.value)));
    this.label = document.createElement("span");
    bar.append(button, progress, this.label);
    for (const name of ["click", "dblclick", "pointerdown", "mousedown", "wheel", "keydown"]) {
      bar.addEventListener(name, event => event.stopPropagation());
    }
    this.root.append(bar);
    this.render();
  }

  private async draw(index: number, version: number) {
    if (!this.decoder || !this.live() || version !== this.version) return;
    const { image } = await this.decoder.decode({ frameIndex: index });
    try {
      if (!this.live() || version !== this.version || !this.canvas) return;
      this.canvas.width = image.displayWidth;
      this.canvas.height = image.displayHeight;
      const ctx = this.canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D unavailable");
      ctx.drawImage(image, 0, 0);
      this.index = index;
      const duration = (image.duration ?? 100000) / 1000;
      this.delay = duration > 0 ? duration : 100;
      this.render();
    } finally { image.close(); }
  }

  private render() {
    if (this.button) this.button.textContent = this.paused ? "▶" : "Ⅱ";
    if (this.progress) this.progress.value = String(this.index);
    if (this.label) this.label.textContent = `${this.index + 1} / ${this.count}`;
  }

  private schedule() {
    clearTimeout(this.timer);
    if (this.paused || !this.live()) return;
    this.timer = setTimeout(() => this.seek((this.index + 1) % this.count), this.delay);
  }

  private play() { this.paused = false; this.render(); this.schedule(); }
  private pause() { this.paused = true; clearTimeout(this.timer); this.render(); }

  private seek(index: number) {
    clearTimeout(this.timer);
    const version = ++this.version;
    const target = clamp(Math.round(index), 0, this.count - 1);
    this.requestedIndex = target;
    // Serialize decoder calls and discard superseded seeks, including an in-flight playback frame.
    this.queue = this.queue.then(() => this.draw(target, version)).then(() => {
      if (version === this.version) this.schedule();
    }).catch(() => this.destroy());
  }

  action(action: MediaAction) {
    if (!this.ready || !this.live()) return;
    const step = Math.max(1, Math.round(this.count / 10));
    switch (action) {
      case "video-play-pause":
        if (this.paused) this.play(); else { ++this.version; this.requestedIndex = this.index; this.pause(); }
        break;
      case "video-seek-backward": this.seek(this.requestedIndex - step); break;
      case "video-seek-forward": this.seek(this.requestedIndex + step); break;
      case "video-frame-prev": this.pause(); this.seek(this.requestedIndex - 1); break;
      case "video-frame-next": this.pause(); this.seek(this.requestedIndex + 1); break;
    }
  }

  destroy() {
    if (this.disposed) return;
    this.disposed = true;
    this.ready = false;
    ++this.version;
    this.pause();
    this.abort.abort();
    this.decoder?.close();
    this.decoder = undefined;
    this.canvas?.remove();
    this.bar?.remove();
    this.img.style.display = this.display;
  }
}
