class EventEmitter {
 constructor () {
   // 事件对象， 存放订阅的名字和事件
   this.events = {}
 }

 // 订阅事件的方法
 on (eventName, callback) {
   // 一个名字可以订阅多个事件事故，存在则push到指定数组的尾部保存
   !this.events[eventName] ? this.events[eventName] = [callback] : this.events[eventName].push(callback);
 }

 // 触发事件的方法
 emit (eventName) {
   // 遍历执行所有订阅的事件
   this.events[eventName]?.forEach((cb) => cb())
 }

 // 移除订阅事件
 removeListener (eventName, callback) {
   if (this.events[eventName]) {
     this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
   }
 }

 // 只执行一次订阅的事件，然后移除
 once (eventName, callback) {
   const fn = () => {
     callback() // 调用原有的callback
     this.removeListener(eventName, fn)
   }

   this.on(eventName, fn)
 }
}

// test
let em = new EventEmitter();
let workday = 0;
em.on("work", function() {
   workday++;
   console.log("work everyday");
});

em.once("love", function() {
   console.log("just love you");
});

function makeMoney() {
   console.log("make one million money");
}
em.on("money", makeMoney);

let time = setInterval(() => {
   em.emit("work");
   em.removeListener("money",makeMoney);
   em.emit("money");
   em.emit("love");
   if (workday === 5) {
       console.log("have a rest")
       clearInterval(time);
   }
}, 1);

/**
* work everyday
* just love you
* work everyday
* work everyday
* work everyday
* work everyday
* have a rest
* /