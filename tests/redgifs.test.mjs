import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { parseHTML } from 'linkedom';

// Run the real TypeScript classes with a mocked userscript transport.
// A VM keeps each test's route, token cache and timers isolated.
function source(path) {
 const input = fs.readFileSync(new URL('../src/' + path, import.meta.url), 'utf8');
 return ts.transpileModule(input.replace(/^import .*;\n/gm, '').replace(/export default /g, '').replace(/export /g, ''), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None }
 }).outputText;
}
function harness(route,href='https://www.redgifs.com/users/Example_Author?order=best') {
 const requests=[], setups=[];
 const context={URL,URLSearchParams,Blob,Uint8Array,Date,Promise,Set,Map,Error,AbortController,setTimeout,clearTimeout,
  window:{location:{href}}, document:parseHTML("<html></html>").document, ADAPTER:{conf:{timeout:10,fetchOriginal:true},addSetup:s=>setups.push(s)},
  Debouncer:class{},
  GM_XHR:options=>{
   requests.push(options); let aborted=false;
   Promise.resolve().then(()=>route(options,requests)).then(r=>{
    if(aborted||r===null)return;
    if(r.event) return options[r.event]?.();
    options.onload({status:r.status??200,response:r.body});
   }).catch(e=>options.onerror?.(e));
   return {abort(){aborted=true;options.onabort?.();}};
  }
 };
 vm.createContext(context);
 for (const file of ['img-node.ts', 'platform/platform.ts', 'download/gallery-meta.ts', 'page-fetcher.ts']) {
  vm.runInContext(source(file),context);
 }
 vm.runInContext(source('platform/matchers/redgifs.ts'),context);
 vm.runInContext('globalThis.RedGifsMatcher = RedGifsMatcher; globalThis.ImageNode = ImageNode;',context);
 assert.equal(typeof context.RedGifsMatcher,'function','RedGIFs adapter must be implemented');
 return {context,requests,setups,matcher:new context.RedGifsMatcher()};
}
const gif=(id,extra={})=>({id,type:1,userName:'example_author',width:720,height:1280,
 urls:{poster:`https://thumbs4.redgifs.com/${id}.jpg`,thumbnail:`https://thumbs4.redgifs.com/${id}-small.jpg`,hd:`https://media.redgifs.com/${id}.mp4`,sd:`https://media.redgifs.com/${id}-mobile.mp4`},...extra});
const auth={body:{token:'test-token'}};
function respond(options,rest){return options.url.endsWith('/auth/temporary')?auth:rest(options);}

test('registers author profiles only, excluding collections/search/watch and lookalike hosts',()=>{
 const h=harness(()=>auth), r=h.setups[0].workURLs[0];
 for(const url of ['https://www.redgifs.com/users/a','https://redgifs.com/users/name_1/?order=best'])assert.ok(r.test(url));
 for(const url of ['https://www.redgifs.com/watch/a','https://www.redgifs.com/','https://www.redgifs.com/users/a/collections','https://redgifs.com.evil/users/a','https://www.redgifs.com/search'])assert.ok(!r.test(url),url);
});
test('paginates and deduplicates across image-only/duplicate pages without stopping early',async()=>{
 const h=harness(o=>respond(o,()=>{
  const u=new URL(o.url),p=Number(u.searchParams.get('page'));
  assert.equal(u.pathname,'/v2/users/example_author/search');
  assert.equal(u.searchParams.get('type'),'g');assert.equal(u.searchParams.get('order'),'best');
  return {body:{page:p,pages:4,total:5,gifs: p===1?[gif('Alpha')]:p===2?[gif('Alpha'),gif('Still',{type:2})]:p===3?[gif('Still',{type:2})]:[gif('Beta')]}};
 }));
 const items=[];
 for await(const page of h.matcher.fetchPagesSource()){
  assert.equal(page.error,undefined); items.push(...await h.matcher.parseImgNodes(page.value));
 }
 assert.deepEqual(items.map(n=>n.href),['https://www.redgifs.com/watch/alpha','https://www.redgifs.com/watch/beta']);
 assert.ok(items[0] instanceof h.context.ImageNode);
 assert.equal(items[0].mimeType,'video/mp4');assert.equal(items[0].thumbnailSrc,'https://thumbs4.redgifs.com/Alpha.jpg');
 assert.equal(items[0].title,'example_author_alpha.mp4');assert.equal(items[0].rect.w,720);
 assert.equal(h.requests.filter(o=>o.url.endsWith('/auth/temporary')).length,1);
});
test('page failure yields an error and manual retry resumes the same page',async()=>{
 let attempts=0;
 const h=harness(o=>respond(o,()=>++attempts===1?{status:500,body:{}}:{body:{pages:1,gifs:[gif('Alpha')]}}));
 const iter=h.matcher.fetchPagesSource();assert.match((await iter.next()).value.error.message,/500/);
 assert.equal((await iter.next()).value.value[0].id,'Alpha');assert.equal((await iter.next()).done,true);
 assert.equal(new URL(h.requests.at(-1).url).searchParams.get('page'),'1');
});
test('401 refreshes authorization once; persistent failure remains visible',async()=>{
 let tokens=0;
 const h=harness(o=>o.url.endsWith('/auth/temporary')?{body:{token:'t'+(++tokens)}}:
 o.headers.Authorization==='Bearer t1'?{status:401,body:{}}:{body:{pages:1,gifs:[gif('Alpha')]}});
 assert.ok((await h.matcher.fetchPagesSource().next()).value.value);assert.equal(tokens,2);
 const bad=harness(o=>respond(o,()=>({status:401,body:{}})));
 assert.match((await bad.matcher.fetchPagesSource().next()).value.error.message,/401/);assert.equal(bad.requests.length,4);
});
test('concurrent detail fetches share a single token request and choose SD when HD absent',async()=>{
 const h=harness(o=>respond(o,()=>({body:{gif:gif('Alpha',{urls:{sd:'https://media.redgifs.com/Alpha-mobile.mp4'}})}})));
 const nodes=await h.matcher.parseImgNodes([gif('Alpha'),gif('Beta')]);
 const urls=await Promise.all(nodes.map(n=>h.matcher.fetchOriginMeta(n,true)));
 assert.equal(h.requests.filter(o=>o.url.endsWith('/auth/temporary')).length,1);
 assert.equal(urls[0].url,'https://media.redgifs.com/Alpha-mobile.mp4');
});
test('expired media URL refreshes through existing retry flag',async()=>{
 const h=harness(o=>respond(o,()=>({body:{gif:gif('Alpha',{urls:{hd:'https://media.redgifs.com/fresh.mp4?sig=new'}})}})));
 const [n]=await h.matcher.parseImgNodes([gif('Alpha')]);
 assert.equal((await h.matcher.fetchOriginMeta(n,false)).url,'https://media.redgifs.com/Alpha.mp4');
 assert.equal((await h.matcher.fetchOriginMeta(n,true)).url,'https://media.redgifs.com/fresh.mp4?sig=new');
});
test('download rejects HTTP error blobs and never sends the API bearer token to media host',async()=>{
 const h=harness(o=>({status:403,body:new Blob(['denied'],{type:'text/html'})}));
 const [n]=await h.matcher.parseImgNodes([gif('Alpha')]);
 const imf={node:n,setDownloadState(){}};
 await assert.rejects(h.matcher.fetchImageData(imf),/403/);
 assert.equal(h.requests[0].headers.Authorization,undefined);assert.equal(imf.abortSignal,undefined);
});
test('binary MP4 is recognized but HTML and arbitrary bytes are not relabeled as video',async()=>{
 const h=harness(()=>auth);
 const data=Uint8Array.from([0,0,0,24,102,116,121,112,105,115,111,109]);
 assert.equal((await h.matcher.processData(data,'application/octet-stream'))[1],'video/mp4');
 await assert.rejects(h.matcher.processData(Uint8Array.from([60,104,116,109,108]),'text/html'),/video|MP4/i);
 await assert.rejects(h.matcher.processData(Uint8Array.from([1,2,3]),'application/octet-stream'),/video|MP4/i);
});
test('malformed JSON and rate limits are explicit and do not loop',async()=>{
 for(const reply of [{body:'<html>blocked</html>'},{status:429,body:{}}]){
  const h=harness(o=>respond(o,()=>reply));const result=await h.matcher.fetchPagesSource().next();
  assert.ok(result.value.error); assert.equal(h.requests.length,2);
 }
});
test('dispose aborts active downloads and rejects future work',async()=>{
 const h=harness(()=>null);const [n]=await h.matcher.parseImgNodes([gif('Alpha')]);
 const imf={node:n,setDownloadState(){}};
 const result=h.matcher.fetchImageData(imf);h.matcher.dispose();
 await assert.rejects(result,/cancel|abort/i);assert.equal(imf.abortSignal,undefined);
 await assert.rejects(h.matcher.fetchOriginMeta(n,true),/cancel|abort/i);
});
test('navigation cannot emit old-author results',async()=>{
 const h=harness(o=>respond(o,()=>{h.context.window.location.href='https://www.redgifs.com/users/other';return {body:{pages:1,gifs:[gif('Alpha')]}};}));
 const p=await h.matcher.fetchPagesSource().next();assert.ok(p.value.error);assert.equal(p.value.value,undefined);
});
test('empty profile completes normally',async()=>{
 const h=harness(o=>respond(o,()=>({body:{pages:0,total:0,gifs:[]}})));
 assert.equal((await h.matcher.fetchPagesSource().next()).done,true);
});

test('original IMGFetcher retries an expired URL and produces a playable video Blob',async()=>{
 const bytes=Uint8Array.from([0,0,0,24,102,116,121,112,105,115,111,109]);
 const h=harness(o=>respond(o,()=>{
  if(o.url.includes('/v2/gifs/'))return {body:{gif:gif('Alpha',{urls:{hd:'https://media.redgifs.com/fresh.mp4'}})}};
  if(o.url.includes('/Alpha.mp4'))return {status:403,body:new Blob(['expired'],{type:'text/html'})};
  return {body:new Blob([bytes],{type:'application/octet-stream'})};
 }));
 h.context.EBUS={emit(){}};h.context.transient={imgSrcCSP:false};h.context.evLog=()=>{};
 h.context.Debouncer.prototype.addEvent=()=>{};
 vm.runInContext(source('img-fetcher.ts') + '\nglobalThis.IMGFetcher = IMGFetcher;',h.context);
 const [node]=await h.matcher.parseImgNodes([gif('Alpha')]);
 const imf=new h.context.IMGFetcher(0,node,h.matcher,0,0);
 await imf.fetchImage();
 assert.equal(imf.stage,3);assert.equal(imf.tryTimes,1);
 assert.equal(imf.contentType,'video/mp4');assert.ok(node.blobSrc.startsWith('blob:'));
 assert.equal(node.originSrc,'https://media.redgifs.com/fresh.mp4');
 assert.equal((await fetch(node.blobSrc)).headers.get('content-type'),'video/mp4');
 URL.revokeObjectURL(node.blobSrc);
});
test('download timeout and explicit abort settle instead of hanging',async()=>{
 for(const event of ['ontimeout','onabort']) {
  const h=harness(()=>({event}));const [node]=await h.matcher.parseImgNodes([gif('Alpha')]);
  const imf={node,setDownloadState(){}};
  await assert.rejects(h.matcher.fetchImageData(imf),/timed out|cancelled/);
  assert.equal(imf.abortSignal,undefined);
 }
});
test('retrying a malformed list does not lose the page',async()=>{
 let n=0;
 const h=harness(o=>respond(o,()=>({body:++n===1?{gifs:null,pages:1}:{gifs:[gif('Alpha')],pages:1}})));
 const iterator=h.matcher.fetchPagesSource();
 assert.match((await iterator.next()).value.error.message,/format/);
 assert.equal((await iterator.next()).value.value.length,1);
});

test('healthy media transfers survive the 10-second idle limit while progress continues',async()=>{
 const h=harness(()=>null);let now=0,seq=0;const timers=new Map();
 h.context.setTimeout=(fn,ms)=>{timers.set(++seq,{fn,at:now+ms});return seq;};
 h.context.clearTimeout=id=>timers.delete(id);
 function advance(ms){now+=ms;for(const [id,t] of [...timers])if(t.at<=now){timers.delete(id);t.fn();}}
 const originalGM=h.context.GM_XHR;
 h.context.GM_XHR=o=>{
  const handle=originalGM(o);
  // Model the GM transport's absolute timeout contract.
  const id=h.context.setTimeout(()=>o.ontimeout(),o.timeout);
  const load=o.onload;o.onload=r=>{h.context.clearTimeout(id);load(r);};
  return handle;
 };
 const [node]=await h.matcher.parseImgNodes([gif('Alpha')]);
 const result=h.matcher.fetchImageData({node,setDownloadState(){}});const opts=h.requests[0];
 advance(6000);opts.onprogress({loaded:20,total:100,readyState:3});
 advance(6000);opts.onprogress({loaded:80,total:100,readyState:3});
 opts.onload({status:200,response:new Blob(['video'],{type:'video/mp4'})});
 assert.equal((await result)[0].type,'video/mp4');assert.equal(timers.size,0);
});
test('stalled media is aborted after the configured inactivity interval',async()=>{
 const h=harness(()=>null);const timers=new Map();let seq=0;
 h.context.setTimeout=(fn,ms)=>{timers.set(++seq,{fn,ms});return seq;};
 h.context.clearTimeout=id=>timers.delete(id);
 const [node]=await h.matcher.parseImgNodes([gif('Alpha')]);
 const result=h.matcher.fetchImageData({node,setDownloadState(){}});
 const rejection=assert.rejects(result,/timed out/);
 assert.equal(timers.size,1,'media download must have an inactivity watchdog');
 const timer=[...timers.values()][0];assert.equal(timer.ms,10000);timer.fn();
 await rejection;assert.equal(timers.size,0);
});
test('successful download signals readyState 4 to remove the progress bar',async()=>{
 const h=harness(()=>({body:new Blob(['video'],{type:'video/mp4'})}));
 const [node]=await h.matcher.parseImgNodes([gif('Alpha')]);const states=[];
 await h.matcher.fetchImageData({node,setDownloadState:s=>states.push(s)});
 assert.equal(states.at(-1)?.readyState,4);
});

test('PageFetcher marks a finished profile done without an extra fetch', async () => {
 const h = harness(o => respond(o, () => ({body:{pages:1,gifs:[gif('Alpha')]}})));
 const iterator = h.matcher.fetchPagesSource();
 assert.equal((await iterator.next()).value.value.length, 1);
 const chapter = { sourceIter:iterator, done:false };
 const updates = [];
 const fetcher = vm.runInContext('Object.create(PageFetcher.prototype)', h.context);
 Object.assign(fetcher, {
  chapters:[chapter], chapterIndex:0, queue:[],
  appendImages:async () => false,
  appendToView:(...args) => updates.push(args),
 });
 assert.equal(await fetcher.appendNextPage(), false);
 assert.equal(chapter.done, true);
 assert.equal(updates.length, 1);
 assert.equal(updates[0][3], true);
});
