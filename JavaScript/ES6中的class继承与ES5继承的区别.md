ES6中的class继承与ES5继承的区别

```js
class Father{
	construcor(color){
    	this.color = color
    }
  
  	print(){
    	console.log(this.color)
    }
}

class Son extends Father{
	constructor(color,age){
    	super(color)
        this.age = age
    }
  
  	test(){
    }
}


let s = new Son('blue', 18)

s.print()
```

es6 使用 extends 实现继承,更清晰方便。

es6 子类必须在 constructor 里面调用 super(),并且调用之前不可以使用 this，调用之后才可使用 this

es6 继承在前，实例在后 , es5 实例在前，继承在后

es6 如果子类没有定义 constructor()方法，这个方法会默认添加，并且里面会调用 super()。也就是说，不管有没有显式定义，任何一个子类都有 constructor()方法。

ES5里的构造函数就是一个普通的函数，可以使用new调用，也可以直接调用，而ES6的class不能当做普通函数直接调用，必须使用new操作符调用

ES5的原型方法和静态方法默认是可枚举的，而class的默认不可枚举，如果想要获取不可枚举的属性可以使用Object.getOwnPropertyNames方法

子类可以直接通过 `__proto__` 找到父类，而ES5是指向Function.prototype

ES5的继承，实质是先创造子类的实例对象this，然后再执行父类的构造函数给它添加实例方法和属性(不执行也无所谓）。而ES6的继承机制完全不同，实质是先创造父类的实例对象this（当然它的`__proto__` 指向的是子类的prototype），然后再用子类的构造函数修改this。

class不存在变量提升，所以父类必须在子类之前定义


> ES5和ES6继承最大的区别就是在于：

ES5先创建子类，在实例化父类并添加到子类this中

ES6先创建父类，在实例化子类中通过调用super方法访问父级后，在通过修改this实现继承

> 继承的异同：

ES5 的继承，实质是先创造子类的实例对象 this, 然后再将父类的方法添加到 this 上面

ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this

class 关键字只是原型的语法糖，JavaScript 继承仍然是基于原型实现的

# ES6

Class 的继承

- 简介
- Object.getPrototypeOf()
- super 关键字
- 类的 prototype 属性和__proto__属性
- 原生构造函数的继承
- Mixin 模式的实现

Class 可以通过extends关键字实现继承，让子类继承父类的属性和方法。extends 的写法比 ES5 的原型链继承，要清晰和方便很多。

为什么子类的构造函数，一定要调用super()？原因就在于 ES6 的继承机制，与 ES5 完全不同。ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用super()方法，因为这一步会生成一个继承父类的this对象，没有这一步就无法继承父类。

新建子类实例时，父类的构造函数必定会先运行一次。

如果子类没有定义constructor()方法，这个方法会默认添加，并且里面会调用super()。也就是说，不管有没有显式定义，任何一个子类都有constructor()方法。

Object.getPrototypeOf()方法可以用来从子类上获取父类。


