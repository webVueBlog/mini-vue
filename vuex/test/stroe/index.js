import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    // 跨组件通信
export default new Vuex.Store({ // 内部会创造一个vue实例，通信用的。
    state: { // 组件的状态 new Vue(data)
        age: 28
    },
    getters: { // 获取计算属性，new Vue(computed) 依赖 当依赖的值变化后重新执行
        getAge(state) {
            // 如果返回的结果相同，不会重新执行这个函数
            return state.age + 10;
        }
    },
    mutations: { // vue中的方法 唯一可以改状态方法 载荷
        changeAge(state, payload) { // 同步的
            state.age += payload
        }
    },
    actions: { // 通过action中发起请求 异步操作在actions中
        changeAge({ commit }) { // 参数store
            setTimeout(() => {
                commit('changeAge', 10) // 调用mutations
            }, 3000)
        }
    },
    modules: {

    }
})