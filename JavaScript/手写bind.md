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
  // 当作为构造函数时，this指向实例，此时结果为 true ，将绑定函数的this指向该实例
  // 可以让实例获得来自绑定函数的值
  // 如果改成 this instanceof fBound ? null : context
  // 实例只是一个空对象，将 null 改成 this，实例会具有 habit 属性
  // 当作为普通函数时，this指向window，此时结果为false，将绑定函数的this指向context
  return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
 }

 // 修改返回函数的 prototype 为绑定函数的 prototype,实例就可以继承绑定函数的原型中的值
 fBound.prototype = this.prototype;
 return fBound;
}
```

fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转：

优化实现：

```js
Function.prototype.bind2 = function(context) {
 var self = this;
 var args = Array.prototype.slice.call(arguments, 1)

 var fNOP = function() {}

 var fBound = function() {
  var bindArgs = Array.prototype.slice.call(arguments);
  return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
 }

 fNOP.prototype = this.prototype;
 fBound.prototype = new fNOP();
 return fBound;
}
```

1.apply 这段代码跟 MDN 上的稍有不同

在 MDN 中文版讲 bind 的模拟实现时，apply 这里的代码是：

self.apply(this instanceof self ? this : context || this, args.concat(bindArgs))
多了一个关于 context 是否存在的判断，然而这个是错误的！

举个例子：

```js
var value = 2;
var foo = {
    value: 1,
    bar: bar.bind(null)
};

function bar() {
    console.log(this.value);
}

foo.bar() // 2
```

以上代码正常情况下会打印 2，如果换成了 context || this，这段代码就会打印 1！

所以这里不应该进行 context 的判断，大家查看 MDN 同样内容的英文版，就不存在这个判断！

2.调用 bind 的不是函数咋办？

不行，我们要报错！

```js
if (typeof this !== "function") {
  throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
}
```

3.我要在线上用

那别忘了做个兼容：

```js
Function.prototype.bind = Function.prototype.bind || function () {
    ……
};
```

# 手写 bind

```js
Function.prototype.bind2 = function(context) {
 if(type this !== 'function') {
  throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
 }

 var self = this;
 var args = Array.prototype.slice.call(arguments, 1);

 var fNOP = function() {};

 var fBound = function() {
  var bindArgs = Array.prototype.slice.call(arguments);
  return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
 }

 fNOP.prototype = this.prototype;
 fBound.prototype = new fNOP();
 return fBound;
}
```

```js
Function.prototype.bind2 = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('请输入一个函数')
    }
    let args = [...arguments].slice(1);
    let self = this;
    let fBound = function () {
        args = [...args, ...arguments];
        return self.apply(this instanceof fBound ? this : context, args)
    }
    
    fBound.prototype = Object.create(this.prototype);
    return fBound;
}
```


