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























