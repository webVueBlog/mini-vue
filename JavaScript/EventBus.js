/**
 * 发布订阅模式
 * 我写文章->你订阅  我发布->你收到
 * 1.先利用on可以订阅一堆事件 自定义name ，等这些事件被触发时可以执行回调函数
 * 2.订阅的这些事件 需要存储到类里面 通过key：value形式 value为一个数组
 * 3.当触发的时候，就去遍历订阅的事件执行
 * 4.如果一个事件只发生一次，通常也只需要订阅一次，收到消息后就不用再接受消息。
 */

 class EventBus {
  constructor() {
    // {key:array}
    this.eventObj = {};
    this.callbackId = 0;
  }
  // 订阅事件函数
  subscribe(eventName, callback) {
    if (!this.eventObj[eventName]) {
      this.eventObj[eventName] = {};
    }
    const id = this.callbackId++;
    this.eventObj[eventName][id] = callback;
  }
  // 发布事件函数
  publish(eventName, ...value) {
    const callBackList = this.eventObj[eventName];
    if (!Object.keys(callBackList).length) return `${eventName} 不存在`;
    for (let id in callBackList) {
      callBackList[id](...value);
      // 只订阅一次的回调函数需要删除
      if (id[0] === "d") {
        delete callBackList[id];
      }
    }
  }
  // 取消订阅 每一次订阅 都生成唯一一个取消订阅的函数
  unSubscribe(eventName, id) {
    delete this.eventObj[eventName][id];
    console.log(`${eventName} 的 id 为${id} 的被取消订阅了`);
    if (Object.keys(this.eventObj[eventName]).length === 0) {
      delete this.eventObj[eventName];
    }
  }
  // 只订阅一次
  subscribeOnce(eventName, callback) {
    // 初始化这个事件
    if (!this.eventObj[eventName]) {
      // 使用对象存储，注销回调函数的时候提高删除的效率
      this.eventObj[eventName] = {};
    }
    const id = "d" + this.callbackId++;
    // 存储订阅者的回调函数
    // callbackId使用后需要自增，供下一个回调函数使用
    this.eventObj[eventName][id] = callback;
  }
}

const eventBus = new EventBus();

// 订阅事件
eventBus.subscribe("key1", (name, sex) => {
  console.log(name, sex, "evt1---callback 1");
});
eventBus.subscribe("key1", (name, sex) => {
  console.log(name, sex, "evt1---callback 2");
});
eventBus.subscribeOnce("key1", (name, sex) => {
  console.log(name, sex, "只订阅一次 callback 222222");
});
eventBus.subscribe("key3", (name, sex) => {
  console.log(name, sex, "evt1---callback 3");
});

// 发布事件
eventBus.publish("key1", "ybz", "女");
eventBus.publish("key1", "ybz", "女1");
eventBus.publish("key3", "xyk", "男");
eventBus.unSubscribe("key1", 1);
eventBus.publish("key1", "ybz", "女");

