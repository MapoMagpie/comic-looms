import test from 'node:test';
import assert from 'node:assert/strict';
let handler;
globalThis.GM = { xmlHttpRequest: options => { Promise.resolve().then(() => handler(options)).catch(options.onerror); } };
globalThis.document = { scripts: [], querySelectorAll: () => [], cookie: 'twid=u%3D123' };
globalThis.location = { hostname: 'x.com', origin: 'https://x.com' };
globalThis.performance = { getEntriesByType: () => [] };
const fakeClient = { graphQL: (definition,variables) => new Promise((resolve,reject)=>{
   Promise.resolve().then(()=>handler({url:'https://x.com/i/api/graphql/'+definition.queryId+'/'+definition.operationName,method:'POST',data:JSON.stringify({variables,queryId:definition.queryId}),
     onload:r=>r.status>=200&&r.status<300?resolve(JSON.parse(r.responseText).data):reject(Object.assign(new Error('HTTP '+r.status),{status:r.status})),
     onerror:reject,ontimeout:()=>reject(new Error('timed out')),onabort:()=>reject(new Error('aborted'))
   })).catch(reject);
 })};
const fakeStore = {getState:()=>({}),dispatch:fn=>fn(null,null,{api:{withEndpoint:factory=>factory({apiClient:fakeClient})}})};
globalThis.unsafeWindow = {document:{getElementById:()=>({__reactContainer$test:{memoizedProps:{store:fakeStore}}})}};

const { performNativeTweetAction, performTweetAction, checkActionResult, actionQueryId } = await import('../src/platform/matchers/twitter-actions.ts');

test('native add/remove controls support all four operations without double toggles', async () => {
  let liked = true, bookmarked = true, clicks = 0;
  const article = { querySelector(selector) {
    if (selector.includes(' time')) return { closest: () => ({ getAttribute: () => '/a/status/42' }) };
    const name = selector.match(/"(.*?)"/)?.[1];
    const present = [liked ? 'unlike' : 'like', bookmarked ? 'removeBookmark' : 'bookmark'];
    if (!present.includes(name)) return null;
    return { click() { clicks++; if (name === 'unlike' || name === 'like') liked = !liked; else bookmarked = !bookmarked; } };
  } };
  document.querySelectorAll = () => [article];
  try {
    await performNativeTweetAction('UnfavoriteTweet', '42');
    await performNativeTweetAction('DeleteBookmark', '42');
    assert.equal(liked, false); assert.equal(bookmarked, false);
    await performNativeTweetAction('FavoriteTweet', '42');
    await performNativeTweetAction('CreateBookmark', '42');
    await performNativeTweetAction('FavoriteTweet', '42');
    assert.equal(clicks, 4);
  } finally { document.querySelectorAll = () => []; }
});

test('already-liked is confirmed, but auth errors and ambiguous data remain failures', () => {
  checkActionResult('{"errors":[{"code":139,"path":["favorite_tweet"],"message":"You have already favorited this status."}]}', 'FavoriteTweet');
  assert.throws(() => checkActionResult('{"errors":[{"code":139}]}', 'UnfavoriteTweet'));
  assert.throws(() => checkActionResult('{"errors":[{"code":32}]}', 'FavoriteTweet'));
  assert.throws(() => checkActionResult('{"data":{}}', 'CreateBookmark'));
  for (const operation of ['UnfavoriteTweet','DeleteBookmark']) {
    assert.equal(actionQueryId(`queryId:"live",operationName:"${operation}"`,operation),'live');
  }
});

test('like endpoint 404 refreshes the current bundle and retries only a changed endpoint once', async () => {
  const old = 'https://abs.twimg.com/responsive-web/client-web/main.old.js';
  const fresh = 'https://abs.twimg.com/responsive-web/client-web/main.new.js';
  document.scripts = [{ src: old }];
  const posts = [];
  handler = options => {
    if (options.url === old) return options.onload({status:200,responseText:'queryId:"old",operationName:"FavoriteTweet"'});
    if (options.url === 'https://x.com/home') return options.onload({status:200,responseText:`<script src="${fresh}"></script>`});
    if (options.url === fresh) return options.onload({status:200,responseText:'queryId:"new",operationName:"FavoriteTweet"'});
    posts.push(options.url);
    options.onload({ status: options.url.includes('/old/') ? 404 : 200, responseText: '{"data":{"tweet_bookmark_put":"Done"}}' });
  };
  await performTweetAction('FavoriteTweet','42',()=>new Headers());
  assert.deepEqual(posts, ['https://x.com/i/api/graphql/old/FavoriteTweet','https://x.com/i/api/graphql/new/FavoriteTweet']);
  posts.length = 0;
  handler = options => { posts.push(options.url); options.ontimeout(); };
  await assert.rejects(performTweetAction('FavoriteTweet','42',()=>new Headers()),/timed out/);
  assert.equal(posts.length,1,'ambiguous timeout must not trigger a second mutation');
});


test('bookmark endpoints are discovered dynamically and refreshed after 404', async () => {
  const { observedActionEndpoint } = await import('../src/platform/matchers/twitter-actions.ts');
  for (const [operation,id] of [['CreateBookmark','dynamic-add'],['DeleteBookmark','dynamic-remove']]) {
    performance.getEntriesByType=()=>[
      {name:'https://evil.example/i/api/graphql/other/'+operation,responseStatus:200},
      {name:'https://x.com/i/api/graphql/stale/'+operation+'?private=omitted',responseStatus:200},
      {name:'https://x.com/i/api/graphql/failed/'+operation,responseStatus:404}
    ];
    assert.equal(observedActionEndpoint(operation).queryId,'stale');
    const posts=[];
    handler=options=>{
      const bundle='https://abs.twimg.com/responsive-web/client-web/main.'+operation+'.js';
      if(options.url==='https://x.com/home') return options.onload({status:200,responseText:'<script src="'+bundle+'"></script>'});
      if(options.url===bundle) return options.onload({status:200,responseText:'queryId:"'+id+'",operationName:"'+operation+'"'});
      posts.push(options);
      options.onload({status:options.url.includes('/stale/')?404:200,responseText:JSON.stringify({data:{[operation==='CreateBookmark'?'tweet_bookmark_put':'tweet_bookmark_delete']:'Done'}})});
    };
    await performTweetAction(operation,'42',()=>new Headers());
    assert.equal(posts.length,2);
    assert.equal(posts[0].url,'https://x.com/i/api/graphql/stale/'+operation);
    assert.equal(posts[1].url,'https://x.com/i/api/graphql/'+id+'/'+operation);
    assert.equal(JSON.parse(posts[1].data).variables.tweet_id,'42');
    handler=options=>options.onload({status:403,responseText:'{}'});
    await assert.rejects(performTweetAction(operation,'42',()=>new Headers()),/403/);
  }
  performance.getEntriesByType=()=>[];
});


test('bookmark confirmation requires the captured operation-specific Done response',()=>{
  for (const [operation,field,other] of [['CreateBookmark','tweet_bookmark_put','tweet_bookmark_delete'],['DeleteBookmark','tweet_bookmark_delete','tweet_bookmark_put']]) {
    checkActionResult(JSON.stringify({data:{[field]:'Done'}}),operation);
    for (const data of [{[field]:null},{[field]:'Failed'},{[other]:'Done'},{unrelated:'Done'}]) {
      assert.throws(()=>checkActionResult(JSON.stringify({data}),operation),/not confirmed/);
    }
    assert.throws(()=>checkActionResult(JSON.stringify({data:{[field]:'Done'},errors:[{code:32}]}),operation),/not confirmed/);
  }
  assert.throws(()=>checkActionResult('null','CreateBookmark'),/not confirmed/);
});


test('missing bookmark definition fails without a hardcoded mutation',async()=>{
  const {invalidateTwitterBundle}=await import('../src/platform/matchers/twitter-bundle.ts');
  invalidateTwitterBundle('https://abs.twimg.com/responsive-web/client-web/main.DeleteBookmark.js');
  const calls=[];
  handler=options=>{calls.push(options);options.onload({status:options.method==='POST'?404:200,responseText:options.url==='https://x.com/home'?'<script src="https://abs.twimg.com/responsive-web/client-web/main.empty.js"></script>':''});};
  await assert.rejects(performTweetAction('CreateBookmark','42',()=>new Headers()),/endpoint is unavailable/);
  assert.equal(calls.filter(call=>call.method==='POST').length,1);
  calls.length=0;
  await assert.rejects(performTweetAction('CreateBookmark','42',()=>new Headers()),/no CreateBookmark definition/);
  assert.equal(calls.filter(call=>call.method==='POST').length,0);
});


test('extracts bookmark IDs from the supplied main bundle excerpts', async()=>{
  const {readFileSync}=await import('node:fs');
  const snippets=JSON.parse(readFileSync(new URL('./fixtures/x-bookmark-definitions.json',import.meta.url),'utf8'));
  assert.equal(actionQueryId(snippets.join(';'),'CreateBookmark'),'aoDbu3RHznuiSkQ9aNM67Q');
  assert.equal(actionQueryId(snippets.join(';'),'DeleteBookmark'),'Wlmlj2-xzyS1GN3a6cj-mQ');
});
