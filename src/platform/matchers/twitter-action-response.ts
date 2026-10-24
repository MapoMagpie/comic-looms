type Operation = "FavoriteTweet" | "UnfavoriteTweet" | "CreateBookmark" | "DeleteBookmark";
type State = { liked?: boolean; bookmarked?: boolean };
const fields: Record<Operation, string> = {
  FavoriteTweet: "favorite_tweet", UnfavoriteTweet: "unfavorite_tweet",
  CreateBookmark: "tweet_bookmark_put", DeleteBookmark: "tweet_bookmark_delete",
};

export function confirmedActionState(operation: string, result: unknown): State | undefined {
  if (!Object.hasOwn(fields, operation) || !result || typeof result !== "object") return;
  const op = operation as Operation;
  const field = fields[op];
  const { data, errors } = result as { data?: Record<string, unknown>; errors?: unknown };
  const adding = op === "FavoriteTweet" || op === "CreateBookmark";
  if (errors !== undefined && (!Array.isArray(errors) || errors.length)) {
    // X uses the same error text/code for likes and bookmarks. The GraphQL
    // path, not the word "favorited", identifies the state being confirmed.
    if (!adding || !Array.isArray(errors) || !errors.length || !errors.every(error =>
      error && error.code === 139 && Array.isArray(error.path) && error.path[0] === field)) return;
  } else if (data?.[field] !== "Done") return;
  return op === "FavoriteTweet" || op === "UnfavoriteTweet" ? { liked: adding } : { bookmarked: adding };
}

// Observe only mutation results; never copy headers, credentials or unrelated bodies.
export function observeNativeActions(owner: () => string | undefined, publish: (id: string, state: State) => void): boolean {
  if (typeof unsafeWindow === "undefined") return false;
  const page = unsafeWindow;
  if (typeof page.fetch !== "function" || !page.XMLHttpRequest?.prototype) return false;
  const describe = (url: string, body: unknown) => {
    try {
      const parsed = new URL(url, location.origin);
      const op = parsed.pathname.match(/^\/i\/api\/graphql\/[\w-]+\/(FavoriteTweet|UnfavoriteTweet|CreateBookmark|DeleteBookmark)$/)?.[1];
      if (parsed.origin !== location.origin || !op || typeof body !== "string") return;
      const id = JSON.parse(body)?.variables?.tweet_id;
      if (typeof id === "string" && /^\d+$/.test(id)) return { id, op, account: owner() };
    } catch { /* Not a supported action request. */ }
    return undefined;
  };
  const finish = (request: ReturnType<typeof describe>, result: unknown) => {
    if (!request?.account || request.account !== owner()) return;
    const state = confirmedActionState(request.op, result);
    if (state) publish(request.id, state);
  };
  const originalFetch = page.fetch;
  page.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === "string" ? input : "url" in input ? input.url : String(input);
    const request = describe(url, init?.body);
    const response = originalFetch.call(this, input, init);
    if (request) void response.then(res => {
      if (res.ok) return res.clone().json().then(data => finish(request, data));
      return undefined;
    }).catch(() => {});
    return response;
  };
  const prototype = page.XMLHttpRequest.prototype;
  const open = prototype.open, send = prototype.send;
  const urls = new WeakMap<XMLHttpRequest, string>();
  prototype.open = function (this: XMLHttpRequest, ...args: Parameters<XMLHttpRequest["open"]>) {
    urls.set(this, String(args[1]));
    return open.apply(this, args);
  } as XMLHttpRequest["open"];
  prototype.send = function (body?: Document | XMLHttpRequestBodyInit | null) {
    const request = describe(urls.get(this) ?? "", body);
    if (request) this.addEventListener("load", () => {
      if (this.status < 200 || this.status >= 300) return;
      try { finish(request, this.responseType === "json" ? this.response : JSON.parse(this.responseText)); } catch { /* No confirmation. */ }
    }, { once: true });
    return send.call(this, body);
  };
  return true;
}
