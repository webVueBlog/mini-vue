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

在getter中收集依赖，在setter中触发依赖

## 依赖收集在哪里

getter中收集依赖

新增dep，用来存储被收集的依赖

```js
function defineReactive(data, key, val) {
 let dep = []
 Object.defineProperty(data, key, {
  enumerable: true,
  configurable: true,
  get: function() {
   dep.push(window.target) // 新增
  },
  set: function(newVal){
   if(val === newVal) {
    return
   }
   // 新增
   for(let i=0; i<lep.length; i++) {
    dep[i](newVal, val)
   }
   val = newVal
  }
 })
}
```

```js
export default class Dep {
 constructor() {
  this.subs = []
 }
 addSub(sub) {
  this.subs.push(sub)
 }
 removeSub(sub) {
  remove(this.subs, sub)
 }
 depend() {
  if(window.target) {
   this.addSub(window.target)
  }
 }
 notify() {
  const subs = this.subs.slice()
  for(let i = 0, l = subs.length; i < 1; i++) {
   subs[i].update()
  }
 }
}

function remove(arr, item) {
 if(arr.length) {
  const index = arr.indexOf(item)
  if(index > -1) {
   return arr.splice(index, 1)
  }
 }
}
```

```js
function defineReactive(data, key, val) {
 let dep = new Dep()
 Object.defineProperty(data, key, {
  enumerable: true,
  configurable: true,
  get: function() {
   dep.depend()
   return val
  },
  set: function(newVal) {
   if(val === newVal) {
    return
   }
   val = newVal
   dep.notify()
  }
 })
}
```