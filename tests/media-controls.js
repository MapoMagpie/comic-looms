import { VideoControl } from '../src/ui/video-control.ts';
import { AnimationControl } from '../src/ui/animation-control.ts';
import { mediaActions } from '../src/ui/media-actions.ts';
import { ADAPTER } from '../src/platform/adapt.ts';
import { initEvents } from '../src/ui/event.ts';
import { ContextMenu } from '../src/ui/context-menu.ts';
import createKeyboardCustomPanel from '../src/ui/keyboard-custom.ts';
import { collectLists, listCursor, parseListRequest, pinnedRequestFromBundle, fetchHomeLists } from '../src/platform/matchers/twitter-lists.ts';

const fixture = document.querySelector('#fixture');
const results = document.querySelector('#results');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const tick = () => new Promise(resolve => setTimeout(resolve, 30));
let failed = 0, passed = 0;
async function test(name, run) {
  const row = document.createElement('li');
  try { await run(); row.className = 'pass'; row.textContent = `PASS ${name}`; passed++; }
  catch (error) { row.className = 'fail'; row.textContent = `FAIL ${name}: ${error.message}`; failed++; }
  results.append(row);
}

const root = document.createElement('div');
fixture.append(root);
const bigImageFrame = document.createElement('div');
root.append(bigImageFrame);
let kind = 'video';
const calls = [];
const bifm = { mediaAction: action => calls.push(action) };
const html = { root, bigImageFrame };
const events = initEvents(html, bifm, {}, {}, {}, {});

await test('all 8 media actions use configurable original shortcuts and translated labels', () => {
  createKeyboardCustomPanel(events.appEvents, root);
  assert(root.querySelectorAll('[data-cate="inBigImageMode"][data-id^="video-"]').length === 8, 'missing keyboard rows');
  root.querySelector('.ehvp-full-panel').remove();
  for (const [id, [key]] of Object.entries(mediaActions)) {
    events.bigImageFrameKeyBoardEvent(new KeyboardEvent('keydown', { key, cancelable: true }));
    assert(calls.at(-1) === id, `wrong action for ${key}`);
  }
  ADAPTER.conf.keyboards.inBigImageMode['video-play-pause'] = ['shift+k'];
  calls.length = 0;
  events.bigImageFrameKeyBoardEvent(new KeyboardEvent('keydown', { key: 'k' }));
  assert(calls.length === 0, 'default overrides custom binding');
  events.bigImageFrameKeyBoardEvent(new KeyboardEvent('keydown', { key: 'K', shiftKey: true }));
  assert(calls[0] === 'video-play-pause', 'custom binding does not work');
});

await test('context menu: video 8, animation 5, static/grid 0 media entries', () => {
  const menu = new ContextMenu(html, { mouseOn: () => undefined }, events.appEvents, () => kind);
  const count = () => {
    menu.open(new MouseEvent('contextmenu', { clientX: 50, clientY: 50 }));
    const n = root.querySelectorAll('.ehvp-context-menu-item').length;
    menu.close(); return n;
  };
  kind = undefined; const baseline = count();
  kind = 'video'; assert(count() === baseline + 8, 'video item count');
  kind = 'animation'; assert(count() === baseline + 5, 'animation item count');
  bigImageFrame.classList.add('big-img-frame-collapse');
  kind = undefined; const grid = count();
  kind = 'video'; assert(count() === grid, 'grid has media entries');
  bigImageFrame.classList.remove('big-img-frame-collapse');
});

await test('video seek bounds, approximate frame step, zero volume persistence and detach cleanup', async () => {
  // Mock only the media clock; real DOM, controls, events and settings paths are exercised.
  const video = document.createElement('video'); root.append(video);
  let time = 2, paused = true;
  Object.defineProperties(video, { currentTime: { get: () => time, set: value => { time = value; } }, duration: { get: () => 10 }, paused: { get: () => paused } });
  video.play = async () => { paused = false; video.dispatchEvent(new Event('play')); };
  video.pause = () => { paused = true; video.dispatchEvent(new Event('pause')); };
  ADAPTER.conf.volume = 0; ADAPTER.conf.muted = false;
  const control = new VideoControl(root); control.attach(video);
  assert(video.volume === 0, 'zero became default volume');
  control.action('video-seek-backward'); assert(time === 0, 'negative seek');
  control.action('video-seek-forward'); control.action('video-seek-forward'); control.action('video-seek-forward');
  assert(time === 10, 'seek past duration');
  control.action('video-frame-prev'); assert(paused && Math.abs(time - (10 - 1/30)) < 1e-8, 'frame seek');
  control.action('video-volume-up'); assert(video.volume === .05 && ADAPTER.conf.volume === 5, 'volume increment');
  control.action('video-volume-down'); assert(video.volume === 0 && ADAPTER.conf.volume === 0, 'zero persistence');
  control.action('video-mute'); assert(video.muted, 'mute');
  control.action('video-volume-up'); assert(!video.muted, 'volume should unmute');
  assert(control.ui.root.classList.contains('bifm-vid-ctl-reveal'), 'controls not revealed');
  control.detach(); assert(control.ui.root.hidden && !control.ui.root.classList.contains('bifm-vid-ctl-reveal'), 'detach leaves controls visible');
  control.ui.root.remove(); video.remove(); await tick();
});

for (const type of ['gif', 'webp']) await test(`real ${type} decode, pause, rapid frame steps, seek and disposal`, async () => {
  assert('ImageDecoder' in window, 'browser lacks ImageDecoder');
  const blob = await (await fetch(`./fixtures/animation.${type}`)).blob();
  const src = URL.createObjectURL(blob);
  const img = document.createElement('img'); img.src = src; root.append(img);
  const player = new AnimationControl(img, root);
  try {
    await player.init(); assert(player.ready, 'animation not ready');
    player.action('video-play-pause'); assert(player.paused, 'pause failed');
    player.action('video-frame-next'); player.action('video-frame-next'); await tick();
    assert(root.querySelector('.bifm-animation-control span').textContent === '3 / 4', 'rapid steps lost');
    const canvas = root.querySelector('canvas');
    const pixel = canvas.getContext('2d').getImageData(1,1,1,1).data;
    assert(pixel[2] > 200 && pixel[0] < 30, 'third frame should be blue');
    player.action('video-seek-backward'); await tick();
    assert(root.querySelector('.bifm-animation-control span').textContent === '2 / 4', 'backward frame seek');
    player.destroy(); await tick();
    assert(!root.querySelector('canvas') && !root.querySelector('.bifm-animation-control') && img.style.display !== 'none', 'disposal leaks UI');
  } finally { player.destroy(); img.remove(); URL.revokeObjectURL(src); }
});

await test('static WebP and cancellation leave original images visible', async () => {
  for (const name of ['static.webp','animation.gif']) {
    const src = URL.createObjectURL(await (await fetch(`./fixtures/${name}`)).blob());
    const img = document.createElement('img'); img.src = src; root.append(img);
    const player = new AnimationControl(img, root);
    const pending = player.init();
    if (name.startsWith('animation')) player.destroy();
    await pending;
    assert(!player.ready && img.style.display !== 'none' && !root.querySelector('canvas'), 'fallback hid original');
    player.destroy(); img.remove(); URL.revokeObjectURL(src);
  }
});

await test('List request parser rejects foreign origins and strips identity/cursor/token parameters', () => {
  const url = new URL('/i/api/graphql/query-id/ListsManagementPageTimeline', location.origin);
  url.searchParams.set('features', JSON.stringify({ feature: false }));
  url.searchParams.set('variables', JSON.stringify({ count: 20, cursor: 'private', userId: '123', token: 'secret', withVoice: true }));
  const request = parseListRequest(url.href, location.origin);
  assert(request?.queryId === 'query-id' && request.features.feature === false, 'descriptor missing');
  assert(JSON.stringify(request.variables) === JSON.stringify({count:20,withVoice:true}), 'unnecessary fields retained');
  assert(!parseListRequest(url.href,'https://other.example'), 'foreign origin accepted');
  url.searchParams.set('features', '{bad'); assert(!parseListRequest(url.href,location.origin), 'malformed JSON accepted');
});

await test('List extraction excludes recommendations/user objects and deduplicates account lists', () => {
  const list = (id,name) => ({__typename:'List',id_str:id,name});
  const response = { entries: [
    { entryId:'OwnedSubscribedList', items:[list('1','Owned'),list('1','Owned'),list('2','Subscribed'),{__typename:'User',id_str:'9',name:'Owner'}] },
    { entryId:'RecommendedList', items:[list('3','Recommended')] },
    { content: {cursorType:'Bottom',value:'next-page'} },
  ] };
  assert(collectLists(response,'ListsManagementPageTimeline').map(x=>x.id).join() === '1,2','wrong lists');
  assert(collectLists({pinned_timelines:[list('2','Pinned')]},'PinnedTimelines')[0].id === '2','pinned list missing');
  assert(listCursor(response) === 'next-page','cursor missing');
});

await test('PinnedTimelines bundle parsing uses live feature values and rejects unknown switches', () => {
  const bundle = 'queryId:"dynamic-id",operationName:"PinnedTimelines",operationType:"query",metadata:{featureSwitches:["a","b"]}';
  const request = pinnedRequestFromBundle(bundle,'{"a":{"value":true},"b":{"value":false}}');
  assert(request?.queryId === 'dynamic-id' && request.features.a && !request.features.b,'live feature values missing');
  assert(!pinnedRequestFromBundle(bundle,'{}'),'unknown features guessed');
});

await test('Home lists paginate, tolerate partial data errors, reject repeated cursors and invalidate stale endpoints', async () => {
  const originalFetch = window.fetch;
  document.cookie = 'twid=u%3D123; path=/';
  const cache = {account:'123', savedAt:Date.now(), request:{queryId:'test',operation:'ListsManagementPageTimeline',features:{},variables:{count:20}}};
  const key = 'comicLoomsAutoListGraphQLRequest';
  localStorage.setItem(key,JSON.stringify(cache));
  let pages = 0;
  window.fetch = async () => new Response(JSON.stringify({data:{OwnedSubscribedList:[{__typename:'List',id_str:String(++pages),name:'List'}],cursor:{cursorType:'Bottom',value:'repeat'}},errors:[{message:'DecodeException'}]}));
  try {
    assert((await fetchHomeLists(()=>new Headers())).length === 2 && pages === 2,'pagination/partial error failed');
    window.fetch = async () => new Response('{}',{status:404});
    await fetchHomeLists(()=>new Headers()); assert(!localStorage.getItem(key),'stale cache retained');
    localStorage.setItem(key,JSON.stringify(cache)); document.cookie = 'twid=u%3D456; path=/';
    let requested = false; window.fetch = async () => { requested = true; return new Response('{}'); };
    assert((await fetchHomeLists(()=>new Headers())).length === 0 && !requested,'previous account descriptor reused');
  } finally { window.fetch = originalFetch; document.cookie = 'twid=; Max-Age=0; path=/'; localStorage.removeItem(key); }
});

document.querySelector('#status').textContent = `${passed} passed, ${failed} failed`;
document.title = `${failed ? 'FAIL' : 'PASS'}: Comic Looms regressions`;
