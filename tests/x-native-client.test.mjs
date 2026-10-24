import test from 'node:test';
import assert from 'node:assert/strict';
import {findNativeClient,nativeClientMutation} from '../src/platform/matchers/twitter-native-client.ts';

test('uses X client middleware without requiring the tweet DOM or replaying a mutation',async()=>{
  let calls=0;
  const client={graphQL:async(definition,variables)=>{
    calls++;
    assert.equal(definition.operationName,'CreateBookmark');
    assert.equal(definition.operationType,'mutation');
    assert.deepEqual(variables,{tweet_id:'42'});
    return {tweet_bookmark_put:'Done'};
  }};
  const store={getState:()=>({}),dispatch:fn=>fn(null,null,{api:{withEndpoint:factory=>factory({apiClient:client})}})};
  const current={memoizedProps:{value:{store}}};current.alternate=current;
  const root={__reactContainer$test:{stateNode:{current}}};
  globalThis.unsafeWindow={document:{getElementById:id=>id==='react-root'?root:null}};
  assert.equal(findNativeClient(root),client);
  assert.deepEqual(JSON.parse(await nativeClientMutation('dynamic','CreateBookmark','42')),{data:{tweet_bookmark_put:'Done'}});
  client.graphQL=async()=>{calls++;throw new Error('unconfirmed');};
  await assert.rejects(nativeClientMutation('dynamic','CreateBookmark','42'),/unconfirmed/);
  assert.equal(calls,2);
});

test('missing native client fails before sending any mutation',async()=>{
  globalThis.unsafeWindow={document:{getElementById:()=>({})}};
  await assert.rejects(nativeClientMutation('dynamic','DeleteBookmark','42'),/no API request was sent/);
});

test('native client duplicate bookmark rejection confirms only its matching GraphQL path',async()=>{
  let path='tweet_bookmark_put';
  const client={graphQL:async()=>{throw {errors:[{code:139,path:[path]}]};}};
  const store={getState:()=>({}),dispatch:fn=>fn(null,null,{api:{withEndpoint:factory=>factory({apiClient:client})}})};
  globalThis.unsafeWindow={document:{getElementById:()=>({__reactContainer$test:{memoizedProps:{store}}})}};
  assert.deepEqual(JSON.parse(await nativeClientMutation('dynamic','CreateBookmark','42')),{data:{tweet_bookmark_put:'Done'}});
  path='favorite_tweet';
  await assert.rejects(nativeClientMutation('dynamic','CreateBookmark','42'));
});
