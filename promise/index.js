const Promise = require('./promise');

let p = new Promise((resolve, reject) => {
 // throw '有可能抛出错误'
 setTimeout(() => {
  resolve(100);
 },100);
 resolve(100);
 // reject('失败')
}).then(data => {
 console.log('第一个Promise成功', data);
 // return p 死循环
 // return new Promise((resolve, reject) => {
 //  resolve(new Promise((resolve, reject) => {
 //   resolve(data)
 //  }))
 // })
 // return data // 第二个Promise成功 100
}, reason => {
 console.log('第一个Promise失败', reason);
}).then(data => {
 console.log('第二个Promise成功', data); // undefined
}, reason => {
 console.log('第二个Promise失败', reason);
})