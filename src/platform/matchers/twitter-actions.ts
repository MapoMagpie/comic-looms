import { nativeClientMutation } from "./twitter-native-client";
import { currentTwitterBundle, invalidateTwitterBundle, refreshTwitterBundle } from "./twitter-bundle";
import { newestTweetState } from "./twitter-action-state";
import { confirmedActionState } from "./twitter-action-response";

export type TweetOperation = "FavoriteTweet" | "UnfavoriteTweet" | "CreateBookmark" | "DeleteBookmark";

const recoveredQueries = new Map<TweetOperation, string>();

function tweetArticle(id: string): Element | undefined {
  return Array.from(document.querySelectorAll('article[data-testid="tweet"]')).find(article => {
    const href = article.querySelector('a[href*="/status/"] time')?.closest("a")?.getAttribute("href");
    return href?.match(/\/status\/(\d+)/)?.[1] === id;
  });
}

export async function performNativeTweetAction(operation: TweetOperation, id: string): Promise<boolean> {
  const like = operation === "FavoriteTweet" || operation === "UnfavoriteTweet";
  const active = operation === "FavoriteTweet" || operation === "CreateBookmark";
  const pair = like ? ["like", "unlike"] : ["bookmark", "removeBookmark"];
  const [off, on] = active ? pair : pair.slice().reverse();
  const article = tweetArticle(id);
  if (!article) return false;
  const known = newestTweetState(id);
  const expected = like ? known.liked : known.bookmarked;
  const native = article.querySelector(`[data-testid="${pair[1]}"]`) ? true
    : article.querySelector(`[data-testid="${pair[0]}"]`) ? false : undefined;
  // A cross-tab update can be newer than React's local view. Do not trust that view.
  if (expected !== undefined && native !== expected) return false;
  if (article.querySelector(`[data-testid="${on}"]`)) return true;
  const button = article.querySelector<HTMLButtonElement>(`button[data-testid="${off}"]`);
  if (!button) return false;
  if (button.disabled) throw new Error("X action is busy; wait before retrying");
  // Let React own the mutation and its UI/cache updates. Do not rewrite native DOM state.
  button.click();
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (tweetArticle(id)?.querySelector(`[data-testid="${on}"]`)) return true;
  }
  throw new Error("X has not confirmed the native action; check the tweet before retrying");
}

export function actionQueryId(bundle: string, operation: TweetOperation): string | undefined {
  const definitions = bundle.matchAll(/queryId\s*:\s*["']([\w-]+)["']\s*,\s*operationName\s*:\s*["'](FavoriteTweet|UnfavoriteTweet|CreateBookmark|DeleteBookmark)["']/g);
  for (const definition of definitions) if (definition[2] === operation) return definition[1];
  return undefined;
}

export function observedActionEndpoint(operation: TweetOperation): { queryId: string; url: string } | undefined {
  // Prefer an endpoint that this page actually used successfully. Never copy tokens
  // or query parameters, nor trust a request to a different host.
  const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  for (const entry of entries.slice().reverse()) {
    if (entry.responseStatus < 200 || entry.responseStatus >= 300 || !entry.responseStatus) continue;
    try {
      const url = new URL(entry.name);
      const match = url.pathname.match(/^\/(?:i\/api\/)?graphql\/([\w-]+)\/(FavoriteTweet|UnfavoriteTweet|CreateBookmark|DeleteBookmark)$/);
      if (url.origin === location.origin && match?.[2] === operation) return { queryId: match[1], url: url.origin + url.pathname };
    } catch { /* Ignore non-URL resource entries. */ }
  }
  return undefined;
}

async function currentQuery(operation: TweetOperation): Promise<{ queryId: string; src?: string; url?: string }> {
  const recovered = recoveredQueries.get(operation);
  if (recovered) return { queryId: recovered };
  const observed = observedActionEndpoint(operation);
  if (observed) return observed;
  const bundle = await currentTwitterBundle();
  if (!bundle) throw new Error("X action definition unavailable; refresh X and retry");
  const queryId = actionQueryId(bundle.text, operation);
  if (!queryId) throw new Error(`Current X bundle has no ${operation} definition; refresh X and retry`);
  return { queryId, src: bundle.src };
}

export function checkActionResult(text: string, operation?: TweetOperation) {
  const result = JSON.parse(text);
  if (!result || typeof result !== "object") throw new Error("X action was not confirmed");
  if (operation && confirmedActionState(operation, result)) return;
  if (result.errors?.length || !result.data || typeof result.data !== "object" || !Object.keys(result.data).length) {
    throw new Error("X action was not confirmed");
  }
  const bookmarkField = operation === "CreateBookmark" ? "tweet_bookmark_put"
    : operation === "DeleteBookmark" ? "tweet_bookmark_delete" : undefined;
  if (bookmarkField && result.data[bookmarkField] !== "Done") {
    throw new Error("X action was not confirmed");
  }
}

export async function performTweetAction(operation: TweetOperation, tweetID: string, _headers: () => Headers) {
  if (await performNativeTweetAction(operation, tweetID)) return;
  const descriptor = await currentQuery(operation);
  try {
    await sendAction(descriptor.queryId, operation, tweetID);
  } catch (error) {
    if (!(error instanceof Error) || error.message !== "X action HTTP 404") throw error;
    recoveredQueries.delete(operation);
    if (descriptor.src) invalidateTwitterBundle(descriptor.src);
    const fresh = await refreshTwitterBundle();
    const queryId = fresh && actionQueryId(fresh.text, operation);
    // A definite endpoint 404 can retry once, only with a different current endpoint.
    // Timeouts, auth failures and ambiguous responses must never trigger another mutation.
    if (!queryId || queryId === descriptor.queryId) {
      throw new Error(`X action endpoint is unavailable (404). operation=${operation}; requestedQueryId=${descriptor.queryId}; refreshedQueryId=${queryId ?? "missing"}; source=${descriptor.src ?? (descriptor.url ? "observed-request" : "recovered-cache")}; refreshedSource=${fresh?.src ?? "missing"}.`);
    }
    await sendAction(queryId, operation, tweetID);
    recoveredQueries.set(operation, queryId);
  }
}

async function sendAction(queryId: string, operation: TweetOperation, tweetID: string) {
  const text = await nativeClientMutation(queryId, operation, tweetID);
  checkActionResult(text, operation);
}
