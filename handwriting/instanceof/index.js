/**
 * instanceof 运算符
 *  定义：判断对象是否属于某个构造函数的实例
 *  原理：判断构造函数的原型对象是否出现在对象的原型链上
 * @returns Boolean
 */
module.exports = function customInstanceof(ins, constructor) {
    const proto = Object.getPrototypeOf(ins)

    if (proto === constructor.prototype) return true
    if (!proto) return false

    return customInstanceof(proto, constructor)
}
