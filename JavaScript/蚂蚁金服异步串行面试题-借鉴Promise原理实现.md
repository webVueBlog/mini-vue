https://juejin.cn/post/6865962560363167758

```js
/** ===================== 题目 ================================**/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
  () => log("a"),
  () => log("b"),
  subFlow,
  [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

```

分析

1. 看到createFlow(fns).run(), 就想起了 new Promise().then(), 所以有了以下代码

```js
function createFlow() {
	// 任务队列，这里模仿Promise 源码
	this.list = []
	this.ready = false
}

createFlow.prototype.run = function(fn) {
    if(this.ready) {
        fn()
    } else {
        this.list.push(fn)
    }
}

```

2. 因为题目没有使用 new createFlow()的方式调用，所以咱们得加上安全模式

```js
function createFlow() {
	const args = [...arguments]
	if(!(this instanceof createFlow)) {
		return new createFlow(...args)
	}
	this.list = []
	this.ready = false
}
```

3. 我们要确保createFlow(fns)的参数fns全部执行完毕，才执行run(cb)的cb，所以添加以下伪代码：

```js
function createFlow() {
	const args = [...arguments]
	if(!(this instanceof createFlow)) {
		return new createFlow(...args)
	}
	this.list = []
	this.ready = false
    
    // 伪代码
    (args:所有fn执行完毕).then(() => {
			this.list.forEach(fn => fn())
			this.ready = true
		})
}
```

4. 考虑伪代码如何实现，

顺序：a:将args拉平，队列执行；b：深度优先遍历算法依次执行。但是都是必须前一个fn执行完毕以后才能执行后一个，这里使用深度优先遍历算法。

异步：每一个fn可以是同步可以是异步，这里使用toPromise适配器，方便统一调用。

```js
function createFlow() {
	const args = [...arguments]
	if(!(this instanceof createFlow)) {
		return new createFlow(...args)
	}
	this.list = []
	this.ready = false
    
    const invoke = (arg) => {
			if(typeof arg === 'function') {
				return toPromise(arg())
			} else if(Object.prototype.toString.call(arg) === "[object Array]" && arg.length > 0) {
            	// 第一个执行完毕，再执行之后的
				return invoke(arg[0]).then(() => invoke(arg.slice(1)))
			} else if(arg && arg.run){
            	// 因为题目里传入 subFlow,它是 createFlow 的实例。
				return new Promise((resolve) => arg.run(resolve))
			} else {
				Promise.resolve(arg)
			}
		}

		invoke(args).then(() => {
			this.list.forEach(fn => fn())
			this.ready = true
		})
}

const toPromise = (fn) => {
	if(fn && fn.then) {
		return fn
	}
	return Promise.resolve(fn)
}
```

5. 因为声明 subFlow 时调用了 createFlow(fns)， 然而我们所有的 fns 都需要 run 之后调用,也就是说执行createFlow(fns)时不能去调用invoke(args)， 所以包装了一个 _run 方法，在 run 执行时调用invoke(args)。

```js
function createFlow() {
	// ...
    this._run = () => {
    
		invoke(args).then(() => {
			this.list.forEach(fn => fn())
			this.ready = true
		})
		
	}
    // ...
}

// run 的时候调用
createFlow.prototype.run = function(fn) {
	this._run()
	if(this.ready) {
		fn()
	} else {
		this.list.push(fn)
	}
}

```

6. const log = console.log


```js

function createFlow() {

	const args = [...arguments]
	if(!(this instanceof createFlow)) {
		return new createFlow(...args)
	}

	this.list = []
	this.ready = false
	
	this._run = () => {
		invoke(args).then(() => {
			this.list.forEach(fn => fn())
			this.ready = true
		})
	}
    
    const invoke = (arg) => {
			if(typeof arg === 'function') {
				return toPromise(arg())
			} else if(Object.prototype.toString.call(arg) === "[object Array]" && arg.length > 0) {
            	// 第一个执行完毕，再执行之后的
				return invoke(arg[0]).then(() => invoke(arg.slice(1)))
			} else if(arg && arg.run){
            	// 因为题目里传入 subFlow,它是 createFlow 的实例。
				return new Promise((resolve) => arg.run(resolve))
			} else {
				Promise.resolve(arg)
			}
		}
	
}

createFlow.prototype.run = function(fn) {
	this._run()
	if(this.ready) {
		fn()
	} else {
		this.list.push(fn)
	}
}
const toPromise = (fn) => {
	if(fn && fn.then) {
		return fn
	}
	return Promise.resolve(fn)
}

const log = console.log

```






