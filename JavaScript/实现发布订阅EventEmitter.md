## 实现发布订阅EventEmitter

```js
class EE {
  constructor() {
    this.events = {};
  }

  /**
   * 添加事件
   * @param {*} type  事件类型
   * @param {*} cb  事件回调函数
   */
  on(type, cb) {
    let events = (this.events[type] = this.events[type] || []);

    if (events.indexOf(cb) === -1) {
      events.push(cb);
    }

    return this;
  }

  /**
   * 根据传入的事件类型 移除事件
   * @param {*} type  事件类型
   * @param {*} cb  事件回调函数
   */
  off(type, cb) {
    let events = this.events[type];

    if (Array.isArray(events)) {
      if (!cb) {
        //没传第二个参数 全部删除该类型的事件
        events.length = 0;
        return;
      }
      //默认传入的是一个函数
      let index = events.indexOf(cb);
      if (index !== -1) {
        events.splice(index, 1);
      }
    }

    return this;
  }

  /**
   * 触发事件 并且传入参数
   * @param {*} type  事件类型
   * @param {*} data
   */
  emit(type, data) {
    let fns = this.events[type];

    if (Array.isArray(fns)) {
      fns.forEach((fn) => {
        fn(data);

        if (fn.once) {
          this.off(type, fn.fn);
        }
      });
    }

    return this; //返回this 便于链式调用
  }

  //todo
  // once(type, cb) {
  //   this.on(type, {
  //     fn: cb,
  //     once: true,
  //   });

  //   return this;
  // }
}

let event = new EE();

event.on('custom-click', (data) => {
  console.log(`data: `, data);
});

event.emit('custom-click', {
  name: 'alex',
  age: 18,
});

event.off('custom-click');

event.emit('custom-click', {
  name: 'alex',
  age: 30,
});

```









```js
class EventEmitter {
    constructor() {
        this.eventMap = {}
    }

    on(type, callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('请输入一个函数');
        }

        let events = (this.eventMap[type] = this.eventMap[type] || []);
        
        if (events.indexOf(callback) === -1) {
            this.eventMap[type].push(callback);
        }
    }

    emit(type, option) {
        if (this.eventMap[type]) {
            this.eventMap[type].forEach(handle => handle(option))
        }
    } 

    off(type, callback) {
        let events = this.eventMap[type] || [];
        if (events.length === 0) throw new Error('不存在相关函数');
        if (Array.isArray(events)) {
            if (!callback) {
                this.eventMap[type] = []
                return;
            }

            let index = events.indexOf(callback);
            if (index !== -1) [
                this.eventMap[type].splice(index, 1)
            ]
        }
    }
}

let ll = new EventEmitter();

const callback = {}
ll.on('change1', callback);

ll.emit('change1', {
    name: 'cll',
    age: 18,
});

const callback2 = (data) => {
    console.log(`callback2: `, data);
}
ll.off('change111', callback2);

ll.emit('change1', {
    name: 'cll',
    age: 0,
});
```



