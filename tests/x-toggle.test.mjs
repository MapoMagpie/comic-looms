import test from 'node:test';
import assert from 'node:assert/strict';
import { NodeAction } from '../src/utils/node-action.ts';

function button() {
  const classes = new Set(), attributes = new Map();
  return { isConnected: true, classes, attributes,
    classList: { toggle: (key, on) => on ? classes.add(key) : classes.delete(key), remove: key => classes.delete(key) },
    setAttribute: (key, value) => attributes.set(key, value) };
}

test('toggle updates every thumbnail both ways, ignores duplicate clicks, and preserves state on failure', async () => {
  let result = true, count = 0, release;
  const action = new NodeAction('♥', 'Toggle like', async () => { count++; await new Promise(resolve => { release = resolve; }); return result; }, true);
  action.id = 'x-toggle-like';
  const a = button(), b = button(); action.bind(a); action.bind(b);
  const first = action.run({}); await action.run({});
  assert.equal(count, 1); assert.equal(a.disabled, true);
  release(); await first;
  assert.equal(a.attributes.get('aria-pressed'), 'true'); assert.equal(b.classes.has('img-node-action-btn-done'), true);
  result = false; const second = action.run({}); release(); await second;
  assert.equal(action.done, false); assert.equal(b.classes.has('img-node-action-btn-done'), false);
  action.func = async () => { throw new Error('HTTP 403'); };
  await assert.rejects(action.run({}), /403/);
  assert.equal(action.done, false); assert.equal(a.disabled, false);
});

test('cross-tab state updates colors, ignores other accounts and does not replay stale native DOM', async () => {
  let notify, channel;
  globalThis.window = {};
  globalThis.BroadcastChannel = class { constructor() { channel = this; } postMessage(value) { this.sent = value; } };
  globalThis.MutationObserver = class { constructor(fn) { notify = fn; } observe() {} };
  const controls = new Set(['like', 'bookmark']);
  const article = { querySelector(selector) {
    if (selector.includes(' time')) return { closest: () => ({ getAttribute: () => '/a/status/42' }) };
    return controls.has(selector.match(/"(.*?)"/)[1]) ? {} : null;
  } };
  globalThis.document = { cookie: 'twid=u%3D123', body: {}, querySelectorAll: () => [article] };
  const { trackTweetActions, newestTweetState, publishTweetState } = await import('../src/platform/matchers/twitter-action-state.ts');
  const like = new NodeAction('♥', '', async () => {}, true), bookmark = new NodeAction('B', '', async () => {}, true);
  const view = button(); like.bind(view);
  trackTweetActions('42', { like, bookmark });
  channel.onmessage({ data: { account: '123', id: '42', versions: { liked: Date.now(), bookmarked: Date.now() }, state: { liked: true, bookmarked: true } } });
  assert.equal(like.done, true); assert.equal(bookmark.done, true); assert.equal(view.classes.has('img-node-action-btn-done'), true);
  notify(); await new Promise(resolve => setTimeout(resolve, 65));
  assert.equal(like.done, true, 'unchanged stale native view must not clear a newer remote state');
  channel.onmessage({ data: { account: '999', id: '42', versions: { liked: Date.now()+1 }, state: { liked: false } } });
  assert.equal(like.done, true);
  controls.delete('like'); controls.add('unlike'); notify(); await new Promise(resolve => setTimeout(resolve, 65));
  controls.delete('unlike'); controls.add('like'); notify(); await new Promise(resolve => setTimeout(resolve, 65));
  assert.equal(like.done, false); assert.equal(channel.sent.account, '123'); assert.equal(channel.sent.state.liked, false);
  const secondLike = {done:false}, secondBookmark = {done:false};
  trackTweetActions('42', {like:secondLike,bookmark:secondBookmark});
  publishTweetState('42',{liked:true});
  assert.equal(like.done,true); assert.equal(secondLike.done,true);
  channel.onmessage({data:{account:'123',id:'42',versions:{liked:Date.now()-1000},state:{liked:false}}});
  assert.equal(like.done,true,'late messages must not overwrite a newer action');
  globalThis.localStorage = {getItem:()=>JSON.stringify({account:'123',id:'99',versions:{liked:Date.now()},state:{liked:true}})};
  assert.equal(newestTweetState('99').liked,true,'recover a missed broadcast from storage');
  document.cookie = 'twid=u%3D456';
  assert.deepEqual(newestTweetState('42'), {});
});
