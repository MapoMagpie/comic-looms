import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
const {window,document}=parseHTML('<html><body></body></html>');
Object.assign(globalThis,{window,document,Event:window.Event,HTMLElement:window.HTMLElement,GM:{},GM_getValue:()=>undefined,GM_setValue:()=>{}});
window.screen={width:1920,height:1080,availHeight:1080};
window.HTMLCanvasElement.prototype.getContext=()=>({fillRect(){}});
const {default:ImageNode,NodeAction}=await import('../src/img-node.ts');

for (const trigger of ['click','shortcut']) {
  test(`leaving during ${trigger} waits for both the request and the complete animation cycle`,async()=>{
    let release,finishAnimation,calls=0,iterations;
    const action=new NodeAction('H','like',()=>{calls++;return new Promise(resolve=>release=resolve);},true);
    action.id='x-toggle-like';
    const node=new ImageNode('https://example.org/img','https://example.org/post','test');
    node.actions=[action];const root=node.create();document.body.append(root);
    root.dispatchEvent(new window.Event('mouseenter'));
    const original=root.querySelector('button');
    original.getAnimations=()=>[{animationName:'btn-rotate',currentTime:1250,
      effect:{getComputedTiming:()=>({duration:1000}),updateTiming:value=>iterations=value.iterations},
      finished:new Promise(resolve=>finishAnimation=resolve)}];
    let pending;
    if(trigger==='click')original.click();else pending=action.run(node);
    assert.equal(action.processing,true);
    root.dispatchEvent(new window.Event('mouseleave'));
    assert.ok(root.querySelector('.img-node-actions'));
    root.dispatchEvent(new window.Event('mouseenter'));
    const fresh=root.querySelector('button');assert.equal(fresh,original);
    assert.equal(fresh.disabled,true);
    fresh.click();assert.equal(calls,1,'re-entering must not permit a duplicate mutation');
    root.dispatchEvent(new window.Event('mouseleave'));
    release(true);await new Promise(resolve=>setImmediate(resolve));
    assert.equal(iterations,2,'finish the current rotation at its next full boundary');
    assert.ok(root.querySelector('.img-node-actions'),'request completion alone must not hide the animation');
    assert.equal(action.processing,true);
    finishAnimation();await pending;await new Promise(resolve=>setImmediate(resolve));
    assert.equal(root.querySelector('.img-node-actions'),null,'hide only after animation completion while outside');
    root.dispatchEvent(new window.Event('mouseenter'));
    assert.equal(root.querySelector('button').getAttribute('aria-pressed'),'true');
    assert.equal(root.querySelector('button').disabled,false);
    root.remove();
  });
}

test('returning during the final animation keeps the buttons visible',async()=>{
  let finish;
  const node=new ImageNode('https://example.org/img','https://example.org/post','test');
  const action=new NodeAction('B','bookmark',async()=>true,true);node.actions=[action];
  const root=node.create();document.body.append(root);root.dispatchEvent(new Event('mouseenter'));
  root.querySelector('button').getAnimations=()=>[{animationName:'btn-rotate',currentTime:100,
    effect:{getComputedTiming:()=>({duration:1000}),updateTiming(){}},finished:new Promise(resolve=>finish=resolve)}];
  const pending=action.run(node);root.dispatchEvent(new Event('mouseleave'));
  await new Promise(resolve=>setImmediate(resolve));root.dispatchEvent(new Event('mouseenter'));
  finish();await pending;
  assert.ok(root.querySelector('.img-node-actions'));assert.equal(action.processing,false);
  root.dispatchEvent(new Event('mouseleave'));assert.equal(root.querySelector('.img-node-actions'),null);root.remove();
});
