import { GM_XHR } from "../../utils/query";

export type TweetOperation = "FavoriteTweet" | "CreateBookmark";
const bundles = new Map<string, Promise<string>>();

function tweetArticle(id: string): Element | undefined {
  return Array.from(document.querySelectorAll('article[data-testid="tweet"]')).find(article => {
    const href = article.querySelector('a[href*="/status/"] time')?.closest("a")?.getAttribute("href");
    return href?.match(/\/status\/(\d+)/)?.[1] === id;
  });
}

export async function performNativeTweetAction(operation: TweetOperation, id: string): Promise<boolean> {
  const [off, on] = operation === "FavoriteTweet" ? ["like", "unlike"] : ["bookmark", "removeBookmark"];
  const article = tweetArticle(id);
  if (!article) return false;
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
  const definitions = bundle.matchAll(/queryId\s*:\s*["']([\w-]+)["']\s*,\s*operationName\s*:\s*["'](FavoriteTweet|CreateBookmark)["']/g);
  for (const definition of definitions) if (definition[2] === operation) return definition[1];
  return undefined;
}

function request(url: string, headers: Record<string, string> = {}, data?: string): Promise<string> {
  return new Promise((resolve, reject) => GM_XHR({
    method: data ? "POST" : "GET", url, headers, data, responseType: "text", timeout: 10000,
    onload: response => response.status >= 200 && response.status < 300
      ? resolve(response.responseText) : reject(new Error(`X action HTTP ${response.status}`)),
    onerror: () => reject(new Error("X action request failed")),
    ontimeout: () => reject(new Error("X action request timed out; check X before retrying")),
    onabort: () => reject(new Error("X action request aborted")),
  }));
}

async function currentQuery(operation: TweetOperation): Promise<{ queryId: string; src: string }> {
  const urls = [...Array.from(document.scripts).map(script => script.src),
    ...performance.getEntriesByType("resource").map(entry => entry.name)];
  const src = urls.find(url => /^https:\/\/abs\.twimg\.com\/responsive-web\/client-web[^/]*\/main\.[\w]+\.js$/.test(url));
  if (!src) throw new Error("X action definition unavailable; refresh X and retry");
  let pending = bundles.get(src);
  if (!pending) {
    pending = request(src).catch(error => { bundles.delete(src); throw error; });
    bundles.set(src, pending);
  }
  const queryId = actionQueryId(await pending, operation);
  if (!queryId) throw new Error(`Current X bundle has no ${operation} definition; refresh X and retry`);
  return { queryId, src };
}

export function checkActionResult(text: string) {
  const result = JSON.parse(text);
  if (result.errors?.length || !result.data || typeof result.data !== "object") {
    throw new Error("X action was not confirmed");
  }
}

export async function performTweetAction(operation: TweetOperation, tweetID: string, headers: () => Headers) {
  if (await performNativeTweetAction(operation, tweetID)) return;
  const { queryId, src } = await currentQuery(operation);
  const values: Record<string, string> = {};
  headers().forEach((value, key) => { values[key] = value; });
  try {
    const text = await request(`${location.origin}/i/api/graphql/${queryId}/${operation}`, values,
      JSON.stringify({ variables: { tweet_id: tweetID }, queryId }));
    checkActionResult(text);
  } catch (error) {
    // Never automatically retry a mutation: the server may already have applied it.
    bundles.delete(src);
    throw error;
  }
}
