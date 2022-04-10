// 数组的方法拦截
const arrayProto = [];

const methodsList = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methodsList.forEach(method => {
    def(arrayProto, method, function() {
        // 调用原来的方法
        const result = Array.prototype[method].apply(this, arguments);
        switch (method) {
            case 'push':
                // 对参数添加的内容，继续递归observe
                observe(arguments);
                // 通知依赖去响应了
                this.__ob__.dep.notify();
            case 'pop':
                break;
        }
        return result;
    })
})

// 工具函数

// 就是对Object.defineProperty封装，用于快速的添加属性的
// 专门用来给对象添加对应属性的
function def(obj, key, value, enumerable = false) {
    Object.defineProperty(obj, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
    })
}



/**
 * defineReactive
 * 订阅发布器
 * 每个数据都有一个自己的订阅发布器
 * 它被定义在 defineReactive 方法里，存在闭包当中
 */

class Dep {
    constructor() {
        // 保存订阅者的列表
        this.subs = [];
    }

    depend() {
        this.subs.push(Dep.target); // 存放在列表当中了
    }

    // 通知
    notify() {
        // 让watcher们去更新视图
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }
}

// 观察者 观察特定的数据 简单的模拟
class Watcher { // 渲染模版，访问数据的时候, 渲染数据的当中，watcher就回被创建
    constructor(data, key) {
        this.value = data; // 数据保存一下
        this.key = key;

        // window.target = this;
        // window.target = null;
        // 全局
        Dep.target = this; // 静态变量
        // 访问数据
        this.get(); // 告诉订阅发布中心我在访问, 请你把我存下来
        Dep.target = null; // 静态变量


    }

    get() {
        return this.value[this.key]
    }

    // 如果有更新，观察者的响应动作，更新页面模版
    update() {
        console.log('监听' + this.key + "的watcher被触发了! 新的值= " + this.get());
    }
}

// 拦截
function defineReactive(obj, key) {
    // 值获取，保存
    let value = obj[key];
    // 订阅发布模型
    let dep = new Dep();
    let childOb = observe(value); // 递归处理value数据

    // 对象的属性 是 对象

    Object.defineProperty(obj, key, {
        // 拦截到了
        get: function() {
            console.log('正在访问: ' + key);
            // 是不是有一个观察者
            // 有一个观察者，在访问这个数据，所以应该将这个观察者存入订阅发布中心

            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                }
            }

            return value;
        },
        // 数据被修改调用set
        set: function(newValue) {
            console.log('正在修改' + key);
            value = newValue; // newValue 可能是一个对象
            childOb = observe(newValue); // 递归处理新的value数据
            // 找到订阅发布通知观察者
            dep.notify();
        }
    })
}

// 监听数据
class Observer {
    // 类，构造函数
    constructor(obj) {
        // 把Observer实例放在数据对象的 __ob__ 属性上
        def(obj, '__ob__', this); // 把实例自己添加进去
        this.dep = new Dep();

        // 先用当前属性存一下
        this.value = obj;
        if (Array.isArray(obj)) {
            this.value.__proto__ = arrayProto;

            this.observeArray();
        } else {
            this.walk();
        }
    }

    observeArray() {
        for (let i = 0; i < this.value.length; i++) {
            observe(this.value[i]); // 如果是对象， 不是对象就直接返回了
        }
    }

    walk() {
        // 遍历对象的每一个属性
        Object.keys(this.value).forEach(key => {
            // 拦截 下标对于数组来说不是严格的属性
            // 关注下面对象的处理
            // 对象传进去，属性传进去
            defineReactive(this.value, key);
        })
    }
}

// 判断对象，监听对象
function observe(value) {
    // 如果 value 不是一个对象，直接返回
    if (typeof value != 'object') return;
    // 如果等于 object
    // 创建 Observer 实例


    // value.__ob__ = new Observer(value);
    let ob = value.__ob__;
    if (!ob) {
        ob = new Observer(value);
    }
    // 局部变量里
    return ob;
}

function Vue(options) {
    // 将options中的内容，添加到当前对象实例中
    Object.keys(options).forEach(key => {
        this[key] = options[key];
    })


    // 处理date 数据，将它变成响应式的，可监测的
    observe(this.data);

    // 面向对象的基本思路
    // 职责分配
    console.log(this); // 打印当前对象

    new Watcher(this, 'data');
    new Watcher(this.data, 'count');
    new Watcher(this.data, 'user');
    new Watcher(this.data, 'list');
    new Watcher(this.data, 'name');
    new Watcher(this.data, 'desc');

}

Vue.$set = function(obj, key, value) {
    obj[key] = value;
    if (!Array.isArray(obj)) {
        defineReactive(obj, key);
    }
    obj.__ob__.dep.notify();
}

// 测试代码
let vm = new Vue({
    data: {
        count: 123,
        user: {
            name: 'jeskson',
            desc: '描述'
        },
        list: ['1', '2', '3', '4']
    },
    test() {
        this.data.count++;
        this.data.user.name = 'lisi';
        Vue.$set(this.data.list, 3, 'jeskson');
        this.data.list.push('ok');
    }
})


vm.test();

// Vue {
//     data: {
//         count: [Getter / Setter],
//         user: [Getter / Setter],
//         list: [Getter / Setter]
//     },
//     test: [Function: test]
// }
// 正在访问: count
// 正在访问: user
// 正在访问: list
// 正在访问: count
// 正在修改count
// 正在访问: count
// 监听count的watcher被触发了!新的值 = 124
// 正在访问: user
// 正在修改name

// data => observe 递归

// 数组做一个重新的代理

// 监听list的watcher被触发了! 新的值= 1,2,3,jeskson
// vue对数组做了拦截代理

// Vue {
//     data: {
//         count: [Getter / Setter],
//         user: [Getter / Setter],
//         list: [Getter / Setter]
//     },
//     test: [Function: test]
// }
// 正在访问: count
// 正在访问: user
// 正在访问: list
// 正在访问: count
// 正在修改count
// 正在访问: count
// 监听count的watcher被触发了!新的值 = 124
// 正在访问: user
// 正在修改name
// 正在访问: list
// 正在访问: list
// 监听list的watcher被触发了!新的值 = 1, 2, 3, jeskson
// 正在访问: list
// 正在访问: list
// 监听list的watcher被触发了!新的值 = 1, 2, 3, jeskson, ok