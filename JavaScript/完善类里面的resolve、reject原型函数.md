完善类里面的resolve、reject原型函数

新增resolve 和 reject函数，因为如果在异常报错的情况下 then也会调用reject函数，所以今天增加了try...catch的判断


```js
const promise = new Promise((reject, resolve) => {
  console.log(a); //a is not defined
  resolve("解决了");
}).then(
  (result) => {
    console.log(result);
  },
  (reason) => {
    console.log(reason);
  }
);

**报错了**
ReferenceError: a is not defined
    at <anonymous>:2:15
    at new Promise (<anonymous>)
    at <anonymous>:1:17
```

```js
class MyPromise {
  // promise三种状态
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    // 默认状态为准备中
    console.log(this);
    this.status = MyPromise.PENDING;
    this.value = null;
    // 因为我的函数是在下面调用 如果不是因为类严格模式 this指向undefined
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    //promise状态改变之后就不可以再改变了
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
    }
  }
  reject(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = value;
    }
  }
  then(onFulfilled, onRejected) {
    //不传函数使用默认函数
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => {};
    }
    if (typeof onRejected !== "function") {
      onRejected = () => {};
    }
    if (this.status === MyPromise.FULFILLED) {
      try {
        onFulfilled(this.value);
      } catch (error) {
        onRejected(error);
      }
    }
    if (this.status === MyPromise.REJECTED) {
      try {
        onRejected(this.value);
      } catch (error) {
        onRejected(error);
      }
    }
  }
}

let myPromise = new MyPromise((resolve, reject) => {
  resolve("解决");
  reject("拒绝");
}).then(
  (result) => {
    console.log(result, "result"); //解决 result
  },
  (reason) => {
    console.log(reason);
  }
);
```
