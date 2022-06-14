实现object.create

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

```js
Object.create = function(o) {
 function f() {};
 f.prototype = o;
 return new f;
}

/*
    1. 创建对象
    2. 指定原型
*/

function createObj(proto){
    function foo(){}
    foo.prototype = proto
    return new foo()
}
```

`Object.create(proto，[propertiesObject])`

proto:新创建对象的原型对象。

propertiesObject:可选。需要传入一个对象，该对象的属性类型参照Object.

defineProperties()的第二个参数。如果该参数被指定且不为 undefined，该传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)将为新创建的对象添加指定的属性值和对应的属性描述符。

```js
//http://es5.github.io/#x15.2.3.5
// The create function creates a new object with a specified prototype. When the create function is called, the following steps are taken:

// If Type(O) is not Object or Null throw a TypeError exception.

// Let obj be the result of creating a new object as if by the expression new Object() where Object is the standard built-in constructor with that name

// Set the [[Prototype]] internal property of obj to O.

// If the argument Properties is present and not undefined, add own properties to obj as if by calling the standard built-in function Object.defineProperties with arguments obj and Properties.

// Return obj.

Object.mycreate = function(proto,propertiesObject){
    if(typeof(proto) !== 'object' && proto !== null) throw new Error("the first param must be an object or null");

    function Fn(){}
    Fn.prototype = proto
    const obj = new Fn();
    if (propertiesObject) Object.defineProperties(obj, propertiesObject);
    return obj;
}
```

实现一个Object.create()

```js
const create = function (prop, props) {
  if (!["object", "function"].includes(typeof prop)) {
    return "只能传入object或者函数哦～";
  }
  const Ctor = function () {};
  Ctor.prototype = prop;
  const obj = new Ctor();
  if (props) {
    Object.defineProperty(obj, props);
  }
  if (prop === null) {
    obj.__proto__ = null;
  }
  return obj;
};
```

```js
/**
 *
 * @param {object} proto 原型对象
 * @param {undefined | object} propertiesObject 对象
 */
const create = (proto, propertiesObject) => {
  if(typeof proto !== 'object' && typeof proto !== null) {
    throw 'TypeError';
  }
  function F() {}
  F.prototype = proto;
  const o = new F();

  if(propertiesObject !== undefined) {
    Object.defineProperties(o, propertiesObject);
  }
  if(proto === null) {
    o.__proto__ = null;
  }
  return o;
}
```










