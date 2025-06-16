import ImageNode from "../img-node";
import { Chapter } from "../page-fetcher";
import { evLog } from "../utils/ev-log";
import { BaseMatcher, OriginMeta, Result } from "./platform";

const EXTRACT_C_DATA = /var C_DATA='(.*?)'/;

function decrypt(key: string, raw: string): string {
  // @ts-ignore
  const cryptoJS = CryptoJS;
  if (!cryptoJS) throw new Error("cryptoJS undefined");
  var keyenc = cryptoJS.enc.Utf8.parse(key);
  var ret = cryptoJS.AES.decrypt(raw, keyenc, {
    mode: cryptoJS.mode.ECB,
    padding: cryptoJS.pad.Pkcs7
  });
  return cryptoJS.enc.Utf8.stringify(ret).toString();
};

function parseBase64ToUtf8(raw: string): string {
  // console.log(raw);
  const decodedBytes = Uint8Array.from(atob(raw), (char) => char.charCodeAt(0));
  const decoder = new TextDecoder();
  return decoder.decode(decodedBytes);
}

function initColamangaKeys(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const jsURL = "https://www.colamanga.com/js/custom.js";
    const elem = document.createElement("script");
    elem.addEventListener("load", async () => {
      try {
        const text = await window.fetch(jsURL).then(res => res.text());
        const keys = parseKeys(text);
        resolve(keys);
      } catch (reason) {
        reject(reason);
      }
    });
    elem.src = jsURL;
    elem.type = "text/javascript";
    document.querySelector("head")!.append(elem);
  });
}

function initColaMangaKeyMap(): Promise<[Record<number, string>, Function]> {
  return new Promise((resolve, reject) => {
    const jsURL = "https://www.colamanga.com/js/manga.read.js";
    const elem = document.createElement("script");
    elem.addEventListener("load", async () => {
      try {
        const text = await window.fetch(jsURL).then(res => res.text());
        let fun: Function | undefined;
        const matches = text.matchAll(/if\(_0x\w+==(0x\w+)\)return (_0x\w+)\((0x\w+)\);/gm);
        const keymap: Record<number, string> = {};
        let isEmpty = true;
        for (const m of matches) {
          const key = m[1];
          const fn = m[2];
          const pam = m[3];
          if (!fun) {
            const name = findTheFunction(text, fn)?.[0]?.[0] ?? fn;
            console.log("colamanga, the function name: ", name);
            fun = new Function("p", `return ${name}(p)`);
          }
          const val = fun(pam);
          keymap[parseInt(key)] = val;
          isEmpty = false;
        }
        if (isEmpty) throw new Error("cannot init key map from " + jsURL);
        const fn = parseGetActualKeyFunction(text);
        resolve([keymap, fn]);
      } catch (reason) {
        reject(reason);
      }
    });
    elem.src = jsURL;
    elem.type = "text/javascript";
    document.querySelector("head")!.append(elem);
  });
}

// FIXME unknown chapter occurs in download panel
export class ColaMangaMatcher extends BaseMatcher<string> {
  infoMap: Record<string, Info> = {};
  keymap?: Record<number, string>;
  keys: string[] = ["dDeIieDgQpwVQZsJ", "54bilXmmMoYBqBcI", "KcmiZ8owmiBoPRMf", "4uOJvtnq5YYIKZWA", "lVfo0i0o4g3V78Rt", "i8XLTfT8Mvu1Fcv2"];
  getActualK?: Function;
  name(): string {
    return "colamanga";
  }
  async fetchChapters(): Promise<Chapter[]> {
    this.keys = await initColamangaKeys();
    [this.keymap, this.getActualK] = await initColaMangaKeyMap();
    // console.log("colamanga keys: ", this.keys);
    const thumbimg = document.querySelector("dt.fed-part-rows > a")?.getAttribute("data-original") || undefined;
    const list = Array.from(document.querySelectorAll<HTMLAnchorElement>(".all_data_list .fed-part-rows > li > a"));
    return list.map<Chapter>((a, index) => new Chapter(index, a.title, a.href, thumbimg));
  }
  async *fetchPagesSource(source: Chapter): AsyncGenerator<Result<string>> {
    yield Result.ok(source.source);
  }
  async parseImgNodes(page: string, _chapterID?: number): Promise<ImageNode[]> {
    const raw = await window.fetch(page).then(res => res.text());
    const cdata = raw.match(EXTRACT_C_DATA)?.[1];
    if (!cdata) throw new Error("cannot find C_DATA from page: " + page);
    let infoRaw: string | undefined;
    for (const k of this.keys) {
      try {
        infoRaw = decrypt(k, parseBase64ToUtf8(cdata));
        break;
      } catch (_error) {
        evLog("error", (_error as any).toString());
      }
    }
    if (!infoRaw) throw new Error("colamanga decrypt C_DATA failed");
    // console.log("colamanga info: ", info);
    infoRaw = infoRaw.replace("};", "},");
    infoRaw = infoRaw.replaceAll("info=", "info:");
    infoRaw = "{" + infoRaw + "}";
    infoRaw = infoRaw.replaceAll(/(\w+):/g, "\"$1\":");
    const info = JSON.parse(infoRaw) as Info;
    const [count, path] = decryptInfo(info.mh_info.enc_code1, info.mh_info.enc_code2, info.mh_info.mhid, this.keys);
    if (count === undefined || path === undefined) throw new Error("colamanga decrypt mh_info failed");
    const nodes = [];
    const href = window.location.origin + info.mh_info.webPath + info.mh_info.pageurl;
    this.infoMap[href] = info;
    for (let start = info.mh_info.startimg; start <= parseInt(count); start++) {
      const [name, url] = getImageURL(start, path, info);
      // console.log("colamanga image url: ", url);
      nodes.push(new ImageNode("", href, name, undefined, url));
    }
    return nodes;
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }
  async processData(data: Uint8Array, _contentType: string, node: ImageNode): Promise<[Uint8Array, string]> {
    const info = this.infoMap[node.href];
    if (!info) throw new Error("cannot found info from " + node.href);
    if (info.image_info.imgKey) {
      const decoded = this.decryptImageData(data, info.image_info.keyType, info.image_info.imgKey, this.keymap!, this.keys);
      return [decoded, _contentType];
    } else {
      return [data, _contentType];
    }
  }
  workURL(): RegExp {
    return /colamanga.com\/manga-\w*\/?$/;
  }
  headers(): Record<string, string> {
    return {
      "Referer": window.location.href,
      "Origin": window.location.origin,
    }
  }
  decryptImageData(data: Uint8Array, keyType: string, imgKey: string, keymap: Record<number, string>, keys: string[]) {
    let kRaw: string | undefined;
    if (keyType !== "" && keyType !== "0") {
      kRaw = keymap[parseInt(keyType)];
    } else {
      for (const k of keys) {
        try {
          kRaw = decrypt(k, imgKey);
          break;
        } catch (_error) {
          evLog("error", (_error as any).toString());
        }
      }
    }
    // const start = performance.now();
    const wordArray = convertUint8ArrayToWordArray(data);
    const encArray = { ciphertext: wordArray };
    // @ts-ignore
    const cryptoJS = CryptoJS;
    const actualK = this.getActualK?.(kRaw);
    const key = cryptoJS.enc.Utf8.parse(actualK);
    const de = cryptoJS.AES.decrypt(encArray, key, {
      iv: cryptoJS.enc.Utf8.parse("0000000000000000"),
      mode: cryptoJS.mode.CBC,
      padding: cryptoJS.pad.Pkcs7
    });
    const ret = convertWordArrayToUint8Array(de);
    // const end = performance.now();
    // console.log("colamanga decode image data: ", end - start);
    return ret;
  }
}

type Info = {
  mh_info: {
    startimg: number,
    enc_code1: string,
    mhid: string,
    enc_code2: string,
    mhname: string,
    pageid: number,
    pagename: string,
    pageurl: string,
    readmode: number,
    maxpreload: number,
    defaultminline: number,
    domain: string,
    manga_size: string,
    default_price: number,
    price: number,
    use_server: string,
    webPath: string,
  },
  image_info: {
    img_type: string,
    urls__direct: string,
    line_id: number,
    local_watch_url: string,
    keyType: string,
    imgKey: string,
  }
}

function convertUint8ArrayToWordArray(data: Uint8Array) {
  let words = [];
  let i = 0;
  let len = data.length;
  while (i < len) {
    words.push(
      (data[i++] << 24) |
      (data[i++] << 16) |
      (data[i++] << 8) |
      (data[i++])
    );
  }
  return {
    sigBytes: words.length * 4,
    words: words
  };
}

type WordArray = ReturnType<typeof convertUint8ArrayToWordArray>;

function convertWordArrayToUint8Array(data: WordArray): Uint8Array {
  const len = data.words.length;
  const u8_array = new Uint8Array(len << 2);
  let offset = 0;
  let word;
  for (let i = 0; i < len; i++) {
    word = data.words[i];
    u8_array[offset++] = word >> 24;
    u8_array[offset++] = (word >> 16) & 0xff;
    u8_array[offset++] = (word >> 8) & 0xff;
    u8_array[offset++] = word & 0xff;
  }
  return u8_array;
}


function decryptInfo(countEncCode: string, pathEncCode: string, mhid: string, keys: string[]) {
  let count: string | undefined;
  for (const k of keys) {
    try {
      count = decrypt(k, parseBase64ToUtf8(countEncCode));
      if (count == "" || isNaN(parseInt(count))) {
        throw new Error("colamanga failed decrypt image count");
      }
      break;
    } catch (_error) {
      evLog("error", (_error as any).toString());
    }
  }
  let path: string | undefined;
  for (const k of keys) {
    try {
      path = decrypt(k, parseBase64ToUtf8(pathEncCode));
      if (path == "" || !path.startsWith(mhid + "/")) {
        throw new Error("colamanga failed decrypt image path");
      }
      break;
    } catch (_error) {
      evLog("error", (_error as any).toString());
    }
  }
  return [count, path];
}

function getImageURL(index: number, path: string, info: Info) {
  const start = (info.mh_info.startimg + index - 1).toString().padStart(4, "0");
  let imgName = start + ".jpg";
  if (info.image_info.imgKey != undefined && info.image_info.imgKey != "") {
    imgName = start + ".enc.webp";
  }
  const host = window.location.host.replace("www.", "");
  const url = "https://img" + info.mh_info.use_server + "." + host + "/comic/" + encodeURI(path) + imgName;
  return [imgName, url];
}

function parseKeys(raw: string) {
  const regex1 = /window(\[\w+\(0x[^)]+\)\]){2}\(((\w+)(\(0x[^)]+\))?),/gm;
  const matches = raw.matchAll(regex1);
  const keys: string[] = [];
  for (const m of matches) {
    const kv = m[3];
    const pv = m[4];
    if (!kv) continue;
    for (const [fn, param] of findTheFunction(raw, kv, pv)) {
      if (fn === null || param === null) continue;
      const key = new Function("return " + fn + param)();
      if (keys.includes(key)) continue;
      keys.push(key);
    }
  }
  return keys;
}

function parseGetActualKeyFunction(raw: string) {
  const regex2 = /(eval\(function.*?\)\)\)),_0x/;
  const evalExpression = raw.match(regex2)?.[1];
  return new Function("ksddd", `
        var actualKey = ksddd;
        ${evalExpression};
        return actualKey;
      `);
}

function findTheFunction(raw: string, val: string, param?: string): [string | null, string | null][] {
  const reg = new RegExp(val + `=((\\w+)(\\([^)]+\\))?)[,; ]`, "gm");
  const matches = raw.matchAll(reg);
  const ret: [string | null, string | null][] = [];
  let empty = true;
  for (const m of matches) {
    empty = false;
    const k = m[2];
    const p = m[3];
    if (p) param = p;
    if (k) {
      ret.push(...findTheFunction(raw, k, param));
    }
  }
  if (empty && raw.includes("function " + val)) {
    ret.push([val, param ?? null]);
  }
  return ret;
}
