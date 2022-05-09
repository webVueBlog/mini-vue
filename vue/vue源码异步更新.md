
Object.defineProperty为对象的每个key设置getter，setter，从而拦截对数据的访问和设置。

当对数据进行更新操作时，比如`obj.key = 'new val'`就会触发setter的拦截，从而检测新值和旧值是否相等，如果相等什么也不做，如果不相等，则更新值，然后由dep通知watcher进行更新。所以，异步更新的入口点就是setter中最后调用的dep.notify()方法。

目的：

- 深入理解Vue的异步更新机制
- nextTick的原理

dep.notify

```js
// 通知dep中的所有watcher，执行watcher.update()方法
notify(){
 const subs = this.subs.slice()
 // 遍历dep中存储的watcher，执行watcher.update()
 for(let i = 0, l = subs.length; i < l;  i++) {
  subs[i].update()
 }
}
```

watcher.update

```js
// 根据watcher配置项，决定接下来怎么走，一般时queueWatcher
update() {
 if(this.lazy) {
  // 懒执行时走这里，比如computed
  // 将dirty置为true，可以让computedGetter执行时重新计算computed回调函数的执行结果
  this.dirty = true
 } else if (this.sync) {
  // 同步执行，在使用vm.$watch或者watch选项时可以传一个sync选项
  // 因为true时在数据更新时该watcher就不走异步更新队列，直接执行this.run
  // 方法进行更新
  // 这个属性在官方文档中没有出现
  this.run()
 } else {
  // 更新时一般都这里，将watcher放入watcher队列
  queueWatcher(this)
 }
}
```

queueWatcher

```js
// 将watcher放入watcher队列
export function queueWatcher(watcher: Watcher) {
 const id = watcher.id
 // 如果 watcher 已经存在，则跳过，不会重复入队
 if(has[id] == null) {
  // 缓存watcher.id，用于判断 watcher 是否已经入队
  has[id] = true
  if(!flushing) {
   // 当前没有处于刷新队列状态，watcher直接入队
   queue.push(watcher)
  } else {
   // 已经在刷新队列了
   // 从队列末尾开始倒序遍历，根据当前watcher.id找到它大于的watcher.id的位置，然后将自己插入到该位置之后的下一个位置
   // 即将当前watcher放入已排序的队列中，且队列仍是有序的
   let i = queue.length - 1
   while(i > index && queue[i].id > watcher.id) {
    i--
   }
   queue.splice(i+1, 0, watcher)
  }
  // queue the flush
  if(!waiting) {
   waiting = true
   if(process.env.NODE_ENV !== 'production' && !config.async) {
    // 直接刷新调度队列
    // 一般不会走这儿，Vue默认时异步执行，如果改为同步执行，性能会大打折扣
    flushSchedulerQueue()
    return
   }
   // 熟悉的nextTick => vm.$nextTick Vue.nextTick
   // 1.将回调函数(flushSchedulerQueue) 放入 callbacks 数组
   // 2.通过pending控制向浏览器任务队列中添加flushCallbacks函数
   nextTick(flushSchedulerQueue)
  }
 }
}
```

nextTick

```js
const callbacks = []
let pending = false
export function nextTick(cb?: Function, ctx?: Object) {
 let _resolve
 // 用 callbacks 数组存储经过包装的 cb 函数
 callbacks.push(() => {
  if(cb) {
   // 用 try catch 包装回调函数，便于错误捕获
   try {
    cb.call(ctx)
   } catch(e) {
    handleError(e, ctx, 'nextTick')
   }
  }else if(_resolve) {
   _resolve(ctx)
  }
 })
 if(!pending) {
  pending = true
  // 执行timerFunc，在浏览器的任务队列中（首选微任务队列）放入flushCallbacks函数
  timerFunc()
 }
 // $flow-disable-line
 if(!cb && typeof Promise !== 'undefined') {
  return new Promise(resolve => {
   _resolve = resolve
  })
 }
}

// 完成两件事
/*
 * 1.用try catch包装flushSchedulerQueue函数，然后将其放入callbacks数组
 * 2.如果pending为false，表示现在浏览器的任务队列中没有 flushCallbacks 函数
 * 如果pending为true，则表示浏览器的任务队列中已经被放入了flushCallbacks函数
 * 将执行flushCallbacks函数时，pending会被再次置为false，表示下一个flushCallbacks函数可以进入浏览器的任务队列了
 * 
 * pending 的作用保证在同一时刻，浏览器的任务队列中只有一个flushCallbacks函数
 * 
 * cb 接收一个回调函数 => flushSchedulerQueue
 * ctx 上下文
 * 
 * /
// 
```

timerFunc

```js
// 可以看到timerFunc的作用很简单，就是将 flushCallbacks 函数放入浏览器的异步任务队列中
let timerFunc
if(typeof Promise !== 'undefined' && isNative(Promise)) {
 const p = Promise.resolve()
 // 首选 Promise.resolve().then()
 timerFunc = () => {
  // 在做任务队列中放入flushCallbacks函数
  p.then(flushCallbacks)
  // 在有问题的UIWebViews中，Promise.then不会完全中断，但是它可能会陷入怪异大的状态
  // 在这种状态下，回调被推入微任务队列，但队列没有被刷新，直到浏览器需要执行其他工作，例如处理一个计时器
  // 因此，我们可以通过添加空计时器来“强制”刷新微任务队列。
  if(isIOS) setTimeout(noop)
 }
 isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
 isNative(MutationObserver) ||
 // PhantomJS and ios 7.x
 MutationObserver.toStriing() === '[object MutationObserverContructor]'
)) {
 let counter = 1
 const observer = new MutationObserver(flushCallbacks)
 const textNode = document.createTextNode(String(counter))
 observer.observe(textNode, {
  characterData: true
 })
 timerFunc = () => {
  counter = (counter + 1) % 2
  textNode.data = String(counter)
 }
 isUsingMicroTask = true
} else if(typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
 // 再就是setImmediate，它其实已经是一个宏任务了，但仍然比setTimeout要好
 timerFunc = () => {
  setImmediate(flushCallbacks)
 }
} else {
 // 最后没办法，则使用setTimeout
 timerFunc = () => {
  setTimeout(flushCallbacks, 0)
 }
}
```

flushCallbacks

```js
const callbacks = []
let pending = false

// 做了三件事
// 1.将pending置为false
// 2.清空callbacks数据
// 3. 执行callbacks数组中的每一个函数(flushSchedulerQueue)
function flushCallbacks() {
 pending = false
 const copies = callbacks.slice(0)
 callback.length = 0
 // 遍历callbacks数组，执行其中存储的每个flushSchedulerQueue函数
 for(let i = 0; i < copies.length; i++) {
  copies[i]()
 }
}
```

异步更新

```js
// 刷新队列，由 flushCallbacks 函数负责调用，主要做了两件事：
// 1.更新flushing为ture.表示正在刷新队列，在此期间往队列中 push 新的 watcher 时需要特殊处理
// 2.按照队列中的watcher.id从小到大排序，保证创建的watcher先执行，也配合第一步
// 3.遍历watcher队列，依次执行watcher.before，watcher.run，并清除缓存watcher
function flushSchedulerQueue() {
 currentFlushTimestamp = getNow()
 // 标志现在正在刷新队列
 flushing = true
 let watcher, id
 // 刷新队列之前先给队列排序（升序），可以保证：
 // 1.组件的更新顺序为从父级到子级，因为父组件总时在子组件之前被创建
 // 2.一个组件的用户watcher在其渲染watcher之前被执行，因为用户watcher先于渲染watcher创建
 // 3.如果一个组件在其父组件的watcher执行期间被销毁，则它的watcher可以被跳过
 // 排序以后再刷新队列期间新进来的watcher也会按照顺序放入队列的合适位置
 queue.sort((a,b)=>a.id - b.id)

 // 这里直接使用queue.length，动态计算队列的长度，没有缓存长度
 for(index = 0; index < queue.length; index++) {
  watcher = queue[index]
  // 执行before钩子，在使用vm.$watch或者watch选项时可以通过配置项(options.before)传递
  if(watcher.before){
   watcher.before()
  }
  // 将缓存的watcher清除
  id = watcher.id
  has[id] = null
  // 执行watcher.run,最终触发更新函数，比如updateComponent或者获取this.xx
  watcher.run()
 }
 //
 const activatedQueue = activatedChildren.slice()
 const updateQueue = queue.slice()
 // 重置调度状态：
 // 1.重置has缓存对象 has = {}
 // 2.waiting = flushing = false,表示刷新队列结束
 // waiting = flushing = false，表示可以像callbacks数组中放入新的flushSchedulerQueue函数
 resetSchedulerState()

 callActivatedHooks(activatedQueue)
 callUpdatedHooks(updatedQueue)

 if(devtools && config.devtools) {
  devtools.emit('flush')
 }
}

function resetSchedulerState() {
 index = queue.length = activatedChildren.length = 0
 has = {}
 if(process.env.NODE_ENV !== 'production') {
  circular = {}
 }
 waiting = flushing = false
}
```

watcher.run 

```js
// 由 刷新队列函数 flushSchedulerQueue调用，如果是同步watch，则由this.update直接调用，完成如下几件事
// 1.执行实例化watcher传递的第二个参数，updateComponent或者获取this.xxx的一个函数(parsePath返回的函数)
// 2.更新旧值为新值
// 3.执行实例化watcher时传递的第三个参数，比如用户watcher的回调函数
run() {
 if (this.active) {
  // 调用this.get方法
  const value = this.get()
  if(
   value !== this.value ||
   isObject(value) ||
   this.deep
  ) {
   // 更新旧值为新值
   const oldValue = this.value
   this.value = value
   if(this.user) {
    // 如果是用户watcher，则执行用户传递的第三个参数 回调函数，参数为val和oldVal
    try {
     this.cb.call(this.vm, value, oldValue)
    } catch (e) {
     handleError(e, this.vm, 'callback for watcher')
    }
   }else {
    // 渲染watcher, this.cb = noop 一个空函数
    this.cb.call(this.vm, value, oldValue)
   }
  }
 }
}
```

watcher.get

```js
// 执行this.getter 并重新收集依赖
// this.getter是实例化watcher时传递的第二个参数，一个函数或者字符串，比如：updateComponent或者parse
// 为什么要重新收集依赖
// 因为触发更新说明有响应式数据被更新了，但是被更新的数据虽然已经经过observe观察了，但是却没有进行依赖收集
// 所以，在更新页面时，会重新执行一次 render 函数，执行期间会触发读取操作，这时候进行依赖收集
get() {
 // 打开Dep.target Dep.target = this
 pushTarget(this)
 // value 为回调函数执行的结果
 let value
 const vm = this.vm
 try {
  // 执行回调函数，比如upddateComponent进入patch阶段
  value = this.getter.call(vm, vm)
 }catch(e) {
  if(this.user) {
   handleError(e, vm, 'getter for watcher')
  }else{
   throw e
  }
 }finally{
  if(this.deep) {
   traverse(value)
  }
  // 关闭Dep.target, Dep.target = null
  popTarget()
  this.cleanupDeps()
 }
 return value
}
```

> vue 的异步更新机制是如何实现的

Vue的异步更新机制的核心是利用了浏览器的异步任务队列来实现的，首选微任务队列，宏任务队列次之。

当响应式数据更新后，会调用dep.notify方法，通知dep中收集的watcher去执行update方法，watcher.update将watcher自己放入一个watcher队列（全局的queue数组）。

然后通过nextTick方法将一个刷新watcher队列的方法(flushSchedulerQueue)放入一个全局的callbacks数组中。

如果此时浏览器的异步任务队列中没有一个叫flushCallbacks的函数，则执行timerFunc函数，将flushCallbacks函数放入异步任务队列。如果异步任务队列中已经存在flushCallbacks函数，等待其执行完成以后再放入下一个flushCallbacks函数.

flushCallbacks函数负责执行callbacks数组中的所有flushSchedulerQueue函数。

flushSchedulerQueue函数负责刷新watcher队列，即执行queue数组中每一个watcher的run方法，从而进入更新阶段，比如执行组件更新函数或者执行用户watch的回调函数。


> vue的nextTick API是如何实现的？

Vue.nextTick或者vm.$nextTick的原理：

1. 将传递的回调函数用try catch包裹然后放入callbacks数组
2. 执行 timerFunc 函数，在浏览器的异步任务队列放入一个刷新 callbacks 数组的函数