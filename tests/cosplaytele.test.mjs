import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { parseHTML } from 'linkedom';

const source = await readFile(new URL('../src/platform/matchers/cosplaytele-parser.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { cosplayAlbums, cosplayCover, cosplayImages, cosplayPlayers, videosFirst } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const base = 'https://cosplaytele.com/sample/';
const doc = html => parseHTML(html).document;

test('video preview uses the article cover rather than the first gallery image', () => {
  const page = doc(`<div class="blog-featured-title"><div class="title-bg" style="background-image: url('/cover.webp')"></div></div>
    <meta property="og:image" content="https://cosplaytele.com/social.jpg">
    <div class="entry-content"><div class="gallery"><img src="/first.jpg"></div></div>`);
  assert.equal(cosplayCover(page, base), 'https://cosplaytele.com/cover.webp');
  assert.equal(cosplayCover(doc('<div class="gallery"><img src="/first.jpg"></div>'), base), undefined);
});

test('gallery originals, lazy images and duplicate filtering', () => {
  const page = doc(`<div class="entry-content"><div class="gallery">
    <a href="/full.webp"><img src="/thumb.webp"></a>
    <a href="/full.webp"><img src="/thumb.webp"></a>
    <img src="data:image/gif;base64,AA" data-src="/lazy.jpg">
    </div></div><aside><img src="/ad.jpg"></aside>`);
  assert.deepEqual(cosplayImages(page, base).map(media => media.url), [
    'https://cosplaytele.com/full.webp', 'https://cosplaytele.com/lazy.jpg',
  ]);
});

test('only recognized players in article content are included', () => {
  const page = doc(`<iframe src="https://cossora.stream/embed/outside"></iframe>
    <div class="entry-content"><iframe src="https://cossora.stream/embed/video-1"></iframe>
    <iframe src="https://cossora.stream/embed/video-1"></iframe>
    <iframe src="https://ads.example/embed/ad"></iframe></div>`);
  assert.deepEqual(cosplayPlayers(page, base), ['https://cossora.stream/embed/video-1']);
});

test('archive chapters remain on site and deduplicate links', () => {
  const page = doc(`<main><article><h2 class="post-title"><a href="/album/">Album</a></h2><img src="/cover.jpg"></article>
    <h2 class="post-title"><a href="/album/">Duplicate</a></h2>
    <h2 class="post-title"><a href="https://ads.example/">Ad</a></h2></main>`);
  assert.deepEqual(cosplayAlbums(page, base), [{ url: 'https://cosplaytele.com/album/', title: 'Album', cover: 'https://cosplaytele.com/cover.jpg' }]);
});

test('videos precede images while preserving order in each group', () => {
  const videos = [{ embed: 'video-1' }, { embed: 'video-2' }];
  const images = [{ url: 'image-1' }, { url: 'image-2' }];
  assert.deepEqual(videosFirst(videos, images), [...videos, ...images]);
  assert.deepEqual(videosFirst([], images), images);
  assert.equal(images.length, 2);
});

test('play overlay positioning does not override hidden video slots', async () => {
  const style = await readFile(new URL('../src/ui/style.ts', import.meta.url), 'utf8');
  const selector = style.match(/([^{}\n]+:has\(> \.bifm-embedded-video\))\s*\{\s*position: relative;/)?.[1].trim();
  assert.ok(selector);
  const page = doc('<div class="bifm-container"><div id="hidden" class="bifm-node-hide"><img class="bifm-embedded-video"></div><div id="visible"><img class="bifm-embedded-video"></div></div>');
  assert.equal(page.querySelector('#hidden').matches(selector), false);
  assert.equal(page.querySelector('#visible').matches(selector), true);
});
