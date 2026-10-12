type Action = { done: boolean };
type Actions = { like: Action; bookmark: Action };
type State = { liked?: boolean; bookmarked?: boolean };

// Select the exact media tweet, including retweets/visibility wrappers, not a quoted tweet.
export function readTweetState(value: unknown, id: string): State {
  if (!value || typeof value !== "object") return {};
  const item = value as Record<string, unknown>;
  const legacy = item.legacy as Record<string, unknown> | undefined;
  if (item.rest_id === id || legacy?.id_str === id || item.id_str === id) {
    const source = legacy ?? item;
    const bookmarked = source.bookmarked ?? item.bookmarked;
    return {
      liked: typeof source.favorited === "boolean" ? source.favorited : undefined,
      bookmarked: typeof bookmarked === "boolean" ? bookmarked : undefined,
    };
  }
  for (const child of Object.values(item)) {
    const state = readTweetState(child, id);
    if (state.liked !== undefined || state.bookmarked !== undefined) return state;
  }
  return {};
}

export function applyTweetState(actions: Actions, state: State) {
  if (state.liked !== undefined) actions.like.done = state.liked;
  if (state.bookmarked !== undefined) actions.bookmark.done = state.bookmarked;
}

// Weak references avoid retaining galleries that have been replaced during SPA navigation.
const tracked = new Map<string, { like: WeakRef<Action>; bookmark: WeakRef<Action> }>();
let observer: MutationObserver | undefined;
let scheduled = false;
const visibleStates = new WeakMap<Element, State & { id: string; action: WeakRef<Action> }>();

function syncArticle(article: Element) {
  const permalink = article.querySelector('a[href*="/status/"] time')?.closest("a");
  const id = permalink?.getAttribute("href")?.match(/\/status\/(\d+)/)?.[1];
  if (!id) return;
  const entry = tracked.get(id);
  const like = entry?.like.deref(), bookmark = entry?.bookmark.deref();
  if (!like || !bookmark) return;
  // Missing controls (e.g. a collapsed bookmark menu) are unknown, never false.
  const state = (off: string, on: string): boolean | undefined => {
    if (article.querySelector(`[data-testid="${on}"]`)) return true;
    if (article.querySelector(`[data-testid="${off}"]`)) return false;
    return undefined;
  };
  const current = { liked: state("like", "unlike"), bookmarked: state("bookmark", "removeBookmark") };
  const snapshot = visibleStates.get(article);
  const previous = snapshot?.id === id && snapshot.action.deref() === like ? snapshot : undefined;
  visibleStates.set(article, { ...current, id, action: new WeakRef(like) });
  applyTweetState({ like, bookmark }, {
    liked: current.liked !== previous?.liked ? current.liked : undefined,
    bookmarked: current.bookmarked !== previous?.bookmarked ? current.bookmarked : undefined,
  });
}

function syncVisibleTweets() {
  scheduled = false;
  for (const [id, entry] of tracked) {
    if (!entry.like.deref() || !entry.bookmark.deref()) tracked.delete(id);
  }
  document.querySelectorAll('article[data-testid="tweet"]').forEach(syncArticle);
}

export function trackTweetActions(id: string, actions: Actions) {
  tracked.set(id, { like: new WeakRef(actions.like), bookmark: new WeakRef(actions.bookmark) });
  if (!observer) {
    observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      setTimeout(syncVisibleTweets, 50);
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-testid"] });
  }
  syncVisibleTweets();
}
