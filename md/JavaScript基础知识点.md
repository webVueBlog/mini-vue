
## JavaScript基础知识点

JavaScript中的基本类型有哪些，各个数据类型是如何存储的

JavaScript的数据类型包括原始类型和引用类型（对象类型）。

原始类型包括以下6个：

1. String
2. Number
3. Boolean
4. null
5. undefined
6. Symbol

引用类型统称为 Object 类型，分为5个：

1. Object
2. Array
3. Date
4. RegExp
5. Function

> 数据类型的存储形式

栈（`Stack`）和堆（`Heap`），是两种基本的数据结构。`Stack`在内存中自动分配内存空间的，`Heap`在内存中动态分配内存空间的，不一定自动释放。一般我们在项目中将对象类型手动置为null原因，减少无用内存消耗。

原始类型是按值形式存放在栈中的数据段，内存空间可以自由分配，同时可以按值直接访问。

```js
var a = 10;
var b = a;
b = 30;
console.log(a); // 10
console.log(b); // 30
```

引用类型是存放在堆内存中，每个对象在堆内存中有一个引用地址，就像是每个房间都有一个房间号一样。引用类型在栈中保存的就是这个对象在堆内存的引用地址，我们所说的“房间号”。通过“房间号”可以快速查找到保存在堆内存的对象。

> 为什么 typeof null 等于 Object?

不同的对象在底层原理的存储是用二进制表示的，在 javaScript中，如果二进制的前三位都为 0 的话，系统会判定为是 Object类型。null的存储二进制是 000，也是前三位，所以系统判定 null为 Object类型。

这个 bug 个第一版的 javaScript留下来的。

- 000：对象类型。
- 1：整型，数据是31位带符号整数。
- 010：双精度类型，数据是双精度数字。
- 100：字符串，数据是字符串。
- 110：布尔类型，数据是布尔值。

> typeof 与 instanceof 有什么区别？

typeof 是一元运算符，同样返回一个字符串类型。一般用来判断一个变量是否为空或者是什么类型。

除了 null 类型以及 Object 类型不能准确判断外，其他数据类型都可能返回正确的类型。

```js
typeof undefined // 'undefined'
typeof '10'      // 'String'
typeof 10        // 'Number'
typeof false     // 'Boolean'
typeof Symbol()  // 'Symbol'
typeof Function  // ‘function'
typeof null		 // ‘Object’
typeof []        // 'Object'
typeof {}        // 'Object'
```

既然 typeof 对对象类型都返回 Object 类型情况的局限性，我们可以使用 instanceof 来进行判断某个对象是不是另一个对象的实例。返回值的是一个布尔类型。

```js
var a = [];
console.log(a instanceof Array) // true
```

```js
class A{}
console.log(A instanceof Function) // true
```

注意：原型链中的prototype 随时可以被改动的，改变后的值可能不存在于 object的原型链上，instanceof返回的值可能就返回 false。

javaScript是一种弱类型语言，变量不受类型限制，所以在特定情况下我们需要对类型进行转换。

「类型转换」分为显式类型转换和隐式类型转换。每种转换又分为原始类型转换和对象类型转换。

显式类型转换

显式类型转换就是我们所说强制类型转换。

对于原始类型来说，转字符串类型会默认调用 toString() 方法。

```js
数据类型	String类型
数字	转化为数字对应的字符串
true	转化为字符串 "true"
null	转化为字符串 "null"
undefined	转化为字符串 “undefined”
Object	转化为 "[object Object]"

String(123);      // "123"
String(true);     // "true"
String(null);     // "null"
String(undefined);// "undefined"
String([1,2,3])   // "1,2,3"
String({});		  // "[object Object]"
```

除了特殊的几个值 ‘’、 undefined、 NAN、 null、 false、 0 转化为 Boolean 为 false 之外，其他类型值都转化为 true。

```js
Boolean('')         // false
Boolean(undefined)  // false
Boolean(null)       // false
Boolean(NaN)        // false
Boolean(false)      // false
Boolean(0)          // false
Boolean({})		    // true
Boolean([])		    // true
```

```js
字符串：1，数字转化为对应的数字，2，其他转换为NaN

布尔类型：1，true转化为1，2，false转化为0

null: 0

undefined: NaN

数组	

1) 数组为空转化为 0；
2) 数组只有一个元素转化为对应元素；
3) 其他转化为NaN

空字符串	0
```

```js
Number(10);        // 10 
Number('10');      // 10 
Number(null);      // 0  
Number('');        // 0  
Number(true);      // 1  
Number(false);     // 0  
Number([]);        // 0 
Number([1,2]);     // NaN
Number('10a');     // NaN
Number(undefined); // NaN
```

> 对象类型转原始类型！

对象类型在转原始类型的时候，会调用内置的 valueOf()和 toString() 方法，这两个方法是可以进行重写的。

转化原始类型分为两种情况：转化为字符串类型或其他原始类型。

- 如果已经是原始类型，不需要再进行转化。
- 如果转字符串类型，就调用内置函数中的 toString()方法。
- 如果是其他基本类型，则调用内置函数中的 valueOf()方法。
- 如果返回的不是原始类型，则会继续调用 toString() 方法。
- 如果还没有返回原始类型，则报错。

四则运算

隐式类型转化是不需要认为的强制类型转化，javaScript 自动将类型转化为需要的类型，所以称之为隐式类型转换。

加法运算

Boolean + Boolean会转化为数字相加。

Boolean + Number 布尔类型转化为数字相加。

Object + Number 对象类型调用 valueOf，如果不是 String、Boolean或者 Number类型，则继续调用 toString()转化为字符串。

```js
true + true  // 2
1 + true     // 2
[1] + 3      // '13'
```

字符串和字符串以及字符串和非字符串相加都会进行连接。

```js
1 + 'b'     // ‘1b’
false + 'b' // ‘falseb’
```

- && ：所有条件为真，整体才为真。
- || ：只有一个条件为真，整体就为真。

`A && B`

首先看 A 的真假， A 为假，返回 A 的值， A 为真返回 B 的值。（不管 B 是啥）

```js
console.log(0 && 1) // 0
console.log(1 && 2) // 2
```

`A || B`

首先看 A 的真假， A 为真返回的是 A 的值， A 为假返回的是 B 的值（不管 B 是啥）

```js
console.log(0 || 1) // 1
console.log(1 || 2) // 1
```

> == 和 === 的区别？

对于 === 来说，是严格意义上的相等，会比较两个操作符的类型和值。

> 什么是 this 指针?以及各种情况下的 this 指向问题。

this就是一个对象。不同情况下 this指向的不同

- 对象调用，this 指向该对象（前边谁调用 this 就指向谁）。
- 直接调用的函数，this指向的是全局 window对象。
- 通过 new的方式，this永远指向新创建的对象。
- 箭头函数中的 this。

```js
const obj = {
    a:()=>{
        console.log(this);
    }
}
// 对象调用箭头函数
obj.a(); // window
```

> 如何改变 this 的指向？

我们可以通过调用函数的 call、apply、bind 来改变 this的指向。

共同点：

- 三者都能改变 this指向，且第一个传递的参数都是 this指向的对象。
- 三者都采用的后续传参的形式。

不同点：

- call 的传参是单个传递的（试了下数组，也是可以的），而 apply 后续传递的参数是数组形式（传单个值会报错），而 bind 没有规定，传递值和数组都可以。
- call 和 apply 函数的执行是直接执行的，而 bind 函数会返回一个函数，然后我们想要调用的时候才会执行。

> 如果我们使用上边的方法改变箭头函数的 this 指针，会发生什么情况呢？能否进行改变呢？

由于箭头函数没有自己的 this 指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定 this），他们的第一个参数会被忽略。

> new 内部发生了什么过程？可不可以手写实现一个 new 操作符？

new 的过程包括以下四个阶段：

创建一个新对象。
这个新对象的 `__proto__` 属性指向原函数的 prototype 属性。(即继承原函数的原型)
将这个新对象绑定到 此函数的 this 上 。
返回新对象，如果这个函数没有返回其他对象。

```js
// new 生成对象的过程
// 1、生成新对象
// 2、链接到原型
// 3、绑定 this
// 4、返回新对象
// 参数：
// 1、Con: 接收一个构造函数
// 2、args：传入构造函数的参数
function create(Con, ...args){
    // 创建空对象
    let obj = {};
    // 设置空对象的原型(链接对象的原型)
    obj._proto_ = Con.prototype;
    // 绑定 this 并执行构造函数(为对象设置属性)
    let result = Con.apply(obj,args)
    // 如果 result 没有其他选择的对象，就返回 obj 对象
    return result instanceof Object ?  result : obj;
}
```

> 有几种创建对象的方式，字面量相对于 new 创建对象有哪些优势？

最常用的创建对象的两种方式：

- new 构造函数
- 字面量相对于
- Object.create()

字面量创建对象的优势所在：

- 代码量更少，更易读
- 对象字面量运行速度更快，它们可以在解析的时候被优化。他不会像 new 一个对象一样，解析器需要顺着作用域链从当前作用域开始查找，如果在当前作用域找到了名为 Object() 的函数就执行，如果没找到，就继续顺着作用域链往上照，直到找到全局 Object() 构造函数为止。
- Object() 构造函数可以接收参数，通过这个参数可以把对象实例的创建过程委托给另一个内置构造函数，并返回另外一个对象实例，而这往往不是你想要的。

对于 Object.create() 方式创建对象：

```js
Object.create(proto, [propertiesObject]);
```

- proto：新创建对象的原型对象。
- propertiesObject：（可选）可为创建的新对象设置属性和值。

```js
var People = function (name) {
 this.name = name;
};
People.prototype.sayName = function() {
 console.log(this.name);
}

function Person(name, age) {
 People.call(this, name)
 this.age = age;
}

Person.prototype = Object.create(People.prototype, {
 constructor: {
  configurable: true,
  enumerable: true,
  writable: true,
  value: Person,
 }
});

Person.prototype.sayAge = function (){
  console.log(this.age);
}

var p1 = new Person('person1', 25);
 
p1.sayName();  //'person1'
p1.sayAge();   //25
```

> new/字面量 与 Object.create(null) 创建对象的区别？

- new 和 字面量创建的对象的原型指向 Object.prototype，会继承 Object 的属性和方法。
- 而通过 Object.create(null) 创建的对象，其原型指向 null，null 作为原型链的顶端，没有也不会继承任何属性和方法。

> 闭包

> 什么是作用域？什么是作用域链？

规定变量和函数的可使用范围叫做作用域。


声明两个函数，分别创建量两个私有的作用域（可以理解为两个封闭容器），fn2 是不能直接访问私有作用域 fn1 的变量 a 的。同样的，在 fn1 中不能访问到 fn2 中的 b 变量的。一个函数就是一个作用域。

每个函数都会有一个作用域，查找变量或函数时，由局部作用域到全局作用域依次查找，这些作用域的集合就称为作用域链。

> 什么是闭包？闭包的作用？闭包的应用？

函数执行，形成一个私有的作用域，保护里边的私有变量不受外界的干扰，除了保护私有变量外，还可以保存一些内容，这样的模式叫做闭包。

闭包的作用有两个，保护和保存。闭包的作用有两个，保护和保存。

> 保护的应用

- 团队开发时，每个开发者把自己的代码放在一个私有的作用域中，防止相互之间的变量命名冲突；把需要提供给别人的方法，通过 return 或 window.xxx 的方式暴露在全局下。
- jQuery 的源码中也是利用了这种保护机制。
- 封装私有变量。

> 保存的应用

> 循环绑定事件引发的索引什么问题？怎么解决这种问题？

```js
// 事件绑定引发的索引问题
var btnBox = document.getElementById('btnBox'),
    inputs = btnBox.getElementsByTagName('input')
var len = inputs.length;
for(var i = 0; i < 1en; i++){
    inputs[i].onclick = function () {
        alert(i)
    }
}
```

> 什么是原型？什么是原型链？如何理解？








