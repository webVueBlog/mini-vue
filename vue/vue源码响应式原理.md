Vue数据响应式的实现原理

- 深入理解Vue数据响应式原理
- methods，computed和watch有什么区别

响应式原理的入口位置是 初始化过程中处理数据响应式这一步，调用initState方法，在 /src/core/instance/init.js 文件中。

```js
// initState
// /src/core/instance/state.js
```

> vue响应式原理是怎么实现的?

- 响应式的核心是通过 Object.defineProperty 拦截对数据的访问和设置
- 响应式的数据分为两类：

1. 对象

对象，循环遍历对象的所有属性，为每个属性设置getter，setter，以达到拦截访问和设置的目的，如果属性值依旧为对象，则递归为属性值上的每个key设置getter，setter

- 访问数据时 `(obj.key)` 进行依赖收集，在 dep 中存储相关的watcher
- 设置数据时由dep通知相关的watcher去更新

2. 数组

数组，增强数组的那 7 个可以更改自身的原型方法，然后拦截对这些方法的操作

- 添加新数据时进行响应式处理，然后由dep通知watcher去更新
- 删除数据时，也要由dep通知watcher去更新

methods，computed，watch区别

```js
// 渲染，methods执行两次，computed执行一次
// 更新, watch一次，methods两次，computed一次
```

使用场景：

- methods，一般用于封装较为复杂的处理逻辑（同步，异步）
- computed，一般用于封装一些简单的同步逻辑，将经过处理的数据返回，然后显示在模板中，以减轻模板的重量
- watch，一般用于当需要在数据变化时执行异步或开销较大的操作

区别：

methods 和 computed

通过示例会发现，如果在一次渲染中，有多个地方使用了同一个 methods 或 computed 属性，methods 会执行多次，而 computed 的回调函数则只会被执行一次。

通过阅读源码我们知道，在一次渲染中，多次访问computedProperty，只会在第一次执行computed属性的回调函数，后续的其它访问，则直接使用第一次的执行结果(watcher.value),而这一切的实现原理则是通过对 watcher.dirty 属性的控制实现的。而methods，每一次的访问则是简单的方法调用(this.xxMethods)。

computed 和 watch

通过源码，知道computed和watch的本质是一样的，内部都是通过Watcher来实现的，其实没什么区别。区别两点：使用场景上的区别；computed默认是懒执行的，且不可更改。

methods 和 watch

methods 和 watch 之间其实没什么可比的，是两个东西。watch中一些逻辑抽到methods中，提高代码的可读性。