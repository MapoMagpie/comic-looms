import { GM_XHR } from "../../utils/query";

const bundles = new Map<string, Promise<string>>();
let refreshedSrc: string | undefined;

export async function refreshTwitterBundle() {
  const html = await new Promise<string>((resolve, reject) => GM_XHR({
    method: "GET", url: `${location.origin}/home`, responseType: "text", timeout: 10000,
    headers: { "Cache-Control": "no-cache" },
    onload: response => response.status === 200 ? resolve(response.responseText) : reject(new Error("Cannot refresh X action definitions")),
    onerror: () => reject(new Error("Cannot refresh X action definitions")),
    ontimeout: () => reject(new Error("X definition refresh timed out")),
    onabort: () => reject(new Error("X definition refresh aborted")),
  }));
  // Read a URL only; never execute downloaded page code.
  refreshedSrc = html.match(/https:\/\/abs\.twimg\.com\/responsive-web\/client-web[^/"'\s]*\/main\.[\w]+\.js/)?.[0];
  if (!refreshedSrc) throw new Error("Current X page has no main bundle; refresh X and sign in if needed");
  invalidateTwitterBundle(refreshedSrc);
  return currentTwitterBundle();
}

export function invalidateTwitterBundle(src: string) {
  bundles.delete(src);
}

export async function currentTwitterBundle(): Promise<{ src: string; text: string } | undefined> {
  const urls = [...Array.from(document.scripts).map(script => script.src),
    ...performance.getEntriesByType("resource").map(entry => entry.name)];
  const src = refreshedSrc ?? urls.find(url => /^https:\/\/abs\.twimg\.com\/responsive-web\/client-web[^/]*\/main\.[\w]+\.js$/.test(url));
  if (!src) return undefined;
  let pending = bundles.get(src);
  if (!pending) {
    pending = new Promise<string>((resolve, reject) => GM_XHR({
      method: "GET", url: src, responseType: "text", timeout: 10000,
      onload: response => response.status >= 200 && response.status < 300
        ? resolve(response.responseText) : reject(new Error(`X bundle HTTP ${response.status}`)),
      onerror: () => reject(new Error("X bundle request failed")),
      ontimeout: () => reject(new Error("X bundle request timed out")),
      onabort: () => reject(new Error("X bundle request aborted")),
    })).catch(error => {
      if (bundles.get(src) === pending) bundles.delete(src);
      throw error;
    });
    // Cache the promise so simultaneous consumers also share the in-flight request.
    bundles.set(src, pending);
  }
  return { src, text: await pending };
}
