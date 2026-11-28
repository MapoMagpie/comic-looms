import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import { parseHTML } from 'linkedom';

async function load(path, globals, expose) {
  const source = await readFile(new URL('../' + path, import.meta.url), 'utf8');
  // Execute the real implementation with dependency boundaries stubbed, without
  // loading the application singleton or making any network requests.
  const code = ts.transpileModule(source.replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, ''), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }
  }).outputText;
  return vm.runInNewContext(code + `\n;({${expose}})`, { URL, Blob, TextDecoder, DOMException, AbortController, console, ...globals });
}
const embed = 'https://cossora.stream/embed/example';
async function harness() {
  const { document, window } = parseHTML('<html><body><div id="reader-host"></div></body></html>');
  const host = document.querySelector('#reader-host');
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = '<div class="big-img-frame" tabindex="0"><img tabindex="0"></div>';
  const reader = shadow.querySelector('div');
  let restored;
  document.activeElement = host;
  Object.defineProperty(shadow, 'activeElement', { value: shadow.querySelector('img') });
  reader.focus = options => { restored = options; };
  const create = document.createElement.bind(document);
  document.createElement = name => {
    const el = create(name);
    if (name === 'dialog') {
      el.open = false;
      el.showModal = () => { el.open = true; };
      // Simulate the browser's queued close event, not a synchronous callback.
      el.close = () => { el.open = false; };
    }
    return el;
  };
  const { openPlayer } = await load('src/platform/matchers/cosplaytele.ts', {
    document, window: new EventTarget(), location: new URL('https://cosplaytele.com/sample/'),
    BaseMatcher: class {}, HTMLElement: window.HTMLElement, ADAPTER: { addSetup() {} }
  }, 'openPlayer');
  return { openPlayer, document, window, restored: () => restored };
}
test('close is synchronous, restores reader focus, and stale close cannot clear new dialog', async () => {
  const h = await harness();
  for (let i=0; i<3; i++) {
    h.openPlayer(embed, 'https://cosplaytele.com/sample/');
    const dialog = h.document.querySelector('dialog');
    assert.ok(dialog?.open);
    dialog.querySelector('button').onclick();
    assert.equal(h.document.querySelector('dialog'), null);
    assert.equal(h.restored().preventScroll, true);
    h.openPlayer(embed, 'https://cosplaytele.com/sample/');
    const next = h.document.querySelector('dialog');
    dialog.dispatchEvent(new h.window.Event('close'));
    h.openPlayer(embed, 'https://cosplaytele.com/sample/');
    assert.equal(h.document.querySelectorAll('dialog').length, 1);
    next.querySelector('button').onclick();
  }
});
test('after closing the embed, repeated page turns recycle hidden media slots', async () => {
  const { document, openPlayer, restored } = await harness();
  const {BigImageFrameManager} = await load('src/ui/big-image-frame-manager.ts', {
    document, ADAPTER: {conf:{paginationIMGCount:1,reversePages:false}}
  }, 'BigImageFrameManager');
  const manager = Object.create(BigImageFrameManager.prototype);
  manager.container = document.createElement('div');
  const queue = Array.from({length:8},(_,index)=>({index}));
  manager.getChapter = () => ({filteredQueue:queue});
  manager.newMediaNode = () => document.createElement('img');
  manager.setNow = ({ index }) => {
    manager.currentIndex = index;
    manager.setElements();
  };
  manager.preventStep = {};
  manager.setNow(queue[0]);
  openPlayer(embed, 'https://cosplaytele.com/sample/');
  document.querySelector('dialog button').onclick();
  assert.equal(restored().preventScroll, true);

  for (const current of [1, 2, 3, 4, 3, 2, 1, 0, 1, 2]) {
    manager.stepNext(current > manager.currentIndex ? 'next' : 'prev');
    const visible = manager.container.querySelectorAll('div:not(.bifm-node-hide)');
    assert.equal(visible.length, 1);
    assert.equal(visible[0].getAttribute('d-index'), String(current));
    assert.equal(visible[0].inert, false);
    for (const hidden of manager.container.querySelectorAll('.bifm-node-hide')) assert.equal(hidden.inert,true);
  }
});
