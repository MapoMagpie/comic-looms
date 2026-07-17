# Contributing to Comic Looms

This document explains how to add new site support, fix bugs, and extend functionality in Comic Looms.

> [!NOTE]
> For deeper architecture notes and internal flow, please see [CONTRIBUTING_ARCHITECTURE.md](.assets/CONTRIBUTING_ARCHITECTURE.md).
>
> For the complete project structure, please see [PROJECT_STRUCTURE.md](.assets/PROJECT_STRUCTURE.md).

## Table of Contents

- [Contributing to Comic Looms](#contributing-to-comic-looms)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Where to start](#where-to-start)
  - [Beginner Contributor Path](#beginner-contributor-path)
  - [1. Repo Overview and Source File Summary](#1-repo-overview-and-source-file-summary)
    - [1.1. Top-level folders](#11-top-level-folders)
    - [1.2. Core source areas](#12-core-source-areas)
    - [1.3. Download and metadata](#13-download-and-metadata)
    - [1.4. Platform adapter and site matchers](#14-platform-adapter-and-site-matchers)
    - [1.5. UI and utilities](#15-ui-and-utilities)
  - [2. Adding New Site Support](#2-adding-new-site-support)
    - [2.1. Platform Adapter Architecture](#21-platform-adapter-architecture)
    - [2.2. Required Matcher Methods](#22-required-matcher-methods)
    - [2.3. Creating a Matcher File](#23-creating-a-matcher-file)
    - [2.4. Registering a Matcher](#24-registering-a-matcher)
    - [2.5. Testing a New Matcher](#25-testing-a-new-matcher)
    - [2.6. Handling Common Site Challenges](#26-handling-common-site-challenges)
    - [2.7. Site type classification (choose the right matcher workflow)](#27-site-type-classification-choose-the-right-matcher-workflow)
  - [3. Fixing Bugs](#3-fixing-bugs)
    - [3.1. Component Responsibilities](#31-component-responsibilities)
    - [3.2. Troubleshooting Strategy](#32-troubleshooting-strategy)
  - [4. Debugging and Troubleshooting](#4-debugging-and-troubleshooting)
    - [4.1. Matcher Not Activating](#41-matcher-not-activating)
    - [4.2. Thumbnails Not Loading](#42-thumbnails-not-loading)
    - [4.3. Original Images Not Loading](#43-original-images-not-loading)
    - [4.4. Infinite Loop in Pagination](#44-infinite-loop-in-pagination)
    - [4.5. CORS Errors](#45-cors-errors)
  - [5. Internal Documentation References](#5-internal-documentation-references)
    - [5.1. Common Contribution Areas](#51-common-contribution-areas)
    - [5.2. Reference Files](#52-reference-files)

## Quick Start

This guide is structured so you can quickly jump to the part you need:

- New site support: [Section 2](#2-adding-new-site-support) — how to add a matcher and support a new gallery site.
- Bug fixes or feature work: [Section 3](#3-fixing-bugs) — how to isolate failures and update the right component.
- Architecture and component overview: [Section 1](#1-repo-overview-and-source-file-summary) — how the repo is organized and what each core file does.

### Where to start

- Add new site support: read [Section 2.1, Platform Adapter Architecture](#21-platform-adapter-architecture) and [Section 2.2, Required Matcher Methods](#22-required-matcher-methods) to understand the matcher lifecycle and required matcher hooks, then create a matcher file and register it.
- Fix a bug: start with [Section 4, Debugging and Troubleshooting](#4-debugging-and-troubleshooting) and [Section 3.1, Component Responsibilities](#31-component-responsibilities) to isolate the broken layer and update the smallest relevant component.
- Inspect matcher flow: read [Section 2.1, Platform Adapter Architecture](#21-platform-adapter-architecture) and [Section 2.2, Required Matcher Methods](#22-required-matcher-methods) plus the architecture companion in [`CONTRIBUTING_ARCHITECTURE.md`](CONTRIBUTING_ARCHITECTURE.md) to see how adapters and matchers map URLs to page sources and image nodes.
- Update UI: start with [Section 3.2, Troubleshooting Strategy](#32-troubleshooting-strategy) and the files under [`src/ui/`](src/ui/) to learn where the UI consumes fetch and page data and where to make UI changes.

## Beginner Contributor Path

If you are new to Comic Looms or matcher development, follow these simple steps:

1. Find an existing matcher for a similar site under [`src/platform/matchers/`](src/platform/matchers/).
2. Create a new matcher file and register it with `ADAPTER.addSetup()`.
3. Open a real gallery page in the browser and verify the Comic Looms UI appears.
4. If thumbnails load but the full images do not, refine `parseImgNodes()` and `fetchOriginMeta()`.

For more detail, use [Section 2, Adding New Site Support](#2-adding-new-site-support) to follow the matcher creation flow. For internal architecture and flow, see [CONTRIBUTING_ARCHITECTURE.md](.ASSETS/CONTRIBUTING_ARCHITECTURE.md).

## 1. Repo Overview and Source File Summary

The repository is organized around a core userscript runtime and a set of site-specific adapters.

> [!TIP]
> For the complete project structure, please see [PROJECT_STRUCTURE.md](.assets/PROJECT_STRUCTURE.md).

### 1.1. Top-level folders

- [src/](src/) – main TypeScript source code.
- `.assets/` – documentation, translated README files, and assets.
- [README.md](README.md) – primary project overview and supported sites.

### 1.2. Core source areas

- [src/main.ts](src/main.ts) – script entry point and application initialization.
- [src/config.ts](src/config.ts) – configuration storage, schema, and site override management.
- [src/event-bus.ts](src/event-bus.ts) – central event bus used by components.
- [src/page-fetcher.ts](src/page-fetcher.ts) – fetches chapters and page sources using async generators.
- [src/img-fetcher.ts](src/img-fetcher.ts) – manages individual image fetch state.
- [src/idle-loader.ts](src/idle-loader.ts) – background image preloading when auto-load is enabled.
- [src/fetcher-queue.ts](src/fetcher-queue.ts) – controls concurrent image downloads.
- [src/img-node.ts](src/img-node.ts) – image metadata container used by fetchers.
- [src/filter.ts](src/filter.ts) – image filtering logic.

Below is a compact reference table linking these files to key functions and their purpose. Use this table to quickly find code examples and to understand where to implement changes.

| File                                                 | Key functions / symbols                                                                    | Purpose                                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [src/main.ts](src/main.ts)                           | script startup, matcher imports                                                            | Bootstraps the userscript and ensures matcher modules run `ADAPTER.addSetup()` |
| [src/platform/adapt.ts](src/platform/adapt.ts)       | `Adapter.addSetup()`, `Adapter.handleMatcher()`                                            | Registers matchers and selects the active matcher based on `workURLs`          |
| [src/platform/platform.ts](src/platform/platform.ts) | `BaseMatcher`, `Matcher` interface, `fetchPagesSource`, `parseImgNodes`, `fetchOriginMeta` | Defines matcher lifecycle and default behaviors                                |
| [src/page-fetcher.ts](src/page-fetcher.ts)           | `PageFetcher.init()`, `appendNewChapters_()`, `restoreChapter()`                           | Manages chapters, page iterators and image node creation                       |
| [src/img-fetcher.ts](src/img-fetcher.ts)             | `IMGFetcher.start()`, `fetchImage()`, `fetchOriginMeta()`                                  | Image download state machine and rendering flow                                |
| [src/fetcher-queue.ts](src/fetcher-queue.ts)         | `IMGFetcherQueue`                                                                          | Concurrency control for image downloads                                        |

### 1.3. Download and metadata

- [`src/download/downloader.ts`](src/download/downloader.ts) – batch download and ZIP packaging logic.
- [`src/download/gallery-meta.ts`](src/download/gallery-meta.ts) – gallery metadata definitions.

### 1.4. Platform adapter and site matchers

- [`src/platform/adapt.ts`](src/platform/adapt.ts) – adapter registry and matcher selection logic.
- [`src/platform/platform.ts`](src/platform/platform.ts) – `Matcher` interface and `BaseMatcher` abstract class.
- [`src/platform/matchers/`](src/platform/matchers/) – site-specific matcher implementations.

### 1.5. UI and utilities

- [`src/ui/`](src/ui/) – user interface components, controls, and panels.
- [`src/utils/`](src/utils/) – helper utilities for network requests, DOM interaction, ZIP creation, and media handling.

## 2. Adding New Site Support

Comic Looms supports new websites through site-specific matchers that extend the shared platform adapter system.

### 2.1. Platform Adapter Architecture

The adapter system is designed so each supported site provides:

- URL matching rules.
- page source fetching logic.
- image node parsing.
- original image metadata resolution.

The main files involved are:

- [`src/main.ts`](src/main.ts) – loads matcher modules and initializes the userscript runtime.
- [`src/platform/adapt.ts`](src/platform/adapt.ts) – adapter registry, URL matching, and `ADAPTER.ready` resolution.
- [`src/platform/platform.ts`](src/platform/platform.ts) – `Matcher` interface, `BaseMatcher` default behavior, and helper types like `OriginMeta`.
- [`src/platform/matchers/`](src/platform/matchers/) – site-specific matcher implementations.

A matcher is registered with `ADAPTER.addSetup()` and is selected when a URL matches one of its `workURLs` patterns in [`src/platform/adapt.ts`](src/platform/adapt.ts).

This document focuses on practical matcher development and troubleshooting. For deeper architecture, data flow, and event bus details, see [CONTRIBUTING_ARCHITECTURE.md](.assets/CONTRIBUTING_ARCHITECTURE.md).

### 2.2. Required Matcher Methods

Most new site support can be added by extending `BaseMatcher` and implementing three abstract methods defined in [`src/platform/platform.ts`](src/platform/platform.ts):

1. `fetchPagesSource(chapter: Chapter): AsyncGenerator<Result<P>>`

   - Returns a generator of page source objects.
   - The generic type `P` may be `Document`, `string`, JSON data, or a custom type.
   - Use `Result.ok(value)` to yield success or `Result.err(error)` to yield failure.
   - This method is consumed by `PageFetcher.appendNewChapters_()` and `PageFetcher.restoreChapter()` in [`src/page-fetcher.ts`](src/page-fetcher.ts).

2. `parseImgNodes(pageSource: P, chapterID?: number): Promise<ImageNode[]>`

   - Parses the page source and returns an array of `ImageNode` objects.
   - Each `ImageNode` should include `href`, `title`, and either `thumbnailSrc` or `originSrc`.
   - The returned nodes are converted into `IMGFetcher` instances by `PageFetcher.appendNextPage()`.

3. `fetchOriginMeta(node: ImageNode, retry: boolean, chapterID?: number): Promise<OriginMeta>`
   - Determines the large image URL for the requested node.
   - If `node.originSrc` is already available, return it directly.
   - If the site requires additional requests or parsing, do it here.
   - `IMGFetcher.fetchOriginMeta()` calls this method before downloading the image.

These methods are defined in [`src/platform/platform.ts`](src/platform/platform.ts).

> [!NOTE]
> `fetchPagesSource()` should yield `Result.ok(value)` on success, or `Result.err(error)` if the page fetch fails. This allows the pipeline in `PageFetcher` to continue safely without crashing the entire gallery load.

### 2.3. Creating a Matcher File

Create a new file in [`src/platform/matchers/`](src/platform/matchers/) for the target site, for example [`src/platform/matchers/mynewsite.ts`](src/platform/matchers/mynewsite.ts).

<details>
<summary>Example matcher skeleton</summary>

```typescript
import {
	BaseMatcher,
	Chapter,
	ImageNode,
	OriginMeta,
	PagesSource,
	Result,
} from "../platform";

export class MyNewSiteMatcher extends BaseMatcher<Document> {
	name(): string {
		return "My New Site";
	}

	workURL(): RegExp {
		return /mynewsite\.com\/gallery\/.+/;
	}

	async *fetchPagesSource(_source: Chapter): AsyncGenerator<Result<Document>> {
		yield Result.ok(document);
	}

	async parseImgNodes(pageSource: PagesSource): Promise<ImageNode[]> {
		const doc = pageSource as Document;
		const nodes: ImageNode[] = [];
		const elements = Array.from(doc.querySelectorAll(".thumbnail img"));

		for (const element of elements) {
			const thumbnailSrc =
				element.getAttribute("src") || element.getAttribute("data-src") || "";
			const href = element.closest("a")?.getAttribute("href") || "";
			const title = element.getAttribute("alt") || `Image ${nodes.length + 1}`;
			nodes.push(new ImageNode(thumbnailSrc, href, title));
		}

		return nodes;
	}

	async fetchOriginMeta(node: ImageNode, _retry: boolean): Promise<OriginMeta> {
		if (node.originSrc) {
			return { url: node.originSrc };
		}
		const response = await fetch(node.href);
		const html = await response.text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		const url = doc.querySelector("img.full-image")?.getAttribute("src") || "";
		return { url };
	}
}
```

</details>

<details>
<summary>Alternative matcher pattern for JSON/API-based sites</summary>

```typescript
import {
	BaseMatcher,
	Chapter,
	ImageNode,
	OriginMeta,
	PagesSource,
	Result,
} from "../platform";

interface ApiImage {
	thumbnail: string;
	detailUrl: string;
	title: string;
}

export class MyApiSiteMatcher extends BaseMatcher<ApiImage[]> {
	name(): string {
		return "My API Site";
	}

	workURL(): RegExp {
		return /api-site\.com\/gallery\/.+/;
	}

	async *fetchPagesSource(
		_source: Chapter,
	): AsyncGenerator<Result<ApiImage[]>> {
		const response = await fetch("https://api-site.com/gallery/data");
		const data = await response.json();
		yield Result.ok(data.images);
	}

	async parseImgNodes(pageSource: PagesSource): Promise<ImageNode[]> {
		const items = pageSource as ApiImage[];
		return items.map(
			(item) => new ImageNode(item.thumbnail, item.detailUrl, item.title),
		);
	}

	async fetchOriginMeta(node: ImageNode, _retry: boolean): Promise<OriginMeta> {
		const response = await fetch(node.href);
		const detail = await response.json();
		return { url: detail.originalUrl };
	}
}
```

</details>

### 2.4. Registering a Matcher

At the end of the matcher file, register the matcher with the adapter singleton:

```typescript
import { ADAPTER } from "../adapt";

ADAPTER.addSetup({
	name: "My New Site",
	workURLs: [/mynewsite\.com\/gallery\/.+/],
	match: ["https://mynewsite.com/*"],
	constructor: () => new MyNewSiteMatcher(),
});
```

The `workURLs` array should contain regular expressions that match gallery pages for the site.

### 2.5. Testing a New Matcher

To verify a new matcher:

- Open a supported gallery page in a browser with the userscript installed.
- Confirm the matcher is activated by checking whether Comic Looms UI appears and whether `ADAPTER.matcher` is set in code.
- Verify thumbnails load, the large image view works, and downloads complete.
- Check console logs for errors in `PageFetcher.init()`, `IMGFetcher.fetchImage()`, or `matcher.fetchOriginMeta()`.

Useful debug paths:

- [`src/main.ts`](src/main.ts) – script startup and matcher module import.
- [`src/page-fetcher.ts`](src/page-fetcher.ts) – chapter loading and page source iteration.
- [`src/img-fetcher.ts`](src/img-fetcher.ts) – image download state machine.
- [`src/platform/adapt.ts`](src/platform/adapt.ts) – URL matching and site configuration.

### 2.6. Handling Common Site Challenges

Some sites require additional logic beyond the basic matcher flow.

- **Lazy-loaded images**: parse `data-src`, `data-original`, or JSON data embedded in the page.
- **Multi-page galleries**: use `fetchPagesSource()` to request and yield subsequent pages.
- **Original image URLs available without detail pages**: set `node.originSrc` during `parseImgNodes()` so `fetchOriginMeta()` can return `{ url: node.originSrc }`.
- **Obfuscated or encrypted image data**: override `processData()` in a matcher if decryption or restoration is required.
- **Custom request headers**: override `headers(node)` in the matcher implementation.
- **Multi-chapter sites**: override `fetchChapters()` to return chapter metadata.

Example `headers()` override:

<details>
<summary>Example of adding Referer headers</summary>

```ts
headers(_node: ImageNode): Record<string, string> {
  return {
    Referer: "https://example.com/",
    "User-Agent": "Mozilla/5.0",
  };
}
```

</details>

Example `processData()` override:

<details>
<summary>Example decryption/processing flow</summary>

```ts
async processData(
  data: Uint8Array<ArrayBuffer>,
  contentType: string,
  node: ImageNode,
): Promise<[Uint8Array<ArrayBuffer> | SubData, string]> {
  if (node.title.endsWith(".enc")) {
    const decrypted = decryptData(data);
    return [decrypted, "image/jpeg"];
  }
  return [data, contentType];
}
```

</details>

### 2.7. Site type classification (choose the right matcher workflow)

Use the matching workflow that best fits the site’s architecture:

- Simple DOM: parse page markup directly, build `ImageNode` objects from DOM elements, and resolve `originSrc` from the page.
- API-based: request JSON or GraphQL data in `fetchPagesSource()`, map the payload to `ImageNode`, and resolve original URLs from API detail responses.
- Lazy-loaded: handle pagination or dynamically injected page data in `fetchPagesSource()`, then parse images from the loaded content.
- Obfuscated: override `processData()` or add decode helpers for encrypted or split image data.
- Authenticated: override `headers()` and apply site-specific login/session handling as needed.

## 3. Fixing Bugs

When contributing bug fixes or feature work, start by locating the responsible area and making the smallest effective change.

### 3.1. Component Responsibilities

If you need more detail about component roles and event flow, see [CONTRIBUTING_ARCHITECTURE.md](.assets/CONTRIBUTING_ARCHITECTURE.md).

### 3.2. Troubleshooting Strategy

A useful strategy is to reproduce the issue on a real target page and then narrow the failure to one of the main layers: matcher selection, page parsing, origin URL resolution, image fetching, or UI rendering. For example, if the UI never appears, focus on `workURLs` and matcher registration. If thumbnails appear but the full images fail, inspect `parseImgNodes()` and `fetchOriginMeta()`.

For the full set of debugging tips, go directly to [Section 4, Debugging and Troubleshooting](#4-debugging-and-troubleshooting).

Keep fixes small: validate assumptions in the browser console, compare the broken matcher with a similar working matcher, and only change the code that directly affects the failing behavior. Quick checks include verifying selectors in DevTools, confirming the resolved image URL, and testing any custom headers or request paths.

## 4. Debugging and Troubleshooting

This section covers the most common issues and their solutions. It is recommended to follow the strategy laid out in [3.2. Troubleshooting Strategy](#32-troubleshooting-strategy).

> [!TIP] Each section has a folded code example.

### 4.1. Matcher Not Activating

- **Symptoms**: The `<🎑>` button does not appear.

| **Cause**             | **Solution**                                                                 |
| --------------------- | ---------------------------------------------------------------------------- |
| Incorrect `workURL()` | Test with `console.log(/your-regex/.test(window.location.href))`.            |
| URL not matching      | Check `src/platform/adapt.ts` for typos in `matcherSetups`.                  |
| Script not running    | Verify the userscript is **enabled** for the site.                           |
| SPA navigation        | Use `MutationObserver` to detect URL changes (see [`main.ts`](src/main.ts)). |

- **Code Example: Testing `workURL()`**
<details>
<summary>Click to expand code example</summary>

```typescript
// Temporarily add this to your matcher's constructor:
constructor() {
  super();
  console.log(
    "[YourSiteMatcher] URL matches:",
    this.workURL().test(window.location.href)
  );
}
```

</details>

### 4.2. Thumbnails Not Loading

- **Symptoms**: The grid is empty.

| **Cause**               | **Solution**                                        |
| ----------------------- | --------------------------------------------------- |
| Wrong DOM selectors     | Use **DevTools Elements** tab to test selectors.    |
| Lazy-loaded content     | Use `MutationObserver` or simulate scrolling.       |
| Authentication required | Add headers/cookies to `fetch` requests.            |
| CORS errors             | Use `GM_xmlhttpRequest` (Violentmonkey) or a proxy. |

- **Code Example: Testing Selectors**
<details>
<summary>Click to expand code example</summary>

```typescript
// Temporarily add this to `parseImgNodes()`:
async parseImgNodes(page: PagesSource): Promise<ImageNode[]> {
  const doc = page as Document;
  const testElements = doc.querySelectorAll(".your-selector");
  console.log("[YourSiteMatcher] Found elements:", testElements.length);
  // ...
}
```

</details>

### 4.3. Original Images Not Loading

- **Symptoms**: Thumbnails appear, but big images or downloads fail.

| **Cause**                     | **Solution**                                                           |
| ----------------------------- | ---------------------------------------------------------------------- |
| Incorrect `fetchOriginMeta()` | Verify the `href` in `ImageNode` points to the correct detail page.    |
| Dynamic URLs                  | Check if the site uses **tokens** or **sessions** for original images. |
| Hotlinking protection         | Use `GM_xmlhttpRequest` with `anonymous: false`.                       |
| Missing headers               | Add headers (e.g., `Referer`, `Cookie`) to `fetch`.                    |

- **Code Example: Adding Headers to `fetch`**
<details>
<summary>Click to expand code example</summary>

```typescript
async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
  const response = await fetch(node.href, {
    headers: {
      "Referer": "https://yoursite.com/",
      "User-Agent": navigator.userAgent,
    },
  });
  // ...
}
```

</details>

### 4.4. Infinite Loop in Pagination

- **Symptoms**: The script keeps loading pages indefinitely.

| **Cause**                | **Solution**                                                      |
| ------------------------ | ----------------------------------------------------------------- |
| No termination condition | Add a `MAX_PAGES` limit or check for a "no more pages" indicator. |
| Invalid next page URL    | Validate `nextPageUrl` before yielding.                           |
| Circular pagination      | Track visited URLs to avoid revisiting the same page.             |

- **Code Example: Limiting Pages**
<details>
<summary>Click to expand code example</summary>

```typescript
async *fetchPagesSource(_source: Chapter): AsyncGenerator<PagesSource> {
  yield document;
  let pageCount = 0;
  const MAX_PAGES = 50;

  while (pageCount < MAX_PAGES) {
    const nextPageUrl = this.getNextPageUrl();
    if (!nextPageUrl) break;

    const response = await fetch(nextPageUrl);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    yield doc;
    pageCount++;
  }
}
```

</details>

### 4.5. CORS Errors

- **Symptoms**: `Access-Control-Allow-Origin` errors in the console.

| **Cause**            | **Solution**                                                |
| -------------------- | ----------------------------------------------------------- |
| Cross-origin blocked | Use `GM_xmlhttpRequest` (Violentmonkey/Tampermonkey).       |
| Missing headers      | Add `Origin` or `Referer` headers.                          |
| Preflight failures   | Avoid `PUT`/`DELETE`; use `GET`/`POST` with simple headers. |

- **Code Example: Using `GM_xmlhttpRequest`**
<details>
<summary>Click to expand: Common issues and fixes</summary>

```typescript
async fetchWithGM(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      onload: (response) => resolve(response.responseText),
      onerror: (error) => reject(error),
    });
  });
}
```

</details>

## 5. Internal Documentation References

### 5.1. Common Contribution Areas

- Site adapter logic: [`src/platform/matchers/`](src/platform/matchers/)
- Adapter registration and matching: [`src/platform/adapt.ts`](src/platform/adapt.ts)
- Shared matcher behaviors: [`src/platform/platform.ts`](src/platform/platform.ts)
- Image fetch and queue logic: [`src/img-fetcher.ts`](src/img-fetcher.ts), [`src/fetcher-queue.ts`](src/fetcher-queue.ts)
- Page loading and chapter handling: [`src/page-fetcher.ts`](src/page-fetcher.ts)
- UI and controls: [`src/ui/`](src/ui/)
- Download packaging: [`src/download/downloader.ts`](src/download/downloader.ts)
- Utility helpers: [`src/utils/`](src/utils/)

### 5.2. Reference Files

The repository contains internal documentation and localized guides.

> [!NOTE]
> For deeper architecture notes and internal flow, please see [CONTRIBUTING_ARCHITECTURE.md](.assets/CONTRIBUTING_ARCHITECTURE.md).
> For the complete project structure, please see [PROJECT_STRUCTURE.md](.assets/PROJECT_STRUCTURE.md).

<details>
<summary>Existing matchers which are useful references for complex cases</summary>

- [`src/platform/matchers/hitomi.ts`](src/platform/matchers/hitomi.ts)
- [`src/platform/matchers/ehentai.ts`](src/platform/matchers/ehentai.ts)
- [`src/platform/matchers/pixiv.ts`](src/platform/matchers/pixiv.ts)
- [`src/platform/matchers/twitter.ts`](src/platform/matchers/twitter.ts)
- [`src/platform/matchers/18comic.ts`](src/platform/matchers/18comic.ts)
- [`src/platform/matchers/nhentai.ts`](src/platform/matchers/nhentai.ts)
- [`src/platform/matchers/mangatoto.ts`](src/platform/matchers/mangatoto.ts)
</details>
