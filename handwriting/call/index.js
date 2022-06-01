/**
 * 为函数绑定执行上下文
 *  原理：将函数设置为执行上下文的一个方法，然后调用执行上下文上的方法
 * 
 * @param { Object } ctx 指定的函数执行上下文
 * @param  { Array } args 剩余参数组成的数组 
 * @returns any，返回函数的执行结果
 */
Function.prototype.myCall = function (ctx, ...args) {
    // 示例
    // fn.myCall(ctx, arg1, arg2)

    // 这里的 this 是正在执行的函数
    const fn = this
    // 保证 ctx[key] 的唯一性，避免和用户设置的 context[key] 冲突
    const key = Symbol()
    // 将执行函数设置到指定的上下文对象上
    ctx[key] = fn
    // 执行函数
    const res = ctx[key](...args)
    // 删除上下文上的 fn 方法
    delete ctx[key]
    // 返回函数的执行结果
    return res
}