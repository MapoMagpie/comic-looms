export type CosplayMedia = { url: string; thumbnail: string; title: string; embed?: string; sourcePage?: string };

export function videosFirst(videos: CosplayMedia[], images: CosplayMedia[]): CosplayMedia[] {
  return [...videos, ...images];
}

export function cosplayPlayers(doc: Document, base: string): string[] {
  const players = Array.from(doc.querySelectorAll('.entry-content iframe[src]')).map(frame => httpURL(frame.getAttribute("src"), base));
  return [...new Set(players.filter((url): url is string => !!url && /^https:\/\/cossora\.stream\/embed\/[\w-]+$/.test(url)))];
}

function httpURL(value: string | null, base: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value, base);
    return /^https?:$/.test(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

function imageURL(value: string | null, base: string) {
  const url = httpURL(value, base);
  return url && /\.(?:jpe?g|png|webp|gif|avif)(?:\?|$)/i.test(url) ? url : undefined;
}

export function cosplayImages(doc: Document, base: string): CosplayMedia[] {
  const seen = new Set<string>();
  const result: CosplayMedia[] = [];
  const images = doc.querySelectorAll<HTMLImageElement>('.entry-content .gallery img, .entry-content .wp-block-gallery img');
  for (const img of Array.from(images)) {
    const thumbnail = imageURL(img.getAttribute("data-src"), base) ?? imageURL(img.getAttribute("src"), base);
    const url = imageURL(img.closest("a")?.getAttribute("href") ?? null, base)
      ?? imageURL(img.getAttribute("data-full-url"), base) ?? thumbnail;
    if (!url || seen.has(url)) continue;
    seen.add(url);
    const filename = new URL(url).pathname.split("/").pop() || `${result.length + 1}.jpg`;
    result.push({ url, thumbnail: thumbnail ?? url, title: filename });
  }
  return result;
}

export function cosplayAlbums(doc: Document, base: string) {
  const result: { url: string; title: string; cover?: string }[] = [];
  const seen = new Set<string>();
  for (const title of Array.from(doc.querySelectorAll('#content .post-title, main .post-title, #content .entry-title, main .entry-title'))) {
    const anchor = title.querySelector("a") ?? title.closest("a");
    const url = httpURL(anchor?.getAttribute("href") ?? null, base);
    if (!url || new URL(url).origin !== new URL(base).origin || seen.has(url)) continue;
    seen.add(url);
    const img = title.closest(".post-item, article")?.querySelector("img");
    const cover = imageURL(img?.getAttribute("data-src") ?? img?.getAttribute("src") ?? null, base);
    result.push({ url, title: title.textContent?.trim() || url, cover });
  }
  return result;
}
