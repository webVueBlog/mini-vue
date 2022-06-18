promise的any、allsettled静态方法

```js
// any
// 传入一个promise数组，有一个成功就返回
// race则是有成功结果就返回
// 如果全部都失败就把失败结果保存到一个数组中
// all则是有失败结果就马上返回
```

```js
// allSettled
// 传入一个promise数组，返回所有子项的结果
// all是当所有子项都成功时返回所有的结果，有失败就直接返回失败
// allSettled不关乎成功失败，返回所有子项的结果
```

```js

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo")
);
const promises = [promise1, promise2];

/**
 * Promise.allSettled 静态方法是在所有给定的promise都已经fulfilled或rejected的promise，并带有一个对象数组，每个对象表示对应的promise结果
 */

Promise.allSettled(promises).then((res) => {
  console.log(res); //[{ status: 'fulfilled', value: 3 },{ status: 'rejected', reason: 'foo' }]
});

/**
 * 实现一个allSettled
 */

let MyAllSettled = function (promises) {
  let arr = [],
    count = 0;
  return new Promise((resolve, reject) => {
    // 因为then是微任务 需要执行完成再++
    const processResult = (res, index, status) => {
      arr[index] = { status: status, val: res };
      count += 1;
      if (count === promises.length) resolve(arr);
    };

    promises.forEach((item, i) => {
      Promise.resolve(item).then(
        (res) => {
          processResult(res, i, "fulfilled");
        },
        (err) => {
          processResult(err, i, "rejected");
        }
      );
    });
  });
};

MyAllSettled(promises).then((res) => {
  console.log(res);
});

```

1. 所有用例都失败 会输出All promises were rejected
2. 有一个用例是成功的 输出成功的用例
3. 有很多个成功的用例 输出最快的

```js
/**
 * Promise.any 和 Promise.all 可以看成是相反的，any里面只要有一个成功即为成功，all里面有一个失败即为失败
 * 当所有的promise实例都失败了它才会失败.如果 Promise.any 中有多个成功的 Promise 实例，则以最快成功的那个结果作为自身 resolve 的结果。
 *
 * 总而言之
 * 1.所有用例都失败 会输出All promises were rejected
 * 2.有一个用例是成功的 输出成功的用例
 * 3.有很多个成功的用例 输出最快的
 */

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

const p4 = Promise.reject("p4 rejected");

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p5 rejected 延时1.5秒");
  }, 1500);
});

// 所有 Promise 都成功 会输出最快的那个
Promise.any([p3, p1, p2])
  .then((res) => console.log(res)) // p1
  .catch((err) => console.log(err));

//所有 Promise 都失败 会输出All promises were rejected
Promise.any([p4, p5])
  .then((res) => console.log(res)) // p1
  .catch((err) => console.log(err, "err"));

//只有一个promise成功 会输出成功的那个
Promise.any([p4, p5, p1])
  .then((res) => console.log(res, "res")) // p1
  .catch((err) => console.log(err, "err"));

let myAny = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : [];
    let rejectList = [];
    promises.map((item) => {
      item.then(
        (res) => {
          resolve(res);
        },
        (err) => {
          rejectList.push(err);
          if (rejectList.length === promises.length) {
            resolve("All promises were rejected");
          }
        }
      );
    });
  });
};

myAny([p3, p1, p2]).then((res) => {
  console.log(res, "res"); //p1
});

```







```js
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
// all方法接收一个promise数组，如果数组中有非promise项，则当此项为成功
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

```



```js
/**
 * Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。
 * 如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和AggregateError类型的实例
 */

/**
 * 分别用
 * [p1]
 * [p1, p2]
 * [p1, p2, p3]
 * [p1, p2, p3, p4]
 * [p3, p4]
 * 来做验证
 * 当全是reject时，报[AggregateError: All promises were rejected]
 * 所以，any只要有一个成功时就是成功，成功的结果是返回最快的结果，并且不能全部失败
 */



/**
 * Promise.allSettled()方法返回一个在所有给定的 promise 都已经fulfilled或rejected后的 promise，
 * 并带有一个对象数组，每个对象表示对应的 promise 结果
 */

// Promise.allSettled([p1, p2, p3, p4, p5]).then((res) => {
//   console.log(res);
// });
/**
 * [
    { status: 'fulfilled', value: 1 },
    { status: 'fulfilled', value: 2 },
    { status: 'rejected', reason: 3 },
    { status: 'rejected', reason: 4 },
    { status: 'fulfilled', value: 5 }
  ]
  可以看到，全部结果都会输出，并且带上状态，对于非promise会resolve处理，resolve的值是value，reject的值是reason
 */
```















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
}
```









