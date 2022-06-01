/**
 * async await 是 Generator 的语法糖，其本质是 Generator + 自动执行器
 * @param { Function* } Generator 函数 
 */
module.exports = function asyncAwait(generatorFn) {
    // 执行 generator 函数，拿到 yield 表达式的执行结果 => { next: () => void }
    const yieldExpRet = generatorFn()

    // 自动执行器
    function autoActuator() {
        // { value: any, done: boolean }
        const ret = yieldExpRet.next()

        if (!ret.done) {
            if (Object.prototype.toString.call(ret?.value?.then) === '[object Function]') {
                // 说明 yield 后面跟的是 Promise 实例
                ret.value.then(() => {
                    autoActuator()
                })
            } else {
                // 同步
                autoActuator()
            }
        }
    }

    autoActuator()
}