## 安装依赖

```js
yarn install
```

## source map

```js
// package.json
{
 "scripts": {
  "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
 }
}
```

启动开发环境：

```js
npm run dev
```

在dist目录下生成一端特殊命令的`vue.*.js`文件

1. `Full`：一个全量的包，包含编译器(compiler)和运行时(runtime)
2. `Compiler`：编译器，负责将模板字符串，就是你编写的类html语法的模板代码，编译为JavaScript语法的render函数
3. `Runtime`：负责创建Vue实例，渲染函数，patch虚拟DOM等代码，基本上除了编译器之外的代码都属于运行时代码
4. `UMD`:兼容CommonJS和AMD规范，通过CDM引入的vue.js就是UMD规范的代码，包含编译器和运行时。
5. `CommonJS`:典型的应用比如Node.js，CommonJS规范的包是为了给browserify和webpack 1这样旧的打包器使用的，他们默认的入口文件为vue.runtime.common.js。
6. `ES Module`：现代JavaScript规范，ES Module规范的包是给像webpack2和rollup这样的现代打包器使用的。这些打包器默认使用仅包含运行时的vue.runtime.esm.js文件。

```js
// 构建文件分类
                         UMD                      CommonJS              ES Module
Full                     vue.js                   vue.common.js         vue.esm.js
Runtime-only             vue.runtime.js        vue.runtime.commom.js    vue.runtime.esm.js
Full(production)         vue.min.js             vue.common.prod.js
Runtime-only(production) vue.runtime.min.js   vue.runtime.common.prod.js
```

运行时（runtime）+编译器（compiler） vs 只包含运行时（runtime-only）

如果你需要动态编译模板，如：将字符串模板传递给template选项，或者通过提供一个挂载元素的方式编写html模板，你将需要编译器，因此需要一个完整的构建包。

当你使用vue-loader或者vueify时，`*.vue`文件中的模板在构建时会被编译为JavaScript的渲染函数，因此你不需要包含编译器的全量包，只需使用只包含运行时的包即可。

只包含运行时的包体积要比全量包的体积小30%，因此尽量使用只包含运行时的包，如果你需要使用全量包，那么你可以如下设置：

```js
// webpack
module.exports = {
 //...
 resolve: {
  alias: {
   'vue$': 'vue/dist/vue.esm.js'
  }
 }
}
```

```js
// Rollup
const alias = require('rollup-plugin-alias')

rollup({
 // ...
 plugins: [
  alias({
   'vue': 'vue/dist/vue.esm.js'
  })
 ]
})
```

```js
// Browserify
// package.json
{
 //...
 "browser": {
  "vue": "vue/dist/vue.common.js"
}
```

目录结构：

```js
benchmarks: 性能，基准测试
dist: 构建打包的输出目录
examples: 案例目录
flow: flow语法的类型声明
packages: 一些额外的包

scripts: 所有的配置文件的存放位置，比如rollup的配置文件
src: vue源码目录
compiler: 编译器
core: 运行时的核心包
components: 全局组件，比如keep-alive
config.js：一些默认配置
global-api: 全局api，比如：Vue.use()，Vue.component()等

instance: Vue实例相关的，比如Vue构造函数就在这个目录下
observer: 响应式原理
util: 工具方法
vdom: 虚拟DOM相关，比如patch算法

platforms: 平台相关的编译器代码
 web
 weex
server: 服务器渲染相关
test: 测试目录
types: TS类型声明
```