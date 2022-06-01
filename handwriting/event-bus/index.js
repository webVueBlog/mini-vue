/**
 * Event Bus
 *  发布订阅设计模式的应用，node.js 的基础模块，也是前端组件通信的一种手段，比如 Vue 的 $on 和 $emit
 */
function EventBus() {
    // 以 事件名为 key，事件处理函数组成的数组为 value
    this.events = {}
}

module.exports = EventBus

/**
 * 监听事件 
 * @param { String } eventName 事件名
 * @param { Function | Array<Function> } cb 事件处理函数
 */
EventBus.prototype.$on = function (eventName, cb) {
    if (!Array.isArray(cb)) {
        cb = [cb]
    }

    this.events[eventName] = (this.events[eventName] || []).concat(cb)
}

EventBus.prototype.$emit = function (eventName, ...args) {
    this.events[eventName].forEach(fn => {
        fn.apply(this, args)
    })
}
