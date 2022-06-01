/**
 * 为函数绑定执行上下文
 *  原理：将函数设置为执行上下文的一个方法，然后调用执行上下文上的方法
 * 
 * @param { Object } ctx 指定的函数执行上下文
 * @param  { Array } args 剩余参数组成的数组 
 */
Function.prototype.myBind = function (ctx, ...args) {
    // 示例
    // fn.myBind(ctx, [arg1, arg2])

    // 这里的 this 是正在执行的函数
    const fn = this
    // 保证 ctx[key] 的唯一性，避免和用户设置的 context[key] 冲突
    const key = Symbol()
    // 将执行函数设置到指定的上下文对象上
    ctx[key] = fn
    // 返回一个可执行函数，这里和 apply、call 不一样，但绑定上下文的方式是一样的
    // bind 方法支持预设一部分参数，剩下的参数通过返回的函数设置，具有柯里化的作用
    return function(...otherArgs) {
        // 执行函数
        return ctx[key](...args, ...otherArgs)
    }
}