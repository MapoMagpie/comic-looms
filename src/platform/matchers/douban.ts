import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

type DoubanAlbumPage = {
  "page_number": number,
  "owner_name": string,
  "path": string,
}

type DoubanAlbum = {
  "title": string,
  "path": string,
  "photo_count": number,
  "date": string,
}

let DP = new DOMParser();

class DoubanMatcher extends BaseMatcher<Document> {
  chapterCount: number = 0;
  meta?: GalleryMeta;

  galleryMeta(chapter: Chapter): GalleryMeta {
    return this.meta ?? super.galleryMeta(chapter);
  }

  initGalleryMeta() {
    const title = document.querySelector("#db-usr-profile > div.info > h1")?.textContent ?? document.title;
    this.meta = new GalleryMeta(window.location.href, title.trim());
  }

  async *pages_of_albums(doc: any, path: any, page_number: number = 0): AsyncGenerator<DoubanAlbumPage> {
    let next_page = doc.querySelector(
      '#content  div.article  div.paginator span.next > a',
    )?.href
    page_number += 1
    yield {
      page_number: page_number,
      owner_name: doc.querySelector('#db-usr-profile > div.info > h1').innerText.trim(),
      path: path,
    }
    if (next_page) {
      const d = await fetch(next_page)
	.then(resp => resp.text())
	.then(text => DP.parseFromString(text, 'text/html'))

      yield* this.pages_of_albums(d, next_page, page_number)
    }
  }

  async albums_in_page(page: DoubanAlbumPage): Promise<DoubanAlbum[]> {
    const d = await fetch(page.path)
      .then(resp => resp.text())
      .then(text => DP.parseFromString(text, 'text/html'))

    return Array.from(d.querySelectorAll('.albumlst')).map((x) => {
      let t = x.querySelector<HTMLElement>('.albumlst_r .pl')!.innerText.match(/(\d+)张照片\s+(.+)(创建|更新)/)
      return {
	"title": (x.querySelector<HTMLElement>('.albumlst_r .pl2 a')?.innerText??document.title).trim(),
	"path": x.querySelector<HTMLElement>('.album_photo')!.getAttribute('href')!,
	"photo_count": +(t![1]),
	"date": t![2],
      }
    })
  }

  async *fetchChapters(): AsyncGenerator<Chapter[]> {
    this.initGalleryMeta();
    const thumbimg = document.querySelector<HTMLImageElement>("#db-usr-profile > div.pic > a > img")?.getAttribute("src") || undefined;
    let chapterCount = 0;
    for await (const album_page of this.pages_of_albums(document, window.location.href)) {
      let albums: DoubanAlbum [] = await this.albums_in_page(album_page)
      for (const album of albums) {
	const chapters: Chapter[] = [];
	chapterCount += 1;
	chapters.push(new Chapter(
	  chapterCount,
	  album["title"],
	  album["path"],
	  thumbimg,
	))
	this.chapterCount = chapterCount;
	yield chapters;
      }
    }

  }

  async *fetchPagesSource(ch: Chapter): AsyncGenerator<Result<Document>> {
    let next_page = ch.source

    while (next_page) {
      let doc = await fetch(next_page)
	.then(resp => resp.text())
	.then(text => DP.parseFromString(text, 'text/html'))

      yield Result.ok(doc)

      next_page = doc.querySelector<HTMLAnchorElement>(
	'#content  div.article  div.paginator span.next > a',
      )?.href ?? ""
    }
  }

  async parseImgNodes(doc: Document): Promise<ImageNode[]> {
    return Array.from(doc.querySelectorAll<HTMLImageElement>('.photo_wrap img')).map(
      img => {
	// https://img3.doubanio.com/view/photo/m/public/p999999.webp
	// https://img3.doubanio.com/view/photo/l/public/p999999.webp
	// https://img1.doubanio.com/view/photo/sqs/public/p999999.jpg

	const orig_src = img.src.replace(
	  /(.*\/view\/photo)(.+)(public\/.*)\.(.+)/,
	  "$1/l/$3.webp",
	)
	const title = (img.alt? img.alt + "_" : "") + orig_src.replace( /.*\/(.+)/, "$1")
	return new ImageNode(
	  img.src,
	  (img.parentNode! as HTMLAnchorElement).href,
	  title,
	  undefined,
	  orig_src,
	)
      })
  }


  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    return { url: node.originSrc! };
  }
}

ADAPTER.addSetup({
  name: "豆瓣相册",
  workURLs: [
    /douban.com\/people\/[^\/]+\/photos/
  ],
  match: ["https://www.douban.com/*"],
  constructor: () => new DoubanMatcher(),
});
