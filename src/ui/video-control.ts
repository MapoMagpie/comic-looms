import { saveConf } from "../config";
import { ADAPTER } from "../platform/adapt";
import { evLog } from "../utils/ev-log";
import onMouse from "../utils/progress-bar";
import q from "../utils/query-element";
import { clamp, MediaAction } from "./media-actions";

const PLAY_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z"/></svg>`;
const PAUSE_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"/></svg>`;
const VOLUME_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill="#fff" d="M10.0012 8.99984H9.1C8.53995 8.99984 8.25992 8.99984 8.04601 9.10883C7.85785 9.20471 7.70487 9.35769 7.60899 9.54585C7.5 9.75976 7.5 10.0398 7.5 10.5998V13.3998C7.5 13.9599 7.5 14.2399 7.60899 14.4538C7.70487 14.642 7.85785 14.795 8.04601 14.8908C8.25992 14.9998 8.53995 14.9998 9.1 14.9998H10.0012C10.5521 14.9998 10.8276 14.9998 11.0829 15.0685C11.309 15.1294 11.5228 15.2295 11.7143 15.3643C11.9305 15.5164 12.1068 15.728 12.4595 16.1512L15.0854 19.3023C15.5211 19.8252 15.739 20.0866 15.9292 20.1138C16.094 20.1373 16.2597 20.0774 16.3712 19.9538C16.5 19.811 16.5 19.4708 16.5 18.7902V5.20948C16.5 4.52892 16.5 4.18864 16.3712 4.04592C16.2597 3.92233 16.094 3.86234 15.9292 3.8859C15.7389 3.9131 15.5211 4.17451 15.0854 4.69733L12.4595 7.84843C12.1068 8.27166 11.9305 8.48328 11.7143 8.63542C11.5228 8.77021 11.309 8.87032 11.0829 8.93116C10.8276 8.99984 10.5521 8.99984 10.0012 8.99984Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const MUTED_ICON = `<svg width="1.4rem" height="1.4rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M16 9.50009L21 14.5001M21 9.50009L16 14.5001M4.6 9.00009H5.5012C6.05213 9.00009 6.32759 9.00009 6.58285 8.93141C6.80903 8.87056 7.02275 8.77046 7.21429 8.63566C7.43047 8.48353 7.60681 8.27191 7.95951 7.84868L10.5854 4.69758C11.0211 4.17476 11.2389 3.91335 11.4292 3.88614C11.594 3.86258 11.7597 3.92258 11.8712 4.04617C12 4.18889 12 4.52917 12 5.20973V18.7904C12 19.471 12 19.8113 11.8712 19.954C11.7597 20.0776 11.594 20.1376 11.4292 20.114C11.239 20.0868 11.0211 19.8254 10.5854 19.3026L7.95951 16.1515C7.60681 15.7283 7.43047 15.5166 7.21429 15.3645C7.02275 15.2297 6.80903 15.1296 6.58285 15.0688C6.32759 15.0001 6.05213 15.0001 5.5012 15.0001H4.6C4.03995 15.0001 3.75992 15.0001 3.54601 14.8911C3.35785 14.7952 3.20487 14.6422 3.10899 14.4541C3 14.2402 3 13.9601 3 13.4001V10.6001C3 10.04 3 9.76001 3.10899 9.54609C3.20487 9.35793 3.35785 9.20495 3.54601 9.10908C3.75992 9.00009 4.03995 9.00009 4.6 9.00009Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

type VideoState = {
  time: number;
  duration: number;
}

type UI = {
  root: HTMLElement;
  playBTN: HTMLButtonElement;
  volumeBTN: HTMLButtonElement;
  volumeProgress: HTMLProgressElement;
  progress: HTMLProgressElement;
  duration: HTMLSpanElement;
  time: HTMLSpanElement;
}

export class VideoControl {

  ui: UI;
  paused: boolean = false;
  abort?: AbortController;
  elementID?: string;
  root: HTMLElement;
  private revealTimer?: ReturnType<typeof setTimeout>;
  private element?: HTMLVideoElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.ui = this.create(this.root);
    this.flushUI();
  }

  private show() {
    this.ui.root.hidden = false;
  }

  private hidden() {
    this.ui.root.hidden = true;
  }

  private create(root: HTMLElement): UI {
    const ui = document.createElement("div");
    ui.classList.add("bifm-vid-ctl");
    ui.innerHTML = `
<div>
  <button id="bifm-vid-ctl-play" class="bifm-vid-ctl-btn">${PLAY_ICON}</button>
  <button id="bifm-vid-ctl-mute" class="bifm-vid-ctl-btn">${MUTED_ICON}</button>
    <div id="bifm-vid-ctl-volume" class="bifm-vid-ctl-pg">
      <div class="bifm-vid-ctl-pg-inner" style="width: 30%"></div>
    </div>
  <span id="bifm-vid-ctl-time" class="bifm-vid-ctl-span">00:00</span>
  <span class="bifm-vid-ctl-span">/</span>
  <span id="bifm-vid-ctl-duration" class="bifm-vid-ctl-span">10:00</span>
  <!-- <span id = "bifm-vid-ctl-drag" class="bifm-vid-ctl-span" style = "cursor: grab;">✠</span> -->
</div>
<div>
    <div id="bifm-vid-ctl-pg" class="bifm-vid-ctl-pg">
      <div class="bifm-vid-ctl-pg-inner" style="width: 30%"></div>
    </div>
</div>
`;
    root.appendChild(ui);
    return {
      root: ui,
      playBTN: q("#bifm-vid-ctl-play", ui),
      volumeBTN: q("#bifm-vid-ctl-mute", ui),
      volumeProgress: q("#bifm-vid-ctl-volume", ui),
      progress: q("#bifm-vid-ctl-pg", ui),
      time: q("#bifm-vid-ctl-time", ui),
      duration: q("#bifm-vid-ctl-duration", ui),
    };
  }

  private flushUI(state?: VideoState, onlyState?: boolean) {
    const value = Number.isFinite(state?.time) ? state!.time : 0;
    const max = Number.isFinite(state?.duration) ? state!.duration : 0;
    const percent = max > 0 ? clamp(value / max * 100, 0, 100) : 0;
    (this.ui.progress.firstElementChild as HTMLElement).style.width = `${percent}%`;
    this.ui.time.textContent = secondsToTime(value);
    this.ui.duration.textContent = secondsToTime(max);
    if (onlyState) return;
    this.ui.playBTN.innerHTML = this.paused ? PLAY_ICON : PAUSE_ICON;
    this.ui.volumeBTN.innerHTML = ADAPTER.conf.muted ? MUTED_ICON : VOLUME_ICON;
    (this.ui.volumeProgress.firstElementChild as HTMLElement).style.width = `${ADAPTER.conf.volume ?? 30}%`;
  }

  public attach(element: HTMLVideoElement) {
    if (this.getVideoElement() === element) return;
    // evLog("info", "attach video control, src: ", element.src)
    this.detach();
    this.element = element;
    this.show();
    this.abort = new AbortController();
    const state = { time: element.currentTime, duration: element.duration };
    this.flushUI(state);
    element.addEventListener("timeupdate", (event) => {
      const ele = event.target as HTMLVideoElement;
      if (!state) return;
      state.time = ele.currentTime;
      state.duration = ele.duration;
      this.flushUI(state, true);
    }, { signal: this.abort.signal });
    const sync = () => {
      if (this.getVideoElement() !== element) return;
      this.paused = element.paused;
      this.flushUI({ time: element.currentTime, duration: element.duration });
    };
    for (const name of ["play", "pause", "durationchange", "loadedmetadata", "volumechange"]) {
      element.addEventListener(name, sync, { signal: this.abort.signal });
    }
    // why onwaiting triggered when approaching the end of video?
    element.onwaiting = () => evLog("debug", "onwaiting");
    element.loop = true;
    element.muted = ADAPTER.conf.muted || false;
    element.volume = clamp((ADAPTER.conf.volume ?? 30) / 100, 0, 1);

    if (!this.paused) {
      void element.play().catch(() => sync());
    }

    this.elementID = element.id;
    if (!this.elementID) {
      this.elementID = "vid-" + Math.random().toString(36).slice(2);
      element.id = this.elementID;
    }
    this.ui.playBTN.addEventListener("click", () => {
      this.action("video-play-pause");
    }, { signal: this.abort.signal });
    this.ui.volumeBTN.addEventListener("click", () => {
      this.action("video-mute");
    }, { signal: this.abort.signal });

    onMouse(this.ui.progress, (percent) => {
      const vid = this.getVideoElement();
      if (!vid || !Number.isFinite(vid.duration)) return;
      vid.currentTime = vid.duration * (clamp(percent, 0, 100) / 100);
      state.time = vid.currentTime;
      this.flushUI(state);
    }, this.abort.signal);

    onMouse(this.ui.volumeProgress, (percent) => {
      const vid = this.getVideoElement();
      if (!vid) return;
      ADAPTER.conf.volume = clamp(percent, 0, 100);
      vid.volume = Math.min(1, ADAPTER.conf.volume / 100);
      saveConf({ volume: ADAPTER.conf.volume });
      this.flushUI(state);
    }, this.abort.signal);
  }

  public detach() {
    clearTimeout(this.revealTimer);
    this.ui.root.classList.remove("bifm-vid-ctl-reveal");
    this.abort?.abort();
    const vid = this.getVideoElement();
    if (vid) vid.pause();
    this.elementID = undefined;
    this.element = undefined;
    this.abort = undefined;
    this.flushUI();
    this.hidden();
  }

  public action(action: MediaAction) {
    const vid = this.getVideoElement();
    if (!vid) return;
    switch (action) {
      case "video-play-pause":
        this.paused = !vid.paused;
        if (this.paused) vid.pause();
        else void vid.play().catch(() => {
          if (this.getVideoElement() === vid) { this.paused = vid.paused; this.sync(vid); }
        });
        break;
      case "video-seek-backward":
      case "video-seek-forward":
      case "video-frame-prev":
      case "video-frame-next": {
        const frame = action.startsWith("video-frame-");
        if (frame) { this.paused = true; vid.pause(); }
        if (!Number.isFinite(vid.duration) || vid.duration <= 0) break;
        // HTMLVideoElement has no portable frame-index seek API. This is a 30fps approximation.
        const delta = (action.endsWith("backward") || action.endsWith("prev") ? -1 : 1) * (frame ? 1 / 30 : 5);
        vid.currentTime = clamp(vid.currentTime + delta, 0, vid.duration);
        break;
      }
      case "video-mute":
        ADAPTER.conf.muted = vid.muted = !vid.muted;
        saveConf({ muted: vid.muted });
        break;
      case "video-volume-up":
      case "video-volume-down":
        ADAPTER.conf.volume = clamp(Math.round(vid.volume * 100) + (action.endsWith("up") ? 5 : -5), 0, 100);
        vid.volume = ADAPTER.conf.volume / 100;
        ADAPTER.conf.muted = vid.muted = false;
        saveConf({ volume: ADAPTER.conf.volume, muted: false });
        break;
    }
    this.sync(vid);
    this.ui.root.classList.add("bifm-vid-ctl-reveal");
    clearTimeout(this.revealTimer);
    this.revealTimer = setTimeout(() => this.ui.root.classList.remove("bifm-vid-ctl-reveal"), 1500);
  }

  private sync(vid: HTMLVideoElement) {
    this.flushUI({ time: vid.currentTime, duration: vid.duration });
  }

  private getVideoElement(): HTMLVideoElement | null {
    return this.element ?? null;
  }

}

function secondsToTime(seconds: number): string {
  const min = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
