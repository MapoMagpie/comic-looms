export class Scroller {
  private element: HTMLElement;
  scrolling: boolean = false;
  step: number; // [1, 100]
  private distance: number = 0;
  private additional: number = 0;
  private lastDirection: "up" | "down" | undefined;
  private animationID: number = 0;
  private scrollSign: 1 | -1 = 1;
  private currentPromise?: Promise<void>;
  private currentResolve?: () => void;
  private scrollMargin: () => number;
  private maxScrollMargin: () => number;
  private setScrollMargin: (margin: number) => void;
  onScrolled?: () => void;
  constructor(element: HTMLElement, step?: number, mode?: "y" | "x") {
    this.element = element;
    this.step = step || 1;
    if (mode && mode === "x") {
      this.scrollMargin = () => this.element.scrollLeft;
      this.maxScrollMargin = () => this.element.scrollWidth - this.element.clientWidth;
      this.setScrollMargin = (margin) => this.element.scrollLeft = margin;
    } else {
      this.scrollMargin = () => this.element.scrollTop;
      this.maxScrollMargin = () => this.element.scrollHeight - this.element.clientHeight;
      this.setScrollMargin = (margin) => this.element.scrollTop = margin;
    }
  }

  scroll(delta: number, step?: number): Promise<void> {
    if (step) this.step = step;
    const distance = Math.abs(delta);
    if (distance <= 0) return Promise.resolve();
    const direction = delta < 0 ? "up" : "down";
    if (this.scrolling) {
      if (this.lastDirection === direction) {
        this.distance += distance;
        return this.currentPromise ?? Promise.resolve();
      }
      this.finishScroll();
    }

    const promise = new Promise<void>((resolve) => this.currentResolve = resolve);
    this.currentPromise = promise;
    this.distance = distance;
    this.scrollSign = delta < 0 ? -1 : 1;
    this.lastDirection = direction;
    this.additional = 0;
    this.scrolling = true;
    const animationID = ++this.animationID;
    // console.log(`scroller: delta: ${delta}, step: ${step}, distance: ${this.distance}, scrolling: ${this.scrolling}, direction: ${direction}`);
    const doFrame = () => {
      if (animationID !== this.animationID) return;
      if (!this.scrolling) return this.finishScroll();
      this.distance -= this.step + this.additional;
      let scrollMargin = this.scrollMargin() + ((this.step + this.additional) * this.scrollSign);
      scrollMargin = Math.max(scrollMargin, 0);
      scrollMargin = Math.min(scrollMargin, this.maxScrollMargin());
      this.setScrollMargin(scrollMargin);
      this.onScrolled?.();
      if (this.distance <= 0 || scrollMargin === 0 || scrollMargin === this.maxScrollMargin()) return this.finishScroll();
      window.requestAnimationFrame(doFrame);
    }
    window.requestAnimationFrame(doFrame);
    return promise;
  }

  stop() {
    this.finishScroll();
  }

  private finishScroll() {
    this.animationID++;
    this.scrolling = false;
    this.lastDirection = undefined;
    this.distance = 0;
    const resolve = this.currentResolve;
    this.currentPromise = undefined;
    this.currentResolve = undefined;
    resolve?.();
  }
}

export default {
  Scroller,
};

