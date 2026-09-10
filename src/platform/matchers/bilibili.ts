import ImageNode from "../../img-node";
import { simpleFetch } from "../../utils/query";
import { transactionId } from "../../utils/random";
import { sleep } from "../../utils/sleep";
// import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform"

// @ts-ignore
class BilibiliMatcher extends BaseMatcher<BiliBiliOpusItem[]> {

  async *fetchPagesSource(): AsyncGenerator<Result<BiliBiliOpusItem[]>> {
    const host_mid = window.location.href.match(/space.bilibili.com\/(\d+)\//)?.[1];
    if (!host_mid) throw new Error("cannot find host_mid from " + window.location.href);
    const webid = document.querySelector<HTMLScriptElement>("script#__RENDER_DATA__")?.textContent?.match(/%3A%22([\w\.\-_]*)%22/)?.[1];
    if (!webid) throw new Error("cannot find webid");
    let offset = "";
    let page = 1;
    while (true) {
      const rid = transactionId();
      const wts = Date.now().toString();
      const data = await fetch(`https://api.bilibili.com/x/polymer/web-dynamic/v1/opus/feed/space?host_mid=${host_mid}&page=${page}&offset=${offset}&type=all&web_location=333.1387&w_webid=${webid}&w_rid=${rid}&wts=${wts}`, {
        "credentials": "include",
        "headers": {
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
        },
        "referrer": window.location.href,
        "method": "GET",
        "mode": "cors"
      }).then(resp => resp.json()) as BilibiliOPUSResponse;
      if (data.code !== 0) {
        yield Result.err(new Error("fetch opus error: " + data.message));
      }
      if (data.data.items.length === 0) {
        yield Result.err(new Error("fetch opus zero"));
      }
      if (data.data.has_more) {
        offset = data.data.offset;
        page = page + 1;
        const items = [...data.data.items];
        while (items.length > 0) {
          yield Result.ok(items.splice(0, 2));
          await sleep(1000);
        }
      } else {
        return;
      }
    }
  }

  async parseImgNodes(items: BiliBiliOpusItem[]): Promise<ImageNode[]> {
    // api
    // const requestInfos = items.map<RequestInfo>((item, i) => {
    //   return new Request(`https://api.bilibili.com//x/polymer/web-dynamic/v1/opus/detail?id=${item.opus_id}&timezone_offset=${Date.now() - i}`,
    //     {
    //       "credentials": "include",
    //       "headers": {
    //         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    //         "Accept-Language": "en-US,en;q=0.7,zh-CN;q=0.3",
    //         "Upgrade-Insecure-Requests": "1",
    //         "Sec-Fetch-Dest": "empty",
    //         "Sec-Fetch-Mode": "cors",
    //         "Sec-Fetch-Site": "same-site",
    //         "Priority": "u=0, i",
    //         "Referrer": item.jump_url.startsWith("http") ? item.jump_url : "https:" + item.jump_url,
    //         "Host": "api.bilibili.com",
    //         "Origin": "https://space.bilibili.com",
    //       },
    //       "method": "GET",
    //       "mode": "cors"
    //     });
    // });
    // const details = await batchFetch<BilibiliOPUSDetailResponse>(requestInfos, 1, "json");
    // const error = details.find(r => r instanceof Error);
    // if (error) throw error;

    // html
    // const requestInfos = items.map(item => {
    //   return new Request(`https://www.bilibili.com/opus/${item.opus_id}?spm_id_from=333.1387.0.0`,
    //     {
    //       "credentials": "include",
    //       "headers": {
    //         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    //         "Accept-Language": "en-US,en;q=0.7,zh-CN;q=0.3",
    //         "Upgrade-Insecure-Requests": "1",
    //         "Sec-Fetch-Dest": "document",
    //         "Sec-Fetch-Mode": "navigate",
    //         "Sec-Fetch-Site": "same-site",
    //         "Sec-Fetch-User": "?1",
    //         "Priority": "u=0, i",
    //         "Origin": "https://space.bilibili.com",
    //         // "Cookie": document.cookie,
    //       },
    //       "referrer": window.location.href,
    //       "method": "GET",
    //       // "mode": "cors"
    //     }
    //   )
    // });

    const raws = [];
    for (const item of items) {
      const raw = await simpleFetch(`https://www.bilibili.com/opus/${item.opus_id}?spm_id_from=333.1387.0.0`, "text", {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.7,zh-CN;q=0.3",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-User": "?1",
        "Priority": "u=0, i",
        "Origin": "https://space.bilibili.com",
        "Cookie": document.cookie,
        "Referrer": window.location.href,
      });
      if (raw.match("<title>验证码_哔哩哔哩</title>")) {
        throw new Error("触发风控，请打开此链接处理验证码：https:" + item.jump_url);
      }
      raws.push(raw);
    }
    // const raws = await batchFetch<string>(requestInfos, 1, "text");
    // const error = raws.find(r => r instanceof Error);
    // if (error) throw error;
    const details = raws.map((raw) => {
      const j = (raw as string).match(/window.__INITIAL_STATE__=(\{.*\});/)?.[1];
      if (!j) throw new Error("fetch opus error: cannot find windows.__INITIAL_STATE__");
      const detail = JSON.parse(j)?.detail as BilibiliOPUSDetail;
      if (!detail) throw new Error("fetch opus error: cannot find detail from windows.__INITIAL_STATE__");
      return detail;
    });

    if (items.length !== details.length) throw new Error(`fetch opus detail error, opus count: ${items.length}, detail count: ${details.length}`);
    return items.map((item, i) => {
      const detail = details[i];
      const pictures = detail.modules.filter(modu => modu.module_type === "MODULE_TYPE_CONTENT" || modu.module_type === "MODULE_TYPE_TOP")
        .map(modu =>
          modu.module_top?.display.album.pics
          ?? modu.module_content?.paragraphs.filter(para => para.pic).map(para => para.pic?.pics ?? []).flat()
          ?? []).flat();
      if (!pictures) throw new Error("cannot find opus content: " + item.jump_url);
      const digits = pictures.length.toString().length;
      return pictures.map((pic, j) => {
        const title = item.opus_id + "-" + (j + 1).toString().padStart(digits, "0");
        return new ImageNode(j === 0 ? item.cover.url : "", item.jump_url, title, undefined, pic.url, { w: pic.width, h: pic.height });
      });
    }).flat();
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    const ext = node.originSrc?.split(".").pop() ?? "jpg";
    return { url: node.originSrc!, title: node.title + "." + ext };
  }

}

type BiliBiliOpusItem = {
  content: string,
  jump_url: string,
  opus_id: string,
  stat: {
    like: number,
  },
  cover: {
    height: number,
    width: number,
    url: string,
  }
}

type BilibiliOPUSResponse = {
  code: number,
  message: string,
  ttl: number,
  data: {
    has_more: boolean,
    offset: string,
    update_num: number,
    items: BiliBiliOpusItem[],
  }
}

type BilibiliOPUSDetail = {
  id_str: string,
  modules: {
    module_type: string, // MODULE_TYPE_CONTENT
    module_top?: {
      display: {
        album: {
          pics: {
            height: number,
            size: number,
            url: string,
            live_url?: string,
            width: number,
          }[],
        }
      }
    },
    module_content?: {
      paragraphs: {
        align: number,
        para_type: number,
        pic?: {
          style: number,
          pics: {
            height: number,
            size: number,
            url: string,
            live_url?: string,
            width: number,
          }[],
        }
      }[],
    }
  }[],
}

// type BilibiliOPUSDetailResponse = {
//   code: number,
//   message: string,
//   ttl: number,
//   data?: { item: BilibiliOPUSDetail },
// }
// Disable bilibili
// ADAPTER.addSetup({
//   name: "Bilibili",
//   workURLs: [
//     /space.bilibili.com\/\d+\/upload\/opus$/
//   ],
//   match: ["https://www.bilibili.com/*"],
//   constructor: () => new BilibiliMatcher(),
// });
