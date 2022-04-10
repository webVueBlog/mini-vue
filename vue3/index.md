## 手写vue3响应式原理

- reactive 让数据变成响应式的 es6 Proxy
- effect 逻辑写在 effect 函数里的


vue2

methods: {}
data() {
 return {}
}

this.name = ''


npm i typescript

npm i vue@3.0.0 rollup @rollup/plugin-commonjs rollup-plugin-typescript2 typescript -D

tsc --init

npm config get prefix

export PATH="$PATH:/Users/jeskson/npm-global/bin"

/Users/jeskson/npm-global

tsc -v
Version 4.6.3

npm npx tsc tsserver vue vue-cli-service

npm init -y

npm run dev


Watcher 记录了一个 updateComponent()

vue2

let oldValue;
Object.defineProperty(obj, key, {
 get() {},
 set(newValue) {
  if(oldValue !== newValue) {
   dep.dispatch();
  }
 }
})

state.name name.dep [watcher, watcher] watcher.update()
Watcher 记录了一个 updateComponent(刷新视图)
Dep 每一个属性都记录一个 dep，每一个 dep 实例都存了用到这个属性的所有 watcher