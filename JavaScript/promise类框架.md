promise类框架

promise函数作用：更优雅的写异步任务。如果异步任务存在依赖关系就会一层一层的嵌套，可维护性和可读性都会很差，产生所谓的回调地狱，所以promise将嵌套改为链式调用，增加了可读性和可维护性。

搭建一个promise的框架

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
    executor(this.resolve.bind(this), this.reject.bind(this));
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
}

let myPromise = new MyPromise((resolve, reject) => {
  resolve("解决");
  reject("拒绝");
});
console.log(myPromise.status); //rejected
```

