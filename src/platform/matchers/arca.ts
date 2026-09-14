import ImageNode from '../../img-node';
import { ADAPTER } from '../adapt';
import { BaseMatcher, Result, OriginMeta } from '../platform';

class ArcaMatcher extends BaseMatcher<Document> {
  async *fetchPagesSource(): AsyncGenerator<Result<Document>> {
    yield Result.ok(document);
  }
  async parseImgNodes(doc: Document): Promise<ImageNode[]> {
    const imageString = '.article-content img:not(.arca-emoticon):not(.twemoji)';
    const videoString = '.article-content video:not(.arca-emoticon)';

    const elements = Array.from(doc.querySelectorAll<HTMLElement>(`${imageString}, ${videoString}`));
    const nodes: ImageNode[] = [];
    const digits = elements.length.toString().length;

    elements.forEach((element, i) => {
      if (element.tagName.toLowerCase() === 'img') {
        const img = element as HTMLImageElement;
        if (img.src && img.style.width !== '0px') {
          const src = img.src;
          const href = new URL(src);
          const ext = href.pathname.split('.').pop();
          href.searchParams.set('type', 'orig');
          const title = (i + 1).toString().padStart(digits, '0') + '.' + ext;
          nodes.push(new ImageNode(src, href.href, title, undefined, href.href));
        }
      } else if (element.tagName.toLowerCase() === 'video') {
        const video = element as HTMLVideoElement;
        const preview = video.src || video.getAttribute('data-originalurl') || '';
        if (preview) {
          const ext = new URL(preview).pathname.split('.').pop() ?? 'mp4';
          const original = video.getAttribute('data-originalurl') ?? (() => {
            const url = new URL(preview);
            url.searchParams.set('type', 'orig');
            return url.href;
          })();
          const title = (i + 1).toString().padStart(digits, '0') + '.' + ext;
          const node = new ImageNode(video.poster || '', original, title, undefined, preview);
          node.mimeType = 'video/' + ext;
          nodes.push(node);
        }
      }
    });

    return nodes;
  }
  async fetchOriginMeta(node: ImageNode): Promise<OriginMeta> {
    if (node.mimeType?.startsWith('video')) {
      return { url: ADAPTER.conf.fetchOriginal ? node.href : node.originSrc! };
    }
    return { url: ADAPTER.conf.fetchOriginal ? node.href : node.thumbnailSrc };
  }
}
ADAPTER.addSetup({
  name: "Arcalive",
  workURLs: [
    /arca.live\/b\/\w*\/\d+/
  ],
  match: ["https://arca.live/*"],
  constructor: () => new ArcaMatcher(),
});
