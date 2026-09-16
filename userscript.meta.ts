import { readFileSync } from "node:fs";
import { ICON } from "./userscript.icon";

/**
 * Single source of truth for the userscript version.
 * It is used both for `_VERSION_` (see `vite.config.ts`) and for the
 * `@version` metadata line below.
 */
export const VERSION = "4.15.5";

const REPO = "https://github.com/MapoMagpie/comic-looms";
const RELEASE = `${REPO}/releases/latest/download`;

/**
 * npm packages loaded from jsDelivr through `@require`, with the global they
 * expose. `vite.config.ts` externalizes exactly these imports.
 */
export const CDN_PACKAGES = [
  { name: "@zip.js/zip.js", file: "dist/zip.min.js", global: "zip" },
  { name: "file-saver", file: "dist/FileSaver.min.js", global: "saveAs" },
  { name: "pica", file: "dist/pica.min.js", global: "pica" },
] as const;

/** jsDelivr URL pinned to the version of `name` installed in `node_modules`. */
function jsdelivr(name: string, filePath: string): string {
  const pkg = JSON.parse(readFileSync(`node_modules/${name}/package.json`, "utf-8")) as { version: string };
  return `https://cdn.jsdelivr.net/npm/${name}@${pkg.version}/${filePath}`;
}

/**
 * The userscript metadata block. It is written as plain text on purpose, so it
 * can be edited like the generated `.meta.js` file; the only dynamic parts are
 * the version and the CDN versions of the `@require`d packages.
 */
export const META = [
  "// ==UserScript==",
  "// @name               Comic Looms",
  "// @name:en            Comic Looms",
  "// @name:zh-CN         漫画织机",
  "// @name:zh-TW         漫畫織機",
  "// @name:ja            コミック織機",
  "// @name:ko            만화 베틀",
  "// @name:es            Comic Looms",
  "// @name:ka            Comic Looms",
  `// @namespace          ${REPO}`,
  `// @version            ${VERSION}`,
  "// @author             MapoMagpie",
  "// @description        Manga Viewer + Downloader, Focus on experience and low load on the site. Support you in finding the site you are searching for.",
  "// @description:en     Manga Viewer + Downloader, Focus on experience and low load on the site. Support you in finding the site you are searching for.",
  "// @description:zh-CN  漫画阅读 + 下载器，注重体验和对站点的负载控制。支持你正在搜索的站点。",
  "// @description:zh-TW  漫畫閱讀 + 下載器，注重體驗和對站點的負載控制。支持你正在搜索的站點。",
  "// @description:ja     サイトのエクスペリエンスと負荷制御に重点を置いたコミック閲覧 + ダウンローダー。あなたが探しているサイトを見つけるのをサポートします。",
  "// @description:ko     이 유저 스크립트는 특정 사이트들 에서 갤러리 또는 작가의 홈페이지를 빠르고 편리하게 탐색할 수 있도록 하며, 일괄 다운로드 기능을 지원합니다. 브라우징 경험과 낮은 사이트 부하에 중점을 둡니다.",
  "// @description:es     Este Userscript permite una navegación rápida y conveniente por galerías o páginas principales de artistas en ciertos sitios, con soporte para descargas por lotes, enfocándose en la experiencia de navegación y en una carga baja para el sitio.",
  "// @description:ka     Manga Viewer + Downloader, Focus on experience and low load on the site. Support you in finding the site you are searching for.",
  "// @license            MIT",
  `// @icon               ${ICON}`,
  `// @supportURL         ${REPO}`,
  `// @downloadURL        ${RELEASE}/comic-looms.user.js`,
  `// @updateURL          ${RELEASE}/comic-looms.meta.js`,
  "// @match              https://*.pixiv.net/*",
  "// @match              https://steamcommunity.com/*",
  "// @match              https://twitter.com/*",
  "// @match              https://x.com/*",
  "// @match              https://*.instagram.com/*",
  "// @match              https://*.pinterest.com/*",
  "// @match              https://*.manhuagui.com/*",
  "// @match              https://*.mangacopy.com/*",
  "// @match              https://*.copymanga.tv/*",
  "// @match              https://*.artstation.com/*",
  "// @match              *://*/*",
  ...CDN_PACKAGES.map((pkg) => `// @require            ${jsdelivr(pkg.name, pkg.file)}`),
  "// @connect            *",
  // Keep in sync with the GM APIs used in `src/` (see `src/gm.ts`).
  "// @grant              GM.xmlHttpRequest",
  "// @grant              GM_getValue",
  "// @grant              GM_setValue",
  "// ==/UserScript==",
].join("\n");
