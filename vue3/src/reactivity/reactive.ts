import { baseHandler  } from "./mutableHandlers";

// 让数据变成响应式
export function reactive(target) {
 // {} baseHandler Set Map WeakMap collectionHandler
 // let proxy = new Proxy(target, baseHandler);
 // return proxy;
 return createReactiveObject(target);
}

const reactiveMap = new Map();
function createReactiveObject(target) {
 // {} baseHandler Set Map WeakMap collectionHandler
 const existProxy = reactiveMap.get(target);

 if (existProxy) {
  return existProxy;
 }

 let proxy = new Proxy(target, baseHandler);
 reactiveMap.set(target, proxy);
 return proxy;
}