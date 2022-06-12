https://github.com/mqyqingfeng/Blog/issues/13

https://github.com/mqyqingfeng/Blog/issues/12

bind() 

bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的this，之后的一序列参数将会在传递的实参前传入作为它的参数。

由此我们可以首先得出bind函数的两个特点：

1. 返回一个函数
2. 可以传入参数。

返回函数的模拟

```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

// 返回了一个函数
var bindFoo = bar.bind(foo); 

bindFoo(); // 1
```

返回一个新函数

```js
Function.prototype.bind2 = function(context) {
 var self = this;
 return function() {
  return self.apply(context)
 }
}
```

使用 return self.apply(context) 是考虑到绑定函数可能是有返回值的

```js
var foo = {
    value: 1
};

function bar() {
	return this.value;
}

var bindFoo = bar.bind(foo);

console.log(bindFoo()); // 1
```

可以传入参数

```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'jeskson');
bindFoo('18');
// 1
// jeskson
// 18
```

使用 arguments 进行处理:

```js
Function.prototype.bind2 = function(context) {
 var self = this

 // 获取bind2函数从第二个参数到最后一个参数
 var args = Array.prototype.slice.call(arguments,1);

 return function() {
  // 这个时候的arguments是指bind返回的函数传入的参数
  var bindArgs = Array.prototype.slice.call(arguments);
  return self.apply(context, args.concat(bindArgs));
 }
}
```

一个绑定函数也能使用 new 操作符创建对象：这种行为就像原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

当bind返回的函数 作为 构造函数的时候，bind时指定的this值会失败，但传入的参数依然生效。

```js
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'jeskson';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// jeskson
```

注意：尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了，如果大家了解 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj。

构造函数效果的模拟实现

```js
Function.prototype.bind2 = function(context) {
 var self = this;
 var args = Array.prototype.slice.call(arguments, 1);

 var fBound = function() {
  var bindArgs = Array.prototype.slice.call(arguments);
  // 当作为构造函数时，this指向实例，此时结果为 true ，将绑定函数的this指向该实例，
 }
}
```














