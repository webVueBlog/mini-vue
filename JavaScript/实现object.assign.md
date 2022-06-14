实现object.assign

复习 object.create
参考纲手姐姐

```js
const _create = (proto,propertiesObject,isNeedSupportSecondParam) => {
    // 判断 参数的合法性
    if(typeof proto != "object" && proto!=null){
        throw new Error("the first param must be an object or null")
    } 
    if (isNeedSupportSecondParam && propertiesObject === null) {
        throw "TypeError";
    }

    // 这里为什么能用构造函数，因为构造函数改了prototype之后，和Object的构造函数没有不同
    function F(){}
    F.prototype = proto
    const res = new F()
    // new 的时候，如果构造函数的prototype是null，那么会改写为指向Object.prototype
    // 但是create(null),就是会将 原型真的指定为 null
    if(!proto){
        res.__proto__ = null
    }
    // 加入第二个参数
    if(isNeedSupportSecondParam && propertiesObject !== null){
        Object.defineProperties(res, propertiesObject);
    }
    return res
}
```

```js
Object.assign(target, ...source)
// target目标对象
// ...source源对象
// 可以是一个或多个，返回修改后的目标对象。
```

浅拷贝Object.assign

主要是将所有可枚举属性的值从一个或多个源对象中复制到目标对象，同时返回目标对象。语法：

```js
Object.assign(target, ...source);
```

其中target是目标对象，...source是源对象，可以是一个或多个，返回修改后的目标对象。如果目标对象和源对象具有相同属性，则目标对象的该属性将会被源对象的相同属性覆盖，后来的源对象的属性将会类似地覆盖早先的属性。

浅拷贝就是拷贝对象的第一层的基本类型值，以及第一层的引用类型地址。

```js
// 第一步:
let a = {
 name: 'da',
 age: 18
}

let b = {
 name: 'dada',
 book: {
  title: 'it',
  price: '15'
 }
}
let c = Object.assign(a, b);
console.log(c);

// {
//   name: 'dada',
//.  age: 18,
//.  book: {title: 'it', price: '15'}
// }
console.log(a === c); // true
```

String类型和Symbol类型的属性都会被拷贝，而且不会跳过那些值为null或undefined的属性。

```js
let a = {
   name: "Jane",
   age: 20
}
let b = {
   b1: Symbol("Jane"),
   b2: null,
   b3: undefined
}
let c = Object.assign(a, b);
console.log(c);
// {
//     name: "Jane",
//     age: 20,
//     b1: Symbol(Jane),
//     b2: null,
//     b3: undefined
// } 
console.log(a === c); // true
```


```js
Object.defineProperty(Object, 'assign', {
  value: function(target, ...args) {
    if (target == null) {
      return new TypeError('Cannot convert undefined or null to object');
    }
    
    // 目标对象需要统一是引用数据类型，若不是会自动转换
    const to = Object(target);

    for (let i = 0; i < args.length; i++) {
      // 每一个源对象
      const nextSource = args[i];
      if (nextSource !== null) {
        // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
        for (const nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  },
  // 不可枚举
  enumerable: false,
  writable: true,
  configurable: true,
})
```

MDN 关于Object.assign的定义：Object.assign() 方法将所有可枚举（Object.propertyIsEnumerable() 返回 true）和自有（Object.hasOwnProperty() 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。

assign进行拷贝的时候有两个注意点：

1. 是可枚举的属性，就是 enumerable为true。 
2. source对象 自身上的属性。
assign之后修改target对象，并且 返回 修改之后的target对象.

```js
/**
 * Object.assign()
 * @param {object} target 目标对象
 * @param  {...object} sources 源对象
 */
const assign = (target, ...sources) => {
  if (target === null) {
    throw new TypeError('无法将 null 转换为对象');
  }
  // 基本类型包装成对象
  const newObj = Object(target);

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    // 过滤掉 null 和 undefined
    if (source) {
      // Object.assign 方法只会拷贝源对象 可枚举的 和 自身的 属性到目标对象
      // 首先获取所有可枚举的属性，包括原型链上的
      for (let key in source) {
        // 然后，检查是否在目标对象的自身的属性
        // 由于目标对象可能是由 Object.create(null) 构建
        // 所以这里不可以直接使用 source.hasOwnProperty(key)
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          // 覆盖目标对象中的属性
          newObj[key] = source[key];
        }
      }
    }
  }
  return newObj;
};
```



Object.assign模拟实现

1、判断原生Object是否支持该函数，如果不存在的话创建一个函数assign,并使用Object.defineProperty将该函数绑定到Object上。

2、判断参数是否正确（目标对象不能为空，我们可以直接设置{}传递进去，但必须设置值）。

3、使用Object()转成对象，并保存为to,最后返回这个对象to。

4、使用for...in循环遍历出所有可枚举的自有属性。并复制给新的目标对象（hasOwnProperty返回非原型链上的属性）。

为了方便验证方便，使用assign2代替assign，注意以下模拟实现不支持symbol属性，因为ES5中根本没有symbol

```js
if (typeof Object.assign2 != 'function') {
   Object.defineProperty(Object, 'assign2', { // 注意点1
       value: function(target) {
           'use strict';
           if (target == null) { // 注意点2
               throw new Error('Cannot convert undefined or null to object');
           }
           var to = Object(target); // 注意点3
           for (var index = 1; index < arguments.length; index++) {
               var nextSource = arguments[index];
               if (nextSource != null) { // 注意点2
                   // 注意点4
                   for (var nextKey in nextSource) {
                       if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                           to[nextKey] = nextSource[nextKey];
                       }
                   }
               }
           }
           return to;
       },
       writable: true,
       configurable: true
   })
}
```

```js
Object.getOwnPropertyDescriptor(Object, 'assign');
// {
//     value: ƒ, 
//     writable: true,     // 可写
//     enumerable: false,  // 不可枚举，注意这里是 false
//     configurable: true  // 可配置
// }
Object.propertyIsEnumerable('assign'); // false
```











