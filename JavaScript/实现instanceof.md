实现instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

关键点: 构造函数Fn的prototype，实例对象的原型链。

所以只要遍历实例对象的原型链，挨个往上查找看是否有与Fn的prototype相等的原型，直到最顶层Object还找不到，那么就返回false。

## 实现instanceof

instanceof的底层实现原理：

作用：

1. 用于判断某个实例是否属于某构造函数
2. 在继承关系中用来判断一个实例是否属于它的父类或者祖先类型的实例

只要右边变量的prototype在左边变量的原型链上即可。instanceof在查找的过程中会遍历左边变量的原型链，直到找到右边变量的prototype，如果查找失败，则会返回false。

object instanceof constructor

参数：

1. object 某个实例对象
2. constructor 某个构造函数
3. 功能 instanceof 运算符用于监测构造函数的 prototype 属性是否出现在某个实例对象的原型链
4. 原理 内部机制是通过原型链实现的
5. 用途：监测数据类型；判断一个引用类型变量是否是一个类的实例

```js
// 对象 instanceof 构造函数
// var obj = new Object()
// obj instanceof Object // true

function instanceof (L, R) {
 // L实例对象
 // R构造函数
 // 取R的显式原型
 let O = R.prototype;
 // 取L的隐式原型
 L = L.__proto__;
 while(true) {
  // 循环遍历
  if(L===Null) {
   return false;
  }
  if(O === L) {
   return true;
  }
  L = L.__proto__;
 }
}

```
















