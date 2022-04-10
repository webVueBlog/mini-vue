## 你真的搞懂vue的响应式了吗

1. 观察者模式
2. 订阅发布模式
3. ES6当中的class语法，箭头函数等。
4. 熟悉Object.defineProperty方法，熟悉get/set拦截操作
5. 熟悉原型对象以及原型链
6. 对Vue的响应式

所有观察者：

观察者1，观察者2，观察者3，观察者4，。。。

观察主题：主题为了方便记录 所有观察者

```js
subs = [
 观察者1，
 观察者2，
 观察者3，
 观察者4
]
```

让主题 和 观察者之间做进一步的分离 （解耦）

创建 订阅发布中心：

```js
subs = [
 观察者1，
 观察者2，
 观察者3，
 观察者4
]
```

主题有变化，通知订阅发布中心，订阅发布中心通知观察者。

当有一个观察者，要观察数据的时候，它必须经过这个订阅中心，订阅中心就知道有一个观察者会依赖这个数据，它就会把这个观察者记录下来。

```js
Dep

subs = [
 watcher1
]
```

watcher1, watcher2, watcher3, watcher4 -> Dep -> 数据

如果要修改数据，那么也要到这个订阅中心去修改数据。修改数据的同时，会通知相应的观察者

Vue中的订阅发布实现思路，就是 

```js
data: {
 count: 123,
 user: {
  name: '',
  desc: ''
 },
 list: ['1','2']
}
```

dep

```js
export default class Dep {
 static target: ?Watcher;
 id: number;
 subs: Array<Watcher>;

 constructor() {
  this.id = uid++;
  this.subs = []
 }

 addSub (sub: Watcher) {
  this.subs.push(sub)
 }

 removeSub(sub: Watcher) {
  remove(this.subs, sub)
 }

 depend() {
  if (Dep.target) {
   Dep.target.addDep(this)
  }
 }

 notify() {
  const subs = this.subs.slice()
  if (process.env.NODE_ENV !== 'production' && !config.async) {
   subs.sort((a,b) => a.id - b.id)
  }
  for(let i = 0, l = subs.length; i<l; i++) {
   subs[i].update()
  }
 }
}

Dep.target = null;
const targetStack = []
```


```js
methodsToPatch.forEach(function(method) {
 const original = arrayProto[method]
 
 def(arrayMethods, method, function mutator(...args) {
  const result = original.apply(this.args)
  const ob = this.__ob__
  let inserted

  switch(method) {
   case 'push':

    case 'unshift':
     inserted = args
     break

     case 'splice':
      inserted = args.slice(2)
      break
  }

  if (inserted) ob.observeArray(inserted)
  // notify change
  ob.dep.notify()
  return result

 })
})
```