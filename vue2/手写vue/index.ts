import VNode from '../vdom/vnode'
import { arrayMethods } from './array'
import Dep from './dep'

import {
    def,
    warn,
    hasOwn,
    hasProto,
    isObject,
    isPlainObject,
    isPrimitive,
    isUndef,
    isValidArrayIndex,
    isServerRendering,
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export let shouldObserve: boolean = true
export function toggleObserving(value: boolean) {
    shouldObserve = value
}


export class Observer {
    value: any;
    dep: Dep;
    vmCount: number;

    constructor(value: any) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0

        def(value, '__ob__', this)

        if (Array.isArray(value)) {
            if (hasProto) {
                protoAugment(value, arrayMethods)
            } else {
                copyAugment(value, arrayMethods, arrayKeys)
            }
            this.observeArray(value) // 递归
        } else {
            this.walk(value)
        }
    }

    walk(obj: Object) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }

    observeArray(items: Array<any>) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}

function protoAugment(target, src: Object) {
    target.__proto__ = src
}

function copyAugment(target: Object, src: Object, keys: Array<string>) {
    for (let i = 0, l = keys.length; i < 1; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}

export function observe(value: any, asRootData?: boolean): Observer | void {
    if (!isObject(value) || value instanceof VNode) {
        return
    }
    let ob: Observer | void
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if (
        shouldObserve &&
        !isServerRendering() &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value._isVue
    ) {
        ob = new Observer(value)
    }
    if (asRootData && ob) {
        ob.vmCount ++
    }
    return ob
}

export function defineReactive(
    obj: Object,
    key: string,
    val: any,
    customSetter?: Function,
    shallow?: boolean
) {
    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }

    const getter = property && property.get
    const setter = property && property.set

    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
    }

    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            if (process.env.NODE_ENV !== 'production' && customSetter) {
                customSetter()
            }
            if (getter && !setter) return
            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal
            }
            childOb = !shallow && observe(newVal)
            dep.notify()
        }
    })

}