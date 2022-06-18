function createFlow(arr = []) { 
 const sources = arr.slice().flat()  // 先把参数浅拷贝一份，再用 flat 扁平化

 function run(callback) {
   while (sources.length) {
     const task = sources.shift() // 把 callback 放到下一个 flow 的 callback 时机里执行
     const next = () => createFlow(sources).run(callback) // 用于在遇到异步任务或者另一个 flow 的时候，这样，参数中传入的flow执行完毕后，才会继续执行剩下的任务，并且在最后执行 callback

     if (typeof task === 'function') {
       const res = task() // 在所有任务执行完毕后， 执行传入的回调函数 callback?.()
       if (res?.then) return res.then(next) // 根据返回值是否有then来判断它是否是一个Promise
     }                                      // 中断本交次的flow执行，并用剩下的sources去建立一个新的flow
                                            // 在上一个Promise的then方法里面再去异步的开启新的flow的run
     
     else if (task?.isFlow) return task.run(next) // 直接调用传入的 flow 的 run,把剩下的 sources 创建的的新的 flow
                                                  // 并且把这一轮的 callback放入到新的flow的callback位置
                                                  // 在所有任务都结束后再执行
   }

   callback?.()
 }

 return {
   run,
   isFlow: true,
 }
}

// test
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const subFlow = createFlow([() => delay(1000).then(() => console.log('c'))])

createFlow([
 () => console.log('a'),
 () => console.log('b'),
 subFlow,
 [() => delay(1000).then(() => console.log('d')), () => console.log('e')],
]).run(() => {
 console.log('done')
})

// a b c d e done