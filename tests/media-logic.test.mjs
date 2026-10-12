import test from 'node:test';
import assert from 'node:assert/strict';

const storage = new Map();
let gmRequest = async options => {
  const response = await fetch(options.url, { headers: options.headers });
  options.onload({status:response.status,responseText:await response.text()});
};
globalThis.GM = { xmlHttpRequest: options => { Promise.resolve().then(() => gmRequest(options)).catch(error => options.onerror(error)); } };
globalThis.GM_getValue = key => storage.get(key);
globalThis.GM_setValue = (key,value) => storage.set(key,value);
globalThis.window = { screen:{width:1920,height:1080,availHeight:1080}, btoa, location:{href:'https://x.com/home'} };
globalThis.document = {cookie:'twid=u%3D123',scripts:[]};
globalThis.location = {origin:'https://x.com',hostname:'x.com'};
globalThis.PerformanceObserver = undefined;

const { collectLists, listCursor, parseListRequest, pinnedRequestFromBundle, fetchHomeLists, streamHomeLists } = await import('../src/platform/matchers/twitter-lists.ts');
const { VideoControl } = await import('../src/ui/video-control.ts');
const { AnimationControl } = await import('../src/ui/animation-control.ts');
const { ADAPTER } = await import('../src/platform/adapt.ts');
const { mediaActions, supportsMediaAction } = await import('../src/ui/media-actions.ts');
const { actionQueryId, performTweetAction, checkActionResult } = await import('../src/platform/matchers/twitter-actions.ts');

test('tweet actions resolve current bundle IDs, send matching POST bodies and never retry failures', async () => {
  const previous = { gmRequest, scripts: document.scripts };
  const src = 'https://abs.twimg.com/responsive-web/client-web/main.actions.js';
  document.scripts = [{ src }];
  const calls = [];
  let status = 200;
  gmRequest = options => {
    calls.push(options);
    options.onload({ status: options.method === 'GET' ? 200 : status, responseText: options.method === 'GET'
      ? 'queryId:"new-bookmark",operationName:"CreateBookmark";queryId:"new-like",operationName:"FavoriteTweet"'
      : '{"data":{"tweet_bookmark_put":"Done"}}' });
  };
  try {
    assert.equal(actionQueryId('queryId:"wrong",operationName:"DeleteBookmark"', 'CreateBookmark'), undefined);
    await performTweetAction('CreateBookmark', '12345', () => new Headers());
    assert.equal(calls[1].url, 'https://x.com/i/api/graphql/new-bookmark/CreateBookmark');
    assert.deepEqual(JSON.parse(calls[1].data), { variables: { tweet_id: '12345' }, queryId: 'new-bookmark' });
    assert.equal(calls[1].method, 'POST');
    status = 404;
    await assert.rejects(performTweetAction('FavoriteTweet', '12345', () => new Headers()), /HTTP 404/);
    assert.equal(calls.length, 3, 'one shared bundle and exactly one request per action');
    assert.throws(() => checkActionResult('{"data":{},"errors":[{"message":"Denied"}]}'), /not confirmed/);
    assert.throws(() => checkActionResult('{}'), /not confirmed/);
    status = 200;
    await performTweetAction('CreateBookmark', '12345', () => new Headers());
    assert.equal(calls[3].method, 'GET', 'a later user retry refreshes the descriptor after failure');
  } finally { gmRequest = previous.gmRequest; document.scripts = previous.scripts; }
});

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

test('Pinned descriptor prefers current values and supports 4.16.0.1 compatibility defaults', () => {
  const bundle='queryId:"live-query",operationName:"PinnedTimelines",operationType:"query",metadata:{featureSwitches:["a","b"]}';
  assert.deepEqual(pinnedRequestFromBundle(bundle,'{"a":{"value":true},"b":{"value":false}}').features,{a:true,b:false});
  assert.deepEqual(pinnedRequestFromBundle(bundle,'{}').features,{a:false,b:false});
  const known=bundle.replace('["a","b"]','["rweb_cashtags_enabled","rweb_video_screen_enabled"]');
  assert.deepEqual(pinnedRequestFromBundle(known,'{}').features,{rweb_cashtags_enabled:true,rweb_video_screen_enabled:false});
  assert.equal(pinnedRequestFromBundle('unexpected source','{}'),undefined);
});

test('Management parser handles event markers and nested list objects without leaking recommendations', () => {
  const owned={clientEventInfo:{details:{timelinesDetails:{injectionType:'OwnedSubscribedList'}}},
    items:[{list:{id_str:'123',name:'Owned'}},{clientEventInfo:{component:'suggest_list_to_follow'},list:{id_str:'456',name:'Recommended'}}]};
  assert.deepEqual(collectLists({instructions:[owned]},'ListsManagementPageTimeline'),[{id:'123',name:'Owned'}]);
  assert.deepEqual(collectLists({moduleEntryId:'owned-subscribed-list-module-1',list:{rest_id:'789'}},'ListsManagementPageTimeline'),[{id:'789',name:'List 789'}]);
  assert.deepEqual(collectLists({list:{id_str:'123',name:'Pinned',mode:'Private'}},'PinnedTimelines'),[{id:'123',name:'Pinned'}]);
  assert.equal(listCursor([{cursorType:'Bottom',value:'extra'},{type:'TimelineTerminateTimeline',direction:'Bottom'}]),undefined);
});

test('Legacy cache and first management page display before slow bundle and later pages; bundles are reused', async () => {
  const entries=new Map([['comicLoomsAutoListGraphQLRequest',JSON.stringify({queryId:'legacy',features:{},savedAt:Date.now()})]]);
  const previous={gmRequest,scripts:document.scripts,performance:globalThis.performance,localStorage:globalThis.localStorage};
  globalThis.localStorage={getItem:key=>entries.get(key),setItem:(key,value)=>entries.set(key,value),removeItem:key=>entries.delete(key)};
  const main='https://abs.twimg.com/responsive-web/client-web/main.compat.js';
  globalThis.performance={getEntriesByType:()=>[{name:main}]};
  document.scripts=[];
  let releaseBundle, releasePage, bundles=0;
  const bundleGate=new Promise(resolve=>{releaseBundle=resolve;});
  const pageGate=new Promise(resolve=>{releasePage=resolve;});
  gmRequest=async options=>{
    if(options.url===main){bundles++;await bundleGate;options.onload({status:200,responseText:'queryId:"pin",operationName:"PinnedTimelines",metadata:{featureSwitches:["unknown"]}'});return;}
    const url=new URL(options.url), variables=JSON.parse(url.searchParams.get('variables'));
    if(variables.cursor) await pageGate;
    const lists=url.pathname.endsWith('PinnedTimelines') ? {list:{id_str:'10',name:'First',mode:'Private'}} :
      {entryId:'owned-subscribed-list-module',items:[{list:{id_str:variables.cursor?'11':'10',name:variables.cursor?'Second':'First'}}],
        ...(variables.cursor?{}:{cursor:{cursorType:'Bottom',value:'next'}})};
    options.onload({status:200,responseText:JSON.stringify({data:lists})});
  };
  const iterator=streamHomeLists(()=>new Headers());
  let timer;
  try {
    const first=await Promise.race([iterator.next(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('First page blocked by slow sources')),1000);})]);
    clearTimeout(timer);
    assert.deepEqual(first.value,[{id:'10',name:'First'}]);
    releasePage();
    assert.deepEqual((await iterator.next()).value,[{id:'11',name:'Second'}]);
    releaseBundle();
    assert.equal((await iterator.next()).done,true);
    assert.equal((await fetchHomeLists(()=>new Headers())).length,2);
    assert.equal(bundles,1);
  } finally {
    clearTimeout(timer);releasePage();releaseBundle();await iterator.return();
    gmRequest=previous.gmRequest;document.scripts=previous.scripts;globalThis.performance=previous.performance;globalThis.localStorage=previous.localStorage;
  }
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

test('slow discovery releases base chapters within budget and continues with the real cursor', async () => {
  const previous = gmRequest;
  const entries = new Map([['comicLoomsAutoListGraphQLRequest', JSON.stringify({ queryId: 'budget', features: {}, savedAt: Date.now() })]]);
  globalThis.localStorage = { getItem: key => entries.get(key), removeItem: key => entries.delete(key) };
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const cursors = [];
  gmRequest = async options => {
    const variables = JSON.parse(new URL(options.url).searchParams.get('variables'));
    cursors.push(variables.cursor);
    await gate;
    options.onload({ status: 200, responseText: JSON.stringify({ data: {
      OwnedSubscribedList: [{ __typename: 'List', id_str: variables.cursor ? '92' : '91', name: 'List' }],
      ...(variables.cursor ? {} : { cursor: { cursorType: 'Bottom', value: 'confirmed-next' } }),
    } }) });
  };
  const iterator = streamHomeLists(() => new Headers(), 20);
  let timer;
  try {
    const first = await Promise.race([iterator.next(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Budget did not release chapters')), 500); })]);
    clearTimeout(timer);
    assert.deepEqual(first.value, []);
    assert.deepEqual(cursors, [undefined], 'cannot guess a dependent page cursor');
    release();
    assert.equal((await iterator.next()).value[0].id, '91');
    assert.equal((await iterator.next()).value[0].id, '92');
    assert.equal((await iterator.next()).done, true);
    assert.deepEqual(cursors, [undefined, 'confirmed-next']);
    let calls = 0;
    gmRequest = async options => {
      calls++;
      options.onload({ status: 200, responseText: JSON.stringify({ data: {
        OwnedSubscribedList: [{ __typename: 'List', id_str: '93', name: 'Partial' }],
        cursor: { cursorType: 'Bottom', value: 'must-not-follow' },
      }, errors: [{ message: 'Not authorized' }] }) });
    };
    assert.deepEqual(await fetchHomeLists(() => new Headers()), []);
    assert.equal(calls, 1, 'permission errors must stop prefetch even with partial data');
  } finally { clearTimeout(timer); release(); await iterator.return(); gmRequest = previous; }
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
