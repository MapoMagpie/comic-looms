/**
 * GM API type definitions for Tampermonkey / Violentmonkey / Greasemonkey.
 *
 * Vendored from `vite-plugin-monkey@8.0.6` (`global.d.ts`, MIT License,
 * https://github.com/lisonge/vite-plugin-monkey) so the project no longer
 * depends on that package. The runtime counterparts live in `src/gm.ts`.
 */
export {};

//#region src/client/types/addElement.d.ts
type HTMLElementTagName = keyof HTMLElementTagNameMap;
//#endregion
//#region src/client/types/audio.d.ts
interface GmAudioMuteDetails {
  isMuted: boolean;
}
interface GmAudioMuteState {
  isMuted: boolean;
  muteReason: string;
  isAudible: boolean;
}
interface GmAudioStateChangeListener {
  (info: { muted: string; audible: boolean }): void;
}
interface GmAudioType {
  setMute(details: GmAudioMuteDetails, callback?: GmVoidCallback): void;
  getState(callback: (state: GmAudioMuteState) => void): void;
  addStateChangeListener(
    listener: GmAudioStateChangeListener,
    callback: GmVoidCallback,
  ): void;
  removeStateChangeListener(
    listener: GmAnyFuntion,
    callback: GmVoidCallback,
  ): void;
}
interface GmAsyncAudioType {
  setMute(details: GmAudioMuteDetails): Promise<void>;
  getState(): Promise<GmAudioMuteState>;
  addStateChangeListener(listener: GmAudioStateChangeListener): Promise<void>;
  removeStateChangeListener(listener: GmAnyFuntion): Promise<void>;
}
//#endregion
//#region src/client/types/cookie.d.ts
interface GmPartitionKeyType {
  topLevelSite?: string;
}
interface GmCallbackCookie {
  domain: string;
  expirationDate?: number;
  firstPartyDomain?: string;
  partitionKey?: GmPartitionKeyType;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  session: boolean;
  value: string;
}
interface GmCookieListOptions {
  url?: string;
  domain?: string;
  name?: string;
  path?: string;
  partitionKey?: GmPartitionKeyType;
}
interface GmCookieSetOptions {
  url?: string;
  name: string;
  value: string;
  domain?: string;
  firstPartyDomain?: string;
  partitionKey?: GmPartitionKeyType;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  expirationDate?: number;
}
interface GmCookieDeleteOptions {
  url?: string;
  name: string;
  firstPartyDomain?: string;
  partitionKey?: GmPartitionKeyType;
}
interface GmCookieListCallback {
  (cookies: GmCallbackCookie[], error: any): void;
}
interface GmErrorEvent<
  R extends GmResponseType,
> extends GmResponseEventBase<R> {
  error: string;
}
//#endregion
//#region src/client/types/info.d.ts
interface GmInfoResourceType {
  name: string;
  url: string;
  error: string;
  content: string;
  meta: string;
}
/**
 * @see https://violentmonkey.github.io/api/gm/#gm_info
 */
interface ViolentInfoType {
  version: string;
  scriptHandler: string;
  scriptMetaStr: string;
  scriptSource: string;
  scriptUpdateURL: string;
  scriptWillUpdate: boolean;
  uuid: string;
  injectInto: string;
  platform: {
    arch: "arm" | "mips" | "mips64" | "x86-32" | "x86-64";
    browserName: string;
    browserVersion: string;
    os: "android" | "cros" | "linux" | "mac" | "openbsd" | "win";
  };
}
interface ViolentScriptType {
  namespace: string;
  name: string;
  author: string;
  description: string;
  icon: string;
  excludes: string[];
  includes: string[];
  matches: string[];
  resources: GmInfoResourceType[];
  version: string;
  noframes: boolean;
  unwrap: boolean;
  homepage: string;
  excludeMatches: string[];
  runAt: string;
  homepageURL: string;
  license: string;
  require: string[];
}
/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_info
 */
interface TamperInfoType {
  container: {
    id: string;
    name: string;
  };
  downloadMode: string;
  isFirstPartyIsolation: boolean;
  relaxedCsp: string;
  isIncognito: boolean;
  sandboxMode: "js" | "raw" | "dom";
  scriptHandler: string;
  scriptMetaStr: string;
  scriptUpdateURL: string;
  scriptWillUpdate: boolean;
  userAgentData: {
    brands: {
      brand: string;
      version: string;
    }[];
    mobile: boolean;
    platform: string;
    architecture: string;
    bitness: string;
  };
  scriptSource: string;
}
interface TamperScriptType {
  antifeatures: {
    [antifeature: string]: {
      [locale: string]: string;
    };
  };
  author: string;
  blockers: string[];
  connects: string[];
  copyright: string;
  deleted: number | undefined;
  description_i18n: {
    [locale: string]: string;
  };
  description: string;
  downloadURL: string;
  excludes: string[];
  fileURL: string;
  grant: string[];
  header: string;
  homepage: string;
  icon: string;
  icon64: string;
  includes: string[];
  lastModified: number;
  matches: string[];
  name_i18n: {
    [locale: string]: string;
  };
  name: string;
  namespace: string;
  position: number;
  resources: GmInfoResourceType[];
  supportURL: string;
  system: boolean;
  "run-at": string;
  "run-in": string[];
  unwrap: boolean;
  updateURL: string;
  version: string;
  webRequest: GmWebRequestRule[];
  options: {
    check_for_updates: boolean;
    comment: string;
    compatopts_for_requires: boolean;
    compat_wrappedjsobject: boolean;
    compat_metadata: boolean;
    compat_foreach: boolean;
    compat_powerful_this: boolean;
    sandbox: string;
    noframes: boolean;
    unwrap: boolean;
    run_at: string;
    run_in: string;
    override: {
      use_includes: string[];
      orig_includes: string[];
      merge_includes: boolean;
      use_matches: string[];
      orig_matches: string[];
      merge_matches: boolean;
      use_excludes: string[];
      orig_excludes: string[];
      merge_excludes: boolean;
      use_connects: string[];
      orig_connects: string[];
      merge_connects: boolean;
      use_blockers: string[];
      orig_run_at: string;
      orig_run_in: string[];
      orig_noframes: boolean;
    };
  };
}
type MonkeyWindow = typeof window & GmContextType;

declare global {
  interface GmAddElementAttributes {
    class?: string;
    style?: string;
    textContent?: string;
    [key: string]: any;
  }
  interface GmAddElementType {
    <K extends HTMLElementTagName>(
      tagName: K,
      attributes?: GmAddElementAttributes,
    ): HTMLElementTagNameMap[K];
    (tagName: string, attributes?: GmAddElementAttributes): HTMLElement;
    <K extends HTMLElementTagName>(
      parentNode: Node | Element | ShadowRoot,
      tagName: K,
      attributes?: GmAddElementAttributes,
    ): HTMLElementTagNameMap[K];
    (
      parentNode: Node | Element | ShadowRoot,
      tagName: string,
      attributes?: GmAddElementAttributes,
    ): HTMLElement;
  }
  interface GmAsyncAddElementType {
    <K extends HTMLElementTagName>(
      tagName: K,
      attributes?: GmAddElementAttributes,
    ): Promise<HTMLElementTagNameMap[K]> | HTMLElementTagNameMap[K];
    (tagName: string, attributes?: GmAddElementAttributes): HTMLElement;
    <K extends HTMLElementTagName>(
      parentNode: Node | Element | ShadowRoot,
      tagName: K,
      attributes?: GmAddElementAttributes,
    ): Promise<HTMLElementTagNameMap[K]> | HTMLElementTagNameMap[K];
    (
      parentNode: Node | Element | ShadowRoot,
      tagName: string,
      attributes?: GmAddElementAttributes,
    ): Promise<HTMLElement> | HTMLElement;
  }
  //#endregion
  //#region src/client/types/addStyle.d.ts
  interface GmAddStyleType {
    (css: string): HTMLStyleElement;
  }
  interface GmAsyncAddStyleType {
    (css: string): Promise<HTMLStyleElement> | HTMLStyleElement;
  }
  //#endregion
  //#region src/client/types/_share.d.ts
  interface GmAbortHandle<TReturn = void> {
    abort(): TReturn;
  }
  interface GmProgressEventBase {
    done: number;
    lengthComputable: boolean;
    loaded: number;
    position: number;
    total: number;
    totalSize: number;
  }
  interface GmReponseEventListener<Event> {
    (this: Event, event: Event): void;
  }
  interface GmVoidCallback {
    (error: any): void;
  }
  type GmAnyFuntion = (...args: any[]) => any;
  interface GmCookieType {
    list(details: GmCookieListOptions, callback?: GmCookieListCallback): void;
    set(details: GmCookieSetOptions, callback?: GmVoidCallback): void;
    delete(details: GmCookieDeleteOptions, callback?: GmVoidCallback): void;
  }
  interface GmAsyncCookieType {
    list(): Promise<GmCallbackCookie[]>;
    list(details: GmCookieListOptions): Promise<GmCallbackCookie[]>;
    set(details: GmCookieSetOptions): Promise<void>;
    delete(details: GmCookieDeleteOptions): Promise<void>;
  }
  //#endregion
  //#region src/client/types/xmlhttpRequest.d.ts
  interface GmResponseTypeMap {
    text: string;
    json: any;
    arraybuffer: ArrayBuffer;
    blob: Blob;
    document: Document;
    stream: ReadableStream<Uint8Array>;
  }
  type GmResponseType = keyof GmResponseTypeMap;
  interface GmResponseEventBase<R extends GmResponseType> {
    responseHeaders: string;
    /**
     * 0 = XMLHttpRequest.UNSENT
     *
     * 1 = XMLHttpRequest.OPENED
     *
     * 2 = XMLHttpRequest.HEADERS_RECEIVED
     *
     * 3 = XMLHttpRequest.HEADERS_RECEIVED
     *
     * 4 = XMLHttpRequest.DONE
     */
    readyState: 0 | 1 | 2 | 3 | 4;
    response: GmResponseTypeMap[R];
    responseText: string;
    responseXML: Document | null;
    status: number;
    statusText: string;
  }
  interface GmResponseEvent<
    R extends GmResponseType,
    C = undefined,
  > extends GmResponseEventBase<R> {
    finalUrl: string;
    context: C;
  }
  interface GmProgressResponseEvent<R extends GmResponseType, C = undefined>
    extends GmResponseEvent<R, C>, GmProgressEventBase {}
  interface GmXmlhttpRequestOption<R extends GmResponseType, C = undefined> {
    method?: string;
    url: string;
    headers?: Record<string, string>;
    data?: BodyInit;
    /**
     * @available tampermonkey
     */
    redirect?: `follow` | `error` | `manual`;
    /**
     * @available tampermonkey
     */
    cookie?: string;
    /**
     * @see https://github.com/Tampermonkey/tampermonkey/issues/2057#issuecomment-2114745447
     * @available tampermonkey
     */
    cookiePartition?: {
      topLevelSite?: string;
    };
    binary?: boolean;
    /**
     * @available tampermonkey
     */
    nocache?: boolean;
    /**
     * @available tampermonkey
     */
    revalidate?: boolean;
    timeout?: number;
    /**
     * Property which will be added to the response event object
     */
    context?: C;
    /**
     * @tampermonkey  text, json, arraybuffer, blob, document, stream
     * @violentmonkey text, json, arraybuffer, blob, document
     * @default
     * 'text'
     */
    responseType?: R;
    overrideMimeType?: string;
    anonymous?: boolean;
    /**
     * @available tampermonkey
     */
    fetch?: boolean;
    user?: string;
    password?: string;
    onabort?: () => void;
    onerror?: GmReponseEventListener<GmErrorEvent<R>>;
    /**
     * @available violentmonkey
     */
    onloadend?: GmReponseEventListener<GmResponseEvent<R, C>>;
    onloadstart?: GmReponseEventListener<GmResponseEvent<R, C>>;
    onprogress?: GmReponseEventListener<GmProgressResponseEvent<R, C>>;
    onreadystatechange?: GmReponseEventListener<GmResponseEvent<R, C>>;
    ontimeout?: () => void;
    onload?: GmReponseEventListener<GmResponseEvent<R, C>>;
  }
  interface GmXmlhttpRequestExtType {
    /**
     * @see [tampermonkey#1278](https://github.com/Tampermonkey/tampermonkey/issues/1278#issuecomment-884363078)
     */
    RESPONSE_TYPE_STREAM?: "stream";
  }
  interface GmXmlhttpRequestType extends GmXmlhttpRequestExtType {
    <R extends GmResponseType = "text", C = any>(
      details: GmXmlhttpRequestOption<R, C>,
    ): GmAbortHandle;
  }
  interface GmAsyncXmlhttpRequestReturnType<R extends GmResponseType, C = any>
    extends GmAbortHandle, Promise<GmResponseEvent<R, C>> {}
  interface GmAsyncXmlhttpRequestType extends GmXmlhttpRequestExtType {
    <R extends GmResponseType = "text", C = any>(
      details: GmXmlhttpRequestOption<R, C>,
    ): GmAsyncXmlhttpRequestReturnType<R, C>;
  }
  //#endregion
  //#region src/client/types/download.d.ts
  interface GmDownloadErrorEvent {
    /**
     * Error reason
     * - `not_enabled` - the download feature isn't enabled by the user
     * - `not_whitelisted` - the requested file extension is not
     * whitelisted
     * - `not_permitted` - the user enabled the download feature, but did
     * not give the downloads permission
     * - `not_supported` - the download feature isn't supported by the
     * browser/version
     * - `not_succeeded` - the download wasn't started or failed, the
     * details attribute may provide more information
     */
    error:
      | "not_enabled"
      | "not_whitelisted"
      | "not_permitted"
      | "not_supported"
      | "not_succeeded";
    details?: string;
  }
  interface GmDownloadProgressEvent extends GmProgressEventBase {
    readonly finalUrl: string;
  }
  interface GmDownloadOptions {
    /**
     * URL from where the data should be downloaded, or a Blob/File object
     */
    url: string | Blob | File;
    /**
     * Filename - for security reasons the file extension needs to be
     * whitelisted at Tampermonkey options page
     */
    name: string;
    headers?: Record<string, string>;
    /**
     * Show 'Save As' dialog
     */
    saveAs?: boolean;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/FilenameConflictAction
     */
    conflictAction?: "uniquify" | "overwrite" | "prompt";
    timeout?: number;
    onerror?: GmReponseEventListener<GmDownloadErrorEvent>;
    ontimeout?(): void;
    onload?(): void;
    onprogress?: GmReponseEventListener<GmDownloadProgressEvent>;
  }
  interface GmDownloadType {
    (options: GmDownloadOptions): GmAbortHandle<boolean>;
    (url: string, name?: string): GmAbortHandle<boolean>;
  }
  interface GmDownloadAsyncAbortHandle
    extends
      Promise<GmResponseEvent<"blob", undefined>>,
      GmAbortHandle<boolean> {}
  interface GmAsyncDownloadType {
    (options: GmDownloadOptions): GmDownloadAsyncAbortHandle;
    (url: string, name?: string): GmDownloadAsyncAbortHandle;
  }
  //#endregion
  //#region src/client/types/getResourceText.d.ts
  interface GmGetResourceTextType {
    (name: string): string;
  }
  interface GmAsyncGetResourceTextType {
    (name: string): Promise<string>;
  }
  //#endregion
  //#region src/client/types/getResourceURL.d.ts
  interface GmGetResourceURLType {
    (name: string): string;
  }
  interface GmAsyncGetResourceURLType {
    (name: string): Promise<string>;
  }
  //#endregion
  //#region src/client/types/webRequest.d.ts
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
   */
  interface GmWebRequestRule {
    selector:
      | string
      | {
          include?: string | string[];
          match?: string | string[];
          exclude?: string | string[];
        };
    action:
      | string
      | {
          cancel?: boolean;
          redirect?:
            | string
            | {
                url: string;
                from?: string;
                to?: string;
              };
        };
  }
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
   */
  interface GmWebRequestListener {
    (
      /**
       * 'cancel' | 'redirect'
       */
      info: string,
      /**
       * 'ok' | 'error'
       */
      message: string,
      details: {
        rule: GmWebRequestRule;
        url: string;
        redirect_url: string;
        description: string;
      },
    ): void;
  }
  interface GmWebRequestType {
    (rules: GmWebRequestRule[], listener: GmWebRequestListener): GmAbortHandle;
  }
  interface GmAsyncWebRequestType {
    (
      rules: GmWebRequestRule[],
      listener: GmWebRequestListener,
    ): Promise<GmAbortHandle>;
  }
  interface GmInfoScriptType extends TamperScriptType, ViolentScriptType {}
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_info
   * @see https://violentmonkey.github.io/api/gm/#gm_info
   */
  interface GmInfoType extends TamperInfoType, ViolentInfoType {
    script: GmInfoScriptType;
  }
  //#endregion
  //#region src/client/types/log.d.ts
  interface GmLogType {
    (...data: any[]): void;
  }
  interface GmAsyncLogType {
    (...data: any[]): Promise<void> | void;
  }
  //#endregion
  //#region src/client/types/menuCommand.d.ts
  interface GmMenuCommandOptions {
    id: number | string;
    accessKey?: string;
    autoClose?: boolean;
    title?: string;
  }
  interface GmRegisterMenuCommandType {
    <T extends MouseEvent | KeyboardEvent>(
      caption: string,
      onClick: (event: T) => void,
      optionsOrAccessKey?: string | GmMenuCommandOptions,
    ): string | number;
  }
  interface GmAsyncRegisterMenuCommandType {
    <T extends MouseEvent | KeyboardEvent>(
      caption: string,
      onClick: (event: T) => void,
      optionsOrAccessKey?: string | GmMenuCommandOptions,
    ): string | number | Promise<string | number>;
  }
  interface GmUnregisterMenuCommandType {
    (captionOrId: string | number): void;
  }
  interface GmAsnycUnregisterMenuCommandType {
    (captionOrId: string | number): void;
  }
  //#endregion
  //#region src/client/types/notification.d.ts
  interface GmNotificationOptions {
    text: string;
    title?: string;
    tag?: string;
    image?: string;
    /**
     * @available tampermonkey
     */
    highlight?: boolean;
    /**
     * @available tampermonkey
     */
    silent?: boolean;
    /**
     * @available tampermonkey
     */
    timeout?: number;
    /**
     * @available tampermonkey
     */
    url?: string;
    /**
     * @available violentmonkey
     */
    zombieTimeout?: number;
    /**
     * @available violentmonkey
     */
    zombieUrl?: string;
    onclick?: (event?: Event) => void;
    ondone?: () => void;
  }
  interface GmNotificationControl {
    /**
     * @available violentmonkey
     */
    remove: () => Promise<void>;
  }
  interface GmNotificationType {
    (
      details: GmNotificationOptions,
      ondone?: () => void,
    ): GmNotificationControl | void;
    (
      text: string,
      title?: string,
      image?: string,
      onclick?: () => void,
    ): GmNotificationControl | void;
  }
  interface GmAsyncNotificationType {
    (details: GmNotificationOptions): Promise<boolean> | GmNotificationControl;
    (
      text: string,
      title?: string,
      image?: string,
    ): Promise<boolean> | GmNotificationControl;
  }
  //#endregion
  //#region src/client/types/setClipboard.d.ts
  interface GmSetClipboardType {
    (data: string, type: string, cb?: () => void): void;
  }
  interface GmAsyncSetClipboardType {
    (data: string, type: string, cb?: () => void): Promise<void> | void;
  }
  //#endregion
  //#region src/client/types/tab.d.ts
  interface GmOpenInTabOptions {
    active?: boolean;
    insert?: boolean;
    /**
     * @available tampermonkey
     */
    setParent?: boolean;
    /**
     * @available tampermonkey
     */
    incognito?: boolean;
    /**
     * @available violentmonkey
     */
    container?: 0 | 1 | 2;
    /**
     * @available violentmonkey
     */
    pinned?: boolean;
  }
  interface GmTabControl {
    onclose?: () => void;
    closed: boolean;
    close: () => void;
  }
  interface GmOpenInTabType {
    (url: string, details?: GmOpenInTabOptions): GmTabControl;
    (url: string, openInBackground?: boolean): GmTabControl;
  }
  interface GmAsyncOpenInTabType {
    (
      url: string,
      details?: GmOpenInTabOptions,
    ): GmTabControl | Promise<GmTabControl>;
    (
      url: string,
      openInBackground?: boolean,
    ): GmTabControl | Promise<GmTabControl>;
  }
  interface GmGetTabType {
    <T = any>(callback: (tab: T) => void): void;
  }
  interface GmAsyncGetTabType {
    <T = any>(): T;
  }
  interface GmSaveTab {
    (tab: unknown): void;
  }
  interface GmAsyncSaveTab {
    (tab: unknown): Promise<void>;
  }
  interface GmGetTabsType {
    <T = any>(callback: (tabsMap: { [tabId: number]: T }) => void): void;
  }
  interface GmAsyncGetTabsType {
    <T = any>(): Promise<{
      [tabId: number]: T;
    }>;
  }
  //#endregion
  //#region src/client/types/value.d.ts
  interface GmGetValueType {
    <T = any>(key: string, defaultValue?: T): T;
  }
  interface GmAsyncGetValueType {
    <T = any>(key: string, defaultValue?: T): Promise<T>;
  }
  interface GmGetValuesType {
    <T extends Record<string, any>>(): T;
    /**
     * @example
     * const values1 = GM_getValues(['key1', 'key2']); // { key1: any; key2: any }
     * const values2 = GM_getValues<{ key1: string; key2: number }>(['key1', 'key2']);
     */
    <T extends Record<string, any>>(keys: (keyof T)[]): T;
    <T extends Record<string, any>>(keyValues: T): T;
  }
  interface GmAsyncGetValuesType {
    <T extends Record<string, any>>(): Promise<T>;
    /**
     * @example
     * const values1 = await GM.getValues(['key1', 'key2']); // { key1: any; key2: any }
     * const values2 = await GM.getValues<{ key1: string; key2: number }>(['key1', 'key2']);
     */
    <T extends Record<string, any>>(keys: (keyof T)[]): Promise<T>;
    <T extends Record<string, any>>(keyValues: T): Promise<T>;
  }
  interface GmSetValueType {
    (key: string, value: unknown): void;
  }
  interface GmAsyncSetValueType {
    (key: string, value: unknown): Promise<void>;
  }
  interface GmSetValuesType {
    (values: Record<string, unknown>): void;
  }
  interface GmAsyncSetValuesType {
    (values: Record<string, unknown>): Promise<void>;
  }
  interface GmListValuesType {
    (): string[];
  }
  interface GmAsyncListValuesType {
    (): Promise<string[]>;
  }
  interface GmDeleteValueType {
    (name: string): void;
  }
  interface GmAsyncDeleteValueType {
    (name: string): Promise<void>;
  }
  interface GmDeleteValuesType {
    (keys: string[]): void;
  }
  interface GmAsyncDeleteValuesType {
    (keys: string[]): Promise<void>;
  }
  /**
   * - tampermonkey -> number
   * - violentmonkey -> string
   */
  type GmValueListenerId = string | number;
  interface GmAddValueChangeListenerType {
    <T = any>(
      name: string,
      callback: (
        name: string,
        oldValue?: T,
        newValue?: T,
        remote?: boolean,
      ) => void,
    ): GmValueListenerId;
  }
  interface GmAsyncAddValueChangeListenerType {
    <T = any>(
      name: string,
      callback: (
        name: string,
        oldValue?: T,
        newValue?: T,
        remote?: boolean,
      ) => void,
    ): GmValueListenerId | Promise<GmValueListenerId>;
  }
  interface GmRemoveValueChangeListenerType {
    (listenerId: GmValueListenerId): void;
  }
  interface GmAsyncRemoveValueChangeListenerType {
    (listenerId: GmValueListenerId): void;
  }
  //#endregion
  //#region src/client/types/gm.d.ts
  interface GmType {
    info: GmInfoType;
    log: GmAsyncLogType;
    getValue: GmAsyncGetValueType;
    getValues: GmAsyncGetValuesType;
    setValue: GmAsyncSetValueType;
    setValues: GmAsyncSetValuesType;
    listValues: GmAsyncListValuesType;
    deleteValue: GmAsyncDeleteValueType;
    deleteValues: GmAsyncDeleteValuesType;
    addValueChangeListener: GmAsyncAddValueChangeListenerType;
    removeValueChangeListener: GmAsyncRemoveValueChangeListenerType;
    getResourceText: GmAsyncGetResourceTextType;
    getResourceUrl: GmAsyncGetResourceURLType;
    addElement: GmAsyncAddElementType;
    addStyle: GmAsyncAddStyleType;
    getTab: GmAsyncGetTabType;
    saveTab: GmAsyncSaveTab;
    getTabs: GmAsyncGetTabsType;
    openInTab: GmAsyncOpenInTabType;
    registerMenuCommand: GmAsyncRegisterMenuCommandType;
    unregisterMenuCommand: GmAsnycUnregisterMenuCommandType;
    notification: GmAsyncNotificationType;
    setClipboard: GmAsyncSetClipboardType;
    xmlHttpRequest: GmAsyncXmlhttpRequestType;
    download: GmAsyncDownloadType;
    cookie: GmAsyncCookieType;
    webRequest: GmAsyncWebRequestType;
    audio: GmAsyncAudioType;
  }
  //#endregion
  //#region src/client/types/_context.d.ts
  interface GmContextType {
    unsafeWindow: typeof window;
    GM: GmType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_info
     * @see https://violentmonkey.github.io/api/gm/#gm_info
     */
    GM_info: GmInfoType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_log
     * @available tampermonkey
     */
    GM_log: GmLogType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getValue
     * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
     */
    GM_getValue: GmGetValueType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getValues
     * @see https://violentmonkey.github.io/api/gm/#gm_getvalues
     */
    GM_getValues: GmGetValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_setValue
     * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
     */
    GM_setValue: GmSetValueType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_setValues
     * @see https://violentmonkey.github.io/api/gm/#gm_setvalues
     */
    GM_setValues: GmSetValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValue
     * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
     */
    GM_deleteValue: GmDeleteValueType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValues
     * @see https://violentmonkey.github.io/api/gm/#gm_deletevalues
     */
    GM_deleteValues: GmDeleteValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_listValues
     * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
     */
    GM_listValues: GmListValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_addValueChangeListener
     * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
     */
    GM_addValueChangeListener: GmAddValueChangeListenerType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_removeValueChangeListener
     * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
     */
    GM_removeValueChangeListener: GmRemoveValueChangeListenerType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceText
     * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
     */
    GM_getResourceText: GmGetResourceTextType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceURL
     * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
     */
    GM_getResourceURL: GmGetResourceURLType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_addElement
     * @see https://violentmonkey.github.io/api/gm/#gm_addelement
     */
    GM_addElement: GmAddElementType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_addStyle
     * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
     */
    GM_addStyle: GmAddStyleType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_openInTab
     * @see https://violentmonkey.github.io/api/gm/#gm_openintab
     */
    GM_openInTab: GmOpenInTabType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getTab
     * @available tampermonkey
     */
    GM_getTab: GmGetTabType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_saveTab
     * @available tampermonkey
     */
    GM_saveTab: GmSaveTab;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getTabs
     * @available tampermonkey
     */
    GM_getTabs: GmGetTabsType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_registerMenuCommand
     * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
     */
    GM_registerMenuCommand: GmRegisterMenuCommandType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_unregisterMenuCommand
     * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
     */
    GM_unregisterMenuCommand: GmUnregisterMenuCommandType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_notification
     * @see https://violentmonkey.github.io/api/gm/#gm_notification
     */
    GM_notification: GmNotificationType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_setClipboard
     * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
     */
    GM_setClipboard: GmSetClipboardType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
     * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
     */
    GM_xmlhttpRequest: GmXmlhttpRequestType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_download
     * @see https://violentmonkey.github.io/api/gm/#gm_download
     */
    GM_download: GmDownloadType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
     * @available tampermonkey
     */
    GM_webRequest: GmWebRequestType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.list
     * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.set
     * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.delete
     * @available tampermonkey
     */
    GM_cookie: GmCookieType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.setMute
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.getState
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.addStateChangeListener
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.removeStateChangeListener
     * @available tampermonkey
     */
    GM_audio: GmAudioType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:window.onurlchange
     */
    onurlchange?: null;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:window.onurlchange
     */
    addEventListener(
      type: "urlchange",
      cb: (data: { url: string }) => void,
    ): void;
    removeEventListener(type: "urlchange", cb: (...args: any[]) => any): void;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:window.focus
     */
    focus(): void;
  }
  //#endregion
  //#region src/client/context.d.ts
  const unsafeWindow: Window & typeof globalThis;
  const GM: GmType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_info
   * @see https://violentmonkey.github.io/api/gm/#gm_info
   */
  const GM_info: GmInfoType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_log
   * @available tampermonkey
   */
  const GM_log: GmLogType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getValue
   * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
   */
  const GM_getValue: GmGetValueType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getValues
   * @see https://violentmonkey.github.io/api/gm/#gm_getvalues
   */
  const GM_getValues: GmGetValuesType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_setValue
   * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
   */
  const GM_setValue: GmSetValueType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_setValues
   * @see https://violentmonkey.github.io/api/gm/#gm_setvalues
   */
  const GM_setValues: GmSetValuesType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValue
   * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
   */
  const GM_deleteValue: GmDeleteValueType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValues
   * @see https://violentmonkey.github.io/api/gm/#gm_deletevalues
   */
  const GM_deleteValues: GmDeleteValuesType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_listValues
   * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
   */
  const GM_listValues: GmListValuesType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_addValueChangeListener
   * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   */
  const GM_addValueChangeListener: GmAddValueChangeListenerType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_removeValueChangeListener
   * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
   */
  const GM_removeValueChangeListener: GmRemoveValueChangeListenerType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceText
   * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
   */
  const GM_getResourceText: GmGetResourceTextType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceURL
   * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
   */
  const GM_getResourceURL: GmGetResourceURLType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_addElement
   * @see https://violentmonkey.github.io/api/gm/#gm_addelement
   */
  const GM_addElement: GmAddElementType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_addStyle
   * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
   */
  const GM_addStyle: GmAddStyleType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_openInTab
   * @see https://violentmonkey.github.io/api/gm/#gm_openintab
   */
  const GM_openInTab: GmOpenInTabType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getTab
   * @available tampermonkey
   */
  const GM_getTab: GmGetTabType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_saveTab
   * @available tampermonkey
   */
  const GM_saveTab: GmSaveTab;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_getTabs
   * @available tampermonkey
   */
  const GM_getTabs: GmGetTabsType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_registerMenuCommand
   * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
   */
  const GM_registerMenuCommand: GmRegisterMenuCommandType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_unregisterMenuCommand
   * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
   */
  const GM_unregisterMenuCommand: GmUnregisterMenuCommandType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_notification
   * @see https://violentmonkey.github.io/api/gm/#gm_notification
   */
  const GM_notification: GmNotificationType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_setClipboard
   * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
   */
  const GM_setClipboard: GmSetClipboardType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
   * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
   */
  const GM_xmlhttpRequest: GmXmlhttpRequestType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_download
   * @see https://violentmonkey.github.io/api/gm/#gm_download
   */
  const GM_download: GmDownloadType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
   * @available tampermonkey
   */
  const GM_webRequest: GmWebRequestType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.list
   * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.set
   * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.delete
   * @available tampermonkey
   */
  const GM_cookie: GmCookieType;
  /**
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.setMute
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.getState
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.addStateChangeListener
   * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.removeStateChangeListener
   * @available tampermonkey
   */
  const GM_audio: GmAudioType;

  interface Window {
    //#endregion
    //#region src/client/context.d.ts
    unsafeWindow: Window & typeof globalThis;
    GM: GmType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_info
     * @see https://violentmonkey.github.io/api/gm/#gm_info
     */
    GM_info: GmInfoType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_log
     * @available tampermonkey
     */
    GM_log: GmLogType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getValue
     * @see https://violentmonkey.github.io/api/gm/#gm_getvalue
     */
    GM_getValue: GmGetValueType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getValues
     * @see https://violentmonkey.github.io/api/gm/#gm_getvalues
     */
    GM_getValues: GmGetValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_setValue
     * @see https://violentmonkey.github.io/api/gm/#gm_setvalue
     */
    GM_setValue: GmSetValueType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_setValues
     * @see https://violentmonkey.github.io/api/gm/#gm_setvalues
     */
    GM_setValues: GmSetValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValue
     * @see https://violentmonkey.github.io/api/gm/#gm_deletevalue
     */
    GM_deleteValue: GmDeleteValueType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_deleteValues
     * @see https://violentmonkey.github.io/api/gm/#gm_deletevalues
     */
    GM_deleteValues: GmDeleteValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_listValues
     * @see https://violentmonkey.github.io/api/gm/#gm_listvalues
     */
    GM_listValues: GmListValuesType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_addValueChangeListener
     * @see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
     */
    GM_addValueChangeListener: GmAddValueChangeListenerType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_removeValueChangeListener
     * @see https://violentmonkey.github.io/api/gm/#gm_removevaluechangelistener
     */
    GM_removeValueChangeListener: GmRemoveValueChangeListenerType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceText
     * @see https://violentmonkey.github.io/api/gm/#gm_getresourcetext
     */
    GM_getResourceText: GmGetResourceTextType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getResourceURL
     * @see https://violentmonkey.github.io/api/gm/#gm_getresourceurl
     */
    GM_getResourceURL: GmGetResourceURLType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_addElement
     * @see https://violentmonkey.github.io/api/gm/#gm_addelement
     */
    GM_addElement: GmAddElementType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_addStyle
     * @see https://violentmonkey.github.io/api/gm/#gm_addstyle
     */
    GM_addStyle: GmAddStyleType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_openInTab
     * @see https://violentmonkey.github.io/api/gm/#gm_openintab
     */
    GM_openInTab: GmOpenInTabType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getTab
     * @available tampermonkey
     */
    GM_getTab: GmGetTabType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_saveTab
     * @available tampermonkey
     */
    GM_saveTab: GmSaveTab;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_getTabs
     * @available tampermonkey
     */
    GM_getTabs: GmGetTabsType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_registerMenuCommand
     * @see https://violentmonkey.github.io/api/gm/#gm_registermenucommand
     */
    GM_registerMenuCommand: GmRegisterMenuCommandType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_unregisterMenuCommand
     * @see https://violentmonkey.github.io/api/gm/#gm_unregistermenucommand
     */
    GM_unregisterMenuCommand: GmUnregisterMenuCommandType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_notification
     * @see https://violentmonkey.github.io/api/gm/#gm_notification
     */
    GM_notification: GmNotificationType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_setClipboard
     * @see https://violentmonkey.github.io/api/gm/#gm_setclipboard
     */
    GM_setClipboard: GmSetClipboardType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_xmlhttpRequest
     * @see https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest
     */
    GM_xmlhttpRequest: GmXmlhttpRequestType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_download
     * @see https://violentmonkey.github.io/api/gm/#gm_download
     */
    GM_download: GmDownloadType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_webRequest
     * @available tampermonkey
     */
    GM_webRequest: GmWebRequestType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.list
     * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.set
     * @see https://www.tampermonkey.net/documentation.php#api:GM_cookie.delete
     * @available tampermonkey
     */
    GM_cookie: GmCookieType;
    /**
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.setMute
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.getState
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.addStateChangeListener
     * @see https://www.tampermonkey.net/documentation.php#api:GM_audio.removeStateChangeListener
     * @available tampermonkey
     */
    GM_audio: GmAudioType;
  }
}
