promise的all、race静态方法

```js
all 方法： 接受一个 promise 数组， 当所有 promise 状态 resolve 后， 执行 resolve

race 方法： 接受一个 promise 数组， 当有一个 promise 状态 resolve 后， 执行 resolve

实现all注意点：

​ 1、all它最终返回的也是一个promise，根据all的promise状态来决定它最终进入all后面的then中的resolve还是reject

​ 2、当promises数组中任何一个promise状态是reject，则all中直接进入reject

​ 3、当promises数组中所有promise状态都是resolve，则all中进入resolve

​ 4、用数组变量values记录每个promise的resolve数据value，当values数组长度与promises长度相等时，进入步骤3

实现race注意点：

​ 1、谁快用谁

​ 2、返回的是个promise
```


```js

class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    executor(this.resolve.bind(this), this.reject.bind(this));
    this.callbacks = [];
  }

  static all(promises) {
    let resolves = [];
    return new HD((resolve, reject) => {
      promises.foreach((promise) => {
        promise.then(
          (value) => {
            this.resolves.push(value);
            if (resolves.length === promises.length) {
              resolve(resolves);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(promises) {
    return new HD((resolve, reject) => {
      promises.map((promise) => {
        promise.then((value) => {
          resolve(value);
        });
      });
    });
  }
}
```


```js
const p1 = Promise.resolve("p1");

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 延时一秒");
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3 延时两秒");
  }, 2000);
});

// const p4 = Promise.reject("p4 rejected");

// const p5 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("p5 rejected 延时1.5秒");
//   }, 1500);
// });

let MyAll = function (promises) {
  let arr = [];
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      item.then(
        (res) => {
          arr.push(res);
          if (arr.length === promises.length) resolve(arr);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

MyAll([p1, p2, p3]).then((res) => {
  console.log(res);
});


```

good!

```js
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
            // setTimeout不加，执行就不是异步执行
            // 加了定时器会放到任务队列里，会等这一次的同步走完之后，下一次再执行
            setTimeout(()=>{
                this.callbacks.map(callback => {
                    callback.onFulfilled(this.value)
                })
            })
        }
    }
    reject(reason){
        if(this.status === this.PENDING){
            this.status = myPromise.REJECTED;
            this.value = reason;
            setTimeout(()=>{
                this.callbacks.map(callback => {
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
                // this.callbacks.push({
                //     onFulfilled,
                //     // 是错误的，当异步改变promise状态时，回调函数里有代码执行错误的问题：console.log(abc)，未处理trycatch
                //     onRejected
                // })
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
                setTimeout(()=>{//setTimeout不立即执行，放到下一次的任务队列中执行，用来模拟promise异步效果
                    try {// 为了处理.then方法时，传入的onFulfilled方法里有代码执行错误的问题：console.log(abc)
                        this.parse(promise,onFulfilled(this.value) , resolve , reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.status === myPromise.REJECTED){// then方法不能立即执行，只有当promise状态改变了才能执行
                setTimeout(()=>{
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
    parse(promise,result,resolve,reject){
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
        return new myPromise((resolve,reject)=>{
            promises.forEach((promise)=>{
                const allValues = []
                promise.then(
                    value =>{
                        allValues.push(value);
                        if(allValues.length === promises.length){
                            resolve(allValues)
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
        return new myPromise((resolve,reject)=>{
            promises.map(promise => {
                promise.then(value =>{
                    resolve(value)
                },reason =>{
                    reject(reason)
                })
            })
        })
    }
}
```


















