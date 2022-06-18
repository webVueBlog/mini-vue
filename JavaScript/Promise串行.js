const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
const ajax1 = () =>
  timeout(2000).then(() => {
    console.log('1')
    return 1
  })
const ajax2 = () =>
  timeout(1000).then(() => {
    console.log('2')
    return 2
  })
const ajax3 = () =>
  timeout(2000).then(() => {
    console.log('3')
    return 3
  })

const arr = [ajax1, ajax2, ajax3]

/**
 * @description: 实现 Promise 的串行
 * @param {*}: 接收一个包含多个返回Promise对象的函数的数组
 * @return {*}: 返回一个 Promise 对象
 */
function mergePromise(arr) {
  const res = []
  return new Promise((resolve, reject) => {
    arr
      .reduce(
        (pre, cur) => pre.then(cur).then((data) => res.push(data)),
        Promise.resolve()
      )
      .then(() => resolve(res))
  })
}

mergePromise(arr).then((data) => console.log(data))