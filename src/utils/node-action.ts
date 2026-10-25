import type ImageNode from "../img-node";

export class NodeAction {
  id?: string;
  private completed = false;
  private buttons = new Set<WeakRef<HTMLButtonElement>>();
  processing = false;
  constructor(public icon: string, public description: string,
    public func: (node: ImageNode) => Promise<void | boolean>, public reueable = false) {}

  get done() { return this.completed; }
  set done(value: boolean) { this.completed = value; this.render(); }

  private render() {
    for (const ref of this.buttons) {
      const button = ref.deref();
      if (!button?.isConnected) this.buttons.delete(ref);
      else this.renderButton(button);
    }
  }

  private renderButton(button: HTMLButtonElement) {
    if (this.processing) button.classList.remove("img-node-action-btn-error");
    button.classList.toggle("img-node-action-btn-done", this.done);
    button.classList.toggle("img-node-action-btn-processing", this.processing);
    button.disabled = this.processing;
    button.title = this.description;
    if (this.id) button.setAttribute("aria-pressed", String(this.done));
  }

  bind(button: HTMLButtonElement) {
    if (this.id === "x-toggle-like" || this.id === "x-toggle-bookmark") {
      button.classList.toggle("img-node-action-x", true);
      const path = this.id === "x-toggle-like"
        ? "M12 21s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12Z"
        : "M6 3h12v18l-6-4-6 4V3Z";
      button.innerHTML = `<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="currentColor"><path d="${path}"/></svg>`;
    }
    this.buttons.add(new WeakRef(button));
    this.renderButton(button);
  }

  async run(node: ImageNode) {
    if (this.processing || (this.done && !this.reueable)) return;
    this.processing = true;
    this.render();
    try {
      const state = await this.func(node);
      this.done = typeof state === "boolean" ? state : true;
    } finally {
      // Finish the current rotation instead of cutting it off mid-cycle. Keep
      // processing true until then, including for keyboard-triggered actions.
      await Promise.all(Array.from(this.buttons, ref => {
        const button = ref.deref();
        if (!button?.isConnected) return Promise.resolve();
        return Promise.all((button.getAnimations?.() ?? []).filter(animation =>
          (animation as CSSAnimation).animationName === "btn-rotate"
        ).map(async animation => {
          const duration = Number(animation.effect?.getComputedTiming().duration);
          if (!duration || !Number.isFinite(duration)) return;
          const elapsed = Number(animation.currentTime ?? 0);
          animation.effect?.updateTiming({ iterations: Math.max(1, Math.ceil(elapsed / duration)) });
          await animation.finished.catch(() => {});
        }));
      }));
      this.processing = false;
      this.render();
      for (const ref of this.buttons) {
        ref.deref()?.dispatchEvent?.(new Event("action-visual-settled", { bubbles: true }));
      }
    }
  }
}
