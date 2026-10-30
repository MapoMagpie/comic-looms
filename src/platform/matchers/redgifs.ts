import { GalleryMeta } from "../../download/gallery-meta";
import { IMGFetcher } from "../../img-fetcher";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { GM_XHR } from "../../utils/query";
import { ADAPTER } from "../adapt";
import { BaseMatcher, Result } from "../platform";

interface RedGif {
 id: string;
 type: number;
 width?: number;
 height?: number;
 urls?: { poster?: string; thumbnail?: string; hd?: string; sd?: string };
}
interface ApiResponse {
 token?: string;
 error?: unknown;
 gifs?: RedGif[];
 gif?: RedGif;
 page?: number;
 pages?: number;
}

export class RedGifsMatcher extends BaseMatcher<RedGif[]> {
	pageURL = window.location.href;
	pending = new Set<() => void>();
	media = new Map<string, { gif: RedGif; fetchedAt: number }>();
	token?: string;
	tokenUntil = 0;
	tokenPromise?: Promise<string>;
	disposed = false;
	author: string;
	order: string;
	constructor() {
		super();
		const url = new URL(this.pageURL);
		const match = url.pathname.match(/^\/users\/([a-z0-9_.-]+)\/?$/i);
		if (!match) throw new Error("RedGIFs: open an author profile first.");
		this.author = match[1].toLowerCase();
		const order = url.searchParams.get("order");
		this.order = ["new", "recent", "best"].includes(order || "") ? order! : "new";
	}
	checkActive() {
		if (this.disposed || window.location.href !== this.pageURL) throw new Error("RedGIFs: request cancelled after leaving the profile.");
	}
	dispose() {
		this.disposed = true;
		for (const cancel of Array.from(this.pending)) cancel();
		this.media.clear();
		this.token = void 0;
	}
	request<R extends GmResponseType>(url: string, responseType: R, headers: Record<string, string> = {}, imf?: IMGFetcher): Promise<GmResponseTypeMap[R]> {
		return new Promise((resolve, reject) => {
			let handle: GmAsyncXmlhttpRequestReturnType<R> | undefined;
			let idleTimer: ReturnType<typeof setTimeout> | undefined;
			let settled = false;
			const idleMs = Math.max(1, Number(ADAPTER.conf.timeout) || 30) * 1000;
			const finish = (error?: unknown, response?: GmResponseTypeMap[R]) => {
				if (settled) return;
				settled = true;
				clearTimeout(idleTimer);
				this.pending.delete(cancel);
				if (imf?.abortSignal === cancel) imf.abortSignal = void 0;
				if (error) reject(error);
				else resolve(response!);
			};
			const cancel = () => {
				finish(new Error("RedGIFs: request cancelled."));
				handle?.abort?.();
			};
			const resetIdleTimer = () => {
				if (!imf || settled) return;
				clearTimeout(idleTimer);
				idleTimer = setTimeout(() => {
					finish(new Error("RedGIFs: video download timed out without progress."));
					handle?.abort?.();
				}, idleMs);
			};
			try {
				this.checkActive();
				this.pending.add(cancel);
				if (imf) imf.abortSignal = cancel;
				resetIdleTimer();
				handle = GM_XHR({
					method: "GET", url, responseType,
					timeout: imf ? 600000 : Math.max(10000, idleMs),
					headers: { "Referer": "https://www.redgifs.com/", ...headers },
					onload: (response) => {
						try {
							this.checkActive();
							if (response.status < 200 || response.status >= 300) {
								const hint = response.status === 429 ? " Too many requests; wait before retrying." : response.status === 403 ? " Access denied; check that the original page is accessible." : "";
								const error = Object.assign(new Error(`RedGIFs: HTTP ${response.status}.${hint}`), { status: response.status });
								throw error;
							}
							if (imf) imf.setDownloadState({ readyState: 4 });
							finish(null, response.response);
						} catch (error) { finish(error); }
					},
					onerror: () => finish(new Error("RedGIFs: network request failed. Check userscript network permissions.")),
					ontimeout: () => finish(new Error("RedGIFs: request timed out; retry when the connection recovers.")),
					onabort: () => finish(new Error("RedGIFs: request cancelled.")),
					onprogress: (event) => {
						if (!settled && imf) {
							resetIdleTimer();
							imf.setDownloadState({ total: event.total, loaded: event.loaded, readyState: event.readyState });
						}
					}
				});
				// GM4 may return a promise in addition to invoking callbacks.
				handle?.catch?.(() => finish(new Error("RedGIFs: network request failed.")));
			} catch (error) { finish(error); }
		});
	}
	async json(path: string, token?: string): Promise<ApiResponse> {
		const headers: Record<string, string> = { "Accept": "application/json", "Origin": "https://www.redgifs.com" };
		if (token) headers.Authorization = "Bearer " + token;
		const response = await this.request("https://api.redgifs.com/v2/" + path, "json", headers);
		let data;
		try { data = typeof response === "string" ? JSON.parse(response) : response; }
		catch { throw new Error("RedGIFs: invalid JSON response; open the original page and retry."); }
		if (!data || typeof data !== "object" || data.error) throw new Error("RedGIFs: unexpected API response.");
		return data;
	}
	async authorization() {
		this.checkActive();
		if (this.token && Date.now() < this.tokenUntil) return this.token;
		if (!this.tokenPromise) this.tokenPromise = this.json("auth/temporary").then((data) => {
			if (typeof data.token !== "string" || !data.token) throw new Error("RedGIFs: temporary authorization unavailable.");
			this.token = data.token;
			this.tokenUntil = Date.now() + 5 * 60 * 1000;
			return data.token;
		}).finally(() => { this.tokenPromise = void 0; });
		return this.tokenPromise;
	}
	async api(path: string): Promise<ApiResponse> {
		for (let attempt = 0; attempt < 2; attempt++) {
			const token = await this.authorization();
			try { return await this.json(path, token); }
			catch (error) {
				if (!(error instanceof Error) || !("status" in error) || error.status !== 401 || attempt !== 0) throw error;
				if (this.token === token) { this.token = void 0; this.tokenUntil = 0; }
			}
		}
		throw new Error("RedGIFs: authorization failed.");
	}
	mediaURL(value: unknown): string {
		if (typeof value !== "string") return "";
		try {
			const url = new URL(value);
			if (url.protocol === "https:" && !url.username && !url.password && (url.hostname === "redgifs.com" || url.hostname.endsWith(".redgifs.com"))) return url.href;
		} catch {}
		return "";
	}
	isVideo(gif: RedGif | undefined): gif is RedGif {
		return !!gif && /^[a-z0-9]+$/i.test(gif.id || "") && Number(gif.type) === 1;
	}
	async *fetchChapters(): AsyncGenerator<Chapter[], Chapter[], Chapter[]> {
		return [new Chapter(0, this.author, this.pageURL)];
	}
	async *fetchPagesSource(): AsyncGenerator<Result<RedGif[]>> {
		const seen = new Set<string>();
		let page = 1;
		while (!this.disposed) {
			try {
				const query = new URLSearchParams({ page: String(page), count: "40", order: this.order, type: "g" });
				const data = await this.api(`users/${encodeURIComponent(this.author)}/search?${query}`);
				if (!Array.isArray(data.gifs) || !Number.isInteger(Number(data.pages)) || Number(data.pages) < 0) throw new Error("RedGIFs: author list format changed.");
				if (data.page != null && Number(data.page) !== page) throw new Error("RedGIFs: unexpected page number; retry the author list.");
				const fresh: RedGif[] = [];
				for (const gif of data.gifs) {
					if (!this.isVideo(gif)) continue;
					const id = gif.id.toLowerCase();
					if (seen.has(id)) continue;
					seen.add(id);
					fresh.push(gif);
				}
				// Skip image-only/duplicate pages internally: PageFetcher treats [] as no progress.
				if (fresh.length) yield Result.ok(fresh);
				if (page >= Number(data.pages) || data.gifs.length === 0) return;
				page++;
			} catch (error) {
				// Keep the same page pending so the existing Retry button can resume it.
				yield Result.err(error instanceof Error ? error : new Error(String(error)));
				if (this.disposed || window.location.href !== this.pageURL) return;
			}
		}
		return;
	}
	async parseImgNodes(gifs: RedGif[]): Promise<ImageNode[]> {
		this.checkActive();
		return gifs.filter((gif) => this.isVideo(gif)).map((gif) => {
			const id = gif.id.toLowerCase();
			this.media.set(id, { gif, fetchedAt: Date.now() });
			const size = Number(gif.width) > 0 && Number(gif.height) > 0 ? { w: Number(gif.width), h: Number(gif.height) } : void 0;
			const poster = this.mediaURL(gif.urls?.poster) || this.mediaURL(gif.urls?.thumbnail);
			const video = this.mediaURL(gif.urls?.hd) || this.mediaURL(gif.urls?.sd);
			const node = new ImageNode(poster, `https://www.redgifs.com/watch/${id}`, `${this.author}_${id}.mp4`, void 0, video || void 0, size);
			node.mimeType = "video/mp4";
			return node;
		});
	}
	async fetchOriginMeta(node: ImageNode, retry: boolean) {
		this.checkActive();
		const id = new URL(node.href).pathname.match(/^\/watch\/([a-z0-9]+)$/i)?.[1]?.toLowerCase();
		if (!id) throw new Error("RedGIFs: invalid video ID.");
		let cached = this.media.get(id);
		if (retry || !cached || Date.now() - cached.fetchedAt > 60 * 1000 || !(cached.gif.urls?.hd || cached.gif.urls?.sd)) {
			const data = await this.api("gifs/" + id);
			if (!this.isVideo(data.gif)) throw new Error("RedGIFs: this video is unavailable.");
			cached = { gif: data.gif, fetchedAt: Date.now() };
			this.media.set(id, cached);
		}
		const urls = cached.gif.urls || {};
		const url = this.mediaURL(urls.hd) || this.mediaURL(urls.sd);
		if (!url) throw new Error("RedGIFs: no downloadable MP4 URL is available for this video.");
		const poster = this.mediaURL(urls.poster) || this.mediaURL(urls.thumbnail);
		if (poster) node.thumbnailSrc = poster;
		return { url };
	}
	async fetchImageData(imf: IMGFetcher): Promise<[Blob, number]> {
		const url = this.mediaURL(imf.node.originSrc);
		if (!url) throw new Error("RedGIFs: invalid media address.");
		// Do not send the API bearer token to the media CDN.
		const blob = await this.request(url, "blob", {}, imf);
		if (!blob || typeof blob.arrayBuffer !== "function" || !blob.size) throw new Error("RedGIFs: empty video response.");
		return [blob, 200];
	}
	async processData(data: Uint8Array<ArrayBuffer>, contentType: string): Promise<[Uint8Array<ArrayBuffer>, string]> {
		if (contentType?.startsWith("video/")) return [data, contentType];
		const binary = !contentType || /^(application\/octet-stream|binary\/)/i.test(contentType);
		if (binary && data.length >= 12 && data[4] === 102 && data[5] === 116 && data[6] === 121 && data[7] === 112) return [data, "video/mp4"];
		throw new Error("RedGIFs: response is not a video/MP4 file; refresh and retry.");
	}
	galleryMeta() {
		return new GalleryMeta(this.pageURL, "RedGIFs - " + this.author);
	}
};
ADAPTER.addSetup({
	name: "redgifs",
	workURLs: [/^https:\/\/(?:www\.)?redgifs\.com\/users\/[a-z0-9_.-]+\/?(?:[?#].*)?$/i],
	match: ["https://www.redgifs.com/users/*", "https://redgifs.com/users/*"],
	constructor: () => new RedGifsMatcher()
});
