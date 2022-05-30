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
  try {
   executor(this.resolve.bind(this), this.reject.bind(this))
  } catch(error) {
   this.reject(error)
  }
 }

 resolve(value) {
  if(this.status === PENDING) {
   this.value = value;
   this.status = RESOLVED;
   this.resolveCallbacks.forEach(onFulFilled => {
    onFulFilled()
   })
  }
 }

 reject(reason) {
  if(this.status === PENDING) {
   this.reason = reason;
   this.status = REJECTED;
   this.rejectCallbacks.forEach(onRejected => {
    onRejected()
   })
  }
 }

 then(onFulFilled, onRejected){
  onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : data=>data
  onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err};
  let promise2 = new Promise((resovle, reject) => {
   if(this.status === PENDING) {
    this.resolveCallbacks.push(() => {
     setTimeout(() => {
      try {
       let x = onFulFilled(this.value)
       resovlePromise(x, promise2, resovle, reject)
      } catch (error) {
       reject(error);
      }
     })
    });
    this.rejectCallbacks.push(() => {
     setTimeout(() => {
      try {
       let x = onRejected(this.reason)
       resovlePromise(x, promise2, resovle, reject)
      } catch (error) {
       reject(error);
      }
     })
    });
   }
   if(this.status === RESOLVED) {
    // return p
    setTimeout(() => {
     try {
      let x = onFulFilled(this.value)
      resovlePromise(x, promise2, resovle, reject)
     } catch (error) {
      reject(error);
     }
    })
   }
   if(this.status === REJECTED) {
    // onRejected(this.reason)
    setTimeout(() => {
     try {
      let x = onRejected(this.reason)
      resovlePromise(x, promise2, resovle, reject)
     } catch (error) {
      reject(error);
     }
    })
   }
  })
  return promise2
 }
}

function resovlePromise(x, promise2, resolve, reject) {
 if(x === promise2) {
   return reject(new TypeError('Chaining cycle detected for promise!'))
 }
 if(x && (typeof x === 'object' ||  typeof x === 'function')) {
  let called;
  try {
   let then = x.then;
   if(typeof then === 'function') {
    then.call(x, value => {
     if(called) return;
     called = true;
     resovlePromise(value, promise2, resolve, reject)
    }, reason => {
     if(called) return;
     called = true;
     reject(reason)
    })// x.then()
   } else {
    resolve(x);
   }
  } catch (error) {
   if(called) return;
   called = true;
   reject(error)
  }
 } else {
  resolve(x);
 }
}

module.exports = Promise;