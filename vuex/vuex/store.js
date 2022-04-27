import applyMixin from './mixin';
import { forEach } from './util';
import ModuleCollection from './module/module-collection'
let Vue;

function installModule(store, rootState, path, module) {
    if (path.length > 0) {
        // 如果是在子模块 我就需要将 子模块的状态定义到根模块上

        // 这个api
        if (path.length > 0) {
            let parent = path.slice(0, -1).reduce((memo, current) => {
                return memo[b];
            }, rootState)
            Vue.set(rootState, path[path.length - 1], module.state)
        }
    }
    module.forEachMutation((mutation, type) => {
        console.log(mutation, type);

        store._mutations[type] = []
        store._mutations[type].push((payload) => { // 函数包装
            mutation.call(store, module, state, payload)
        })
    });

    module.forEachAction((action, type) => {
        store._actions[type] = (store._actions[type] || [])
        store._actions[type].push((payload) => {
            action.call(store, store, payload)
        })
        console.log(action, type);
    });

    module.forEachGetters((getter, key) => {
        store._wrappedGetters[key] = function(params) {
            return getter(module.state)
        }
        console.log(getter, key);
    });

    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(key), child);
    })

}

// 最终用户拿到的是这个类的实例 原理
class Store {
    // vuex核心代码
    constructor(options) {
        // 格式化用户传入的参数 -> vue-router routes
        // 格式化成树形结构 更直观一些，后续也更好操作一些

        // 1.收集模块转换成一颗树
        this._modules = new ModuleCollection(options); // 类
        // 2.安装模块 将模块上的属性，定义在我们的store中

        this.state = this._modules.root.state; // 根的状态

        this._mutations = {}; // 存放所有模块中的mutations
        this._actions = {}; // 存放所有模块中的action
        this._wrappedGetters = {}; // 存放所有模块中的getters

        installModule(this, this.state, [], this._modules.root); // 递归安装模块
        // console.log(this._modules);

        // console.log(options)
        // this.state = options.state; // 用户传递过来的状态
        // 如果直接将state定义在实例上，稍后这个状态发生变化 视图是不会更新的。

        // defineReactive -> vue-router 只定义了一个属性
        // vue 中定义数据 属性名是有特点的 如果属性名是通过 $xxx命名的 他不会被代理到vue的实例上

        // getters 其实写的是方法，但是取值的时候，是属性
        // this.getters = options.getters;
        // this.getters = {};
        // const computed = {};

        // forEach(options.getters, (fn, key) => {
        //     computed[key] = () => { // 通过计算属性，实现懒加载
        //         return fn(this.state)
        //     }
        //     Object.defineProperty(this.getters, key, {
        //         // get: () => fn(this.state)
        //         get: () => this._vm[key]
        //     })
        // })

        // defineProperty去定义这个属性  

        // this._vm = new Vue({
        //     data: {
        //         // 内部的状态
        //         $$state: state
        //     },
        //     computed // 计算属性会将自己的属性放到实例上
        // });

        // // 发布订阅模式 将用户定义的mutation 和 action 先保存起来，稍后 当调用commit时， 就找订阅的mutation方法，调用dispatch就找对应的action方法
        // this._mutations = {}; // 同步更新
        // forEach(options.mutations, (fn, type) => {
        //     this._mutations[type] = (payload) => fn.call(this, this.state, payload)
        // });

        // this._actions = {}; // 异步更新
        // forEach(options.actions, (fn, type) => {
        //     this._actions[type] = (payload) => fn.call(this, this, payload)
        // })
    }

    commit = (type, payload) => { // 类型，方法名
        this._mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this._actions[type](payload);
    }

    // 类的属性访问器，当用户去这个实例上去state属性时，会执行此方法
    get state() {
        return this._vm._data.$$state
    }
}

// _Vue 用户传过来的构造函数
const install = (_Vue) => {
    Vue = _Vue;
    console.log('install'); // vue-router 调用install目的？注册了全局组件 注册原型方法 mixin => router实例 绑定给了所有的组件
    applyMixin(Vue) // Vue传进入
}
export {
    Store,
    install
}