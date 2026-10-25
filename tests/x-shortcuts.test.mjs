import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
const { window, document } = parseHTML('<html><body></body></html>');
globalThis.window = window; globalThis.document = document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.MouseEvent = class extends Event {
  constructor(type,options={}) { super(type,options);this.relatedTarget=options.relatedTarget; }
};
window.screen = { width: 1920, height: 1080, availHeight: 1080 };
globalThis.GM = {}; globalThis.GM_getValue = () => undefined; globalThis.GM_setValue = () => {};
globalThis.location = { hostname: 'x.com' };
globalThis.KeyboardEvent = class extends Event {
  constructor(key, target) { super('keydown', {cancelable:true}); this.key=key; this.shiftKey=true; this.targetNode=target; this.repeat=false; }
  composedPath() { return [this.targetNode]; }
};
const { initEvents } = await import('../src/ui/event.ts');
const { ADAPTER } = await import('../src/platform/adapt.ts');

test('opening the context-menu target in a new tab restores grid focus before navigation',()=>{
  const root=document.createElement('div'),grid=document.createElement('div');
  const bigImageFrame=document.createElement('div');root.append(grid,bigImageFrame);
  const node=document.createElement('div');node.innerHTML='<a href="https://x.com/example/status/42"></a>';
  let focused=false,opened=0;
  grid.focus=options=>{assert.equal(options.preventScroll,true);focused=true;};
  const oldClick=window.HTMLAnchorElement.prototype.click;
  window.HTMLAnchorElement.prototype.click=function(){assert.equal(focused,true);assert.equal(this.target,'_blank');opened++;};
  try {
    const events=initEvents({root,fullViewGrid:grid,bigImageFrame},{visible:false},{},[],{},{});
    events.appEvents.inFullViewGrid['open-in-new-tab'].cb(new MouseEvent('contextmenu',{relatedTarget:node}));
    assert.equal(opened,1);
  } finally {window.HTMLAnchorElement.prototype.click=oldClick;}
});

test('configured grid shortcuts run only on X, ignore editing/repeats and use the shared action', async () => {
  const root = document.createElement('div');
  const grid = document.createElement('div');
  const bigImageFrame = document.createElement('div');
  const host = document.createElement('div'); host.attachShadow({mode:'open'}).append(root);
  root.append(grid,bigImageFrame); document.body.append(host);
  let calls = 0; const mediaCalls = []; let kind = "video";
  const queue = [{ node: { actions: [{id:'x-toggle-like',run:async()=>{calls++;}}] } }]; queue.currIndex=0;
  const bifm = {visible:false,currentIndex:1,mediaKind:()=>kind,mediaAction:id=>mediaCalls.push(id)};
  const events = initEvents({root,fullViewGrid:grid,bigImageFrame}, bifm, {}, queue, {}, {});
  ADAPTER.conf.keyboards.inFullViewGrid['x-toggle-like']=['shift+y'];
  const press = (key,target=grid) => {const event=new KeyboardEvent(key,target);events.fullViewGridKeyBoardEvent(event);return event;};
  press('L'); assert.equal(calls,0);
  assert.equal(press('Y').defaultPrevented,true); assert.equal(calls,1);
  location.hostname='example.org'; assert.equal(press('Y').defaultPrevented,false); assert.equal(calls,1);
  const mediaKey = new KeyboardEvent('K',bigImageFrame); mediaKey.shiftKey=false;
  events.bigImageFrameKeyBoardEvent(mediaKey);
  assert.deepEqual(mediaCalls,['video-play-pause']); assert.equal(mediaKey.defaultPrevented,true);
  ADAPTER.conf.keyboards.inBigImageMode['video-play-pause']=['shift+p'];
  events.bigImageFrameKeyBoardEvent(new KeyboardEvent('P',bigImageFrame));
  assert.equal(mediaCalls.length,2);
  kind=undefined; events.bigImageFrameKeyBoardEvent(new KeyboardEvent('P',bigImageFrame)); assert.equal(mediaCalls.length,2);
  kind='video';
  for (const key of ['O','I']) {const e=new KeyboardEvent(key,bigImageFrame);e.shiftKey=false;events.bigImageFrameKeyBoardEvent(e);}
  assert.deepEqual(mediaCalls.slice(-2),['video-volume-up','video-volume-down']);
  location.hostname='x.com'; press('Y',document.createElement('input')); assert.equal(calls,1);
  const repeated=new KeyboardEvent('Y',grid); repeated.repeat=true;events.fullViewGridKeyBoardEvent(repeated); assert.equal(calls,1);
  let bigCalls=0;queue.push({node:{actions:[{id:'x-toggle-like',run:async()=>{bigCalls++;}}]}});
  bifm.visible=true;
  events.bigImageFrameKeyBoardEvent(new KeyboardEvent('Y',bigImageFrame));
  assert.equal(bigCalls,1);assert.equal(calls,1,'big mode must target its own current image');
  const {default:createPanel}=await import('../src/ui/keyboard-custom.ts');
  for (const hostname of ['x.com','example.org']) {
    location.hostname=hostname;const panelRoot=document.createElement('div');
    createPanel(events.appEvents,panelRoot);
    assert.equal(!!panelRoot.querySelector('[data-id="x-toggle-like"]'),hostname==='x.com');
    assert.ok(panelRoot.querySelector('[data-id="video-volume-up"]'));
  }
});
