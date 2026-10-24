import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';
import { observeNativeActions } from '../src/platform/matchers/twitter-action-response.ts';
const source=ts.transpileModule(fs.readFileSync(new URL('../src/platform/matchers/twitter-action-state.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;

test('separate tab runtimes restore missed updates and synchronize every action group',()=>{
  const disk=new Map(), channels=[], windows=[];
  function tab(account) {
    const listeners={};windows.push(listeners);
    const sandbox={exports:{},require:()=>({observeNativeActions}),Date,WeakRef,setTimeout,
      document:{cookie:'twid=u%3D'+account,body:{},querySelectorAll:()=>[]},
      window:{addEventListener:(name,fn)=>listeners[name]=fn},
      MutationObserver:class{observe(){}},
      localStorage:{getItem:key=>disk.get(key)??null,setItem:(key,value)=>{
        disk.set(key,value);for(const other of windows)if(other!==listeners)other.storage?.({key,newValue:value});
      },removeItem:key=>disk.delete(key)},
      BroadcastChannel:class{constructor(){channels.push(this);}postMessage(data){for(const other of channels)if(other!==this)other.onmessage?.({data:structuredClone(data)});}}
    };
    vm.runInNewContext(source,sandbox);
    const api=sandbox.exports;api.startTweetStateSync();
    return {api,listeners};
  }
  const a=tab('123');a.api.publishTweetState('42',{liked:true,bookmarked:true});
  const b=tab('123'), c=tab('999');
  const first={like:{done:false},bookmark:{done:false}}, second={like:{done:false},bookmark:{done:false}};
  b.api.trackTweetActions('42',first);b.api.trackTweetActions('42',second);
  assert.equal(first.like.done,true);assert.equal(second.bookmark.done,true);
  assert.equal(c.api.newestTweetState('42').liked,undefined);
  a.api.publishTweetState('42',{liked:false});
  assert.equal(first.like.done,false);assert.equal(second.like.done,false);assert.equal(first.bookmark.done,true);
  b.api.publishTweetState('42',{bookmarked:false});
  assert.equal(a.api.newestTweetState('42').bookmarked,false);
  b.listeners.focus();assert.equal(first.bookmark.done,false);
});
