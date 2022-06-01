/**
 * JavaScript 的继承方式有很多，比如简单的基于 Object.create 实现的继承，每种方式或多或少都有些缺陷，
 * 这种缺陷是语言层面导致的，避免不了，即使是 class 语法（糖）。
 */

/**
 * 组合式继承，class 语法糖的本质
 */
function Parent(...args) {
    this.name = 'parent name'
    this.args = args
}
Parent.prototype.parentFn = function() {
    console.log('name = ', this.name)
    console.log('args = ', this.args)
}

function Child(arg1, arg2) {
    // 在 this 上继承父类的属性
    Parent.call(this, arg1, arg2)
    // 设置子类自己的属性
    this.childName = 'child name'
}

// 继承父类的方法
Child.prototype = Object.create(Parent.prototype)
// 恢复子类的构造函数，上面一行会将 Child.prototype.constructor 改为 Parent.prototype.constructor
Child.prototype.constructor = Child

module.exports = Child