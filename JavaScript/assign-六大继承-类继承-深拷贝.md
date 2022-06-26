
assign

```js
function assign(target, ...sources) {
 if(target === null) {
  throw new TypeError('Cannot convert undefined or null to object');
 }
 let res = new Object(target);
 for(let i = 0; i < sources.length; i++) {
  const source = sources[i];
  if(source) {
   for(let key in source) {
    if(Object.prototype.hasOwnProperty.call(source, key)) {
     res[key] = source[key];
    }
   }
  }
 }
 return res;
}
```

原型链继承

```js
function SuperType() {
 this.name = 'father';
}
function SubType() {
 this.name = 'children';
}
SubType.prototype = new SuperType();
```

借用构造函数继承

```js
function Supertype() {
 this.name = name;
}
function Subtype(name, age) {
 Supertype.call(this, name);
 this.age = age
}
```

组合继承

```js
function Supertype() {
 this.name = name;
}
function SubType(name, age) {
 Supertype.call(this, name)
 this.age = age;
}
SubType.prototype = new Supertype();
```

原型式继承

```js
function create(obj) {
 function F() {}
 F.prototype= obj;
 return new F();
}
```

寄生式继承

```js
function createAnother(original) {
 let clone = Object.create(original);
 clone.sayHi = function() {
  // 增强对象
 }
 return clone;
}
```

寄生组合式继承

```js
function inheritPrototype(subType, superType) {
  let createObj = null;
  function F() {}
  F.prototype = superType.prototype;
  console.log(F.prototype);
  createObj = new F();
  console.log(createObj.__proto__, "createObj1");
  console.log(createObj.__proto__ === superType.prototype, "createObj1");

  createObj.constructor = subType; // 增强
  subType.prototype = createObj; // 赋值x
  console.log(createObj, "createObj2");
}
function SuperType5(name) {
  this.name = name;
}
function subType5(name) {
  SuperType5.call(this, name); //这里又调用一次
}
inheritPrototype(subType5, SuperType5);
```


```js
function object(o) {
 function F() {}
 F.prototype = o;
 return new F();
}

function inheritPrototype(child parent) {
 var prototype = object(parent.prototype);
 prototype.constuctor = child;
 child.prototype = prototype;
}

function SuperType(name) {
 this.name = name;
}
SuperType.prototype.sayName = function(){
 console.log(this.name)
}

function SubType(name, age) {
 SuperType.call(this, name);
 this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
 console.log(this.age);
}
```

深拷贝

```js
function deepClone(obj, map = new WeakMap()) {
 if(typeof obj !== 'object') return;
 if(obj instanceof Date) {
  const copyDate = new Date();
  copyDate.setTime(obj.getTime());
  return copyDate;
 }

 if(obj instanceof RegExp) {
  const Constructor = obj.constructor;
  return new Constructor(obj);
 }

 let newObj = obj instanceof Array ? [] : {};
 if(map.get(obj)) {
  return map.get(obj);
 }

 map.set(obj, newObj);
 for(let key in obj) {
  if(obj.hasOwnProperty(key)) {
   newObj[key] = obj[key] instanceof Object ? deepClone(obj[key]) : obj[key]
  }
 }
 return newObj;
}
```

