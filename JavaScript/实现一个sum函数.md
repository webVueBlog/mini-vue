实现一个sum函数

实现一个函数sum函数满足以下规律

```js
sum(1, 2, 3).valueOf() // 6
sum(2, 3)(2).valueOf() // 7
sum(1)(2)(3)(4).valueOf() // 10
sum(2)(4, 1)(2).valueOf() // 9
```


分析

仔细观察这几种调用方式可以得到以下信息

sum函数可以传递一个或者多个参数

sum函数调用后返回的是一个新的函数且参数可传递一个或者多个

调用.valueOf时完成最后计算

# 函数柯里化的实现

函数柯里化的适用场景有：

参数复用

延时执行

提前确认

函数柯里化的核心在于：函数里面返回函数，从而做到参数复用的目的。

实现一个函数，使得满足以下几个要求：

add(1)(2)(3)(4)//输出10

add(1,2)(3)(4)//也输出10

add(1)(2,3)(4)//也输出10

这是一道经典的函数柯里化手撕题

```js
function add(){
    //let args = arguments;//用于获取第一个括号里的参数
    // 因为arguments是类数组结构，因此上述代码还需要进行改进，下面这行才是正确的
    let args = Array.prototype.slice.call(arguments);
    
    let inner = function(){
         args.push(...arguments);// arguments默认就为函数的参数，即使我们没有列出形参
         return inner;
    }
    
    inner.toString = function(){
        return args.reduce((prev,cur) => {
            return prev + cur;
        });
    }
    
    return inner;
}

'' + add()

parseINt(add())
```

```js
var _sum = (arr) => arr.reduce((total, cur) => (total += cur), 0);

function sum(...args1) {
 let fullArgs = [...args1];
 return fn = (...args2) => {
  fullArgs = [...fullArgs, ...args2];
  // 返回自身保持链式调用
  return fn
 }

 fn.valueOf = () => _sum(fullArgs)
 return fn
}
```

```js
function sum() {
    let args = [...arguments];

    let sumFunc = function (...sumArgs) {
        args = [...args, ...sumArgs];
        return sumFunc;
    }

    sumFunc.valueOf = function () {
        return args.reduce((cur, next) => cur + next, 0)
    }

    return sumFunc;
}
```













