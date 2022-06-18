promise的finally原型方法实现

```js
MyPromise.prototype.finally = (callback) => {
  return this.then(
    (value) => MyPromise.resolve(callback()).then(() => return value),
    (error) => MyPromise.resolve(callback()).then(() => { throw error })
  )
}

Promise.prototype.finally = (callback) => {
  return this.then(
    function (value) {
      return Promise.resolve(callback()).then(function () {
        return value;
      });
    },
    function (err) {
      return Promise.resolve(callback()).then(function () {
        throw err;
      });
    }
  );
};
```




```js
/**
 * finally返回一个promise函数，无论是否执行成功，都做一个兜底。
 * 避免了同样的语句需要在then和catch都写一遍
 * finally 的特点 无论如何都执行 ，但是如果返回的是一个promise需要等待这个promise之行完在继续向下执行
 * finally本质是一个then
 */
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功了");
  }, 2000);
})
  .finally(() => {
    // => then, 无论状态如何都会执行
    console.log("finally"); //finally
  })
  .then((data) => {
    console.log("data", data); //data 成功了
  });

new Promise((resolve, reject) => {
  throw new Error("error");
})
  .catch((err) => console.log(err))
  .finally(() => console.log("你死不死我都活着"));

Promise.prototype.finally = function (callback) {
  return this.then(
    function (value) {
      return Promise.resolve(callback()).then(function () {
        return value;
      });
    },
    function (err) {
      return Promise.resolve(callback()).then(function () {
        throw err;
      });
    }
  );
};

```










### finally
```js
class MyPromise{
    // 构造方法
    construct(executor){
        // 初始化 （结果，状态，this指向）
        this.initValue();
        this.initThis();
        // 错误捕获
        try{
            executor(this.resolve, this.reject);
        }catch(e){
            this.reject(e);
        }
    }

    // initValue
    initValue(){
        this.promiseResult = null;
        this.promiseState = 'PENDING';
        // 成果失败回调 (栈)
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
    }

    // initThis
    initThis(){
        // 需要绑定this的原因：Class中默认为严格模式，严格模式下的this值为undefined
        this.resolve = this.resolve(this);
        this.reject = this.reject(this);
    }

    // Promise的状态只能由 待定 ——> 成功 或者 待定 ——> 失败
    // resolve函数
    resolve(value){
        // 检查当前状态
        if(this.promiseState !== 'PENDING') return;

        // 改变状态
        this.promiseState = 'FULFILLED';
        // 改变状态值
        this.promiseResult = value;
        // 检查 成功的回调数组里是否还有值
        while(this.onFulfilledCallback.length){
            // 执行
            this.onFulfilledCallback.shift()(this.promiseResult);
        }
    }

    reject(reason){
        // 检查当前状态
        if(this.promiseState !== 'PENDING') return;

        // 更新状态
        this.promiseState = 'REJECTED';
        // 更新结果
        this.promiseResult = reason;
        // 检查 失败的回调数组里是否还有值
        while(this.onRejectedCallback.length){
            this.onRejectedCallback.shift()(this.promiseResult);
        }
    }

    // then方法
    // 1. then方法接收两个回调函数，一个是成功回调，一个是错误回调
        // 1.1 当Promise的状态为 fulfilled时 执行成功回调，为 rejected执行失败回调
    // 2. 如果resolve或者reject在定时器里。则定时器结束之后再执行then
    // 3. then方法支持链式调用，下一次then的执行会受上一次then的执行结果影响
        // 3.1 then方法本身会返回一个新的Promise对象
        // 3.2 如果返回值为Promise对象
            // 3.2.1 返回值为成功，新Promise就是成功
            // 3.2.2 返回值为失败，新Promise就是失败
        // 3.3 如果返回值为非Promise对象，新Promise对象也看作成功，值为此次到返回值
    // 4. then方法是一个微任务

    // 实现一个then方法
    then(onFulfilled, onRejected){
        //进行参数校验，确保传入的参数是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        // new一个Promise对象，用于最后的返回
        const thenPromise = new MyPromise((resolve, reject) => {
            // 封装返回的promise处理函数
            const resolvePromsie = function(callback) {
                // then是一个微任务，用queueMicrotask实现
                queueMicrotask(() => {
                    try {
                        const temp = callback(this.promiseResult);

                        // promise不可以返回自身
                        if(temp === thenPromise){
                            throw new Error('不可以返回自身')
                        }
                        // 检查返回值是否是promise对象
                        if(temp instanceof MyPromise){
                            temp.then(resolve, reject);
                        }else{
                            resolve(temp);  // 返回值为非promise对象，当作成功，值为本次返回值
                        }
                    }catch{
                        reject(err);
                        throw new Error(err);
                    }
                })
            }

            // 状态处理
            if(this.promiseState === 'FULFILLED'){
                resolvePromsie(onFulfilled);
            }else if(this.promiseState === 'REJECTED'){
                resolvePromsie(onRejected);
            }else if(this.promiseState === 'PENGDING'){
                // 状态为待定，说明resolve / reject 还为执行，可能是在定时器里
                // 放入回调函数队列里等待执行
                this.onFulfilledCallback.push(onFulfilled.bind(this));
                this.onRejectedCallback.push(onRejected.bind(this));
            }

            // 返回一个新的promise对象
            return thenPromise;
        })
    }

    // 实现finally原型方法
    // finally
    // 传入一个函数，用于Promise结束后进行调用

    finally(callback){
        return this.then((value) => {
            callback();
            return value;
        }, (err) => {
            callback();
            return err;
        })
    }

    // 实现all race方法

    // all
    // all方法接收一个promise数组，如果数组中游非promise项，则当此项为成功
    // 如果所有的 子项都成功，则返回成功结果数组，这个数组的顺序与指定的顺序有关，与完成时间无关
    // 如果有一个失败，则返回这个失败结果

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            let count = 0, res = [];
            let check = () => {
                if(count === promises.length) resolve(res)
            }
            for(let i = 0; i < promise.length; i++){
                promises[i].then((value) => {
                    count++;
                    res.push(value);
                    if(count === promises.length){
                        resolve(res);
                    }
                }, (err) => {
                    reject(err);
                })
            }
        })
    }

    // race 竞赛
    // race 方法接收一个promise数组，数组中如果有非promise项，则当此项成功
    // 哪个promise子项最快得到结果，就返回哪个结果，无论成功失败
    static race(promises){
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                if(promise instanceof MyPromise){
                    promises.then((value) => {
                        resolve(value);
                    }, (err) => {
                        reject(err);
                    })
                }
            })
        })
    }

    // 实现静态方法 resovle、reject

    // resolve方法表示直接只返回一个成功的结果
    static resolve(value){
        // 如果是promise对象就直接返回
        if(value instanceof MyPromise){
            return value;
        }else{
            // 非promise对象，则重新创建一个
            return new MyPromise((resolve) => {
                resolve(value);
            })
        }
    }

    // reject方法返回一个错误的Promise
    static reject(reason){
        if(reason instanceof MyPromise){
            return reason;
        }else{
            return new MyPromise((reject) => {
                reject(reason);
            })
        }
    }

    // 实现静态方法 any allSettled

    // any
    // 传入一个promise数组，有一个成功就返回
    // race则是有成功结果就返回
    // 如果全部都失败就把失败结果保存到一个数组中
    // all则是有失败结果就马上返回

    static any(promises){
        return new MyPromise((resolve, reject) => {
            let count = 0;
            let errs = [];
            promises.forEach((promise) => {
                if(promise instanceof MyPromise){
                    promise.then((value) => {
                        resolve(value)
                    })
                }else{
                    resolve(promise)
                }
            }, (err) => {
                count++;
                errs[count - 1] = err; 
                if(count === promises.length){
                    reject(new AggregateError(errs));
                }
            })
        })
    }
      
    // allSettled
    // 传入一个promise数组，返回所有子项的结果
    // all是当所有子项都成功时返回所有的结果，有失败就直接返回失败
    // allSettled不关乎成功失败，返回所有子项的结果

    static allSettled(promises){
        return new MyPromise((resolve, reject) => {
            let res = [];
            let count = 0;
            let check = () => {
                if(count === promises.length) resolve(res);
            }
            promises.forEach((promise, index) => {
                if(promise instanceof MyPromise){
                    promise.then(
                        (value) => {
                            res[index] = {status: 'fulfilled', value: value};
                            count++;
                            check();
                        }, 
                        (err) => {
                            res[index] = {status: 'rejected', reason: err};
                            count++;
                            check();
                        }
                    )
                }
            })
        })        
    }


}
```


## finally方法有两个特点

```js
/**  finally方法有两个特点：
    1、不管成功还是失败都要执行finally方法。
    2、在finally方法要返回一个promise对象并且状态与之前调用的Promise对象一样
    实现思路：
    1、调用finally传入的callback函数，callback不论返回什么，都转换为Promise对象，并且与当前调用对象的状态值是一样的。
    2、调用当前 Promise 的 then 方法返回一个新的 Promise 对象（保证链式调用）
    3、调用 Promise 中的 resolve 方法进行返回
 */

 class myPromise{// class类中追求的是严格模式
    static PENDING ='pending'     // 准备状态
    static FUFILLED ='fulfilled' //  解决状态
    static REJECTED ='rejected' //   拒绝状态
    constructor(executor){//executor 为执行者,当执行者出现异常时触发拒绝状态
        this.status = myPromise.PENDING;
        this.value = null;//promise默认有值
        this.callbacks = []
        try {
            executor(this.resolve.bind(this),this.reject.bind(this))//执行
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value){// 状态只能改变一次，所以在 resolve 与 reject 添加条件判断
        if(this.status === this.PENDING){
            this.status = myPromise.FUFILLED;
            this.value = value;
            // queueMicrotask不加，执行就不是异步执行
            // 加了定时器会放到任务队列里，会等这一次的同步走完之后，下一次再执行
            queueMicrotask(()=>{
                this.callbacks.forEach(callback => {
                    callback.onFulfilled(this.value)
                })
            })
        }
    }
    reject(reason){
        if(this.status === this.PENDING){
            this.status = myPromise.REJECTED;
            this.value = reason;
            queueMicrotask(()=>{
                this.callbacks.forEach(callback => {
                    callback.onRejected(this.value)
                })
            })
        }
    }
    then(onFulfilled,onRejected){
        if(typeof onFulfilled !== 'function'){// 原生promise支持then方法不传or传null参数
            onFulfilled = () => this.value //封装一个函数 // 实现.then()的链式穿透
        }
        if(typeof onRejected !== 'function'){
            onRejected = () => this.value 
        }
        let promise = new myPromise((resolve,reject)=>{
            if(this.status === myPromise.PENDING){
                this.callbacks.push({
                    onFulfilled: value =>{// 因为异步，所以这里是能访问promise的
                        this.parse(promise,onFulfilled(value) , resolve , reject)
                    },
                    onRejected: value =>{
                        this.parse(promise,onRejected(value) , resolve , reject)
                    },
                })
            }
            if(this.status === myPromise.FUFILLED){// then方法不能立即执行，只有当promise状态改变了才能执行
                queueMicrotask(()=>{//queueMicrotask不立即执行，放到此次轮询的微任务中【移到微队列】，用来模拟promise异步效果
                    try {// 为了处理.then方法时，传入的onFulfilled方法里有代码执行错误的问题：console.log(abc)
                        this.parse(promise,onFulfilled(this.value) , resolve , reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.status === myPromise.REJECTED){// then方法不能立即执行，只有当promise状态改变了才能执行
                queueMicrotask(()=>{
                    try {// 为了处理.then方法时，传入的onRejected方法里有代码执行错误的问题
                        this.parse(promise,onRejected(this.value) , resolve , reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })
        return promise
    }
    parse(promise,result,reslove,reject){
        if(promise === result){
            throw new TypeError("不能返回自身的promise")
        }
        try {
            if(result instanceof myPromise){// then中返回的是个promise
                result.then(resolve,reject)
            }else{
                resolve(result) // then中返回的是个普通值，就直接传给下一个
            }
        } catch (error) {
            reject(error)
        }
    }
    static all(promises){
        return new myPromise((reslove,reject)=>{
            promises.forEach((promise)=>{
                const allValues = []
                promise.then(
                    value =>{
                        allValues.push(value);
                        if(allValues.length === promises.length){
                            reslove(allValues)
                        }
                    },
                    reason =>{
                        reject(reason)
                    }
                )
            })
        })
    }
    static race(promises){
        return new myPromise((reslove,reject)=>{
            promises.forEach(promise => {
                promise.then(value =>{
                    reslove(value)
                },reason =>{
                    reject(reason)
                })
            })
        })
    }
    static reslove(value){
        return new myPromise((reslove,reject)=>{
            if(value instanceof myPromise){
                value.then(resolve,reject)
            }else{
                reslove(value)
            }
        })
    }
    static reject(value){
        return new myPromise((reslove,reject)=>{
            reject(value)
        })
    }
    static any(promises) {
        // resolve必须等到有一个成功的结果
        // reject所有的都失败才执行reject
        const reasons = []
        return new myPromise((resolve, reject) => {
          promises.forEach(promise => {
            promise.then(resolve, err => {
              reasons.push(err)
              if (reasons.length === promises.length) {
                reject(new AggregateError(reasons))
              }
            })
          })
        })
    }
    static allSettled(promises) {
        return new myPromise((resolve) => {
            const results = []
            promises.forEach(promise => {
                promise.then(res => {
                    results.push({ status: FUFILLED, value: res})
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                }, err => {
                    results.push({ status: REJECTED, value: err})
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                })
            })
        })
    }
    finally(callback) {
	    // 1. 调用当前 Promise 的 then 方法返回一个新的 Promise 对象（保证链式调用）
	    return this.then(
	    // 2. 调用 Promise 中的 resolve 方法进行返回
	      (value) => this.resolve(callback()).then(() => value),
	      (reason) =>
	        this.resolve(callback()).then(() => {
	          throw reason;
	        })
	    );
	  }
}
```





