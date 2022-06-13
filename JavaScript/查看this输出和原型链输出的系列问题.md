查看this输出和原型链输出的系列问题


## 查看this输出和原型链输出的系列问题

第一题 （得分💯）

```js
var length = 10;

// 函数
function fn() {
  return this.length + 1; 
}

// 对象
var obj = {
  length: 5,
  test1: function() {
    return fn();
  }
};

// 对象属性赋值为函数 fn()
obj.test2 = fn;

// 当一个对象的属性调用函数，返回fn()，fn()作用域为全局，返回 11
console.log(obj.test1.call());

// 对象的属性调用函数返回 fn()，全局，返回11
console.log(obj.test1());

// 函数fn()的调用 11，参数空，指向全局
console.log(obj.test2.call());

// 对象属性调用一样， 内部的属性，所以为6
console.log(obj.test2());
```

第二题（得分💯）

```js
// 试试chrome挂载， number为2
window.number = 2;

var obj = {
 number: 3,
 db1: (function(){
   console.log(this);
   this.number *= 4;
   return function(){
     console.log(this);
     this.number *= 5;
   }
 })()
}

// 立即调用函数表达式
//  返回一个函数
var db1 = obj.db1; // 外部的 2 * 4 = 8
db1(); // 外部的 8 * 5 = 40
// 对象调用内部的this, obj.number 变了15
obj.db1();

// 直接看这 对象的属性
console.log(obj.number);   // 15
console.log(window.number); // 40
```

第三题（得分💯）

```js
function foo(something){
    this.a = something
}

var obj1 = {
    foo: foo
}

var obj2 = {}

// obj1调用foo函数，在内部
obj1.foo(2); 

// obj1.a 上面赋值后为 2
console.log(obj1.a);  // 2

// 指向obj2对象
obj1.foo.call(obj2, 3);

// 赋值后为3
console.log(obj2.a); // 3

// 创建新对象赋值 a: 4
var bar = new obj1.foo(4)

// 2
console.log(obj1.a);  // 2

// 4
console.log(bar.a); // 4
```

第四题（得分💯）

```js
var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  // 赋值函数
  var sss = person.sayName;
  sss(); // window
  // 对象指向返回 person
  person.sayName();  // person
  (person.sayName)(); // 立即执行，同上 person 
  (b = person.sayName)(); // 赋值后执行， window
}

sayName();
```

第五题（得分💯）

```js
var name = 'window'

var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

// 对象属性调用 
person1.foo1();  // person1
// 指向对象persson2
person1.foo1.call(person2); // person2

// 对象调用，箭头函数指向外面
person1.foo2();  // window
person1.foo2.call(person2);  // 箭头函数还是指向外面 window

// ()() 有两个？不怕嘛，一个个看
// 第一次调用返回函数，调用外面执行
person1.foo3()();  // window

// person1.foo3 以为是person1，但是是绑定了person2，但里面返回函数，指向外面
person1.foo3.call(person2)();  // window
// person1.foo3() 执行返回函数， call绑定person2对象了哦
person1.foo3().call(person2);  // person2

// ()() person1.foo4() 返回一个箭头函数，注意是person1里面的
person1.foo4()();  // person1

// person1.foo4的时候绑定了 person2，箭头函数是指向person2
person1.foo4.call(person2)();  // person2

// person1.foo4() 这个时候是person1 绑定也没用，箭头函数指向person1
person1.foo4().call(person2);  // person1
```

第六题（得分💯）

```js
var name = 'window'

function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = () => console.log(this.name)
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

// 题在这，person1实例，就看对象好了

// person1调用
person1.foo1()  // person1
// 绑定了person2
person1.foo1.call(person2)  // person2

// 箭头函数，指向外面的person1
person1.foo2()  // person1
// 箭头函数指向外面的person1，绑定没用
person1.foo2.call(person2)  // person1

// person1.foo3() 返回函数，到了最外层
person1.foo3()()  // window

// person1.foo3 对象person1调用，绑定了person2对象实例，在最外层
person1.foo3.call(person2)() // window

// person1.foo3() 返回了函数，函数绑定了person2
person1.foo3().call(person2) // person2

// person1.foo4() 返回箭头函数，但这个时候this指向person1
person1.foo4()()  // person1

 // 先绑定person2 ，箭头函数指向person2
person1.foo4.call(person2)() // person2

// 返回箭头函数指向person1 ，所以为person1
person1.foo4().call(person2)  // person1


var obj = {
  name: "obj",
  foo: function() {

  }
}
```

第七题（得分💯）

```js
var name = 'window'

function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

// 题在这

// person1.obj.foo1() 返回一个函数，到最外面指行，指向window
person1.obj.foo1()()  // window

//  person1.obj.foo1.call(person2) 绑定了person2，返回函数 ，执行
person1.obj.foo1.call(person2)()  // window

// 返回函数，再次被绑定person2 
person1.obj.foo1().call(person2)  // person2

//  person1.obj.foo2() 返回箭头函数，执行执行 obj
person1.obj.foo2()()  // obj

// person1.obj.foo2 绑定了person2 ，外面是啥，外面是this.name = 'person2'
person1.obj.foo2.call(person2)()  // person2

// person1.obj.foo2() ，箭头函数执行 obj
person1.obj.foo2().call(person2)  // obj
```

第八题（得分💯）

```js
// 当函数的参数有默认值时, 会形成一个新的作用域, 这个作用域用于保存参数的值（所以不会修改全局的变量）
var x = 0

// x 参数1 , y 是函数
function foo(x, y = function() { x = 3; console.log(x) }) {
  // 带入参数1
  console.log(x)  // 1
  var x = 2
  console.log(x) // 2
  // 函数调用， x为3
  y()  // 3
  // 不要以为是3，作用域问题
  console.log(x) // 2
}

foo(1)
// foo(1)，1是内部作用域1，内部赋值2，也是内部的事
console.log(x) // 0
```

第九题（得分💯）

```js
Function.prototype.a = function () {
  console.log("我是a");
};
Object.prototype.b = function () {
  console.log("我是b");
};

function A() {}
var c = new A();

// -------------

// 是个函数
A.a(); // 我是a
// 函数即对象，往上找
A.b(); // 我是b

// c是实例对象 没有a属性 c.a不是函数
c.a(); // 报错，不是函数

// c是对象
c.b(); // 我是b

// 函数 -> 对象  Function 构造函数对象
Function.b();  // 我是b

// 对象 Object构造函数
Object.a();  // 我是a
```

第十题

请用你的语言来描述原型链和this指向的相关概念～

原型链 其基本思想就是通过原型继承多个引用类型的属性和方法

this指向 在标准函数中，this 引用的是把函数当成方法调用的上下文对象，这时候通常称其为 this 值

在箭头函数中，this引用的是定义箭头函数的上下文



























