import { GM_XHR } from "../../utils/query";

type JsonObject = Record<string, unknown>;
export type TwitterList = { id: string; name: string };
export type ListOperation = "ListsManagementPageTimeline" | "PinnedTimelines";
export type ListRequest = { queryId: string; operation: ListOperation; features: Record<string, boolean>; variables: JsonObject };
const CACHE_KEY = "comicLoomsAutoListGraphQLRequest";
// Compatibility defaults from the user's working 4.16.0.1 script. Live values take precedence.
const FEATURE_DEFAULTS: Record<string, boolean> = {
            rweb_video_screen_enabled: false,
            rweb_cashtags_enabled: true,
            profile_label_improvements_pcf_label_in_post_enabled: true,
            responsive_web_profile_redirect_enabled: true,
            rweb_tipjar_consumption_enabled: false,
            verified_phone_label_enabled: false,
            creator_subscriptions_tweet_preview_api_enabled: true,
            responsive_web_graphql_timeline_navigation_enabled: true,
            responsive_web_graphql_exclude_directive_enabled: true,
            responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
            premium_content_api_read_enabled: false,
            communities_web_enable_tweet_community_results_fetch: true,
            c9s_tweet_anatomy_moderator_badge_enabled: true,
            responsive_web_grok_analyze_button_fetch_trends_enabled: false,
            responsive_web_grok_analyze_post_followups_enabled: true,
            rweb_cashtags_composer_attachment_enabled: true,
            responsive_web_jetfuel_frame: true,
            rweb_sports_post_context_enabled: true,
            responsive_web_grok_share_attachment_enabled: true,
            responsive_web_grok_annotations_enabled: true,
            articles_preview_enabled: true,
            responsive_web_edit_tweet_api_enabled: true,
            rweb_conversational_replies_downvote_enabled: false,
            graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
            view_counts_everywhere_api_enabled: true,
            longform_notetweets_consumption_enabled: true,
            responsive_web_twitter_article_tweet_consumption_enabled: true,
            content_disclosure_indicator_enabled: true,
            content_disclosure_ai_generated_indicator_enabled: true,
            responsive_web_grok_show_grok_translated_post: true,
            responsive_web_grok_analysis_button_from_backend: true,
            post_ctas_fetch_enabled: false,
            freedom_of_speech_not_reach_fetch_enabled: true,
            standardized_nudges_misinfo: true,
            tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
            longform_notetweets_rich_text_read_enabled: true,
            longform_notetweets_inline_media_enabled: false,
            responsive_web_nested_quote_preview_enabled: true,
            responsive_web_grok_image_annotation_enabled: true,
            responsive_web_grok_imagine_annotation_enabled: true,
            responsive_web_grok_community_note_auto_translation_is_enabled: true,
            responsive_web_enhance_cards_enabled: false
        };
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

function listInfo(item: JsonObject): TwitterList | undefined {
  const id = item.id_str ?? item.rest_id ?? item.id;
  if (typeof id !== "string" || !/^\d+$/.test(id)) return;
  return { id, name: typeof item.name === "string" ? item.name : `List ${id}` };
}

function listSection(item: JsonObject): "owned" | "recommended" | undefined {
  const event = object(item.clientEventInfo) ? item.clientEventInfo : {};
  const details = object(event.details) ? event.details : {};
  const timeline = object(details.timelinesDetails) ? details.timelinesDetails : {};
  const markers = [timeline.injectionType, event.component, item.entryId, item.moduleEntryId,
    item.__typename, item.displayType, item.timelineType].filter(value => typeof value === "string").join(" ");
  if (/ListToFollow|suggest_list_to_follow|list-to-follow-module/.test(markers)) return "recommended";
  if (/owned[-_]?subscribed[-_]?list/i.test(markers) || markers.includes("suggest_owned_subscribed_list")) return "owned";
  return undefined;
}

function collectOwned(value: unknown, lists: Map<string, TwitterList>, inherited = false): void {
  if (Array.isArray(value)) { value.forEach(item => collectOwned(item, lists, inherited)); return; }
  if (!object(value)) return;
  const section = listSection(value);
  if (section === "recommended") return;
  const owned = inherited || section === "owned";
  if (owned && object(value.list)) {
    const list = listInfo(value.list);
    if (list) lists.set(list.id, list);
  }
  if (owned && value.__typename === "List") {
    const list = listInfo(value);
    if (list) lists.set(list.id, list);
  }
  Object.entries(value).forEach(([key, child]) =>
    collectOwned(child, lists, owned || /owned[-_]?subscribed[-_]?list/i.test(key)));
}

export function collectLists(data: unknown, operation: ListOperation): TwitterList[] {
  const lists = new Map<string, TwitterList>();
  if (operation === "ListsManagementPageTimeline") collectOwned(data, lists);
  else walk(data, item => {
    if (item.__typename !== "List" && !("mode" in item) && !("member_count" in item) && !("subscriber_count" in item)) return;
    const list = listInfo(item);
    if (list) lists.set(list.id, list);
  });
  return [...lists.values()];
}

export function listCursor(data: unknown): string | undefined {
  let cursor: string | undefined;
  let terminated = false;
  walk(data, item => {
    if (item.type === "TimelineTerminateTimeline" && item.direction === "Bottom") terminated = true;
    if (item.cursorType === "Bottom" && typeof item.value === "string") cursor = item.value;
  });
  return terminated ? undefined : cursor;
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
      features[key] = value === undefined ? FEATURE_DEFAULTS[key] ?? false : value === "true";
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

function cachedRequest(account?: string): ListRequest | undefined {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (!cached) return;
    // Legacy entries contain an API descriptor, not lists or credentials. Re-fetch with the current account.
    const legacy = typeof cached.queryId === "string" && /^[\w-]+$/.test(cached.queryId);
    if (!legacy && (!account || cached.account !== account || !Number.isFinite(cached.savedAt) || Date.now() - cached.savedAt > MAX_AGE)) return;
    const request = legacy ? { queryId: cached.queryId, operation: "ListsManagementPageTimeline", features: cached.features ?? FEATURE_DEFAULTS, variables: {} } : cached.request;
    const url = new URL(`/i/api/graphql/${request.queryId}/${request.operation}`, location.origin);
    url.searchParams.set("features", JSON.stringify(request.features));
    url.searchParams.set("variables", JSON.stringify(request.variables));
    return parseListRequest(url.href, location.origin);
  } catch { return undefined; }
}

function requestText(url: string, headers: Record<string, string> = {}): Promise<string> {
  return new Promise((resolve, reject) => GM_XHR({
    method: "GET", url, headers, responseType: "text", timeout: 10000,
    onload: response => response.status >= 200 && response.status < 300
      ? resolve(response.responseText) : reject(new Error(`X lists HTTP ${response.status}`)),
    onerror: () => reject(new Error("X lists request failed")),
    ontimeout: () => reject(new Error("X lists request timed out")),
    onabort: () => reject(new Error("X lists request aborted")),
  }));
}

const bundles = new Map<string, Promise<string>>();
async function discoverPinned(): Promise<ListRequest | undefined> {
  const urls = [...Array.from(document.scripts).map(script => script.src),
    ...performance.getEntriesByType("resource").map(entry => entry.name)];
  const src = urls.find(src => /^https:\/\/abs\.twimg\.com\/responsive-web\/client-web[^/]*\/main\.[\w]+\.js$/.test(src));
  if (!src) return;
  let pending = bundles.get(src);
  if (!pending) {
    pending = requestText(src).catch(error => { bundles.delete(src); throw error; });
    bundles.set(src, pending);
  }
  const bundle = await pending;
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
  const values: Record<string, string> = {};
  headers().forEach((value, key) => { values[key] = value; });
  const text = await requestText(listRequestURL(request, cursor).href, values);
  const json = JSON.parse(text);
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

async function fetchListPages(request: ListRequest | undefined, headers: () => Headers, account: string | undefined, emit: (lists: TwitterList[]) => void) {
  if (!request) return [];
  const lists = new Map<string, TwitterList>();
  const seen = new Set<string>();
  let cursor: string | undefined;
  // Bounded traversal protects against malformed cursors and unbounded account lists.
  try {
    for (let page = 0; page < 20; page++) {
      if (accountID() !== account) return [];
      const result = await fetchListPage(request, headers, cursor);
      if (accountID() !== account) return [];
      result.lists.forEach(list => lists.set(list.id, list));
      emit(result.lists);
      cursor = result.next;
      if (!cursor || seen.has(cursor)) break;
      seen.add(cursor);
    }
  } catch (error) {
    console.debug("Comic Looms: list discovery failed", error);
    invalidateListRequest(request, account);
  }
  return accountID() === account ? [...lists.values()] : [];
}

async function loadHomeLists(headers: () => Headers, account: string | undefined, emit: (lists: TwitterList[]) => void) {
  observeListRequests();
  const requests = account ? observed.get(account) : undefined;
  const management = requests?.ListsManagementPageTimeline ?? cachedRequest(account);
  const pinned = async () => {
    const request = requests?.PinnedTimelines ?? await discoverPinned();
    await fetchListPages(request, headers, account, emit);
  };
  // Start management immediately; a slow bundle or endpoint cannot hold back the other source.
  const results = await Promise.allSettled([fetchListPages(management, headers, account, emit), pinned()]);
  results.forEach(result => { if (result.status === "rejected") console.debug("Comic Looms: pinned lists unavailable", result.reason); });
}

export async function* streamHomeLists(headers: () => Headers): AsyncGenerator<TwitterList[]> {
  const account = accountID();
  const batches: TwitterList[][] = [];
  const seen = new Set<string>();
  let wake: (() => void) | undefined;
  let finished = false;
  const emit = (lists: TwitterList[]) => { batches.push(lists); wake?.(); };
  const pending = loadHomeLists(headers, account, emit).finally(() => { finished = true; wake?.(); });
  while (!finished || batches.length) {
    if (!batches.length) await new Promise<void>(resolve => { wake = resolve; });
    if (accountID() !== account) break;
    const batch = (batches.shift() ?? []).filter(list => !seen.has(list.id));
    batch.forEach(list => seen.add(list.id));
    if (batch.length) yield batch;
  }
  await pending;
}

export async function fetchHomeLists(headers: () => Headers): Promise<TwitterList[]> {
  const lists: TwitterList[] = [];
  for await (const batch of streamHomeLists(headers)) lists.push(...batch);
  return lists;
}
