/**
 * Promise，解决了回调地狱的问题
 *  要点：
 *      1. executor 同步执行
 *      2. promise 状态不可逆
 *      3. then 回调必须在 promise 状态改变后执行
 *      4. promise 链式调用，后一个回调的参数是前一个回调的返回值
 * @param { Function } 实例化 Promise 时 executor 被同步执行
 */
function MyPromise(executor) {
    // 缓存 this 实例
    const _self = this

    // promise 状态
    this.status = 'pending'
    // promise 成功时的 值
    this.value = undefined
    // promise 失败时的 原因
    this.reason = undefined
    // promise 成功时的回调
    this.fulfilledCb = () => {}
    // promise 失败时的回调
    this.rejectedCb = () => {}

    // 传递给executor 的 resolve 方法
    function resolve(value) {
        // 用 setTimeout 是为了保证下面代码在执行时，promise 的 then 方法已经完成了回调的注册
        setTimeout(() => {
            // 状态不可逆
            if (_self.status === 'pending') {
                _self.status = 'fulfilled'
                _self.value = value
                // 执行 then 回调
                _self.fulfilledCb(value)
            }
        })
    }

    // 传递给executor 的 reject 方法
    function reject(errMsg) {
        // 用 setTimeout 是为了保证下面代码在执行时，promise 的 then 方法已经完成了回调的注册
        setTimeout(() => {
            // 状态不可逆
            if (_self.status === 'pending') {
                _self.status = 'rejected'
                _self.reason = errMsg
                // 执行 then 回调
                _self.rejectedCb(errMsg)
            }
        })
    }

    // 同步执行 executor
    try {
        executor(resolve, reject)
    } catch (err) {
        reject(err)
    }
}

// then 方法注册回调，支持链式调用
MyPromise.prototype.then = function (fulfilledCb, rejectedCb) {
    const _self = this
    // 后一个回调函数的参数是前一个回调的执行结果
    return new MyPromise((resolve, reject) => {
        _self.fulfilledCb = function (value) {
            resolve(fulfilledCb(value))
        }
        _self.rejectedCb = function (reason) {
            reject(rejectedCb(reason))
        }
    })
}

/**
 * @param { Array } promiseArr Promise 实例数组
 * @returns 先出结果的 promise 的状态
 */
MyPromise.race = function (promiseArr) {
    return new MyPromise((resolve, reject) => {
        for (let i = 0, len = promiseArr.length; i < len; i++) {
            const p = promiseArr[i]
            p.then(resolve, reject)
        }
    })
}

/**
 * @param { Array } promiseArr Promise 实例数组
 * @returns promise，成功时，返回 promsie 数组，元素依次为每个 promise 的结果值，失败时返回第一个 reject 的 promise 的原因
 */
MyPromise.all = function (promiseArr) {
    return new MyPromise((resolve, reject) => {
        const len = promiseArr.length
        const result = []
        for (let i = 0; i < len; i++) {
            const p = promiseArr[i]
            p.then((res) => {
                // 成功的回调
                result.push(res)
                if (result.length === len) {
                    // 说明 promise 全部成功
                    resolve(result)
                }
            }, (errMsg) => {
                // 任何一个 promise 失败，则任务失败，并且返回失败的原因
                reject(errMsg)
            })
        }
    })
}

module.exports = MyPromise