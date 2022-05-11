## 全局API

- Vue.use
- Vue.mixin
- Vue.component
- Vue.filter
- Vue.directive
- Vue.extend
- Vue.set
- Vue.delete
- Vue.nextTick

global-api 定义全局API


```js
vm.$set(target, propertyName/index, value)

参数:
{Object | Array} target
{string | number} propertyName/index
{any} value

返回值：设置的值

用法：
这是全局Vue.set的别名。
```

Vue.set 向响应式对象中添加一个property，并确保这个新property同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新property，因为Vue无法探测普通的新增property，如：`this.myObject.newProperty = 'hi'`

Vue.extend(options)

参数： `{Object} options`

用法：

使用基础Vue构造器，创建一个“子类”，参数是一个包含组件选项的对象。

data选项是特例，需要注意，在Vue.extend() 中必须是函数

```js
<div id="mount-point"></div>

// 创建构造器
var Profile = Vue.extend({
 template: `<p>{{firstName}} {{lastName}} aka {{alias}}</p>`,
 data: function() {
  return (
   firstName: 'Walter',
   lastName: 'White',
   alias: 'Heisenberg'
  )
 }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profie().$mount('$mount-point')

<p>Walter White aka Heisenberg</p>
```

Vue的众多全局API的实现大部分放在 `/src/core/global-api` 目录下，这些全局API源码阅读入口则在 `index.js`文件中.

```js
// 初始化 Vue的众多全局API
// 默认配置 Vue.config
// 工具方法：Vue.util.xx
// Vue.set Vue.delete Vue.nextTick Vue.observable
// Vue.options.components Vue.options.directives Vue.options.filters
// Vue.options._base
// Vue.use Vue.extend Vue.mixin Vue.component Vue.directive Vue.filter
export function initGlobalAPI(Vue: GlobalAPI) {
 // config
 const configDef = {}
 // Vue的众多默认配置项
 configDef.get = {} => config

 if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }

// Vue.config
Object.defineProperty(Vue, 'config', configDef)

// 暴露一些工具方法，轻易不要使用这些工具方法
Vue.util = {
 // 暴露日志
 warn,
 // 类似选项合并
 extend,
 // 合并选项
 mergeOptions,
 // 设置响应式
 defineReactive
}

 // Vue.set / delete / nextTick
 Vue.set = set
 Vue.delete = del
 Vue.nextTick = nextTick

 // 响应式方法
 Vue.observable = <T>{obj: T}: T => {
  observe(obj)
  return obj
 }

 // Vue.options.components/directives/filter
 Vue.options = Object.create(null)
 ASSET_TYPES.forEach(type => {
  Vue.options[type + 's'] = Object.create(null) 
 })

 // 将Vue构造函数挂载到Vue.options._base上
 Vue.options._base = Vue

 // 在Vue.options.components 中添加内置组件，比如keep-alive
 extend(Vue.options.components, builtInComponents)

 // Vue.use
 initUse(Vue)
 // Vue.mixin
 initMixin(Vue)
 // Vue.extend
 initExtend(Vue)
 // Vue.component/directive/filter
 initAssetRegisters(Vue)
}
```

Vue.use

```js
// 定义Vue.use，负责为Vue安装插件，做了两件事
// 1.判断插件是否已经被安装，如果安装直接结束
// 2.安装插件，执行插件的install方法
// 返回Vue实例
Vue.use = function (plugin: Function | Object) {
 // 已经安装过的插件列表
 const installedPlugins = (this._installedPlugins || [this._installedPlugins = []])
 // 判断 plugin 是否已经安装，保证不重复安装
 if(installedPlugins.indexOf(plugin) > -1) {
  return this
 }

 // 将Vue实例放到第一个参数位置，然后将这些参数传递给install方法
 const args = toArray(arguments, 1)
 args.unshift(this)

 if(typeof plugin.install === 'function') {
  // plugin 是一个对象，则执行其install方法安装插件
  plugin.install.apply(plugin, args)
 } else if(typeof plugin === 'function') {
  // 执行直接plugin方法安装插件
  plugin.apply(null, args)
 }
 // 在插件列表中添加新安装的插件
 installedPlugins.push(plugin)
 return this
}
```

Vue.mixin

```js
// 定义Vue.mixin,负责全局混入选项，影响之后所有创建的Vue实例，这些实例会合并全局混入的选项
// 返回Vue实例

Vue.mixin = function(mixin: Object) {
 // 在Vue的默认配置项上合并mixin对象
 this.options = mergeOptions(this.options, mixin)
 return this;
}
```

Vue.use(plugin)做了什么？

负责安装plugin插件，其实就是执行插件提供的install方法

- 首先判断该插件是否已经安装过
- 如果没有，则执行插件提供的install方法安装插件，具体做什么由插件自己决定

Vue.mixin(options)做了什么？

负责在Vue的全局配置上合并options配置，然后在每个组件生成vnode时将全局配置合并到组件自身的配置上来

- 标准化 options 对象上的props, inject, directive 选项的格式
- 处理options上的extends和mixins，分别将他们合并到全局配置上
- 然后将options配置和全局配置进行合并，选项冲突时options配置会覆盖全局配置

Vue.component(compName, Comp)做了什么?

负责注册全局组件，其实就是将组件配置注册到全局配置的components选项上

(options.components)，然后各个子组件在 生成vnode时会将全局的components选项合并到局部的components配置项上。

- 如果第二个参数为空，则表示获取compName的组件构造函数
- 如果Comp是组件配置对象，则使用Vue.extend方法得到组件构造函数，否则直接进行下一步
- 在全局配置上设置组件信息，`this.options.components.compName = CompConstructor`

Vue.directive('my-directive', {xx}) 做了什么？

在全局注册 `my-directive` 指令，然后每个子组件在生成 vnode 时会将全局的 `directives` 选项合并到局部的 `directives` 选项中，原理同 `Vue.component`方法：

- 如果第二个参数为空，则获取指定指令的配置对象
- 如果不为空，如果第二个参数时一个函数的话，则生成配置对象（bind:第二个参数，update: 第二个参数）
-  然后将指令配置对象设置到全局配置上，`this.options.directives['my-directive'] = {xxx}`

`Vue.filter('my-filter', function(val) {xxx})` 做了什么？

负责在全局注册过滤器`my-filter`，然后每个子组件在生成`vnode`时会将全局的 `filters` 选项合并到局部的 `filters` 选项中，原理时：

- 如果没有提供第二个参数，则获取my-filter过滤器的回调函数
- 如果提供了第二个参数，则时设置 `this.options.filters['my-filter'] = function(val){xx}`

Vue.extend(options) 做了什么？

Vue.extend 基于Vue创建一个子类，参数 `options` 会作为该子类的默认全局配置，就像Vue的默认全局配置一样。所以通过Vue.extend扩展一个子类，一大用处就是内置一些公共配置，供子类的子类使用。

- 定义子类构造函数，这里和Vue一样，也是调用 `_init(options)`
- 合并 Vue 的配置和 `options`，如果选项冲突，则`options`的选项会覆盖Vue的配置项
- 给子类定义全局API，值为Vue的全局API，比如 `Sub.extend=Super.extend`，这样子类同样可以扩展出其它子类
- 返回子类`Sub`


Vue.set(target, key, val) 做了什么

由于Vue无法探测普通的新增 property (比如this.myObject.newProperty='hi') , 所以通过Vue.set为响应式对象中添加一个property, 可以确保这个新property同样是响应式的，且触发视图更新。

- 更新数组指定下标的元素：Vue.set(array, idx, val)，内部通过 splice 方法实现响应式更新
- 更新对象已有属性：`Vue.set(obj, key, val)`，直接更新即可 => `obj[key]=val`

- 不能向Vue实例或者 `$data`动态添加根级别的响应式数据
- `Vue.set(obj, key, val)` ，如果obj不是响应式对象，会执行`obj[key]=val`，但是不会做响应式处理
- `Vue.set(obj, key, val)`，为响应式对象 obj 增加一个新的key，则通过`defineReactive`方法设置响应式，并触发依赖更新


Vue.delete(target, key) 做了什么

删除对象的property, 如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开Vue不能检测到property被删除的限制，但是你应该很少会使用它。当然同样不能删除根级别的响应式属性。

- Vue.delete(array, idx), 删除指定下标的元素，内部是通过 splice 方法实现的
- 删除响应式对象上的某个属性： Vue.delete(obj, key), 内部是执行 `delete obj.key`， 然后执行依赖更新即可

Vue.nextTick(cb) 做了什么？

Vue.nextTick(cb)方法的作用是延迟回调函数 cb 的执行，一般用于 this.key = newVal 更改数据后，想立即获取更改过后的DOM数据。

```js
this.key = 'xxx'
Vue.nextTick(function() {
 // DOM更新了
})
```

其内部的执行过程是：

- `this.key='xxx'` ，触发依赖通知更新，将负责更新的`watcher`放入`watcher`队列
- 将刷新 `watcher` 队列的按时放到 callbacks 数组中
- 在浏览器的异步任务队列中放入一个刷新 callbacks 数组的函数
- `Vue.nextTick(cb)`来插队，将cb函数放入 callbacks 数组
- 待将来的某个时候执行刷新 callbacks 数组的函数
- 然后执行 callbacks 数组中的众多函数，触发watcher.run的执行，更新DOM
- 由于cb函数是在后面放到callbacks数组，所以这就是保证了先完成的DOM更新，再执行cb函数。

