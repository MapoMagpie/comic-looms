export class GalleryMeta {
  url: string;
  title?: string;
  originTitle?: string;
  downloader: string;
  tags: Record<string, any[]>;
  constructor(url: string, title: string) {
    this.url = url;
    this.title = title;
    this.tags = {};
    this.downloader = "https://github.com/MapoMagpie/comic-looms";
  }
}
