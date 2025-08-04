import EBUS from "../event-bus";
import { DEFAULT_THUMBNAIL } from "../img-node";
import { Chapter } from "../page-fetcher";
import q from "../utils/query-element";

export class ChaptersPanel {

  panel: HTMLElement;
  root: HTMLElement;
  thumbnail: HTMLElement;
  thumbnailImg: HTMLImageElement;
  thumbnailCanvas: HTMLCanvasElement;
  listContainer: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.panel = q("#chapters-panel", root);
    this.thumbnail = q("#chapter-thumbnail", root);
    this.thumbnailImg = q("#chapter-thumbnail-image", root);
    this.thumbnailCanvas = q("#chapter-thumbnail-canvas", root);
    this.listContainer = q("#chapter-list", root);

    EBUS.subscribe("pf-update-chapters", (chapters, slient) => {
      this.updateChapterList(chapters);
      if (chapters.length > 1 && !slient) {
        this.relocateToCenter();
      }
    });
    EBUS.subscribe("pf-change-chapter", (index, chapter) => this.updateHighlight(index, chapter));
  }

  updateChapterList(chapters: Chapter[]) {
    const ul = this.listContainer.firstElementChild as HTMLElement;
    ul.innerHTML = "";
    chapters.forEach((ch, i) => {
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
    this.updateChapterThumbnail(chapters[0]);
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
      <div></div>
    </div>
</div>`;
  }
}

