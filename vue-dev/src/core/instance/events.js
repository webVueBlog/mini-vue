/* @flow */

import {
  tip,
  toArray,
  hyphenate,
  formatComponentName,
  invokeWithErrorHandling
} from '../util/index'
import { updateListeners } from '../vdom/helpers/index'

export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

let target: any

function add (event, fn) {
  target.$on(event, fn)
}

function remove (event, fn) {
  target.$off(event, fn)
}

function createOnceHandler (event, fn) {
  const _target = target
  return function onceHandler () {
    const res = fn.apply(null, arguments)
    if (res !== null) {
      _target.$off(event, onceHandler)
    }
  }
}

export function updateComponentListeners (
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}

export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  // <com @custom-click="handleCllick"/>
  // 将所有的事件和对应的回调放到vm._events对象上，格式
  // {event1: [cb1,cb2,...], ...}
  // this.$on('custom-click',function(){xxx})
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    // 事件为数组的情况
    // this.$on([event1, event2, ...], function(){xxx})
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      // 比如如果存在vm._events['custom-click'] = []
      // 一个事件可以设置多个响应函数
      // this.$on('custom-click', cb1)
      // this.$on('custom-click', cb2)
      // vm._event['custom-click'] = [cb1, cb2, ...]
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      // <comp @hook:mounted="handleHookMounted"/>
      if (hookRE.test(event)) {
        // 置为true，标记当前组件实例存在 hook event
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  // 先通过$on添加事件，然后在事件回调按时中先调用$off移除事件监听，再执行用户传递过来的回调函数
  Vue.prototype.$once = function (event: string, fn: Function): Component {
    const vm: Component = this
    // 将用户传递进来的回调做了一层包装
    function on () {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    // 将包装函数作为事件的回调函数添加
    vm.$on(event, on)
    return vm
  }

  // 移除vm._events对象上指定事件(key)的指定回调函数
  // 1.没有提供参数，将vm._events={}
  // 2.提供了第一个事件参数，表示vm._events[event] = null
  // 3.提供了两个参数，表示移除指定事件的指定回调函数
  // 一句总结就是操作通过$on设置的vm._events对象
  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    const vm: Component = this
    // all
    if (!arguments.length) {
      // 移除所有的事件监听器 => vue._events = {}
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    // 获取指定事件的回调函数
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (!fn) {
      // vm._events[event] = [cb1, cb2, ...] => vm._events[event] = null
      vm._events[event] = null
      return vm
    }
    // specific handler
    // 移除指定事件的指定回调函数
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  // 触发当前实例上的事件，附加参数都会传给监听回调
  Vue.prototype.$emit = function (event: string): Component {
    // <comp @customClick="handleClick"/>
    // $on('customClick', function() {})
    // <comp @custom-click="handleClick"/>
    // $on('custom-click', function)
    const vm: Component = this
    if (process.env.NODE_ENV !== 'production') {
      const lowerCaseEvent = event.toLowerCase()
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ` +
          `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
          `Note that HTML attributes are case-insensitive and you cannot use ` +
          `v-on to listen to camelCase events when using in-DOM templates. ` +
          `You should probably use "${hyphenate(event)}" instead of "${event}".`
        )
      }
    }
    // 从vm._events对象中获取指定事件的所有回调函数
    let cbs = vm._events[event]
    if (cbs) {
      // 数组转换，类数组转换为数组
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      // this.$emit('custom-click', arg1, arg2)
      // args = [arg1, arg2]
      const args = toArray(arguments, 1)
      const info = `event handler for "${event}"`
      for (let i = 0, l = cbs.length; i < l; i++) {
        // 执行回调函数
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
}
