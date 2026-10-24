import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';
import { confirmedActionState } from '../src/platform/matchers/twitter-action-response.ts';

const duplicate = field => ({data:{},errors:[{code:139,path:[field],message:'already favorited'}]});
test('duplicate confirmation is scoped to the operation path, never the shared error wording',()=>{
  assert.deepEqual(confirmedActionState('CreateBookmark',duplicate('tweet_bookmark_put')),{bookmarked:true});
  assert.deepEqual(confirmedActionState('FavoriteTweet',duplicate('favorite_tweet')),{liked:true});
  for (const operation of ['DeleteBookmark','UnfavoriteTweet','CreateBookmark']) {
    assert.equal(confirmedActionState(operation,duplicate('favorite_tweet')),undefined);
  }
  assert.equal(confirmedActionState('CreateBookmark',{errors:[{code:139}]}),undefined);
  assert.equal(confirmedActionState('CreateBookmark',{errors:[...duplicate('tweet_bookmark_put').errors,{code:32}]}),undefined);
});

const compile = name => ts.transpileModule(fs.readFileSync(new URL('../src/platform/matchers/'+name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
test('three unrefreshed tabs ignore native optimistic rollback and share only confirmed like/bookmark results',async()=>{
  const disk=new Map(),channels=[];
  function tab() {
    const listeners={};let liked=false,bookmarked=false;
    const article={querySelector(selector){
      if(selector.includes(' time'))return {closest:()=>({getAttribute:()=>'/user/status/42'})};
      const name=selector.match(/"(.*?)"/)?.[1];
      return [liked?'unlike':'like',bookmarked?'removeBookmark':'bookmark'].includes(name)?{}:null;
    }};
    class XHR {
      status=200;responseType='json';listeners=[];
      open(){} send(){} addEventListener(name,fn){if(name==='load')this.listeners.push(fn);}
      complete(data){this.response=data;for(const fn of this.listeners.splice(0))fn();}
    }
    const page={XMLHttpRequest:XHR,fetch:async()=>({ok:true,clone:()=>({json:async()=>page.nextResponse})})};
    const sandbox={exports:{},Date,WeakRef,URL,setTimeout,unsafeWindow:page,location:{origin:'https://x.com'},
      document:{cookie:'twid=u%3D123',body:{},querySelectorAll:()=>[article]},
      window:{addEventListener:(name,fn)=>listeners[name]=fn},MutationObserver:class{observe(){}},
      localStorage:{getItem:key=>disk.get(key)??null,setItem:(key,value)=>disk.set(key,value),removeItem:key=>disk.delete(key)},
      BroadcastChannel:class{constructor(){channels.push(this);}postMessage(data){for(const other of channels)if(other!==this)other.onmessage?.({data:structuredClone(data)});}}
    };
    const context=vm.createContext(sandbox);
    vm.runInContext(compile('twitter-action-response'),context);const responseAPI=sandbox.exports;
    sandbox.exports={};sandbox.require=()=>responseAPI;
    vm.runInContext(compile('twitter-action-state'),context);const api=sandbox.exports;
    api.startTweetStateSync();
    return {api,page,render(like,bookmark){liked=like;bookmarked=bookmark;listeners.focus();},
      request(operation){const xhr=new page.XMLHttpRequest();xhr.open('POST','https://x.com/i/api/graphql/test/'+operation);xhr.send(JSON.stringify({variables:{tweet_id:'42'}}));return xhr;}};
  }
  const a=tab(),b=tab(),c=tab();
  const icons={like:{done:false},bookmark:{done:false}};a.api.trackTweetActions('42',icons);
  b.render(false,true);assert.equal(icons.bookmark.done,false,'optimistic DOM is not confirmation');
  b.request('CreateBookmark').complete({data:{tweet_bookmark_put:'Done'}});
  assert.equal(icons.bookmark.done,true);
  c.render(false,true);c.request('CreateBookmark').complete(duplicate('tweet_bookmark_put'));
  c.render(false,false);assert.equal(icons.bookmark.done,true,'duplicate rollback must not clear bookmark');
  assert.equal(icons.like.done,false,'bookmark 139 must not change like');
  c.page.nextResponse=duplicate('favorite_tweet');
  await c.page.fetch('https://x.com/i/api/graphql/test/FavoriteTweet',{body:JSON.stringify({variables:{tweet_id:'42'}})});
  await new Promise(resolve=>setImmediate(resolve));
  c.render(true,false);c.render(false,false);assert.equal(icons.like.done,true);
  b.request('DeleteBookmark').complete({data:{tweet_bookmark_delete:'Done'}});
  assert.equal(icons.bookmark.done,false);assert.equal(icons.like.done,true);
  c.request('CreateBookmark').complete({data:{},errors:[{code:32}]});
  assert.equal(icons.bookmark.done,false,'auth errors are not confirmation');
  c.render(false,true);c.render(false,false);assert.equal(icons.bookmark.done,false);
});
