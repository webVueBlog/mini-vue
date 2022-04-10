export function effect(fn) {
 // 创建响应式的
 const effect = createReactiveEffect(fn);
 // fn()
 effect();
}
/**
 * 
 * @param fn 
 * () => {
 * app.innerHTML = state.name;
 * }
 */

let activeEffect;
let effectStack = [];
/**
 * 
 * @param fn 
 * @returns 

外层的effect 叫e1
里层的effect 叫e2

effect(() => {
 app.innerHTML = state.name;
 effect(() => {
  app.innerHTML = state.age;
  app.innerHTMl = state.name + '666';
 })
 app.innerHTML = state.age = '888';
})

stack: [e1]
active: e1
name: [e1, e2]
age: [e2, e1]

active: e1;
name: [e1]
 */

function createReactiveEffect(fn) {
 // 响应式的effect
 const effect = function reactiveEffect() {
  if (!effectStack.includes(effect)) {
   // state.name 记住 fn
   effectStack.push(effect);
   activeEffect = effect;

   try {
    fn();
   } finally {
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
   }
  }
 }
 return effect;
}

/*
 WeakMap
 {
 key是对象，值是map
 state: {
  name: Set[],
  age: Set[]
 }
 }
*/

const targetMap = new WeakMap(); // key {} 不会造成内存泄漏

export function track(target, key) {
 // target 里面的key 记住 activeEffect
 let depsMap = targetMap.get(target);
 if (!depsMap) {
  // depsMap = new Map();
  // targetMap.set(target, depsMap);
  targetMap.set(target, (depsMap = new Map()));
 }
 // 拿到 state 对应的map了
 let dep = depsMap.get(key);
 if (!dep) {
  // dep = new Set();
  // depsMap.set(key, dep);
  depsMap.set(key, (dep = new Set()));
 }
 // 取到了 Set[fn, fn, fn]
 dep.add(activeEffect);
 console.log('targetMap', targetMap)
}

export function trigger(target, key) {
 let depsMap = targetMap.get(target);
 console.log('depsMap', depsMap)
 if (!depsMap) {
  return
 }
 let dep = depsMap.get(key);
 if (!dep) {
  return;
 }
 // Set[fn, fn, fn]
 console.log('dep', dep)
 dep.forEach(effect => {
  effect && effect();
 })
}