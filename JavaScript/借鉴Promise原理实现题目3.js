/** ===================== 题目 ================================**/
const delay = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  )

const subFlow = createFlow([
  () => delay(1000).then(() => console.log("c"))
])

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [
    () => delay(1000).then(() => console.log("d")),
    () => console.log("e")
  ],
]).run(() => {
  console.log("done")
})

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
/** ===================== 完 ================================**/


function createFlow(arr) {

  // 嵌套数据变成扁平化 
  const sources = arr.slice().flat()

  // run 方法
  function run(callback) {
    while (sources.length) {

      // get first element
      const task = sources.shift()

      // 创建 next 方法（主要应对是 Promise 类型，需要中断当前 run 函数）
      const next = () => createFlow(sources).run(callback)

      // 判断是否是函数类型
      if (typeof task === "function") {

        // 直接执行该函数，拿到返回值需要判断是否是 Promise 类型
        const res = task()

        // 如果含有 then 方法。将接管接下来的流程
        if (res?.then) return res.then(next)
      }

      // 判断是否是 subFlow类型
      if (task?.isFlow) return task.run(next)

    }
    
    // while 执行完毕后调用 run 函数的回调函数
    callback?.()
  }

  return {
    run,
    isFlow: true,
  }
}