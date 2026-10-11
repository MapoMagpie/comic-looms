import { GM_XHR } from "../../utils/query";

type JsonObject = Record<string, unknown>;
export type TwitterList = { id: string; name: string };
export type ListOperation = "ListsManagementPageTimeline" | "PinnedTimelines";
export type ListRequest = { queryId: string; operation: ListOperation; features: Record<string, boolean>; variables: JsonObject };
const CACHE_KEY = "comicLoomsAutoListGraphQLRequest";
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function object(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function walk(value: unknown, visit: (item: JsonObject) => void) {
  if (Array.isArray(value)) value.forEach(item => walk(item, visit));
  else if (object(value)) { visit(value); Object.values(value).forEach(item => walk(item, visit)); }
}

export function parseListRequest(raw: string, origin: string): ListRequest | undefined {
  try {
    const url = new URL(raw);
    if (url.origin !== origin) return;
    const match = url.pathname.match(/^\/i\/api\/graphql\/([\w-]+)\/(ListsManagementPageTimeline|PinnedTimelines)$/);
    if (!match) return;
    const features: unknown = JSON.parse(url.searchParams.get("features") || "{}");
    const variables: unknown = JSON.parse(url.searchParams.get("variables") || "{}");
    if (!object(features) || !Object.values(features).every(value => typeof value === "boolean") || !object(variables)) return;
    // Store the API descriptor only, never headers, cookies, tokens, cursors or account IDs.
    const safeVariables: JsonObject = {};
    for (const [key, value] of Object.entries(variables)) {
      if ((key === "count" && typeof value === "number") || (/^with\w+$/.test(key) && typeof value === "boolean")) safeVariables[key] = value;
    }
    return { queryId: match[1], operation: match[2] as ListOperation, features: features as Record<string, boolean>, variables: safeVariables };
  } catch { return undefined; }
}

export function collectLists(data: unknown, operation: ListOperation): TwitterList[] {
  const lists = new Map<string, TwitterList>();
  const collect = (value: unknown) => walk(value, item => {
    const id = item.id_str ?? item.rest_id ?? item.id;
    if (typeof id !== "string" || !/^\d+$/.test(id) || typeof item.name !== "string") return;
    // Do not accidentally treat the list owner's user object as a list.
    if (item.__typename !== "List" && !("member_count" in item) && !("subscriber_count" in item)) return;
    lists.set(id, { id, name: item.name });
  });
  if (operation === "PinnedTimelines") collect(data);
  else walk(data, item => {
    // Only account-owned/subscribed sections; recommended sections must not leak in.
    if ([item.__typename, item.entryId, item.displayType, item.timelineType].some(value =>
      typeof value === "string" && /owned[-_]?subscribed[-_]?list/i.test(value))) collect(item);
    for (const [key, value] of Object.entries(item)) if (/owned[-_]?subscribed[-_]?list/i.test(key)) collect(value);
  });
  return [...lists.values()];
}

export function listCursor(data: unknown): string | undefined {
  let cursor: string | undefined;
  walk(data, item => {
    if (item.cursorType === "Bottom" && typeof item.value === "string") cursor = item.value;
  });
  return cursor;
}

// Parse data literals only. Never evaluate downloaded JavaScript.
export function pinnedRequestFromBundle(bundle: string, state: string): ListRequest | undefined {
  const definition = bundle.match(/queryId:\s*["']([\w-]+)["'],\s*operationName:\s*["']PinnedTimelines["'][\s\S]{0,4000}?featureSwitches:\s*(\[[^\]]*\])/);
  if (!definition) return;
  try {
    const switches: unknown = JSON.parse(definition[2]);
    if (!Array.isArray(switches) || !switches.every(key => typeof key === "string" && /^\w+$/.test(key))) return;
    const features: Record<string, boolean> = {};
    for (const key of switches as string[]) {
      const value = state.match(new RegExp(`"${key}"\\s*:\\s*\\{\\s*"value"\\s*:\\s*(true|false)`))?.[1];
      if (value === undefined) return; // Unknown feature values must not be guessed.
      features[key] = value === "true";
    }
    return { queryId: definition[1], operation: "PinnedTimelines", features, variables: {} };
  } catch { return undefined; }
}

function accountID(): string | undefined {
  try { return decodeURIComponent(document.cookie.match(/(?:^|;\s*)twid=([^;]+)/)?.[1] || "").match(/^u=(\d+)$/)?.[1]; }
  catch { return undefined; }
}

const observed = new Map<string, Partial<Record<ListOperation, ListRequest>>>();
const invalidRequests = new Set<string>();
let observer: PerformanceObserver | undefined;

function remember(raw: string) {
  const request = parseListRequest(raw, location.origin);
  const account = accountID();
  if (!request || !account || invalidRequests.has(`${account}:${request.operation}:${request.queryId}`)) return;
  const requests = observed.get(account) || {};
  requests[request.operation] = request;
  observed.set(account, requests);
  if (request.operation === "ListsManagementPageTimeline") {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ account, savedAt: Date.now(), request })); } catch { /* storage disabled */ }
  }
}

// Resource observation works across the userscript/page boundary without monkey-patching fetch/XHR.
export function observeListRequests() {
  if (observer || !/^(x|twitter)\.com$/.test(location.hostname) || typeof PerformanceObserver === "undefined") return;
  try {
    performance.getEntriesByType("resource").forEach(entry => remember(entry.name));
    observer = new PerformanceObserver(entries => entries.getEntries().forEach(entry => remember(entry.name)));
    observer.observe({ type: "resource", buffered: true });
  } catch { observer?.disconnect(); observer = undefined; }
}

function cachedRequest(account: string): ListRequest | undefined {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (!cached || cached.account !== account || !Number.isFinite(cached.savedAt) || Date.now() - cached.savedAt > MAX_AGE) return;
    const request = cached.request;
    const url = new URL(`/i/api/graphql/${request.queryId}/${request.operation}`, location.origin);
    url.searchParams.set("features", JSON.stringify(request.features));
    url.searchParams.set("variables", JSON.stringify(request.variables));
    return parseListRequest(url.href, location.origin);
  } catch { return undefined; }
}

async function discoverPinned(): Promise<ListRequest | undefined> {
  const src = Array.from(document.scripts).map(script => script.src).find(src => /^https:\/\/abs\.twimg\.com\/responsive-web\/client-web[^/]*\/main\.[\w]+\.js$/.test(src));
  if (!src) return;
  const bundle = await new Promise<string>((resolve, reject) => GM_XHR({
    method: "GET", url: src, responseType: "text", timeout: 10000,
    onload: response => response.status === 200 ? resolve(response.responseText) : reject(new Error("X bundle unavailable")),
    onerror: () => reject(new Error("X bundle request failed")), ontimeout: () => reject(new Error("X bundle timeout")),
  }));
  return pinnedRequestFromBundle(bundle, Array.from(document.scripts).filter(script => !script.src).map(script => script.textContent || "").join("\n"));
}

function listRequestURL(request: ListRequest, cursor?: string) {
  const variables = { ...request.variables };
  if (request.operation === "ListsManagementPageTimeline") variables.count = 100;
  if (cursor) variables.cursor = cursor;
  const url = new URL(`/i/api/graphql/${request.queryId}/${request.operation}`, location.origin);
  url.searchParams.set("variables", JSON.stringify(variables));
  url.searchParams.set("features", JSON.stringify(request.features));
  return url;
}

function isFatalListError(error: unknown) {
  return !object(error) || typeof error.message !== "string" || !error.message.includes("DecodeException");
}

async function fetchListPage(request: ListRequest, headers: () => Headers, cursor?: string) {
  const response = await fetch(listRequestURL(request, cursor), { headers: headers(), signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`X lists HTTP ${response.status}`);
  const json = await response.json();
  if (!json.data) throw new Error("X lists response missing data");
  const lists = collectLists(json.data, request.operation);
  if (!lists.length && Array.isArray(json.errors) && json.errors.some(isFatalListError)) throw new Error("X lists GraphQL error");
  const next = request.operation === "ListsManagementPageTimeline" ? listCursor(json.data) : undefined;
  return { lists, next };
}

function invalidateListRequest(request: ListRequest, account?: string) {
  if (request.operation !== "ListsManagementPageTimeline" || accountID() !== account) return;
  invalidRequests.add(`${account}:${request.operation}:${request.queryId}`);
  try { localStorage.removeItem(CACHE_KEY); } catch { /* storage disabled */ }
  if (account) delete observed.get(account)?.ListsManagementPageTimeline;
}

async function fetchListPages(request: ListRequest | undefined, headers: () => Headers, account?: string) {
  if (!request) return [];
  const lists = new Map<string, TwitterList>();
  const seen = new Set<string>();
  let cursor: string | undefined;
  // Bounded traversal protects against malformed cursors and unbounded account lists.
  try {
    for (let page = 0; page < 20; page++) {
      if (accountID() !== account) return [];
      const result = await fetchListPage(request, headers, cursor);
      result.lists.forEach(list => lists.set(list.id, list));
      cursor = result.next;
      if (!cursor || seen.has(cursor)) break;
      seen.add(cursor);
    }
  } catch { invalidateListRequest(request, account); }
  return accountID() === account ? [...lists.values()] : [];
}

export async function fetchHomeLists(headers: () => Headers): Promise<TwitterList[]> {
  observeListRequests();
  const account = accountID();
  const requests = account ? observed.get(account) : undefined;
  const management = requests?.ListsManagementPageTimeline ?? (account ? cachedRequest(account) : undefined);
  let pinned = requests?.PinnedTimelines;
  if (!pinned) { try { pinned = await discoverPinned(); } catch { /* Keep the original chapters. */ } }
  const results = await Promise.allSettled([management, pinned].map(request => fetchListPages(request, headers, account)));
  const merged = new Map<string, TwitterList>();
  results.forEach(result => { if (result.status === "fulfilled") result.value.forEach(list => merged.set(list.id, list)); });
  return [...merged.values()];
}
