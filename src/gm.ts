/**
 * Runtime access to the userscript manager API.
 *
 * The script always runs inside a userscript manager sandbox, where the
 * `GM` / `GM_*` APIs are globals.
 *
 * Bare globals are used on purpose: sandboxed scripts resolve the GM APIs
 * through the script scope in some managers, where `globalThis.GM` may be
 * undefined. Types are provided by `src/types/gm.d.ts`.
 */
const _GM = (typeof GM !== "undefined" ? GM : undefined) as GmType;
const _GM_getValue = (typeof GM_getValue !== "undefined" ? GM_getValue : undefined) as GmGetValueType;
const _GM_setValue = (typeof GM_setValue !== "undefined" ? GM_setValue : undefined) as GmSetValueType;

export { _GM as GM, _GM_getValue as GM_getValue, _GM_setValue as GM_setValue };
