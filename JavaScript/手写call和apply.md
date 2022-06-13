https://github.com/mqyqingfeng/Blog/issues/11

call: 

call()方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

如：

```js
// 对象 属性
var foo = {
 value: 1
};

// 函数bar
function bar() {
 console.log(this.value)
}

// 函数绑定 call bar对象
bar.call(foo); // 1
```

1. call改变了 this 的指向，指向到 foo
2. bar 函数执行了

实现 call 改变 this 的指向， bar 函数执行了

```js
// 当调用call的时候，foo对象改变为
var foo = {
 value: 1,
 bar: function() {
  console.log(this.value)
 }
}

foo.bar(); // 1
```

步骤：

1. 将函数设为对象的属性 foo.fn = bar
2. 执行该函数 foo.fn()
3. 删除该函数 delete foo.fn

```js
Function.prototype.call2 = function(context) {
 // 首先要获取调用call的函数，用this可以获取
 context.fn = this
 context.fn();
 delete context.fn;
}
```

call 函数还能给定参数执行函数

```js
// 对象
var foo = {
 value: 1
}

function bar(name, age) {
 console.log(name)
 console.log(age)
 console.log(this.value)
}

bar.call(foo, 'jeskson', 18);
```

传入的参数并不确定

可以从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里

```js 
// arguments
arguments = {
 0: foo,
 1: 'jeskson',
 2: 18,
 length: 3
}

// arguments 是 类数组对象，可以for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
 args.push('arguments[' + i + ']');
}

// 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
```

执行

```js 
// 将数组里的元素作为多个参数放进函数的形参里
context.fn(args.join(','))
```

用 eval 方法拼成一个函数，类似于这样：

```js
eval('context.fn(' + args + ')')

// args会自动调用 Array.toString()
```

```js
Function.prototype.call2 = function(context) {
 // 将函数设为对象的属性
 context.fn = this;
 // 执行该函数
 var args = [];
 for(var i = 1, len = arguments.length; i < len; i++) {
  args.push('arguments[' + i + ']');
 }
 eval('context.fn(' + args + ')');
 // 删除该函数
 delete context.fn
}
```

1. this 参数可以传 null, 当为null的时候，视为指向 window
2. 函数是可以有返回值的 

例子:

```js
// window
var value = 1;

// 函数bar
function bar() {
 console.log(this.value);
}

bar.call(null); // 1
```

```js
var obj = {
    value: 1
}

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(obj, 'jeskson', 18));
// Object {
//    value: 1,
//    name: 'jeskson',
//    age: 18
// }
```

# 手写call

```js
Function.prototype.call2 = function(context) {
 var context = Object(context) || window;
 context.fn = this;

 var args = [];
 for(var i = 1; len = arguments.length; i < len; i++) {
  args.push('arguments[' + i + ']');
 }
 var result = eval('context.fn(' + args + ')');

 delete context.fn;
 return result;
}
```

# 手写apply

```js
Function.prototype.apply = function(context, arr) {
 var context = Object(context) || window
 context.fn = this;

 var result;
 if(!arr) {
  result = context.fn()
 } else {
  var args = [];
  for(var i = 0, len = arr.length; i < len; i++) {
   args.push('arr[' + i + ']');
  }
  result = eval('context.fn(' + args + ')')
 }

 delete context.fn;
 return result;
}
```

总结手写

call

```js
Function.prototype.call2 = function (context = window, ...args) {
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

Function.prototype.myCall = function(context) {
 context = Object(context) || window
 const key = Symbol('fn');
 let args = [...arguments].slice(1) || [];
 let res = context[key](...args);
 delete context[key];
 return result
}
```

apply

```js
Function.prototype.apply2 = function (context = window, args = []) {
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

Function.prototype.myApply = function (context) {
    var context = Object(context) || window
    const key = Symbol('fn');
    context[key] = this;
    var result
    if (arguments[1]) {
        result = context[key](...arguments[1])
    } else {
        result = context[key]()
    }
    delete delete context[key];
    return result
}

Function.prototype.myApply = function (context, args = []) {
    var context = Object(context) || window
    const key = Symbol('fn');
    context[key] = this;
    var result = context[key](...arguments)
    delete delete context[key];
    return result
}
```


