## 这里是src目录下源码文件的简要说明:

```
./src
 |-main.ts                       // 入口，组织各模块代码。
 |-page-fetcher.ts               // 页获取器，负责从每页中提取图片信息，根据图片信息构造图片获取器。
 |-img-fetcher.ts                // 图片获取器。
 |-idle-loader.ts                // 空闲自动加载器，当配置项“自动加载”启用时工作，一张接一张缓慢加载。
 |-fetcher-queue.ts              // 图片获取器队列，组织图片获取器们的请求，控制同时有多少个图片被加载。
 |-img-node.ts                   // 图片信息，被包装在图片获取器中。
 |-event-bus.ts                  // 事件总线，各模块间通过全局变量EBUS来收发事件。
 |-config.ts                     // 配置项。
 |-download/                     //
 | |-downloader.ts               // 下载器，下载时禁用自动加载，并利用空闲自动加载器进行下载。
 |-platform/                     //
 | |-platform.ts                 // 站点平台适配器，描述某个站点如何获取下一页，如何从页中提取图片信息，以及获取元数据。
 | |-adapt.ts                    // 根据站点地址返回平台适配器。
 | |                             // 以下列举一些适配器，并简述它们获取信息的行为。
 | |-hitomi.ts                   // hitomi.la的适配器，它直接请求API并解码内容来获取图片的缩略图和源图信息。
 | |-nhentai.ts                  // nhentai.net的适配器，它直接从页面中的某个script标签中提取所有的图片信息。
 | |-pixiv.ts                    // pixiv.net的适配器，它在页面中获取作者ID，并通过API请求作者所有作品信息，
 | |                                继续根据作品信息从API请求更详细的图片信息。
 | |-danbooru.ts                 // 一些类booru站点的适配器，它从页面中查询图片元素，接着请求下一页，如此反复。
 | |                                图片请求器在请求源图时，会请求每张图片的详情页(href)，从详情页中提取源图地址。
 | |-ehentai.ts                  // e-hentai.org/exhentai.org的适配器，它从页面中查询图片元素，接着请求下一页，
 | |                                如此反复。图片请求器在请求源图时，会请求每张图片的阅读页，从阅读页中提取源图地址。
 | |-twitter.ts                  // twitter.ts的适配器，它根据推主的ID从API中请求推主的媒体信息，API请求存在分页。
 |-ui/                           //
 | |-html.ts                     // 脚本的界面。
 | |-style.ts                    // 脚本界面的样式。
 | |-full-view-grid-manager.ts   // 缩略图陈列网格界面。
 | |-big-image-frame-manager.ts  // 大图阅读界面。
 | |-config-panel.ts             // 配置面板。
 | |-event.ts                    // 部分脚本界面中元素的事件。包括键盘事件。
 |-utils/                        // 
```

## 为某个站点添加支持

站点适配相关的代码都放置在src/platform目录下，在[src/platform/platform.ts](/src/platform/platform.ts)中定义了站点适配器的抽象类，它描述了本程序应该如何在某个站点上获取分页以及图片信息。
为了将来可以转换成独立程序，站点适配器在设计追求上，不依赖原页面上的javascript运行结果。
通过分析原页面上的信息，直接调用相关的API，或使用DOMParser解析原始文档后查询对应的图片元素。
也就是不需要等待原页面加载完毕，或等待页面上的javascript完成加载，或者设置超时时间来等待信息出现。

在[src/platform/platform.ts](/src/platform/platform.ts)中定义了两个抽象类Matcher和BaseMatcher，Matcher是顶层抽象类，完全代表站点适配器。
而BaseMatcher实现了Matcher部分方法，使Matcher的部分行为变成默认可选，减少了Matcher的需要实现的方法数量。
因此在支持新站点时，只需继承BaseMatcher。
```javascript
export class ExampleMatcher extends BaseMatcher {}
```

通过Typescript的LSP的可以自动为ExampleMatcher实现BaseMatcher的方法，但是仍需要进行一些修改，为方法添加关键字`async`语法糖
```javascript
class ExampleMatcher extends BaseMatcher {
  fetchPagesSource(source: Chapter): AsyncGenerator<PagesSource, any, unknown> {
    throw new Error("Method not implemented.");
  }
  parseImgNodes(page: PagesSource, chapterID?: number | undefined): Promise<ImageNode[]> {
    throw new Error("Method not implemented.");
  }
  fetchOriginMeta(node: ImageNode, retry: boolean, chapterID?: number | undefined): Promise<OriginMeta> {
    throw new Error("Method not implemented.");
  }
  name(): string {
    throw new Error("Method not implemented.");
  }
  workURL(): RegExp {
    throw new Error("Method not implemented.");
  }
}
```
在上面代码的基础上，简要的描述每个方法该做什么。
示例描述了一个比较传统的站点比如e-hentai的信息获取流程，在画廊页面可以获取到图片们的缩略图地址和阅读地址，以及下一页地址。而图片的源地址需要在请求阅读地址之后才能获取到。

```javascript
class ExampleMatcher extends BaseMatcher {
  name(): string {
    return "example site";
  }
  // 第一步：获取分页内容，返回分页内容后，将在第二步从分页内容中获取图片信息。
  // 需要添加async 以及在方法名前加上*表示这个方法是一个生成器，然后便可以使用yield关键字返回
  // @param _source: 是章节信息， 对于大部分站点来说并没有章节设计，此参数可以忽略，或者直接移除。
  async *fetchPagesSource(_source: Chapter): AsyncGenerator<PagesSource> {
    // 通常第一步直接返回当前页面的文档对象。
    yield document;
    // 当程序需要获取下一页时
    while (true) {
      // 获取下一页地址
      let nextPage = getNextPage();
      // 获取不到下一页时，跳出循环，表明所有分页获取完毕。
      if (nextPage === undefined || nextPage === "") break;
      // 请求下一页并解析为文档对象。
      const doc = await window.fetch(nextPage).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
      yield doc;
    }
  }
  // 第二步：参数page是第一步返回的分页内容，可能是Document也可以是string，具体类型根据第一步返回值来决定。
  // @param _chapterID: 同样是可忽略的章节信息。
  async parseImgNodes(page: PagesSource, _chapterID?: number | undefined): Promise<ImageNode[]> {
    // 由于第一步返回的是Document，因此可以直接将page断定为Document
    const doc = page as Document;
    // 从Document中查询对应的图片元素。
    const elements = Array.from(doc.querySelectorAll("some img or a"));
    let nodes: ImageNode[] = [];
    for (const ele of elements) {
      // tilte: 获取图片标题，或者通过其他方式设定标题
      // thumbnailSrc: 获取缩略图地址
      // href: 获取图片对应的阅读地址href，也就是原页面上的缩略图点击后跳转的阅读地址
      nodes.push(new ImageNode(thumbnailSrc, href, title, 可选参数:延迟的thumbnailSrc, 可选参数:直接设置图片的源地址));
      // 可选参数:延迟的thumbnailSrc，e-hentai并没有直接提供缩略图地址，而是20张图片一组公用一个精灵图，因此在无法获取thumbnailSrc时，通过请求精灵图再进行分割，再将分割后的图片blob地址返回。
      // 可选参数:直接设置图片的源地址， 某些站点非常慷慨，直接在页面中就包含了图片的源地址信息，可以省略第三步异步请求源地址的操作。
    }
    return nodes;
  }
  // 第三步：获取图片的源地址
  // @param _retry: 如果无法从图片的源地址获取图片时，_retry为true，然后便可以尝试更换图片的源地址，不过大部分站点图片的源地址都是不变的，因此可以省略。
  // @param _chapterID: 同样是可忽略的章节信息。
  async fetchOriginMeta(node: ImageNode, _retry: boolean, _chapterID?: number | undefined): Promise<OriginMeta> {
    // 如果在第二步中明确设置了图片的源地址，则直接返回
    // return {url: node.originSrc!};
    // 如果在第二步中不能获取到图片的源地址，则需要请求图片的阅读地址(href)，然后从返回的html中获取图片源地址。
    const doc = await window.fetch(node.href).then((res) => res.text()).then((text) => new DOMParser().parseFromString(text, "text/html"));
    const originSrc = doc.querySelector("some img")?.src;
    return {url: originSrc};
    // 返回值OriginMeta可以两个可选属性 title和href，它们的作用是更新图片信息中的title和href。
    // 比如在第二步设置了title为:01.jpg，但是在当前阶段发现源图片是png格式的，因此可以将title中的.jpg更新为.png
  }
  // 返回一个正则表达式来匹配生效于哪一个站点，以及具体生效于这个站点的画廊页面。
  workURL(): RegExp {
    return /example.com/画廊id正则$/;
  }
}
```
还有很多站点的图片信息获取方式较为复杂，涉及到了延迟加载，混淆，图片乱序切割，API请求的复杂构造以及API返回内容的加密等。
如果碰到这些复杂的情况，请参考目前已经实现的站点适配器的具体代码。
例如hitomi的页面中直接提供了加密后的图片列表以及缩略图和源图信息，还有混淆后的解密函数。
例如twitter中存在复杂的API请求构造。
例如18comic返回了乱序切割的图片，还有混淆的图片还原函数。

## 想要为脚本添加新功能或修复BUG

这里描述脚本开始运行后的流程
TODO
