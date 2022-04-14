const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
class Promise {
	constructor(executor) {
	    console.log('我的promise');
		this.status = PENDING;
		this.value = null;
		this.reason = null;
		this.resolveCallbacks = [];
		this.rejectCallbacks = [];
		executor(this.resolve.bind(this), this.reject.bind(this)); // new Promise((resolve, reject) => {})
	}
	// resolve() 函数
	resolve(value) {
		// 调用 resolve的时候，状态 resolved
		if(this.status === PENDING) {
			this.value = value;
			this.status = RESOLVED;
			this.resolveCallbacks.forEach(onFulfilled => {
				onFulfilled(this.value);
			})
		}
	}
	// reject()
	reject(reason) {
		// 调用 reject的时候，状态 rejected
		if(this.status === REJECTED) {
			this.reason = reason;
			this.status = REJECTED;
			this.rejectCallbacks.forEach(onRejected => {
				onRejected(this.value);
			})
		}
	}
	then(onFulfilled, onRejected) {
		console.log('then状态', this.status);
		if (this.status === PENDING) {
			this.resolveCallbacks.push(onFulfilled);
			this.rejectCallbacks.push(onRejected);
		}
		if (this.status === RESOLVED) {
			onFulfilled(this.value);
		}
		if (this.status === REJECTED) {
			onRejected(this.reason);
		}
		
	}
}

module.exports = Promise