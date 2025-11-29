import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { simpleFetch } from "../../utils/query";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

class MangaCopyMatcher extends BaseMatcher<string> {
  update_date?: string;
  chapterCount: number = 0;
  meta?: GalleryMeta;
  jojoKey?: string;
  galleryMeta(): GalleryMeta {
    if (this.meta) return this.meta;
    let title = document.querySelector(".comicParticulars-title-right > ul > li > h6")?.textContent ?? document.title;
    document.querySelectorAll(".comicParticulars-title-right > ul > li > span.comicParticulars-right-txt").forEach(ele => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(ele.textContent?.trim() || "")) {
        this.update_date = ele.textContent?.trim();
      }
    });
    title += "-c" + this.chapterCount + (this.update_date ? "-" + this.update_date : "")
    this.meta = new GalleryMeta(window.location.href, title);
    return this.meta;
  }
  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(source.source);
  }
  async parseImgNodes(source: string): Promise<ImageNode[]> {
    const raw = await simpleFetch(source, "text", { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36" });
    const doc = new DOMParser().parseFromString(raw, "text/html");
    const jojoKey = raw.match(/var (jojo|ccy|cct|ccz)\s?=\s?'(.*?)';/)?.[2];
    if (!jojoKey) throw new Error("cannot find jojo|ccy|cct|ccz Key for decrypt :(");
    const contentKey = doc.querySelector(".imageData[contentKey]")?.getAttribute("contentKey") ?? raw.match(/var (contentKey)\s?=\s?'(.*?)';/)?.[2];
    if (!contentKey) throw new Error("cannot find content key");
    try {
      const decryption = await decrypt(contentKey, jojoKey);
      const images = JSON.parse(decryption) as { url: string }[];
      const digits = images.length.toString().length;
      return images.map((img, i) => {
        return new ImageNode("", source as string, (i + 1).toString().padStart(digits, "0") + ".webp", undefined, img.url);
      })
    } catch (error) {
      throw new Error("cannot decrypt contentKey: " + (error as any).toString() + "\n" + contentKey);
    }
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }
  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    const thumbimg = document.querySelector<HTMLImageElement>(".comicParticulars-left-img > img[data-src]")?.getAttribute("data-src") || undefined;
    const pathWord = window.location.href.match(PATH_WORD_REGEX)?.[1];
    if (!pathWord) throw new Error("cannot match comic id");
    const comicInfoURL = `/comicdetail/${pathWord}/chapters`;
    const comicInfo = await window.fetch(comicInfoURL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "dnts": "3",
      }
    }).then<{ code: number, message: string, results: string }>(res => res.json()).catch(reason => new Error(reason.toString()));
    if (comicInfo instanceof Error) throw new Error("获取漫画详情失败: " + comicInfo.toString());
    if (comicInfo.code !== 200) throw new Error("获取漫画详情失败: " + comicInfo.message);
    const detailRaw = await decrypt(comicInfo.results, getCcz());
    const detail = JSON.parse(detailRaw) as MCChapterDetail;
    console.log(detail);
    const chapters: Chapter[] = [];
    // fetch all chapters by group
    const groups = detail.groups;
    if (!groups) throw new Error("章节信息为空，可能被风控(一小时)");
    let chapterCount = 1;
    // let offset = 0;
    for (const group in groups) {
      const chs = groups[group].chapters;
      for (const ch of chs)
        chapters.push(new Chapter(
          chapterCount++,
          group === "default" ? ch.name : `${groups[group].name}-${ch.name}`,
          `${window.location.origin}/comic/${pathWord}/chapter/${ch.id}`,
          thumbimg,
        ));
    }
    this.chapterCount = chapterCount - 1;
    return chapters;
  }
}

function getCcz(): string {
  // @ts-ignore
  if (ccz) return ccz;
  // @ts-ignore
  if (ccy) return ccy;
  return "op0zzpvv.nzh.oip";
}

type MCChapterDetail = {
  "build": {
    "path_word": string,
    // {
    //   "id": 1,
    //   "name": "話"
    // },
    "type": { id: number, name: string }[],
  },
  "groups": Record<string, MCChapterDetailGroup>,
}

type MCChapterDetailGroup = {
  // "path_word": "default",
  "path_word": string,
  "count": number,
  // "name": "默認",
  "name": string,
  // {
  //   "type": 2,
  //   "name": "VOL01",
  //   "id": "f6d7dfea-992c-11ea-aeec-00163e0ca5bd"
  // },
  "chapters": { type: number, name: string, id: string }[],
};

const PATH_WORD_REGEX = /\/comic\/(\w*)/;

async function decrypt(raw: string, jojoKey: string): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  // Key and IV
  // const dioKey = encoder.encode("xxxmanga.woo.key");
  const jojo = encoder.encode(jojoKey);
  const header = raw.substring(0, 16); // First 16 characters as IV
  const body = raw.substring(16); // Rest is the encrypted data
  const iv = encoder.encode(header);
  // Decode body from Hex to Uint8Array
  const bodyBytes = new Uint8Array(
    body.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
  // Import the AES key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    jojo,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  // Decrypt
  const decryptedBytes = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv, },
    cryptoKey,
    bodyBytes
  );
  // Convert decrypted data to string
  return decoder.decode(decryptedBytes);
}

// function decrypt(raw: string): string {
//   const dio = "xxxmanga.woo.key";
//   const cypto: any = initCypto();
//   const str = raw;
//   const header = str.substring(0x0, 0x10);
//   const body = str.substring(0x10, str.length);
//   const dioEn = cypto.enc.Utf8["parse"](dio);
//   const headerEn = cypto.enc.Utf8["parse"](header);
//   const bodyDe = (function(b: string) {
//     const bHex = cypto.enc.Hex.parse(b);
//     const b64 = cypto.enc.Base64.stringify(bHex);
//     return cypto.AES.decrypt(b64, dioEn, {
//       iv: headerEn,
//       mode: cypto.mode["CBC"],
//       padding: cypto.pad.Pkcs7,
//     }).toString(cypto["enc"].Utf8).toString();
//   })(body);
//   return bodyDe;
// }
// 
// function initCypto(): any {
//   const c: { exports: any, i: number, l: boolean }[] = [];
//   function r(i: number) {
//     if (c[i]) return c[i].exports;
//     c[i] = {
//       i: i,
//       l: false,
//       exports: {}
//     };
//     const e = c[i];
//     // @ts-ignore
//     const wj = webpackJsonp;
//     return wj[0][1][i].call(e.exports, e, e.exports, r), e.l = true, e.exports;
//   }
//   return r(6);
// }
// 
ADAPTER.addSetup({
  name: "拷贝漫画",
  workURLs: [
    /(mangacopy|copymanga).*?\/comic\/[^\/]*\/?$/
  ],
  match: ["https://www.mangacopy.com/*"],
  constructor: () => new MangaCopyMatcher(),
});

