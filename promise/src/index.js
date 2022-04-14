const Promise = require('./promise')
// new Promise传函数， then方法
// 第一个成功 100
// 第二个promise成功 100
let p = new Promise((resolve, reject) => {
	// throw '出现错误' // 抛出错误处理
	
	// resolved状态
	// resolve(100);
	
	// pending状态
	setTimeout(() => {
		resolve(100); // 函数存起来
		// reject('失败hh')
	}, 1000);
	
	// rejected状态
	
	// reject('失败')
}).then(data => { // then() 方法 参数成功回调函数，失败回调函数
	console.log('第一个成功', data); // undefined
	// return data // 100
	
	// return p // 返回自己死循环
	
	// return new OtherPromise((resolve) => {
	// 	resolve('别人的promise')
	// })
	
	// 需要递归去处理
	// return new Promise((resolve, reject) => {
	// 	resolve(new Promise((resolve, reject) => {
	// 		resolve(data);
	// 	}))
	// })
}, reason => {
	console.log('第一个失败', reason);
	// return reason;
	throw '错误错误'
}).then(data => { // then() 方法 参数成功回调，失败回调 // promise 才能调用then
	console.log('第二个promise成功', data);
}, reason => {
	console.log('第二个promise失败', reason);
})
