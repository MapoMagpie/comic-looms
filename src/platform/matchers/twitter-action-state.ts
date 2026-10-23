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


type Tracked = { like: WeakRef<Action>; bookmark: WeakRef<Action> };
const tracked = new Map<string, Tracked[]>();
const known = new Map<string, State>();
let account: string | undefined;
let observer: MutationObserver | undefined;
let channel: BroadcastChannel | undefined;
let scheduled = false;
let listening = false;
const STORAGE_PREFIX = "comic-looms-x-state-v2:";
const MAX_AGE = 60 * 60 * 1000;
const versions = new Map<string, Partial<Record<keyof State, number>>>();
let clock = 0;

function updateActions(id: string, state: State) {
  const entries = tracked.get(id) ?? [];
  tracked.set(id, entries.filter(entry => {
    const like = entry.like.deref(), bookmark = entry.bookmark.deref();
    if (!like || !bookmark) return false;
    applyTweetState({ like, bookmark }, state);
    return true;
  }));
}

function receive(data: { account?: string; id?: string; state?: State; versions?: Partial<Record<keyof State, number>> } | null) {
  if (!data || !ensureAccount() || data.account !== account || typeof data.id !== "string" || !/^\d+$/.test(data.id) || !data.state || !data.versions) return;
  const state = known.get(data.id) ?? {};
  const stamps = versions.get(data.id) ?? {};
  for (const key of ["liked", "bookmarked"] as const) {
    const stamp = data.versions[key];
    if (typeof data.state[key] !== "boolean" || typeof stamp !== "number" || !Number.isFinite(stamp) || stamp < Date.now() - MAX_AGE || stamp > Date.now() + 60000 || stamp <= (stamps[key] ?? 0)) continue;
    state[key] = data.state[key]; stamps[key] = stamp; clock = Math.max(clock, stamp);
  }
  known.set(data.id, state); versions.set(data.id, stamps);
  updateActions(data.id, state);
}

function restore(id: string) {
  if (!account) return;
  try { receive(JSON.parse(localStorage.getItem(STORAGE_PREFIX + account + ":" + id) ?? "null")); } catch { /* Storage may be unavailable. */ }
}

function pruneStorage() {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(STORAGE_PREFIX));
    for (const key of keys) {
      try {
        const data = JSON.parse(localStorage.getItem(key) ?? "null");
        if (!data?.versions || Math.max(...Object.values(data.versions) as number[]) < Date.now() - MAX_AGE) localStorage.removeItem(key);
      } catch { localStorage.removeItem(key); }
    }
    // Bound disk use even during unusually large browsing sessions.
    const remaining = Object.keys(localStorage).filter(key => key.startsWith(STORAGE_PREFIX));
    for (const key of remaining.slice(0, Math.max(0, remaining.length - 2000))) localStorage.removeItem(key);
  } catch { /* BroadcastChannel remains available without storage. */ }
}
const snapshots = new WeakMap<Element, { id: string; account?: string; state: State }>();

function currentAccount() {
  try { return decodeURIComponent(document.cookie.match(/(?:^|;\s*)twid=([^;]+)/)?.[1] ?? "").match(/^u=(\d+)$/)?.[1]; }
  catch { return undefined; }
}

function ensureAccount() {
  const next = currentAccount();
  if (next !== account) { known.clear(); versions.clear(); tracked.clear(); account = next; }
  return next;
}

export function newestTweetState(id: string): State {
  ensureAccount();
  restore(id);
  return known.get(id) ?? {};
}

export function publishTweetState(id: string, state: State, remote = false) {
  const owner = ensureAccount();
  const clean: State = {};
  if (typeof state.liked === "boolean") clean.liked = state.liked;
  if (typeof state.bookmarked === "boolean") clean.bookmarked = state.bookmarked;
  if (!Object.keys(clean).length) return;
  if (!remote) restore(id);
  known.set(id, { ...known.get(id), ...clean });
  if (known.size > 2000) { const oldest = known.keys().next().value!; known.delete(oldest); versions.delete(oldest); }
  updateActions(id, clean);
  if (owner && !remote) {
    const stamps = versions.get(id) ?? {};
    clock = Math.max(Date.now(), clock + 1);
    for (const key of ["liked", "bookmarked"] as const) if (clean[key] !== undefined) stamps[key] = clock;
    versions.set(id, stamps);
    const message = { account: owner, id, state: known.get(id), versions: stamps };
    try { localStorage.setItem(STORAGE_PREFIX + owner + ":" + id, JSON.stringify(message)); } catch { /* Use live channel. */ }
    channel?.postMessage(message);
  }
}

function syncArticle(article: Element) {
  const href = article.querySelector('a[href*="/status/"] time')?.closest("a")?.getAttribute("href");
  const id = href?.match(/\/status\/(\d+)/)?.[1];
  if (!id) return;
  const read = (off: string, on: string): boolean | undefined => {
    if (article.querySelector(`[data-testid="${on}"]`)) return true;
    if (article.querySelector(`[data-testid="${off}"]`)) return false;
    return undefined;
  };
  const state = { liked: read("like", "unlike"), bookmarked: read("bookmark", "removeBookmark") };
  restore(id);
  const previous = snapshots.get(article);
  snapshots.set(article, { id, account, state });
  if (previous?.id === id && previous.account === account) {
    publishTweetState(id, {
      liked: previous.state.liked !== state.liked ? state.liked : undefined,
      bookmarked: previous.state.bookmarked !== state.bookmarked ? state.bookmarked : undefined,
    });
  } else {
    const cached = known.get(id) ?? {};
    // An initial/stale native rendering must not overwrite a newer cross-tab update.
    publishTweetState(id, { liked: cached.liked ?? state.liked, bookmarked: cached.bookmarked ?? state.bookmarked }, true);
  }
}

function syncVisibleTweets() {
  scheduled = false;
  ensureAccount();
  for (const [id, entry] of tracked) {
    const live = entry.filter(item => item.like.deref() && item.bookmark.deref());
    if (live.length) tracked.set(id, live); else tracked.delete(id);
  }
  document.querySelectorAll('article[data-testid="tweet"]').forEach(syncArticle);
}

export function startTweetStateSync() {
  ensureAccount();
  if (!channel && typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel("comic-looms-x-actions-v2");
    channel.onmessage = event => receive(event.data);
  }
  if (!listening && typeof window !== "undefined" && window.addEventListener) {
    listening = true;
    pruneStorage();
    window.addEventListener("storage", event => {
      if (!event.key?.startsWith(STORAGE_PREFIX) || !event.newValue) return;
      try { receive(JSON.parse(event.newValue)); } catch { /* Ignore unrelated or malformed data. */ }
    });
    window.addEventListener("focus", () => { ensureAccount(); for (const id of tracked.keys()) restore(id); syncVisibleTweets(); });
  }
  if (!document.body || observer) return;
  observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    setTimeout(syncVisibleTweets, 50);
  });
  observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-testid"] });
  syncVisibleTweets();
}

export function trackTweetActions(id: string, actions: Actions) {
  startTweetStateSync();
  const entries = tracked.get(id) ?? [];
  entries.push({ like: new WeakRef(actions.like), bookmark: new WeakRef(actions.bookmark) });
  tracked.set(id, entries);
  syncVisibleTweets();
  applyTweetState(actions, newestTweetState(id));
}
