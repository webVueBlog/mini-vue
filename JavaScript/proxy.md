```js
// chen

// 被观察者
class Subject {
 constructor() {
  this.observers = [];
 }
 add(observer) {
  this.observers.push(observer);
 }
 remove(observer) {
  let idx = this.observers.findIndex(item => item === observer);
  idx > -1 && this.observers.splice(idx, 1)
 }
 notify() {
  for(let observer of this.observers) {
   observer.update();
  }
 }
}

// 观察者
class Observer {
 constructor(name) {
  this.name = name;
 }
 update() {
  console.log('目标通知我更新了')
 }
}
```

使用Proxy实现观察者模式

```js
// 实现
const queuedObservers = new Set();

const observer = fn => queuedObservers.add(fn);

// Proxy可以理解成，在目标对象之前 多加一层“拦截”
const observalbe = obj => new Proxy(obj, {
 // 拦截对象属性的设置 依次为目标对象，属性名，属性值 和 Proxy 实例本身
 set: function (target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
 }
})
```

```js
// 甜妹
// 观察者模式
class Observable {
 constructor() {
  this.observers = []
 }

 subscribe(func) {
  this.observers.push(func)
 }

 unsubscribe(func) {
  this.observers = this.observers.filter((observer) => observer !== func)
 }

 notify(data) {
  this.observers.forEach((observer) => observer(data))
 }
}

// proxy
// 先定义一个 set 集合, 所有观察者都放在这个集合。
// observable 函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数
// 拦截函数 set 之中，会自动执行所有观察者
const queuedObservers = new Set();

const observe = (fn = queuedObservers.add(fn))
const observable = (obj = new Proxy(obj, { set }))

function set(target, key, value, receiver) {
 const result = Reflect.set(target, key, value, receiver);
 queuedObservers.forEach((observer) => observer())

 return result
}
```
