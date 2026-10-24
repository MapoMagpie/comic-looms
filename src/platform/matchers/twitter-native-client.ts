import type { TweetOperation } from "./twitter-actions";
import { confirmedActionState } from "./twitter-action-response";

type NativeClient = {
  graphQL: (definition: object, variables: object) => Promise<unknown>;
};
type Store = { getState: () => unknown; dispatch: (action: unknown) => unknown };
type Fiber = {
  current?: Fiber; child?: Fiber; sibling?: Fiber; alternate?: Fiber;
  stateNode?: { current?: Fiber };
  memoizedProps?: { store?: Store; value?: { store?: Store } };
};

// Reuse the authenticated client already owned by X. Its middleware supplies
// transaction IDs and session binding; no cookies or signatures are extracted.
export function findNativeClient(root: object): NativeClient | undefined {
  const roots = Object.getOwnPropertyNames(root)
    .filter(key => key.startsWith("__reactContainer$") || key.startsWith("__reactFiber$"))
    .map(key => (root as Record<string, Fiber>)[key]);
  const queue = [...roots];
  const seen = new Set<Fiber>();
  const stores = new Set<Store>();
  while (queue.length && seen.size < 20000) {
    const fiber = queue.pop();
    if (!fiber || seen.has(fiber)) continue;
    seen.add(fiber);
    for (const next of [fiber.alternate, fiber.child, fiber.sibling, fiber.current, fiber.stateNode?.current]) if (next) queue.push(next);
    const store = fiber.memoizedProps?.store ?? fiber.memoizedProps?.value?.store;
    if (!store || stores.has(store) || typeof store.dispatch !== "function" || typeof store.getState !== "function") continue;
    stores.add(store);
    let client: NativeClient | undefined;
    try {
      store.dispatch((_dispatch: unknown, _getState: unknown, extra: { api?: {
        withEndpoint?: (factory: (context: { apiClient?: NativeClient }) => unknown) => unknown;
      } }) => {
        extra?.api?.withEndpoint?.(({ apiClient }) => { client = apiClient; return {}; });
      });
    } catch { continue; }
    if (client && typeof client.graphQL === "function") return client;
  }
  return undefined;
}

export async function nativeClientMutation(queryId: string, operation: TweetOperation, tweetID: string): Promise<string> {
  if (typeof unsafeWindow === "undefined") throw new Error("X native client unavailable: update the userscript permissions and refresh X");
  const root = unsafeWindow.document.getElementById("react-root");
  const client = root && findNativeClient(root);
  if (!client) throw new Error("X native client unavailable: wait for X to finish loading and refresh; no API request was sent");
  const data = await client.graphQL({
    queryId, operationName: operation, operationType: "mutation",
    metadata: { featureSwitches: [], fieldToggles: [] },
  }, { tweet_id: tweetID }).catch((error: unknown) => {
    if (confirmedActionState(operation, error)) {
      return operation === "CreateBookmark" ? { tweet_bookmark_put: "Done" } : { favorite_tweet: "Done" };
    }
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      throw new Error("X action HTTP 404");
    }
    throw error;
  });
  // X's graphQL client returns the data object, not the HTTP response envelope.
  return JSON.stringify({ data });
}
