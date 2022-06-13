https://github.com/mqyqingfeng/Blog/issues/13

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

在模拟 new 之前，先看看 new 实现了哪些功能。

```js
// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

实例 person 可以

1. 访问到 Otaku 构造函数里的属性
2. 访问到 Otaku.prototype 中的属性

因为 new 是关键字，所以无法像 bind 函数一样直接覆盖，所以我们写一个函数，命名为 objectFactory，来模拟 new 的效果。

```js
function Otaku () {
    ……
}

// 使用 new
var person = new Otaku(……);
// 使用 objectFactory
var person = objectFactory(Otaku, ……)
```

因为 new 的结果是一个新对象，所以在模拟实现的时候，我们也要建立一个新对象，假设这个对象叫 obj，因为 obj 会具有 Otaku 构造函数里的属性

我们可以使用 Otaku.apply(obj, arguments)来给 obj 添加新的属性。

实例的 `__proto__` 属性会指向构造函数的 prototype

```js
// 第一版代码
function objectFactory() {

    var obj = new Object(),
    // 取出第一个值
    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    Constructor.apply(obj, arguments);

    return obj;

};
```

1. 用new Object() 的方式新建了一个对象 obj
2. 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
4. 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
5. 返回 obj

```js
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments);
    return obj;
};

var person = objectFactory(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

返回值效果实现

```js
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
```

在这个例子中，构造函数返回了一个对象，在实例 person 中只能访问返回的对象中的属性。


假如我们只是返回一个基本类型的值呢？

```JS
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```

结果完全颠倒过来，这次尽管有返回值，但是相当于没有返回值进行处理。

所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。

# 手写new 

```js
function objectFactory() {
    var obj = new Object(),
    // var Constructor = Array.prototype.shift.call(arguments);
    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype
    var result = Constructor.apply(obj, arguments);

    return typeof result === 'object' ? result : obj
}
```


```js
function objectFactory(Constructor, ...args) {
    const instance = Object.create(Constructor.prototype);
    // 构造函数内部的 this 指向 instance 变量
    const result = Constructor.call(instance, ...args);
    return typeof result === 'object' ? result : instance
}
```

```js
function objectFactory(Constructor, ...args) {
    let obj = {};
    // Object.getPrototypeOf(obj) 相当于 obj.__proto__
    Object.setPrototypeOf(obj, Constructor.prototype)
    let result = Constructor.apply(obj, args)
    return result instanceof Object ? result : obj
}
```

```js
function objectFactory(Constructor) {
    if (typeof Constructor !== 'function') {
        throw new TypeError('请输入一个函数');
    }
    const args = [...arguments].slice(1);
    let obj = Object.create(Constructor.prototype);
    let res = Constructor.apply(obj, args);
    let isFunction = typeof res === 'function';
    let isObject = res !== 'null' && typeof res === 'object';
    return isFunction || isObject ? res : obj;
}
```