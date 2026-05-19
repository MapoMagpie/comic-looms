import EBUS from "./event-bus";
import { IMGFetcher } from "./img-fetcher";
import { Chapter } from "./page-fetcher";
import { ADAPTER } from "./platform/adapt";
import { b64EncodeUnicode } from "./utils/random";

type ReadingProgressRecord = {
  chapterSource: string;
  chapterTitle: string;
  index: number;
  nodeKey: string;
  updatedAt: number;
};

const STORAGE_PREFIX = "ehvh_reading_progress_";
const RESTORE_SCAN_AHEAD = 200;

export class ReadingProgress {
  private chapters: () => Chapter[];
  private restoredChapters: Set<string> = new Set();

  constructor(chapters: () => Chapter[]) {
    this.chapters = chapters;

    EBUS.subscribe("ifq-do", (index, imf) => this.save(index, imf));
    EBUS.subscribe("pf-change-chapter", (index) => this.restore(index));
    EBUS.subscribe("pf-on-appended", (_total, _nodes, chapterIndex) => this.restore(chapterIndex));
  }

  private enabled() {
    return ADAPTER.conf.recordReadingProgress;
  }

  private key(chapter: Chapter) {
    const matcherName = ADAPTER.matcher?.name ?? "unknown";
    return STORAGE_PREFIX + b64EncodeUnicode(`${matcherName}\n${chapter.source}`).replaceAll(/[+=\/]/g, "-");
  }

  private nodeKey(imf: IMGFetcher) {
    return imf.node.originSrc || imf.node.href || imf.node.thumbnailSrc || imf.node.title;
  }

  private save(index: number, imf: IMGFetcher) {
    if (!this.enabled()) return;
    const chapter = this.chapters()[imf.chapterIndex];
    if (!chapter) return;
    const record: ReadingProgressRecord = {
      chapterSource: chapter.source,
      chapterTitle: Array.isArray(chapter.title) ? chapter.title.join(" / ") : chapter.title,
      index,
      nodeKey: this.nodeKey(imf),
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(this.key(chapter), JSON.stringify(record));
  }

  private read(chapter: Chapter): ReadingProgressRecord | null {
    const raw = window.localStorage.getItem(this.key(chapter));
    if (!raw) return null;
    try {
      return JSON.parse(raw) as ReadingProgressRecord;
    } catch (_err) {
      return null;
    }
  }

  private restore(chapterIndex: number) {
    if (!this.enabled() || chapterIndex < 0) return;
    const chapter = this.chapters()[chapterIndex];
    if (!chapter || this.restoredChapters.has(this.key(chapter))) return;
    const record = this.read(chapter);
    if (!record) return;

    const matchingIndex = chapter.filteredQueue.findIndex(imf => this.nodeKey(imf) === record.nodeKey);
    const scanLimit = record.nodeKey ? record.index + RESTORE_SCAN_AHEAD : record.index;
    if (matchingIndex < 0 && !chapter.done && chapter.filteredQueue.length <= scanLimit) {
      EBUS.emit("pf-load-until", chapterIndex, scanLimit, record.index);
      return;
    }

    const fallbackIndex = Math.min(record.index, Math.max(chapter.filteredQueue.length - 1, 0));
    const targetIndex = matchingIndex >= 0 ? matchingIndex : fallbackIndex;
    const target = chapter.filteredQueue[targetIndex];

    if (target) {
      this.restoredChapters.add(this.key(chapter));
      EBUS.emit("imf-on-click", target);
      EBUS.emit("notify-message", "info", `Resume from page ${target.index + 1}`, 1500);
    } else if (!chapter.done) {
      EBUS.emit("pf-load-until", chapterIndex, record.index, record.index);
    }
  }
}
