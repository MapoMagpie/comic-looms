<div align="center">

<h2>漫画织机</h2>

<p>
  这是一个油猴脚本，为<a href="#multi-site-support">一些站点</a>提供了一个统一且实用的阅读器，包含下载功能。
</p>
<p>
  关键特性：缩略图视图，能快速浏览整个画廊或艺术家作品；
</p>

![预览](./eh-view-enhance-showcase4.avif '预览')

预览([如果无法看到图片点此处](./preview.md))

</div>

---

## <a name="features">⭐ 特性</a>

- #### 🖼️ 缩略图预览
  > 为你带来一个纯净的缩略图列表，让你快速对整个画廊或艺术家作品集产生一目了然的印象。
- #### 🔍 大图阅览
  > 点击任意缩略图并从该处开始浏览，包含多种浏览方式：翻页模式、滚动模式。
- #### 📥 画廊下载
  > 你可以直接下载整个画廊，或仅下载已经浏览过的图片，或仅下载选择的图片。
- #### 🪶 低负载追求
  > 本脚本对数据请求作了许多节制，不同的行为将决定向站点请求数据的频次。
  >
  > 开启脚本时，以轻缓的请求速率加载大图。
  >
  > 正在浏览时，以稍快的请求速率加载大图。
  >
  > 进行下载时，以配置的下载线程数量加快请求速率。
- #### ⌨️ 全键盘操作
  > 你可以在配置面板中点击键盘，来了解相关键盘操作，并对其进行配置。
- #### 📱 移动端优化
  > 需要支持脚本管理器拓展的浏览器，如:Firefox Android、Kiwi Browser

## <a name="multi-site-support">🌐 站点支持</a>

本脚本支持许多站点，感谢一些用户对新站点的贡献。
关于新站点适配，由于精力有限，新的适配请求将不会得到积极的支持。

> 完整的站点支持可查看此处: [matchers](https://github.com/MapoMagpie/comic-looms/tree/master/src/platform/matchers)

主要支持站点：

- [e-hentai.org](https://e-hentai.org) | [exhentai.org](https://exhentai.org) | [onion](http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion)
- [Twitter|X](https://x.com/NASA/media): 用户媒体, 列表, 主页推荐, Following
- [pixiv.net](https://pixiv.net): 作者插话与漫画, 你的主页
- [nhentai.net](https://nhentai.net)
- [hitomi.la](https://hitomi.la)
- [gelbooru.com](https://gelbooru.com)
- [漫画柜](https://www.manhuagui.com/comic/7580)
- [拷贝漫画](https://www.mangacopy.com) | [拷贝漫画](https://www.copymanga.tv)
- [禁漫天堂](https://18comic.vip) | [18comic.org](https://18comic.org) (注：此站点没有默认的缩略图)
- [rule34.xxx](https://rule34.xxx)
- [wnacg.com](https://www.wnacg.com)
- [mycomic.com](https://mycomic.com)

## <a name="installation">📦 安装</a>

1. **`前置条件`**：现代浏览器(Firefox\Chrome\Edge...)
1. **`前置条件`**：安装脚本管理器拓展 [`Violentmonkey`](https://violentmonkey.github.io/) | [`TamperMonkey`](https://www.tampermonkey.net/)
1. **`前置条件`**：通畅的网络，脚本安装时，脚本管理器会同步安装一些依赖，点击此处确认能否访问[jsdelivr.net](https://cdn.jsdelivr.net)，以确保脚本能正常运行。
1. **`安装地址1`**：[GreasyFork](https://greasyfork.org/scripts/397848-comic-looms)
1. **`安装地址2`**：直接访问此处进行安装[这里](https://github.com/MapoMagpie/comic-looms/releases/latest/download/comic-looms.user.js)

## <a name="post-install">🎉 安装之后</a>

1. 安装之后，你会在生效站点的画廊页面发现位于左下角的浮动图标`<✿>`，此为脚本生效的标志。
1. 点击浮动图标`<✿>`将进入缩略图陈列界面，继续点击某张图片，将从该处开始加载大图。
1. 更多信息可以在 `配置` -> `帮助` 或 [这里](./HELP_CN.md) 找到。

## <a name="feedback">💬 问题反馈</a>

如果你喜欢这个脚本，请给我一个 `star`

如果你在脚本运行时遇到了什么问题，欢迎留下[issue](https://github.com/MapoMagpie/comic-looms/issues)，但确保提供了排查问题的必要信息。

<mark>重要的事：此脚本的功能完整性仅在较新的`Firefox`和`Chromium`系浏览器，以及`Violentmonkey`和`Tampermonkey`上得到保证。</mark>

## <a name="development">🛠️ 开发与构建</a>

### 🧰 开发环境

- NodeJs
- Typescript

### ⚙️ 构建

```shell
# 安装依赖
npm run install
# 常规构建，构建产物位于`dist/comic-looms.user.js`
npm run build
# 以下命令适用于开发，将开启一个本地服务托管`dist/comic-looms.user.js`，并在代码变动时自动构建。
# 访问 `http://localhost:8080/dist/comic-looms.user.js` 即可安装构建后的脚本。
# 推荐使用`Violentmonkey`，此脚本管理器支持`Track external edits`，可自动安装构建后变动的脚本。
npm run dev
```

### 📖 开发指南

如果你想尝试为某个站点添加支持，可以参考[这里](./CONTRIBUTING.md)
