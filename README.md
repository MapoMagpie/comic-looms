<div align="center">

<h2>Comic Looms</h2>

<a href="./.assets/README_CN.md">中文</a>
<p>
  This is a Userscript that provides a unified and practical reader for <a href="#multi-site-support">certain sites</a>, with download support.
</p>
<p>
  Key feature: a thumbnail view, for quickly browsing an entire gallery or an artist's works;
</p>

![Preview](./.assets/eh-view-enhance-showcase4.avif 'Preview')

Preview ([click here if you can't see the image](./.assets/preview.md))

</div>

---

## <a name="features">⭐ Features</a>

- #### 🖼️ Thumbnail Preview
  > Gives you a clean thumbnail list, letting you quickly gain an at-a-glance impression of an entire gallery or an artist's body of work.
- #### 🔍 Big Image Viewing
  > Click any thumbnail to start browsing from that point; includes multiple viewing modes: pagination mode and scroll mode.
- #### 📥 Gallery Download
  > You can download the entire gallery, or only the images you have already viewed, or only the images you have selected.
- #### 🪶 Low Load Pursuit
  > This script is heavily restrained with data requests; different behaviors determine how often data is requested from the site.
  >
  > When the script is enabled, big images are loaded at a gentle request rate.
  >
  > While browsing, big images are loaded at a slightly faster request rate.
  >
  > When downloading, the request rate is increased by the configured number of download threads.
- #### ⌨️ Full Keyboard Operation
  > You can click `keyboard` in the CONF panel to learn about the relevant keyboard operations and configure them.
- #### 📱 Mobile Optimization
  > Requires a browser that supports script manager extensions, such as: Firefox Android, Kiwi Browser.

## <a name="multi-site-support">🌐 Multi-site Support</a>

This script supports many sites; thanks to the users who contributed support for new sites.
Regarding new site adaptation, due to limited time and energy, new adaptation requests will not be actively supported.

> For the complete list of supported sites, see: [matchers](https://github.com/MapoMagpie/comic-looms/tree/master/src/platform/matchers)

Mainly supported sites:

- [e-hentai.org](https://e-hentai.org) | [exhentai.org](https://exhentai.org) | [onion](http://exhentai55ld2wyap5juskbm67czulomrouspdacjamjeloj7ugjbsad.onion)
- [Twitter|X](https://x.com/NASA/media): User's Media, Lists, For you, Following
- [pixiv.net](https://pixiv.net): Artists' illust and manga, Your Homepage
- [nhentai.net](https://nhentai.net)
- [hitomi.la](https://hitomi.la)
- [gelbooru.com](https://gelbooru.com)
- [manhuagui.com](https://www.manhuagui.com/comic/7580)
- [mangacopy.com](https://www.mangacopy.com) | [copymanga.tv](https://www.copymanga.tv)
- [18comic.vip](https://18comic.vip) | [18comic.org](https://18comic.org) (note: this site has no default thumbnails)
- [rule34.xxx](https://rule34.xxx)
- [wnacg.com](https://www.wnacg.com)
- [mycomic.com](https://mycomic.com)

## <a name="installation">📦 Installation</a>

1. **`Prerequisites`**: Modern browser (Firefox\Chrome\Edge...)
1. **`Prerequisites`**: Installed script manager extension [`Violentmonkey`](https://violentmonkey.github.io/) | [`TamperMonkey`](https://www.tampermonkey.net/)
1. **`Prerequisites`**: An unobstructed network. When the script is installed, the script manager will install some dependencies along with it; click here to check whether you can access [jsdelivr.net](https://cdn.jsdelivr.net), to ensure the script runs properly.
1. **`Installation Link 1`**: [GreasyFork](https://greasyfork.org/scripts/397848-comic-looms)
1. **`Installation Link 2`**: Directly visit and install from [here](https://github.com/MapoMagpie/comic-looms/releases/latest/download/comic-looms.user.js)

## <a name="post-install">🎉 After Installation</a>

1. After installation, you will find a floating icon `<✿>` at the bottom left of gallery pages on supported sites; this marks that the script is active.
1. Clicking the floating icon `<✿>` enters the thumbnail display view; click on an image to start loading big images from that point.
1. More information can be found in `CONF` -> `Help` or [here](./.assets/HELP.md).

## <a name="feedback">💬 Feedback</a>

If you like this script, please give me a `star`

If you run into any problems while the script is running, feel free to leave an [issue](https://github.com/MapoMagpie/comic-looms/issues), but be sure to provide the necessary information for troubleshooting.

<mark>Important: the full functionality of this script is only guaranteed on recent `Firefox` and `Chromium`-based browsers, as well as `Violentmonkey` and `Tampermonkey`.</mark>

## <a name="development">🛠️ Development & Build</a>

### 🧰 Development Environment

- NodeJs
- Typescript

### ⚙️ Build

```shell
# Install dependencies
npm run install
# Regular build; the output is located at `dist/comic-looms.user.js`
npm run build
# The following command is for development; it starts a local server hosting `dist/comic-looms.user.js` and automatically builds when the code changes.
# Visit `http://localhost:8080/dist/comic-looms.user.js` to install the built script.
# `Violentmonkey` is recommended; this script manager supports `Track external edits`, so it can automatically install the changed build.
npm run dev
```

### 📖 Development Guide

If you want to try adding support for a certain site, you can refer to [here](./CONTRIBUTING.md)
