import { GalleryMeta } from "../../download/gallery-meta";
import ImageNode from "../../img-node";
import { Chapter } from "../../page-fetcher";
import { ADAPTER } from "../adapt";
import { BaseMatcher, OriginMeta, Result } from "../platform";

class WnacgMatcher extends BaseMatcher<GalleryImage[]> {
  meta?: GalleryMeta;
  baseURL?: string;
  galleryURL?: string;

  async *fetchPagesSource(): AsyncGenerator<Result<GalleryImage[]>> {
    const id = this.extractIDFromHref(window.location.href);
    if (!id) {
      throw new Error("Cannot find gallery ID");
    }
    this.baseURL = `${window.location.origin}/photos-index-page-1-aid-${id}.html`;
    this.galleryURL = `${window.location.origin}/photos-gallery-aid-${id}.html`;

    let doc = await window.fetch(this.baseURL).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
    this.meta = this.pasrseGalleryMeta(doc);

    let galleryImageList = await this.requestGalleryImages(this.galleryURL);
    yield Result.ok(galleryImageList);

  }

  async parseImgNodes(list: GalleryImage[]): Promise<ImageNode[]> {

    const result: ImageNode[] = [];

    for (let index = 0; index < list.length; index++) {
      const img = list[index];
      let imgNode = new ImageNode("", img.url, img.caption, undefined, img.url);
      result.push(imgNode);
    }
    return result;
  }

  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    const url = node.originSrc ?? node.thumbnailSrc;
    const ext = url.includes(".") ? url.split(".").pop() : "jpg";
    const title = node.title.replace("[", "").replace("]", "") + "." + ext;
    return { url, title }
  }

  galleryMeta(chapter: Chapter): GalleryMeta {
    return this.meta || super.galleryMeta(chapter);
  }

  // https://www.hm19.lol/photos-index-page-1-aid-253297.html
  private extractIDFromHref(href: string): string | undefined {
    const match = href.match(/-(\d+).html$/);
    if (!match) return undefined;
    return match[1];
  }

  private pasrseGalleryMeta(doc: Document): GalleryMeta {
    const title = doc.querySelector<HTMLTitleElement>("#bodywrap > h2")?.textContent || "unknown";
    const meta = new GalleryMeta(this.baseURL || window.location.href, title);
    const tags = Array.from(doc.querySelectorAll(".asTB .tagshow")).map(ele => ele.textContent).filter(Boolean);
    const description = Array.from(doc.querySelector(".asTB > .asTBcell.uwconn > p")?.childNodes || []).map(e => e.textContent).filter(Boolean) as string[];
    meta.tags = { "tags": tags, "description": description }
    return meta;
  }

  private async requestGalleryImages(galleryURL: string): Promise<GalleryImage[]> {
    const text = await window.fetch(galleryURL).then((res) => res.text());
    let js = "";
    for (let line of text.split("\n")) {
      line = line.replace("document.writeln(\"", "");
      line = line.replace("\");", "");
      if (line.includes("var imglist")) {
        line = line.replace("var imglist = ", "");
        line = line.replaceAll("fast_img_host+\\", "");
        line = line.replaceAll("\\", "");
        js += line;
      }
    }
    return this.extractUrlsAndCaptions(js);
  }

  /*
  document.writeln("	<script type=\"text/javascript\"> ");
  document.writeln("		var sns_sys_id = '';");
  document.writeln("		var sns_view_point_token = '';");
  document.writeln("		var hash = window.location.hash;");
  document.writeln("		if(!hash){");
  document.writeln("			hash = 0;");
  document.writeln("		}else{");
  document.writeln("			hash = parseInt(hash.replace(\"#\",\"\")) - 1;");
  document.writeln("		}");
  document.writeln("		var fast_img_host=\"\";");
  document.writeln("		var imglist = [{ url: fast_img_host+\"//img5.qy0.ru/data/2940/25/001.jpg\", caption: \"[001]\"},{ url: fast_img_host+\"/themes/weitu/images/bg/shoucang.jpg\", caption: \"喜歡紳士漫畫的同學請加入收藏哦！\"}];");
  document.writeln("");
  document.writeln("		$(function(){");
  document.writeln("			imgscroll.beLoad($(\"#img_list\"),imglist,hash);");
  document.writeln("		});");
  document.writeln("	
  </script>
  ");
  */

  private extractUrlsAndCaptions(inputStr: string) {
    const regex = /url:\s*"(.*?)",\s*caption:\s*"(.*?)"/gs;
    let match;
    const results = [];

    while ((match = regex.exec(inputStr)) !== null) {
      results.push({ url: match[1], caption: match[2] });
    }

    if (results.length > 0) {
      if (results[results.length - 1].caption.includes("加入收藏")) {
        results.pop();
      }
    }

    return results;
  }

}

type GalleryImage = {
  url: string;
  caption: string;
}
ADAPTER.addSetup({
  name: "绅士漫画",
  workURLs: [
    /(wnacg.com|wn\d{2}.(cc|ru))\/photos-index/
  ],
  match: ["https://www.wnacg.com/*"],
  constructor: () => new WnacgMatcher(),
});
