(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
})(this, (function (exports) { 'use strict';

  function effect(fn) {
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
  })

  active: e1;
  name: [e1]
   */
  function createReactiveEffect(fn) {
      // 响应式的effect
      const effect = function reactiveEffect() {
          if (!effectStack.includes)
              // state.name 记住 fn
              activeEffect = fn;
          try {
              fn();
          }
          finally {
              activeEffect = null;
          }
      };
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
  function track(target, key) {
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
      console.log('targetMap', targetMap);
  }
  function trigger(target, key) {
      let depsMap = targetMap.get(target);
      console.log('depsMap', depsMap);
      if (!depsMap) {
          return;
      }
      let dep = depsMap.get(key);
      if (!dep) {
          return;
      }
      // Set[fn, fn, fn]
      console.log('dep', dep);
      dep.forEach(effect => {
          effect && effect();
      });
  }

  const isObject = (target) => {
      return typeof target === 'object';
  };

  const baseHandler = {
      get(target, key, receiver) {
          // Reflect
          // Object.hasOwnProperty('name')
          // Object.keys({ a: 1, b: 2 })
          let value = Reflect.get(target, key, receiver);
          console.log('获取值', target, key, receiver);
          // state.name 记住 activeEffect state.name = {}
          track(target, key);
          return isObject(value) ? reactive(value) : value;
      },
      set(target, key, newValue, receiver) {
          const oldValue = target[key];
          if (oldValue === newValue) {
              return false;
          }
          let result = Reflect.set(target, key, newValue, receiver);
          trigger(target, key);
          console.log('设置值', target, key, newValue, receiver);
          return result;
      },
  };

  // 让数据变成响应式
  function reactive(target) {
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

  exports.effect = effect;
  exports.reactive = reactive;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
