import EBUS from "../event-bus";
import { DEFAULT_THUMBNAIL } from "../img-node";
import { Chapter } from "../page-fetcher";
import q from "../utils/query-element";
import { matchesSearch, parsePageTerm } from "../utils/search-normalize";

export class ChaptersPanel {

  panel: HTMLElement;
  root: HTMLElement;
  thumbnail: HTMLElement;
  thumbnailImg: HTMLImageElement;
  thumbnailCanvas: HTMLCanvasElement;
  listContainer: HTMLElement;
  listSearch: HTMLInputElement;
  listSearchPrev: HTMLButtonElement;
  listSearchNext: HTMLButtonElement;
  listSearchClear: HTMLButtonElement;
  chapters?: Chapter[];

  constructor(root: HTMLElement) {
    this.root = root;
    this.panel = q("#chapters-panel", root);
    this.thumbnail = q("#chapter-thumbnail", root);
    this.thumbnailImg = q("#chapter-thumbnail-image", root);
    this.thumbnailCanvas = q("#chapter-thumbnail-canvas", root);
    this.listContainer = q("#chapter-list-container", root);
    this.listSearch = q("#chapter-list-search > input", root);
    this.listSearchPrev = q("#chapter-list-prev", root);
    this.listSearchNext = q("#chapter-list-next", root);
    this.listSearchClear = q("#chapter-list-clear", root);
    this.listSearch.addEventListener("input", () => this.search(this.listSearch.value))
    this.listSearchPrev.addEventListener("click", () => {
      const page = parsePageTerm(this.listSearch.value);
      // Non-pagination terms fall back to %1; stay at %1 when already there (%0 is an invalid page)
      this.applySearch("%" + (page === null ? 1 : Math.max(1, page - 1)));
    });
    this.listSearchNext.addEventListener("click", () => {
      const page = parsePageTerm(this.listSearch.value);
      this.applySearch("%" + (page === null ? 1 : page + 1));
    });
    this.listSearchClear.addEventListener("click", () => this.applySearch(""));

    EBUS.subscribe("pf-update-chapters", (chapters, slient) => {
      this.chapters = chapters;
      this.updateChapterList();
      if (chapters.length > 1 && !slient) {
        this.relocateToCenter();
      }
    });
    EBUS.subscribe("pf-change-chapter", (index, chapter) => this.updateHighlight(index, chapter));
  }

  search(term?: string) {
    this.updateChapterList(term);
  }

  /** Write the term into the input and refresh the list (programmatic assignment does not fire the input event, so refresh manually) */
  private applySearch(term: string) {
    this.listSearch.value = term;
    this.updateChapterList(term);
  }

  updateChapterList(term?: string) {
    const ul = this.listContainer;
    ul.innerHTML = "";
    if (!this.chapters || this.chapters.length === 0) return;
    const query = term?.trim();
    // Special pagination term: of the form %2 (% followed by digits), filters by the i range, 10 items per page.
    // Page numbers start at 1: %1 is page 1 (i=0~9), %2 is page 2 (i=10~19).
    // A lone % does not match ^%\d+$ and falls through to normal matching.
    const page = parsePageTerm(query ?? "");
    const pageFrom = page !== null ? (page - 1) * 10 : -1;
    const pageTo = pageFrom >= 0 ? pageFrom + 10 : -1;
    let firstVisible: Chapter | undefined;
    this.chapters.forEach((ch, i) => {
      if (page !== null) {
        if (i < pageFrom || i >= pageTo) return;
      } else {
        const titles = ch.title instanceof Array ? ch.title : [ch.title];
        if (query && !titles.some((t) => matchesSearch(t, query))) return;
      }
      firstVisible ??= ch;
      const li = document.createElement("div");
      let title = "";
      if (ch.title instanceof Array) {
        title = ch.title.join("\t");
      } else {
        title = ch.title;
      }
      li.innerHTML = `<span>${title}</span>`
      li.setAttribute("id", "chapter-list-item-" + ch.id.toString());
      li.classList.add("chapter-list-item");
      li.addEventListener("click", () => {
        ch.onclick?.(i);
        if (this.panel.classList.contains("p-panel-large")) {
          this.panel.classList.add("p-collapse");
          this.panel.classList.remove("p-panel-large");
          this.panel.classList.remove("p-chapters-large");
        }
      });
      li.addEventListener("mouseenter", () => this.updateChapterThumbnail(ch))
      ul.appendChild(li);
    });
    if (!firstVisible) {
      const li = document.createElement("div");
      li.classList.add("chapter-list-item", "chapter-list-item-empty");
      li.textContent = "No matching chapters";
      ul.appendChild(li);
    }
    this.updateChapterThumbnail(firstVisible ?? this.chapters[0]);
  }

  relocateToCenter() {
    this.panel.classList.remove("p-collapse");
    this.panel.classList.add("p-panel-large");
    this.panel.classList.add("p-chapters-large");
    const [w, h] = [this.root.offsetWidth, this.root.offsetHeight];
    const [pw, ph] = [this.panel.offsetWidth, this.panel.offsetHeight];
    const [left, top] = [(w / 2) - (pw / 2), (h / 2) - (ph / 2)];
    this.panel.style.left = left + "px";
    this.panel.style.top = top + "px";
  }

  updateHighlight(index: number, chapter: Chapter) {
    Array.from(this.listContainer.querySelectorAll("div > .chapter-list-item")).forEach((li, i) => {
      if (i === index) {
        li.classList.add("chapter-list-item-hl")
      } else {
        li.classList.remove("chapter-list-item-hl")
      }
    });
    this.updateChapterThumbnail(chapter);
  }

  updateChapterThumbnail(chapter: Chapter) {
    this.thumbnailImg.onload = () => {
      const width = this.thumbnailImg.naturalWidth;
      const height = this.thumbnailImg.naturalHeight;
      let [sx, sw, sy, sh] = [0, width, 0, height];
      if (width > height) {
        sx = Math.floor((width - height) / 2);
        sw = height;
      } else if (width < height) {
        sy = Math.floor((height - width) / 2);
        sh = width;
      }
      this.thumbnailCanvas.width = sw;
      this.thumbnailCanvas.height = sh;
      const ctx = this.thumbnailCanvas.getContext("2d")!;
      ctx.drawImage(this.thumbnailImg, sx, sy, sw, sh, 0, 0, width, height);
    };
    this.thumbnailImg.src = chapter.thumbimg ?? DEFAULT_THUMBNAIL;
    // create title element
    this.thumbnail.querySelector(".ehvp-chapter-description")?.remove();
    const description = document.createElement("div");
    description.classList.add("ehvp-chapter-description");
    if (Array.isArray(chapter.title)) {
      description.innerHTML = chapter.title.map((t) => `<span>${t}</span>`).join("<br>");
    } else {
      description.innerHTML = `<span>${chapter.title}</span>`;
    }
    this.thumbnail.appendChild(description);
  }

  static html() {
    return `
<div id="chapters-panel" class="p-panel p-chapters p-panel-large p-collapse">
    <div id="chapter-thumbnail" class="chapter-thumbnail">
      <div id="chapter-thumbnail-image-container" style="display:none;">
        <img id="chapter-thumbnail-image" src="${DEFAULT_THUMBNAIL}" alt="thumbnail" />
      </div>
      <canvas id="chapter-thumbnail-canvas" width="100" height="100"></canvas>
    </div>
    <div id="chapter-list" class="chapter-list">
      <div id="chapter-list-container"></div>
      <div id="chapter-list-search" class="chapter-list-search">
        <input type="text" placeholder="Search chapters..." />
        <button id="chapter-list-prev" class="ehvp-custom-btn" title="prev">◀</button>
        <button id="chapter-list-next" class="ehvp-custom-btn" title="next">▶</button>
        <button id="chapter-list-clear" class="ehvp-custom-btn" title="clear">×</button>
      </div>
    </div>
</div>`;
  }
}

