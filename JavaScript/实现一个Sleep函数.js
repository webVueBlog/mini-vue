function fnA() {
 console.log('A');
}
function fnB() {
 console.log('B');
}
function fnC() {
 console.log('C');
}

const sleep = (wait) => {
 return new Promise((resolve) => {
  setTimeout(resolve, wait)
 })
}

sleep(1000).then(() => {
 fnA()
})

sleep(2000).then(() => {
 fnB()
})

sleep(3000).then(() => {
 fnC()
})

// 实现目标
// fnA(); // 1 秒后打印
// fnB(); // 2 秒后打印
// fnC(); // 3 秒后打印

// const sleep = (fn, wait) => {
//  return function() {
//      setTimeout(() => {
//          fn.apply(this, arguments);
//      }, wait)
//  }()
// }

// sleep(fnA, 1000)
// sleep(fnB, 2000)
// sleep(fnC, 3000)
