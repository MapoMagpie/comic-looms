import { GM_getValue, GM_setValue } from "$";
import { KeyboardInBigImageModeId, KeyboardInFullViewGridId, KeyboardInMainId } from "./ui/event";
import { i18n } from "./utils/i18n";
import { b64EncodeUnicode, uuid } from "./utils/random";

export const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);

export type Oriented = "prev" | "next";

export type SiteProfile = {
  enable?: boolean,
  workURLs?: string[],
}
export type ReadMode = "pagination" | "continuous" | "horizontal";
export type GridMode = "flow" | "grid";

export type ImageActionDesc = {
  workon?: string,
  icon: string,
  description: string,
  funcBody: string,
}

export type Config = {
  /** 每行显示的数量 */
  colCount: number,
  /** 每行显示的数量 */
  rowHeight: number,
  /** 滚动换页 */
  readMode: ReadMode,
  gridMode: GridMode,
  /** 是否启用空闲加载器 */
  autoLoad: boolean,
  /** 是否获取最佳质量的图片 */
  fetchOriginal: boolean,
  /** 中止空闲加载器后的重新启动时间 */
  restartIdleLoader: number,
  /** 同时加载的图片数量 */
  threads: number,
  /** 同时下载的图片数量 */
  downloadThreads: number,
  /** 超时时间(秒)，默认16秒 */
  timeout: number,
  /** 配置版本 */
  version: string,
  /** 是否打印控制台日志 */
  debug: boolean,
  /** 是否初次使用脚本 */
  first: boolean,
  /** 逆转左右翻页，无论使用那种翻页方式，上下侧都代表上下 */
  reversePages: boolean
  /** 控制栏位置 */
  pageHelperAbTop: string
  /** 控制栏位置 */
  pageHelperAbLeft: string
  /** 控制栏位置 */
  pageHelperAbBottom: string
  /** 控制栏位置 */
  pageHelperAbRight: string
  /** 图片缩放比例 eg: 80, means 80% */
  imgScale: number
  /** 默认图片缩放比例，仅限连续阅读模式下。*/
  defaultImgScaleModeC: number
  /** 自动翻页间隔 */
  autoPageSpeed: number
  /** 自动开始 */
  autoPlay: boolean
  /** 高清晰度的缩略图 */
  hdThumbnails: boolean
  /** 图片名模板 */
  filenameTemplate: string
  /** 阻止滚动翻页时间 */
  preventScrollPageTime: number
  /** 下载文件分卷大小，单位Mib */
  archiveVolumeSize: number
  /** 动图转换为 */
  pixivConvertTo: "GIF" | "MP4"
  pixivImageServer?: string
  /** 自动收起控制面板 */
  autoCollapsePanel: boolean,
  /** 最小化控制栏 */
  minifyPageHelper: "always" | "inBigMode" | "never",
  /** 键盘自定义 */
  keyboards: {
    inBigImageMode: { [key in KeyboardInBigImageModeId]?: string[] },
    inFullViewGrid: { [key in KeyboardInFullViewGridId]?: string[] },
    inMain: { [key in KeyboardInMainId]?: string[] },
  },
  /** Is video muted? */
  muted?: boolean,
  /** Video volume, min 0, max 100 */
  volume?: number,
  paginationIMGCount: number,
  hitomiFormat: "auto" | "jxl" | "avif" | "webp",
  /** Automatically open after the page is loaded */
  autoOpen: boolean,
  /** Keep auto-loading after the tab loses focus */
  autoLoadInBackground: boolean,
  /** Reverse order for post with multiple images attatched */
  reverseMultipleImagesPost: boolean,
  /** Many galleries have both an English/Romanized title and a title in Japanese script. Which gallery name would you like as archive filename?  */
  ehentaiTitlePrefer: "english" | "japanese",
  /** Custom key scrolling delta */
  scrollingDelta: number,
  /** Custom key scrolling speed */
  scrollingSpeed: number,
  id: string,
  /** modify some config items by patch */
  configPatchVersion: number,
  /** custom display text of controlbar buttons */
  displayText: Partial<DisplayText>,
  customStyle: string,
  magnifier: boolean,
  /** directly enter into big image view */
  autoEnterBig: boolean,
  /** Reading position recorded. A new chapter continuing from this position will be provided next time. */
  pixivRecordReading: boolean,
  /** the aritst's works order, ascend true means old first */
  pixivAscendWorks: boolean,
  filenameOrder: "auto" | "numbers" | "original" | "alphabetically",
  dragImageOut: boolean,
  excludeVideo: boolean,
  enableFilter: boolean,
  imgNodeActions: ImageActionDesc[],
  /** minRatio indicates the minimum ratio of thumbnail display to prevent the thumbnail from being too thin. */
  minRatio: number,
};

function defaultColumns() {
  const screenWidth = window.screen.width;
  return screenWidth > 2500 ? 7 : screenWidth > 1900 ? 6 : screenWidth > 700 ? 5 : 3;
}

function defaultRowHeight() {
  const vh = window.screen.availHeight;
  return Math.floor(vh / 3.4);
}

export function defaultConf(): Config {
  return {
    colCount: defaultColumns(),
    rowHeight: defaultRowHeight(),
    readMode: "pagination",
    gridMode: "flow",
    autoLoad: true,
    fetchOriginal: false,
    restartIdleLoader: 2000,
    threads: 3,
    downloadThreads: 4,
    timeout: 10,
    version: CONF_VERSION,
    debug: true,
    first: true,
    reversePages: false,
    pageHelperAbTop: "unset",
    pageHelperAbLeft: "20px",
    pageHelperAbBottom: "20px",
    pageHelperAbRight: "unset",
    imgScale: 100,
    defaultImgScaleModeC: 60,
    autoPageSpeed: 5, // pagination readmode = 5, continuous readmode = 1
    autoPlay: false,
    hdThumbnails: false,
    filenameTemplate: "{number}-{title}",
    preventScrollPageTime: 100,
    archiveVolumeSize: 1200,
    pixivConvertTo: "GIF",
    pixivImageServer: undefined,
    autoCollapsePanel: true,
    minifyPageHelper: IS_MOBILE ? "never" : "inBigMode",
    keyboards: { inBigImageMode: {}, inFullViewGrid: {}, inMain: {} },
    muted: false,
    volume: 50,
    paginationIMGCount: 1,
    hitomiFormat: "auto",
    autoOpen: false,
    autoLoadInBackground: true,
    reverseMultipleImagesPost: true,
    ehentaiTitlePrefer: "japanese",
    scrollingDelta: 300,
    scrollingSpeed: 20,
    id: uuid(),
    configPatchVersion: 0,
    displayText: {},
    customStyle: "",
    magnifier: false,
    autoEnterBig: false,
    pixivRecordReading: false,
    pixivAscendWorks: false,
    filenameOrder: "auto",
    dragImageOut: false,
    excludeVideo: false,
    enableFilter: false,
    imgNodeActions: [],
    minRatio: 0.5,
  };
}

const CONF_VERSION = "4.4.0";
export const signal = { first: true };

const CONFIG_KEY = "ehvh_cfg_";

function getStorageMethod() {
  if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
    // Greasemonkey or Tampermonkey API
    return {
      setItem: (key: string, value: string) => GM_setValue(key, value),
      getItem: (key: string): string | null => GM_getValue<string>(key),
    };
  } else if (typeof localStorage !== 'undefined') {
    // Web Storage API
    return {
      setItem: (key: string, value: string) => localStorage.setItem(key, value),
      getItem: (key: string): string | null => localStorage.getItem(key),
    };
  } else {
    // No supported API
    throw new Error('No supported storage method found');
  }
}

const storage = getStorageMethod();

type SiteConfig = Partial<Config> & SiteProfile;

export function getConf(): Config {
  const cfgStr = storage.getItem(CONFIG_KEY);
  if (cfgStr) {
    let cfg: Config = JSON.parse(cfgStr);
    if (cfg.version === CONF_VERSION) {
      return confHealthCheck(cfg);
    }
  }
  const cfg = defaultConf();
  saveConf(cfg);
  return cfg;
}

export function getSiteConfig(name: string): SiteConfig {
  const cfgStr = storage.getItem(getConfigKey(name));
  if (!cfgStr) return {}
  return JSON.parse(cfgStr);
}

function confHealthCheck(cf: Config): Config {
  let changed = false;
  // check config keys and values undefined
  const defa = defaultConf();
  const defaKeys = Object.keys(defa) as (keyof Config)[];
  defaKeys.forEach((key) => {
    if (cf[key] === undefined) {
      (cf[key] as any) = defa[key];
      changed = true;
    }
  });
  // delete invalid keys
  const cfKeys = Object.keys(cf) as (keyof Config)[];
  for (const k of cfKeys) {
    if (!defaKeys.includes(k)) {
      delete cf[k];
      changed = true;
    }
  }
  (["pageHelperAbTop", "pageHelperAbLeft", "pageHelperAbBottom", "pageHelperAbRight"] as (keyof Config)[]).forEach((key) => {
    if ((cf[key]) !== "unset") {
      const pos = parseInt(cf[key] as string);
      const screenLimit = key.endsWith("Right") || key.endsWith("Left") ? window.screen.width : window.screen.height;
      if (isNaN(pos) || pos < 5 || pos > screenLimit) {
        (cf[key] as any) = 5 + "px";
        changed = true;
      }
    }
  });
  // check enum
  if (!["pagination", "continuous", "horizontal"].includes(cf.readMode)) {
    cf.readMode = "pagination";
    changed = true;
  }
  if (cf.imgScale === undefined || isNaN(cf.imgScale) || cf.imgScale === 0) {
    cf.imgScale = cf.readMode === "continuous" ? cf.defaultImgScaleModeC : 100;
    changed = true;
  }

  const newCf = patchConfig(cf);
  if (newCf) {
    cf = newCf;
    changed = true;
  }
  if (changed) {
    saveConf(cf);
  }
  return cf;
}

function patchConfig(cf: Config): Config | null {
  let changed = false;
  if (cf.configPatchVersion < 8) {
    cf.configPatchVersion = 8;
    cf.colCount = defaultColumns();
    cf.keyboards = { inBigImageMode: {}, inFullViewGrid: {}, inMain: {} };
    changed = true;
  }
  if (cf.configPatchVersion < 10) {
    cf.configPatchVersion = 10;
    cf.customStyle = "";
    changed = true;
  }
  return changed ? cf : null;
}

export function resetConf(name?: string) {
  const ok = confirm(`${i18n.resetConfig.get()}${name ? (" On " + name) : " On " + i18n.global.get()} ?`);
  if (ok) {
    if (name) {
      storage.setItem(getConfigKey(name), "");
    } else {
      saveConf(defaultConf());
    }
  };
  return ok;
}
export function saveConf(c: SiteConfig, name?: string) {
  const configKey = getConfigKey(name);
  const raw = storage.getItem(configKey);
  const config = raw ? JSON.parse(raw) : {};
  ["selectedSiteNameConfig"].forEach(key => delete config[key]);
  if (name) {
    ["keyboards", "siteProfiles"].forEach(key => delete config[key]);
  }
  storage.setItem(configKey, JSON.stringify({ ...config, ...c }));
}

function getConfigKey(name?: string) {
  if (name) {
    return CONFIG_KEY + b64EncodeUnicode(name).replaceAll(/[+=\/]/g, "-");
  } else {
    return CONFIG_KEY;
  }
}

export const transient = { imgSrcCSP: false, originalPolicy: "" };

export type ConfigNumberType = "colCount"
  | "rowHeight"
  | "threads"
  | "downloadThreads"
  | "timeout"
  | "autoPageSpeed"
  | "preventScrollPageTime"
  | "paginationIMGCount"
  | "scrollingDelta"
  | "scrollingSpeed"
  ;
export type ConfigBooleanType = "fetchOriginal"
  | "autoLoad"
  | "reversePages"
  | "autoPlay"
  | "autoCollapsePanel"
  | "autoOpen"
  | "autoLoadInBackground"
  | "reverseMultipleImagesPost"
  | "magnifier"
  | "autoEnterBig"
  | "pixivRecordReading"
  | "pixivAscendWorks"
  | "hdThumbnails"
  | "dragImageOut"
  | "excludeVideo"
  ;
export type ConfigSelectType = "readMode"
  | "gridMode"
  | "minifyPageHelper"
  | "hitomiFormat"
  | "ehentaiTitlePrefer"
  | "filenameOrder"
  ;
export type ConfigTextType = "pixivImageServer"
  ;

type OptionValue = {
  value: string;
  display: string;
}

// config panel
export type ConfigItem = {
  key: ConfigNumberType | ConfigBooleanType | ConfigSelectType | ConfigTextType;
  typ: "boolean" | "number" | "select" | "input";
  i18nKey?: string;
  options?: OptionValue[];
  placeholder?: string;
  gridColumnRange?: [number, number];
  displayInSite?: RegExp;
}

export const ConfigItems: ConfigItem[] = [
  { key: "colCount", typ: "number" },
  { key: "rowHeight", typ: "number" },
  { key: "threads", typ: "number" },
  { key: "downloadThreads", typ: "number" },
  { key: "paginationIMGCount", typ: "number" },
  { key: "timeout", typ: "number" },
  { key: "preventScrollPageTime", typ: "number" },
  { key: "autoPageSpeed", typ: "number" },
  { key: "scrollingDelta", typ: "number" },
  { key: "scrollingSpeed", typ: "number" },
  { key: "fetchOriginal", typ: "boolean", gridColumnRange: [1, 6] },
  { key: "autoLoad", typ: "boolean", gridColumnRange: [6, 11] },
  { key: "reversePages", typ: "boolean", gridColumnRange: [1, 6] },
  { key: "autoPlay", typ: "boolean", gridColumnRange: [6, 11] },
  { key: "autoLoadInBackground", typ: "boolean", gridColumnRange: [1, 6] },
  { key: "autoOpen", typ: "boolean", gridColumnRange: [6, 11] },
  { key: "magnifier", typ: "boolean", gridColumnRange: [1, 6] },
  { key: "autoEnterBig", typ: "boolean", gridColumnRange: [6, 11] },
  { key: "dragImageOut", typ: "boolean", gridColumnRange: [1, 6] },
  { key: "hdThumbnails", typ: "boolean", gridColumnRange: [6, 11] },
  { key: "autoCollapsePanel", typ: "boolean", gridColumnRange: [1, 11] },
  { key: "pixivRecordReading", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /pixiv.net/ },
  { key: "pixivAscendWorks", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /pixiv.net/ },
  { key: "pixivImageServer", typ: "input", gridColumnRange: [1, 11], placeholder: "https://i.pixiv.re", displayInSite: /pixiv.net/ },
  { key: "reverseMultipleImagesPost", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /(x.com|twitter.com)\// },
  { key: "excludeVideo", typ: "boolean", gridColumnRange: [1, 11], displayInSite: /(x.com|twitter.com|kemono.cr)\// },
  {
    key: "readMode", typ: "select", options: [
      { value: "pagination", display: "Pagination" },
      { value: "continuous", display: "Continuous" },
      { value: "horizontal", display: "Horizontal" },
    ]
  },
  {
    key: "gridMode", typ: "select", options: [
      { value: "grid", display: "Grid" },
      { value: "flow", display: "Flow" },
    ]
  },
  {
    key: "minifyPageHelper", typ: "select", options: [
      { value: "always", display: "Always" },
      { value: "inBigMode", display: "InBigMode" },
      { value: "never", display: "Never" },
    ]
  },
  {
    key: "hitomiFormat", typ: "select", options: [
      { value: "auto", display: "Auto" },
      { value: "avif", display: "Avif" },
      { value: "webp", display: "Webp" },
      { value: "jxl", display: "Jxl" },
    ], displayInSite: /hitomi.la\//
  },
  {
    key: "ehentaiTitlePrefer", typ: "select", options: [
      { value: "english", display: "English" },
      { value: "japanese", display: "Japanese" },
    ], displayInSite: /e[-x]hentai(.*)?.(org|onion)\/|imhentai.xxx/
  },
  {
    key: "filenameOrder", typ: "select", options: [
      { value: "auto", display: "Auto" },
      { value: "numbers", display: "Numbers" },
      { value: "original", display: "Original" },
      { value: "alphabetically", display: "Alphabetically" },
    ]
  },
];

// custom page helper bar style
export type DisplayText = {
  entry: string,
  collapse: string,
  fin: string,
  autoPagePlay: string,
  autoPagePause: string,
  config: string,
  download: string,
  chapters: string,
  filter: string,
  pagination: string,
  continuous: string,
  horizontal: string,
}
