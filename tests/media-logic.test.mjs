import test from 'node:test';
import assert from 'node:assert/strict';

const storage = new Map();
globalThis.GM = { xmlHttpRequest: () => { throw new Error('Unexpected network request'); } };
globalThis.GM_getValue = key => storage.get(key);
globalThis.GM_setValue = (key,value) => storage.set(key,value);
globalThis.window = { screen:{width:1920,height:1080,availHeight:1080}, btoa, location:{href:'https://x.com/home'} };
globalThis.document = {cookie:'twid=u%3D123',scripts:[]};
globalThis.location = {origin:'https://x.com',hostname:'x.com'};
globalThis.PerformanceObserver = undefined;

const { collectLists, listCursor, parseListRequest, pinnedRequestFromBundle, fetchHomeLists } = await import('../src/platform/matchers/twitter-lists.ts');
const { VideoControl } = await import('../src/ui/video-control.ts');
const { AnimationControl } = await import('../src/ui/animation-control.ts');
const { ADAPTER } = await import('../src/platform/adapt.ts');
const { mediaActions, supportsMediaAction } = await import('../src/ui/media-actions.ts');

test('List discovery accepts same-origin descriptors only and strips sensitive/stale variables', () => {
  const url = new URL('/i/api/graphql/live-query/ListsManagementPageTimeline',location.origin);
  url.searchParams.set('features','{"feature":false}');
  url.searchParams.set('variables','{"count":20,"cursor":"private","userId":"123","token":"secret","withVoice":true}');
  const request = parseListRequest(url.href,location.origin);
  assert.equal(request.queryId,'live-query'); assert.equal(request.features.feature,false);
  assert.deepEqual(request.variables,{count:20,withVoice:true});
  assert.equal(parseListRequest(url.href,'https://other.example'),undefined);
  url.searchParams.set('features','bad'); assert.equal(parseListRequest(url.href,location.origin),undefined);
});

test('Owned/subscribed section filtering, de-duplication, user exclusion and bottom cursor', () => {
  const list = id => ({__typename:'List',id_str:id,name:'List'});
  const data = { entries:[{entryId:'OwnedSubscribedList',items:[list('1'),list('1'),list('2'),{__typename:'User',id_str:'9',name:'User'}]},
    {entryId:'RecommendedList',items:[list('3')]},{content:{cursorType:'Bottom',value:'page2'}}] };
  assert.deepEqual(collectLists(data,'ListsManagementPageTimeline').map(x=>x.id),['1','2']);
  assert.equal(listCursor(data),'page2');
  assert.deepEqual(collectLists({pinned:[list('2')]},'PinnedTimelines').map(x=>x.id),['2']);
});

test('Pinned descriptor takes current feature values and refuses unknown feature defaults', () => {
  const bundle='queryId:"live-query",operationName:"PinnedTimelines",operationType:"query",metadata:{featureSwitches:["a","b"]}';
  assert.deepEqual(pinnedRequestFromBundle(bundle,'{"a":{"value":true},"b":{"value":false}}').features,{a:true,b:false});
  assert.equal(pinnedRequestFromBundle(bundle,'{}'),undefined);
  assert.equal(pinnedRequestFromBundle('unexpected source','{}'),undefined);
});

test('List pagination tolerates partial errors, stops repeated cursors, invalidates stale cache and isolates accounts', async () => {
  const entries = new Map();
  globalThis.localStorage = {getItem:key=>entries.get(key),setItem:(key,value)=>entries.set(key,value),removeItem:key=>entries.delete(key)};
  const key = 'comicLoomsAutoListGraphQLRequest';
  const cached = JSON.stringify({account:'123',savedAt:Date.now(),request:{queryId:'test',operation:'ListsManagementPageTimeline',features:{},variables:{count:20}}});
  entries.set(key,cached);
  const originalFetch = globalThis.fetch;
  let pages=0;
  globalThis.fetch=async()=>new Response(JSON.stringify({data:{OwnedSubscribedList:[{__typename:'List',id_str:String(++pages),name:'List'}],cursor:{cursorType:'Bottom',value:'repeat'}},errors:[{message:'DecodeException'}]}));
  try {
    assert.equal((await fetchHomeLists(()=>new Headers())).length,2); assert.equal(pages,2);
    globalThis.fetch=async()=>new Response('{}',{status:404});
    assert.deepEqual(await fetchHomeLists(()=>new Headers()),[]); assert.equal(entries.has(key),false);
    entries.set(key,cached); document.cookie='twid=u%3D456';
    globalThis.fetch=async()=>{throw new Error('Must not reuse the other account request');};
    assert.deepEqual(await fetchHomeLists(()=>new Headers()),[]);
    entries.set(key,JSON.stringify({...JSON.parse(cached),account:'456',savedAt:0}));
    assert.deepEqual(await fetchHomeLists(()=>new Headers()),[]);
  } finally { globalThis.fetch=originalFetch; document.cookie='twid=u%3D123'; }
});

class Element extends EventTarget {
  style = {}; textContent = ''; innerHTML = ''; hidden = false; isConnected = true;
  attributes = new Map(); children = []; className = ''; id = '';
  classes = new Set();
  classList = {add:name=>this.classes.add(name),remove:name=>this.classes.delete(name),contains:name=>this.classes.has(name)};
  setAttribute(key,value){this.attributes.set(key,value);}
  append(...children){this.children.push(...children);}
  remove(){this.isConnected=false;}
  after(element){this.sibling=element;}
  getContext(){return {drawImage(){}};}
}

test('video controls clamp seeks/volume, pause approximate steps, preserve 0 and remove timers', async () => {
  VideoControl.prototype.create = function () {
    const parts={};
    for(const name of ['root','playBTN','volumeBTN','volumeProgress','progress','duration','time']) {
      parts[name]=new Element(); parts[name].firstElementChild=new Element();
    }
    return parts;
  };
  const vid=new Element(); vid.id='test-video'; vid.currentTime=2;vid.duration=10;vid.paused=true;vid.volume=0;vid.muted=false;
  vid.play=async()=>{vid.paused=false;vid.dispatchEvent(new Event('play'));};
  vid.pause=()=>{vid.paused=true;vid.dispatchEvent(new Event('pause'));};
  const root={querySelector:selector=>selector==='#test-video'?vid:null};
  const controller=new VideoControl(root);
  ADAPTER.conf.volume=0; controller.attach(vid);
  assert.equal(vid.volume,0);
  controller.action('video-seek-backward');assert.equal(vid.currentTime,0);
  for(let i=0;i<3;i++)controller.action('video-seek-forward');assert.equal(vid.currentTime,10);
  controller.action('video-frame-prev');assert.equal(vid.paused,true);assert.equal(vid.currentTime,10-1/30);
  controller.action('video-volume-up');assert.equal(vid.volume,.05);
  controller.action('video-volume-down');assert.equal(ADAPTER.conf.volume,0);
  assert.equal(JSON.parse(storage.get('ehvh_cfg_')).volume,0);
  controller.action('video-mute');assert.equal(vid.muted,true);
  controller.action('video-volume-up');assert.equal(vid.muted,false);
  vid.duration=NaN;controller.action('video-seek-forward');assert.equal(vid.currentTime,10-1/30);
  assert.equal(controller.ui.root.classList.contains('bifm-vid-ctl-reveal'),true);
  controller.detach();assert.equal(controller.ui.root.hidden,true);assert.equal(controller.ui.root.classList.contains('bifm-vid-ctl-reveal'),false);
});

test('menu capability rules expose 8 video actions, 5 animation actions and no static actions', () => {
  const count=kind=>Object.keys(mediaActions).filter(id=>supportsMediaAction(kind,id)).length;
  assert.equal(count('video'),8);assert.equal(count('animation'),5);assert.equal(count(undefined),0);
  assert.equal(new Set(Object.values(mediaActions).map(([key])=>key)).size,8);
});

test('animation lifecycle serializes rapid seeks and closes decoded frames on cancellation', async () => {
  document.createElement=()=>new Element();
  let closed=0,decoderClosed=0,active=0,maxActive=0;
  globalThis.ImageDecoder=class {
    tracks={ready:Promise.resolve(),selectedTrack:{animated:true,frameCount:4}};
    completed=Promise.resolve();
    static async isTypeSupported(){return true;}
    async decode({frameIndex}){
      active++; maxActive=Math.max(maxActive,active);
      await new Promise(resolve=>setTimeout(resolve,3)); active--;
      return {image:{displayWidth:1,displayHeight:1,duration:100000,frameIndex,close(){closed++;}}};
    }
    close(){decoderClosed++;}
  };
  const originalFetch=globalThis.fetch;
  globalThis.fetch=async()=>new Response(new Blob(['GIF89a mock encoded data']));
  const img=new Element();img.src='blob:test';img.style={display:'inline'};
  const root=new Element();const control=new AnimationControl(img,root);
  try {
    await control.init();assert.equal(control.ready,true);
    control.action('video-play-pause');assert.equal(control.paused,true);
    control.action('video-frame-next');control.action('video-frame-next');
    await control.queue;assert.equal(control.index,2);assert.equal(maxActive,1);
    control.action('video-frame-next'); await new Promise(resolve=>setTimeout(resolve,1));
    control.destroy();await control.queue;
    assert.equal(control.ready,false);assert.equal(img.style.display,'inline');assert.equal(decoderClosed,1);
    assert.ok(closed>=3,'all produced frame objects must close');
    const cancelled=new AnimationControl(img,root);const promise=cancelled.init();cancelled.destroy();await promise;
    assert.equal(cancelled.ready,false);assert.equal(img.style.display,'inline');
  } finally {control.destroy();globalThis.fetch=originalFetch;delete globalThis.ImageDecoder;}
});
