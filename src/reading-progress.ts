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
  nodeKeyType?: NodeKeyType;
  updatedAt: number;
};

const STORAGE_PREFIX = "ehvh_reading_progress_";
const INDEX_MATCH_TOLERANCE = 20;
const RESTORE_SAVE_SUPPRESSION_MS = 120000;
type NodeKeyType = "originSrc" | "href" | "thumbnailSrc" | "title";

export class ReadingProgress {
  private chapters: () => Chapter[];
  private restoredChapters: Set<string> = new Set();
  private suppressSaveUntilByChapter: Map<number, number> = new Map();
  private restoringChapters: Map<number, number> = new Map();

  constructor(chapters: () => Chapter[]) {
    this.chapters = chapters;

    EBUS.subscribe("ifq-do", (index, imf) => this.save(index, imf));
    EBUS.subscribe("imf-on-finished", (index, success, imf) => this.upgradeSavedKey(index, success, imf));
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

  private nodeKeyInfo(imf: IMGFetcher): { key: string, type: NodeKeyType } {
    if (imf.node.originSrc) return { key: imf.node.originSrc, type: "originSrc" };
    if (imf.node.href) return { key: imf.node.href, type: "href" };
    if (imf.node.thumbnailSrc) return { key: imf.node.thumbnailSrc, type: "thumbnailSrc" };
    return { key: imf.node.title, type: "title" };
  }

  private nodeKey(imf: IMGFetcher) {
    return this.nodeKeyInfo(imf).key;
  }

  private closestMatchingIndex(chapter: Chapter, record: ReadingProgressRecord) {
    let bestIndex = -1;
    let bestDistance = Infinity;
    chapter.filteredQueue.forEach((imf, index) => {
      if (this.nodeKey(imf) !== record.nodeKey) return;
      const distance = Math.abs(index - record.index);
      if (distance < bestDistance) {
        bestIndex = index;
        bestDistance = distance;
      }
    });
    return bestIndex;
  }

  private save(_index: number, imf: IMGFetcher) {
    if (!this.enabled()) return;
    const suppressSaveUntil = this.suppressSaveUntilByChapter.get(imf.chapterIndex);
    const restoringUntil = this.restoringChapters.get(imf.chapterIndex);
    if ((suppressSaveUntil && Date.now() < suppressSaveUntil) || (restoringUntil && Date.now() < restoringUntil)) {
      return;
    }
    this.suppressSaveUntilByChapter.delete(imf.chapterIndex);
    this.restoringChapters.delete(imf.chapterIndex);
    const chapter = this.chapters()[imf.chapterIndex];
    if (!chapter) return;
    const nodeKey = this.nodeKeyInfo(imf);
    const record: ReadingProgressRecord = {
      chapterSource: chapter.source,
      chapterTitle: Array.isArray(chapter.title) ? chapter.title.join(" / ") : chapter.title,
      index: imf.index,
      nodeKey: nodeKey.key,
      nodeKeyType: nodeKey.type,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(this.key(chapter), JSON.stringify(record));
  }

  private upgradeSavedKey(index: number, success: boolean, imf: IMGFetcher) {
    if (!this.enabled() || !success || !imf.node.originSrc) return;
    const chapter = this.chapters()[imf.chapterIndex];
    if (!chapter) return;
    const record = this.read(chapter);
    if (!record || record.index !== index) return;
    record.nodeKey = imf.node.originSrc;
    record.nodeKeyType = "originSrc";
    record.updatedAt = Date.now();
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
    this.restoringChapters.set(chapterIndex, Date.now() + RESTORE_SAVE_SUPPRESSION_MS);

    const matchingIndex = this.closestMatchingIndex(chapter, record);
    const matchingDistance = matchingIndex >= 0 ? Math.abs(matchingIndex - record.index) : Infinity;
    const canTrustFarMatch = record.nodeKeyType === "originSrc";
    const trustedMatchingIndex = canTrustFarMatch || matchingDistance <= INDEX_MATCH_TOLERANCE ? matchingIndex : -1;
    const scanLimit = record.index;
    if (!chapter.done && chapter.filteredQueue.length <= scanLimit) {
      EBUS.emit("pf-load-until", chapterIndex, scanLimit, record.index);
      return;
    }

    const fallbackIndex = Math.min(record.index, Math.max(chapter.filteredQueue.length - 1, 0));
    const targetIndex = trustedMatchingIndex >= 0 ? trustedMatchingIndex : fallbackIndex;
    const target = chapter.filteredQueue[targetIndex];

    if (target) {
      this.restoredChapters.add(this.key(chapter));
      this.suppressSaveUntilByChapter.set(chapterIndex, Date.now() + 2000);
      window.setTimeout(() => {
        this.suppressSaveUntilByChapter.delete(chapterIndex);
        this.restoringChapters.delete(chapterIndex);
      }, 2000);
      window.setTimeout(() => {
        window.requestAnimationFrame(() => {
          EBUS.emit("imf-on-click", target);
          EBUS.emit("notify-message", "info", `Resume from page ${target.index + 1}`, 1500);
        });
      }, 0);
    } else if (!chapter.done) {
      EBUS.emit("pf-load-until", chapterIndex, record.index, record.index);
    } else {
      this.restoringChapters.delete(chapterIndex);
    }
  }
}
