/**
 * 并发请求，控制请求并发数
 * 
 * @param { Array } taskQueues 一个个请求任务组成的数组
 * @param { Number } concurrentNum 请求的并发数
 */
module.exports = function concurrentRequest(taskQueues = [], concurrentNum = 1) {
    return new Promise(resolve => {
        // 存放所有任务的执行结果
        const taskRet = []

        // 开始先发送指定数量的并发请求
        while (concurrentNum > 0) {
            req()
            concurrentNum--
        }

        // 当每个请求完成后再递归的调用自身，发送任务队列中的下一个请求
        function req() {
            // 递归终止条件（任务队列为空）
            if (!taskQueues.length) return Promise.allSettled(taskRet).then((res) => {
                resolve(res)
            })

            // 从任务队列中弹出一个任务
            const task = taskQueues.shift()
            // 执行任务
            const ret = task()
            // 当任务完成后递归调用 req，发送队列中的下一个请求
            ret.then(() => {
                req()
            })
            // 并将任务结果 push 进结果数组中
            taskRet.push(ret)
        }
    })
}
