import { GM } from "../gm";

type Option<T extends GmResponseType> = GmXmlhttpRequestOption<T, GmResponseTypeMap[GmResponseType]>;

type EventListener<T extends GmResponseType> = Pick<Option<T>, "onload" | "onprogress" | "onerror" | "ontimeout" | "onloadstart">;

export const GM_XHR = GM.xmlHttpRequest;

export function xhrWapper<T extends GmResponseType>(url: string, respType: T, cb: EventListener<keyof GmResponseTypeMap>, headers: Record<string, string>, timeout?: number): (() => void) | undefined {
  if (GM_XHR === undefined) throw new Error("your userscript manager does not support Gm_xmlhttpRequest or GM.xmlhttpRequest api");
  return GM_XHR<GmResponseType, any>({
    method: "GET",
    url,
    timeout: timeout || 600000,
    responseType: respType,
    nocache: false,
    revalidate: false,
    headers: {
      "Referer": window.location.href,
      "Cache-Control": "public, max-age=2592000, immutable",
      ...headers,
    },
    ...cb,
  })?.abort;
}
// const HOST_REGEX = /\/\/([^\/]*)\//;
// "Origin": window.location.origin,
// "X-Alt-Referer": window.location.href,
// "Host": HOST_REGEX.exec(url)?.[1] || window.location.host,
// "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
// "Accept": "*/*",
// "Connection": "keep-alive",
// "Accept-Language": "en-US,en;q=0.5",
// "Accept-Encoding": "gzip, deflate, br, zstd",
// "Sec-Fetch-Dest": "empty",
// "Sec-Fetch-Mode": "cors",
// "Sec-Fetch-Site": "cross-site",

export function simpleFetch<T extends GmResponseType>(url: string, respType: T, headers?: Record<string, string>): Promise<GmResponseTypeMap[T]> {
  return new Promise((resolve, reject) => {
    try {
      xhrWapper<T>(url, respType, {
        onload: (response) => resolve(response.response),
        onerror: (error) => reject(error)
      }, headers ?? {}, 10 * 1000);
    } catch (error) {
      reject(error);
    }
  });
}
export async function batchFetch<T>(requests: RequestInfo[], concurrency: number, respType: "text" | "json" | "arraybuffer" = "text"): Promise<(T | Error)[]> {
  const results = new Array(requests.length);
  let i = 0;
  while (i < requests.length) {
    const batch = requests.slice(i, i + concurrency);
    const batchPromises = batch.map((request, index) =>
      window.fetch(request).then((resp) => {
        if (resp.ok) {
          try {
            switch (respType) {
              case "text":
                return resp.text();
              case "json":
                return resp.json();
              case "arraybuffer":
                return resp.arrayBuffer();
            }
          } catch (error) {
            throw new Error(`failed to fetch ${request}: ${resp.status} ${error}`);
          }
        }
        throw new Error(`failed to fetch ${request}: ${resp.status} ${resp.statusText}`);
      }).then(raw => results[index + i] = raw).catch(reason => results[index + i] = new Error(reason))
    );
    await Promise.all(batchPromises);
    i += concurrency;
  }
  return results;
}
