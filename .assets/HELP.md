## [How to Use? Where is the Entry?]

The script typically activates on gallery homepages or artist homepages. For example, on E-Hentai, it activates on the gallery detail page, or on Twitter, it activates on the user's homepage or tweets.

When active, a **<🎑>** icon will appear at the bottom left of the page. Click it to enter the script's reading interface.

## [Some existing issues and their solutions.]

- When using Firefox to browse Twitter|X, after navigating to some pages, you need to refresh the page for this script to work on that page.
- When using Firefox to browse Twitter|X, the download function of this script may not work.

### Solution
These issues are caused by Twitter|X's Content Security Policy (CSP), which disables URL mutation detection and the Zip creation functionality.

You can modify Twitter|X's response header `Content-Security-Policy` to `Content-Security-Policy: object-src '*'` using other extensions.

For example, in the extension `Header Editor`, click the Add button:

- Name: csp-remove (any name);
- Rule type: Modify response header;
- Match type: domain;
- Match rules: x.com;
- Execute type: normal;
- Header name: content-security-policy;
- Header value: object-src '*';

## [Can the Script's Entry Point or Control Bar be Relocated?]

Yes! At the bottom of the configuration panel, there's a **Drag to Move** option. Drag the icon to reposition the control bar anywhere on the page.

## [Can the Script Auto-Open When Navigating to the Corresponding Page?]

Yes! There is an **Auto Open** option in the configuration panel. Enable it to activate this feature.

## [How to Zoom Images?]

There are several ways to zoom images in big image reading mode:

- Right-click + mouse wheel
- Keyboard shortcuts
- Zoom controls on the control bar: click the -/+ buttons, scroll the mouse wheel over the numbers, or drag the numbers left or right.

## [How to maintain spacing between large images?]
In CONF > Style, modify or add: .ehvp-root { --ehvp-big-images-gap: 2px; }

## [How to Open Images from a Specific Page?]

In the thumbnail list interface, simply type the desired page number on your keyboard (without any prompt) and press Enter or your custom shortcuts.

## [About the Thumbnail List]

The thumbnail list interface is the script's most important feature, allowing you to quickly get an overview of the entire gallery.

Thumbnails are also lazy-loaded, typically loading about 20 images, which is comparable to or even fewer requests than normal browsing.

Pagination is also lazy-loaded, meaning not all gallery pages load at once. Only when you scroll near the bottom does the next page load.

Don't worry about generating a lot of requests by quickly scrolling through the thumbnail list; the script is designed to handle this efficiently.

## [About Auto-Loading and Pre-Loading]

By default, the script automatically and slowly loads large images one by one.

You can still click any thumbnail to start loading and reading from that point, at which time auto-loading will stop and pre-load 3 images from the reading position.

Just like the thumbnail list, you don't need to worry about generating a lot of loading requests by fast scrolling.

## [About Downloading]

Downloading is integrated with large image loading. When you finish browsing a gallery and want to save and download the images, you can click **Start Download** in the download panel. don't worry about re-downloading already loaded images.

You can also directly click **Start Download** in the download panel without reading.

Alternatively, click the **Take Loaded** button in the download panel if some images consistently fail to load. This will save the images that have already been loaded.

The download panel's status indicators provide a clear view of image loading progress.

**Note:** When the download file size exceeds 1.2GB, split compression will be automatically enabled. If you encounter errors while extracting the files, please update your extraction software or use 7-Zip.

## [Can I Select the Download Range?]

Yes, the download panel has an option to select the download range(Cherry Pick), which applies to downloading, auto-loading, and pre-loading.

Even if an image is excluded from the download range, you can still click its thumbnail to view it, which will load the corresponding large image.

## [How to Select Images on Some Illustration Sites?]

In the thumbnail list, you can use some hotkeys to select images:

- **Ctrl + Left Click:** Selects the image. The first selection will exclude all other images.
- **Ctrl + Shift + Left Click:** Selects the range of images between this image and the last selected image.
- **Alt + Left Click:** Excludes the image. The first exclusion will select all other images.
- **Alt + Shift + Left Click:** Excludes the range of images between this image and the last excluded image.

In addition, there are several other methods:

- Middle-click on a thumbnail to open the original image url, then right-click to save the image.
- Set the download range to 1 in the download panel. This excludes all images except the first one. Then, click on thumbnails of interest in the list, which will load the corresponding large images. After selecting, clear the download range and click **Take Loaded** to package and download your selected images.
- Turn off auto-loading and set pre-loading to 1 in the configuration panel, then proceed as described above.

## [Can I Operate the Script via Keyboard?]

Yes! There's a **Keyboard** button at the bottom of the configuration panel. Click it to view or configure keyboard operations.

You can even configure it for one-handed full keyboard operation, freeing up your other hand!

## [How to Disable Auto-Open on Certain Sites?]

There's a **Site Profiles** button at the bottom of the configuration panel. Click it to exclude certain sites from auto-opening. For example, Twitter or Booru-type sites.

## [How to Feed the Author]

Give me a star on [Github](https://github.com/MapoMagpie/comic-looms) or a good review on [Greasyfork](https://greasyfork.org/scripts/397848-comic-looms).

Please do not review on Greasyfork, as its notification system cannot track subsequent feedback. Many people leave an issue and never back.
Report issues here: [issue](https://github.com/MapoMagpie/comic-looms/issues)

## [How to Reopen the Guide?]

Click the **Help** button at the bottom of the configuration panel.
