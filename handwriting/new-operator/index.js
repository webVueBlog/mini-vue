/**
 * new 运算符
 *   作用：负责实例化一个类（构造函数）
 *   原理：
 *      1. 创建一个以构造函数原型对象为原型的对象
 *      2. 以第一步创建的对象为上下文执行构造函数
 *      3. 返回值，如果函数有返回值，则返回函数的返回值，否则返回第一步创建的对象
 * @param { Function } 构造函数
 * @param { Array } 构造函数的其它参数组成的数组
 * @returns 对象实例
 */
module.exports = function newOperator(constructor, ...args) {
    // 第一步
    const ins = Object.create(constructor.prototype)
    // 第二步，如果 res 不为空，则 实例对象和 this 不相等
    const res = constructor.apply(ins, args)
    // 第三步
    return res || ins
}