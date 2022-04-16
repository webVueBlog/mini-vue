const applyMixin = (Vue) => { // 是个函数
        Vue.minin({ // 插件的混合 vuex 的初始化功能
            beforeCreate: vuexInit
        })
    }
    // 组件的创建过程，是先父后子
function vuexInit() {
    // vue-router 是把属性定义到了根实例上 所有组件都能拿到这个根，通过根实例获取这个属性
    // vuex 给每个组件都定义了一个$store属性，指向的是同一个人

    const options = this.$options;
    if (options.store) {
        // 根实例
        this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
        // 子组件
        this.$store = options.parent.$store;
    }
}

export default applyMixin;