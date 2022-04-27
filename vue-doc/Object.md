## 什么事变化侦测

Vue.js会自动通过状态生成DOM，并将其输出到页面上显示出来，这个过程叫渲染。

Vue.js的渲染过程事声明式的，通过模版来描述状态与DOM之间的映射关系。

变量侦测

每个状态所绑定的依赖就越多，依赖追踪在内存的开销就会越大。

Vue.js2.0引入来虚拟DOM，将粒度调整为中等粒度

一个状态所绑定的依赖不再是具体的DOM节点，而是一个组件。这样状态变化后，会通知到组件，组件内部再使用虚拟DOM进行比对。这大大降低依赖数量，从而降低依赖追踪所消耗的内存。


## 追踪变化

使用两种方法：Object.defineProperty 和 ES6的Proxy

```js
function defineReactive(data, key, val) {
 Object.defineProperty(data, key, {
  enumerable: true,
  configurable: true,
  get: function() {
   return val
  },
  set: function(newVal) {
   if(val === newVal) {
    return
   }
   val = newVal
  }
 })
}
```

## 如何收集依赖

