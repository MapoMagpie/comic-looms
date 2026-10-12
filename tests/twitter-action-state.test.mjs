import test from 'node:test';
import assert from 'node:assert/strict';
import { readTweetState, applyTweetState, trackTweetActions } from '../src/platform/matchers/twitter-action-state.ts';

test('tweet state targets the original retweeted media and preserves unknown fields', () => {
  const item = { result: { legacy: { id_str: '1', favorited: false,
    retweeted_status_result: { result: { tweet: { legacy: { id_str: '2', favorited: true, bookmarked: true } } } } } } };
  assert.deepEqual(readTweetState(item, '2'), { liked: true, bookmarked: true });
  assert.deepEqual(readTweetState(item, '1'), { liked: false, bookmarked: undefined });
  const actions = { like: { done: false }, bookmark: { done: true } };
  applyTweetState(actions, readTweetState(item, '1'));
  assert.equal(actions.bookmark.done, true);
  assert.deepEqual(readTweetState(item, '3'), {});
});

test('native like/bookmark changes and reversals update tracked actions without replaying stale DOM', async () => {
  let notify;
  globalThis.MutationObserver = class { constructor(callback) { notify = callback; } observe() {} };
  let id = '42';
  const controls = new Set(['like', 'bookmark']);
  const article = { querySelector(selector) {
    if (selector.includes(' time')) return { closest: () => ({ getAttribute: () => `/user/status/${id}` }) };
    return controls.has(selector.match(/"(.*?)"/)[1]) ? {} : null;
  } };
  globalThis.document = { body: {}, querySelectorAll: () => [article] };
  const actions = { like: { done: true }, bookmark: { done: true } };
  trackTweetActions(id, actions);
  assert.equal(actions.like.done, false);
  assert.equal(actions.bookmark.done, false);
  const flush = async () => { notify(); await new Promise(resolve => setTimeout(resolve, 65)); };
  controls.delete('like'); controls.add('unlike');
  controls.delete('bookmark'); controls.add('removeBookmark');
  await flush();
  assert.equal(actions.like.done, true); assert.equal(actions.bookmark.done, true);
  controls.delete('unlike'); controls.add('like');
  controls.delete('removeBookmark'); controls.add('bookmark');
  await flush();
  assert.equal(actions.like.done, false); assert.equal(actions.bookmark.done, false);
  actions.like.done = true; // A successful thumbnail action, before React refreshes.
  await flush(); assert.equal(actions.like.done, true);
  controls.delete('bookmark'); await flush(); assert.equal(actions.bookmark.done, false);
  id = '43';
  const next = { like: { done: true }, bookmark: { done: true } };
  trackTweetActions(id, next);
  assert.equal(next.like.done, false); assert.equal(next.bookmark.done, true);
});
