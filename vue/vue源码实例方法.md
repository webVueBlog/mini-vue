实例方法：

- vm.$set
- vm.$delete
- vm.$watch
- vm.$on
- vm.$emit
- vm.$off
- vm.$once
- vm._update
- vm.$forceUpdate
- vm.$destroy
- vm.$nextTick
- vm._render

实例方法：

`src/core/instance/index.js`

该文件是Vue实例的入口文件，包括Vue构造函数的定义，各个实例方法的初始化。

```js
// Vue的构造函数
function Vue(options) {
  // 调用 Vue.prototype._init方法，该方法是在 initMixin 中定义的
  this._init(options)
}
// 定义Vue.prototype._init方法
initMixin(Vue)
// 定义
// Vue.prototype.$data
// Vue.prototype.$props
// Vue.prototype.$set
// Vue.prototype.$delete
// Vue.prototype.$watch
stateMixin(Vue)
// 定义事件相关的方法
// Vue.prototype.$on
// Vue.prototype.$once
// Vue.prototype.$off
// Vue.prototype.$emit
eventsMixin(Vue)
// 定义：
// Vue.prototype._update
// Vue.prototype.$forceUpdate
// Vue.prototype.$destroy
lifecycleMixin(Vue)
// 执行installRenderHelpers，在Vue.prototype对象上安装运行时便利程序
// 定义：
// Vue.prototype.$nextTick
// Vue.prototype._render
renderMixin(Vue)
```

`vm.$data, vm.$props`

`src/core/instance/state.js`

这是两个实例属性，不是实例方法

```js
// data
const dataDef = {}
detaDef.get = function() {return this._data}
// props
const propsDef = {}
propsDef.get = function() {return this._props}
// 将data属性和props属性挂载到Vue.prototype对象上
// 这个在程序中就可以通过this.$data和this.$props来访问data和props对象了
Object.defineProperty(Vue.prototype, '$data', dataDef);
Object.defineProperty(Vue.prototype, '$props', propsDef);
```

`vm.$set`

`/src/core/instance/state.js`

```js
Vue.prototype.$set = set
```

`set`

`src/core/observer/index.js`

```js
// 通过Vue.set或者this.$set方法给target的指定key设置值val
// 如果target是对象，并且key原本不存在，则为新key设置响应式，然后执行依赖通知,
export function set(target: Array<any> | Object, key: any, val: any): any {
 if(process.env.NODE_ENV !== 'production' && 
 (isUndef(target) || isPrimitive(target))
 ) {
  warn(`Cannot set reactive property on undefined, null, or primitive value: ${{target: any}}`)
 }
 // 更新数组指定下标的元素，Vue.set(array, idx, val),通过splice方法实现响应式更新
 if(Array.isArray(target) && isValidArrayIndex(key)) {
  target.length = Math.max(target.length, key)
  target.splice(key, 1, val)
  return val
 }
 // 更新对象已有属性，Vue.set(obj, key, val), 执行更新即可
 if(key in target && !(key in Object.prototype)) {
  target[key] = val
  return val
 }
 const ob = (target: any).__ob__
 // 不能向Vue实例或者$data 添加响应式属性，vmCount的用处之一
 // this.$data的ob.vmCount = 1,表示根组件，其它子组件的vm.vmCount都是0
 if(target._isVue || (ob && ob.vmCount)) {
  process.env.NODE_ENV !== 'production && warn(``)
 }
 return val
}
// target不是响应式对象，新属性会被设置，但是不会做响应式处理
if(!ob) {
 target[key] = val
 return val
}
// 给对象定义新属性，通过defineReactive方法设置响应式，并触发依赖更新
defineReactive(obj.value, key, val)
ob.dep.notify()
return val
}
```

`vm.$delete`

`src/../state.js`

```js
Vue.prototype.$delete = del
```

`del`

```js
// 通过Vue.delete或者vm.$delete删除target对象的指定key
// 数组通过splice方法实现，对象则通过delete运算符删除指定key，并执行依赖通知
```
 
`vm.$watch`

```js
// state.js
// 创建watcher,返回unwatch，共完成如下5件事：

// 1.兼容性处理，保证最后new Watcher时cb为函数
// 2.标示用户watcher
// 3.创建watcher实例
// 4.如果设置了immediate，即立即执行一次 cb
// 5.返回unwatch
```

`vm.$nextTick`

```js
// src/core/instance/render.js
Vue.prototype.$nextTick = function (fn: Function) {
 return nextTick(fn, this)
}
```

`nextTick`

`src/core/next-tick.js`

```js
const callbacks=[]
// 完成两件事：
// 1.用try catch包装flushSchedulerQueue函数，然后将其放入callbacks数组
// 2.如果pending为false，表示现在浏览器的任务队列中没有flushCallbacks函数
// 如果pending为true，则表示浏览器的任务队列中已经放入了flushCallbacks函数
// 待执行 flushCallbacks函数时，pending会被再次设置为false，表示下一个flushCallbacks函数可以进入浏览器的任务队列了
// pending的作用，保证在同一时刻，浏览器的任务队列中只有一个flushCallbacks函数
// 接收一个回调函数 => flushSchedulerQueue
// ctx 上下文
```

`installRenderHelpers`

该方法负责在实例上安装大量和渲染相关的简写工具函数，这些工具函数用在编译器生成的渲染函数中，比如v-for编译后的vm._l，还有h函数。不过它没有这里声明，是在initRender函数中声明的。

installRenderHelpers方法是在renderMixin中被调用的。

```js
// 在实例上挂载简写的渲染工具函数
```

## vm.$set(obj, key, val) 做了什么？

vm.$set用于响应式对象添加一个新的property，并确保这个新的property同样是响应式的，并触发视图更新。由于Vue无法探测对象新增属性或者通过索引为数组新增一个元素，比如：`this.obj.newProperty='val'`, `this.arr[3]='val'`。所以这才有了vm.$set，它是Vue.set的别名.

为对象添加一个新的响应式数据：调用defineReactive方法为对象增加响应式数据，然后执行dep.notify进行依赖通知，更新视图

为数组添加一个新的响应式数据：通过splice方法实现


## vm.$delete(obj,key)做了什么

vm.$delete 用于删除对象上的属性。如果对象是响应式的，且能确保能触发视图更新。该方法主要用于避开 Vue 不能检测属性被删除的情况。它是 Vue.delete 的别名。


删除数组指定下标的元素，内部通过 splice 方法来完成


删除对象上的指定属性，则是先通过 delete 运算符删除该属性，然后执行 dep.notify 进行依赖通知，更新视图


## `m.$watch(expOrFn, callback, [options])` 做了什么？

vm.$watch 负责观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。当其发生变化时，回调函数就会被执行，并为回调函数传递两个参数，第一个为更新后的新值，第二个为老值。
这里需要 注意 一点的是：如果观察的是一个对象，比如：数组，当你用数组方法，比如 push 为数组新增一个元素时，回调函数被触发时传递的新值和老值相同，因为它们指向同一个引用，所以在观察一个对象并且在回调函数中有新老值是否相等的判断时需要注意。
vm.$watch 的第一个参数只接收简单的响应式数据的键路径，对于更复杂的表达式建议使用函数作为第一个参数。
至于 vm.$watch 的内部原理是：


设置 options.user = true，标志是一个用户 watcher


实例化一个 Watcher 实例，当检测到数据更新时，通过 watcher 去触发回调函数的执行，并传递新老值作为回调函数的参数


返回一个 unwatch 函数，用于取消观察


## `vm.$on(event, callback)` 做了什么？

监听当前实例上的自定义事件，事件可由 vm.$emit 触发，回调函数会接收所有传入事件触发函数（vm.$emit）的额外参数。
vm.$on 的原理很简单，就是处理传递的 event 和 callback 两个参数，将注册的事件和回调函数以键值对的形式存储到 vm._event 对象中，vm._events = { eventName: [cb1, cb2, ...], ... }。

## `vm.$emit(eventName, [...args])` 做了什么？

触发当前实例上的指定事件，附加参数都会传递给事件的回调函数。

其内部原理就是执行 `vm._events[eventName]` 中所有的回调函数。


## vm.$off([event, callback]) 做了什么？


移除自定义事件监听器，即移除 vm._events 对象上相关数据。


如果没有提供参数，则移除实例的所有事件监听


如果只提供了 event 参数，则移除实例上该事件的所有监听器


如果两个参数都提供了，则移除实例上该事件对应的监听器

## vm.$once(event, callback)  做了什么？

监听一个自定义事件，但是该事件只会被触发一次。一旦触发以后监听器就会被移除。
其内部的实现原理是：


包装用户传递的回调函数，当包装函数执行的时候，除了会执行用户回调函数之外还会执行 vm.$off(event, 包装函数) 移除该事件


用 vm.$on(event, 包装函数) 注册事件


## `vm._update(vnode, hydrating)`  做了什么？

官方文档没有说明该 API，这是一个用于源码内部的实例方法，负责更新页面，是页面渲染的入口，其内部根据是否存在 prevVnode 来决定是首次渲染，还是页面更新，从而在调用 `__patch__` 函数时传递不同的参数。该方法在业务开发中不会用到。


## `vm.$forceUpdate()`  做了什么？

迫使 Vue 实例重新渲染，它仅仅影响组件实例本身和插入插槽内容的子组件，而不是所有子组件。其内部原理到也简单，就是直接调用 vm._watcher.update()，它就是 watcher.update() 方法，执行该方法触发组件更新。


## `vm.$destroy()`  做了什么？

负责完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令和事件监听器。在执行过程中会调用 beforeDestroy 和 destroy 两个钩子函数。在大多数业务开发场景下用不到该方法，一般都通过 v-if 指令来操作。其内部原理是：


调用 beforeDestroy 钩子函数


将自己从老爹肚子里（$parent）移除，从而销毁和老爹的关系


通过 watcher.teardown() 来移除依赖监听


通过 `vm.__patch__(vnode, null)` 方法来销毁节点


调用 destroyed 钩子函数


通过 vm.$off 方法移除所有的事件监听


## `vm.$nextTick(cb)`  做了什么？

vm.$nextTick 是 Vue.nextTick 的别名，其作用是延迟回调函数 cb 的执行，一般用于 this.key = newVal 更改数据后，想立即获取更改过后的 DOM 数据：

```js
this.key = 'new val'

Vue.nextTick(function() {
  // DOM 更新了
})
```

其内部的执行过程是：


this.key = 'new val'，触发依赖通知更新，将负责更新的 watcher 放入 watcher 队列


将刷新 watcher 队列的函数放到 callbacks 数组中


在浏览器的异步任务队列中放入一个刷新 callbacks 数组的函数


vm.$nextTick(cb) 来插队，直接将 cb 函数放入 callbacks 数组


待将来的某个时刻执行刷新 callbacks 数组的函数


然后执行 callbacks 数组中的众多函数，触发 watcher.run 的执行，更新 DOM


由于 cb 函数是在后面放到 callbacks 数组，所以这就保证了先完成的 DOM 更新，再执行 cb 函数


## vm._render 做了什么？

官方文档没有提供该方法，它是一个用于源码内部的实例方法，负责生成 vnode。其关键代码就一行，执行 render 函数生成 vnode。不过其中加了大量的异常处理代码。


