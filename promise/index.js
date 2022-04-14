const Promise = require('./promise')
// new Promise传函数， then方法
let p = new Promise((resolve, reject) => {
	// resolved状态
	// resolve(100);
	
	// pending状态
	setTimeout(() => {
		resolve(100); // 函数存起来
	}, 1000);
	
	// rejected状态
	// reject('失败')
}).then(data => { // then() 方法 参数成功回调，失败回调
	console.log('data', data);
}, reason => {
	console.log('reason', reason);
})
