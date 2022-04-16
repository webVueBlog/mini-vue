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
        changeAge({ commit }, payload) { // 参数store
            setTimeout(() => {
                commit('changeAge', 10) // 调用mutations
            }, 1000)
        }
    },
    // 模块
    modules: {
        a: {
            namespaced: true,
            state: {
                c: 100
            },
            mutations: {
                changeAge(state, payload) {
                    console.log('更新')
                }
            }
        },
        b: {
            state: {
                d: 100
            },
            // getters: {
            //     getD(state) {
            //         return state.d += 100;
            //     }
            // },
            mutations: {
                changeAge(state, payload) {
                    console.log('d 更新')
                }
            },
            modules: {
                c: {
                    namespaced: true,
                    state: {
                        e: 500
                    },
                    mutations: {
                        changeAge(state, payload) {
                            console.log('b/c 更新')
                        }
                    }
                }
            }
        }
    }
})

// b上有命名空间， c上没有

// 1.默认模块没有 作用域问题 模块名字会覆盖状态名字  相同名字
// 2.状态不要和模块的名字相同
// 3.默认计算属性 直接通过getters取值
// 4.如果增加namespaced: true 会将这个模块的属性 都封装到这个作用域下
// 5.默认会找当前模块上是否有namespace，并且将父级的namespace一同算上，做成命名空间
// 5.默认会找当前模块上是否有namespace，并且将父级的namespace一同算上，做成命名空间