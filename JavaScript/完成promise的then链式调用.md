完成promise的then链式调用

# 冗余情况下的代码

```js
/**
 * promise函数：目的更优雅的写异步任务。如果异步代码存在依赖关系就会一层一层嵌套，很不美观，可读性和可维护性都会变得很差，产生所谓的“回调地狱”
 * promise将回调嵌套改为了链式调用，增加了可读性和可维护性。
 */

/**
 * 实现点：
 * 1.promise类
 * 2.promise状态 (准备，执行，拒绝)
 * 3.绑定传入参数
 */

class MyPromise {
  // promise三种状态
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    // 默认状态为准备中
    this.status = MyPromise.PENDING;
    this.value = null;
    // 因为我的函数是在下面调用 如果不是因为类严格模式 this指向undefined
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
    this.callBack = [];
  }
  resolve(value) {
    //promise状态改变之后就不可以再改变了
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callBack.map((callBack) => {
          callBack.onFulfilled(this.value);
        });
      }, 0);
    }
  }
  reject(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = value;
      // 处理函数体里面的异步调用
      setTimeout(() => {
        this.callBack.map((callBack) => {
          callBack.onRejected(this.value);
        });
      }, 0);
    }
  }
  then(onFulfilled, onRejected) {
    //不传函数使用默认函数
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => {
        //then 穿透处理
        return this.value;
      };
    }
    if (typeof onRejected !== "function") {
      onRejected = () => {
        return this.value;
      };
    }
    return new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.callBack.push({
          onFulfilled: (value) => {
            try {
              let res = onFulfilled(this.value);
              resolve(res);
            } catch (error) {
              let res = onRejected(error);
              reject(res);
            }
          },
          onRejected: (reason) => {
            try {
              let res = onRejected(reason);
              resolve(res);
            } catch (error) {
              let res = onRejected(error);
              reject(res);
            }
          },
        });
      }
      if (this.status === MyPromise.FULFILLED) {
        // 模拟微任务
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let res = onRejected(this.value);
            if (res instanceof MyPromise) {
              res.then((reject) => {
                resolve(this.value);
              });
            } else {
              resolve(res);
            }
          } catch (error) {
            let res = onRejected(error);
            reject(res);
          }
        }, 0);
      }
    });
    // 如果是异步改变状态 需要进行处理 （如果promise函数体是异步的，如果状态改变再拿出来执行）
  }
}

/**
 * 1.如果promise函数体是异步调用，需要实现改变状态也是异步的，需要在类里面维护一个callback函数队列维护异步调用
 * 2.promise状态一旦改变，就不会扭转
 * 3.promise的then是微任务
 * 4.每一个报错都需要try catch到reject函数处理
 * 5.then返回的是一个新的promise
 * 6.如果promise的状态变成拒绝，就代表then成功的收到了上一个拒绝的状态
 * 7.then有穿透处理
 * 8.then里面返回promise需要做处理
 * 9.在当前promise中不允许返回本身自己
 */
let myPromise = new MyPromise((resolve, reject) => {
  // 异步调用
  //   setTimeout(() => {
  resolve("缺人");
  // console.log("异步任务"); //2
  //   }, 1000);
})
  .then((resolve) => {
    return new MyPromise((resolve) => {
      resolve("then里面返回新的promise啦");
    });
  })
  .then(
    (result) => {
      console.log(result, "result111"); //解决 result 3
      return "链式调用测试";
    },
    (reason) => {
      console.log(reason);
      return "拒绝的成功状态";
    }
  )
  .then(
    (result) => {
      console.log(result, "result222"); //解决 result 3
    },
    (reason) => {
      console.log(reason);
    }
  );

console.log("同步"); //1

// const promise = new Promise((reject, resolve) => {
//   //   console.log(a); //a is not defined
//   setTimeout(() => {
//     throw new TypeError("无法将 null 转换为对象");
//   }, 0);
//   reject(0);
// })
//   .then(
//     (result) => {
//       console.log(result);
//     },
//     (reason) => {
//       console.log(reason);
//     }
//   )
//   .catch(console.error);
```

# 解决冗余的代码

```js
class MyPromise {
  // promise三种状态
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    // 默认状态为准备中
    this.status = MyPromise.PENDING;
    this.value = null;
    // 因为我的函数是在下面调用 如果不是因为类严格模式 this指向undefined
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
    this.callBack = [];
  }
  resolve(value) {
    //promise状态改变之后就不可以再改变了
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callBack.map((callBack) => {
          callBack.onFulfilled(this.value);
        });
      }, 0);
    }
  }
  reject(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = value;
      // 处理函数体里面的异步调用
      setTimeout(() => {
        this.callBack.map((callBack) => {
          callBack.onRejected(this.value);
        });
      }, 0);
    }
  }
  then(onFulfilled, onRejected) {
    //不传函数使用默认函数
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => {
        //then 穿透处理
        return this.value;
      };
    }
    if (typeof onRejected !== "function") {
      onRejected = () => {
        return this.value;
      };
    }
    let promise = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.callBack.push({
          onFulfilled: (value) => {
            this.parse(promise, onFulfilled(value), resolve, reject);
          },
          onRejected: (reason) => {
            this.parse(promise, onRejected(reason), resolve, reject);
          },
        });
      }
      if (this.status === MyPromise.FULFILLED) {
        // 模拟微任务
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        }, 0);
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        }, 0);
      }
    });
    return promise;
    // 如果是异步改变状态 需要进行处理 （如果promise函数体是异步的，如果状态改变再拿出来执行）
  }
  parse(promise, result, resolve, reject) {
    if (promise === result) {
      throw console.error("不能自己调用自己");
    }
    try {
      if (result instanceof MyPromise) {
        // 如果then里面是promise
        result.then((value) => {
          resolve(value);
        });
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }
}
```















