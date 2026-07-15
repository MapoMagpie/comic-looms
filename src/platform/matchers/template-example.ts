import {
	BaseMatcher,
	Chapter,
	ImageNode,
	OriginMeta,
	PagesSource,
	Result,
} from "../platform";
import { ADAPTER } from "../adapt";

// Template matcher: use as a starting point for new site adapters.
// - Fill selectors and URL patterns for the target site.

export class TemplateExampleMatcher extends BaseMatcher<Document> {
	name(): string {
		return "Template Example";
	}

	workURL(): RegExp {
		// Update this regex to match your site's gallery pages.
		return /example\.com\/gallery\/\d+/;
	}

	// STEP 1: yield the current document, then fetch subsequent pages when needed
	async *fetchPagesSource(_source: Chapter): AsyncGenerator<Result<Document>> {
		yield Result.ok(document);
		// Example: if the site has "next" pagination you can fetch it like this:
		// let next = document.querySelector('a.next')?.getAttribute('href');
		// while (next) { const html = await fetch(next).then(r => r.text()); const doc = new DOMParser().parseFromString(html, 'text/html'); yield Result.ok(doc); next = doc.querySelector('a.next')?.getAttribute('href'); }
	}

	// STEP 2: parse thumbnails / links from a page source
	async parseImgNodes(
		pageSource: PagesSource,
		_chapterID?: number,
	): Promise<ImageNode[]> {
		const doc = pageSource as Document;
		const nodes: ImageNode[] = [];

		// Adjust selector to match site thumbnails
		const thumbs = Array.from(
			doc.querySelectorAll<HTMLImageElement>(".thumb img, img.thumbnail"),
		);
		for (const img of thumbs) {
			const thumbnailSrc =
				img.getAttribute("src") || img.getAttribute("data-src") || "";
			const href =
				(img.closest("a") as HTMLAnchorElement)?.href ||
				img.getAttribute("data-href") ||
				"";
			const title =
				img.getAttribute("alt") ||
				img.getAttribute("title") ||
				`Image ${nodes.length + 1}`;
			nodes.push(new ImageNode(thumbnailSrc, href, title));
		}

		return nodes;
	}

	// STEP 3: resolve the original image URL for a node
	async fetchOriginMeta(
		node: ImageNode,
		_retry: boolean,
		_chapterID?: number,
	): Promise<OriginMeta> {
		if (node.originSrc) return { url: node.originSrc };
		if (!node.href) return { url: node.thumbnailSrc || "" };

		const res = await fetch(node.href);
		const html = await res.text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		// Adjust this selector to find the full-size image on the detail page
		const src =
			doc.querySelector<HTMLImageElement>("img.full, img#image, .original img")
				?.src || "";
		return { url: src, href: node.href };
	}

	// Optional: provide custom headers when the matcher makes requests (e.g., Referer)
	headers(_node: ImageNode): Record<string, string> {
		return {
			Referer: window.location.origin + "/",
		};
	}

	// Optional: process image data after download (decrypt, descramble)
	async processData(
		data: Uint8Array<ArrayBuffer>,
		contentType: string,
		node: ImageNode,
	): Promise<[Uint8Array<ArrayBuffer> | any, string]> {
		// Default passthrough
		return [data, contentType];
	}
}

ADAPTER.addSetup({
	name: "Template Example",
	workURLs: [/example\.com\/gallery\/\d+/],
	match: ["https://example.com/*"],
	constructor: () => new TemplateExampleMatcher(),
});
