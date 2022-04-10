
import { track, trigger } from "./effect";
import { isObject } from "../shared/index";
import { reactive } from "./reactive";

export const baseHandler = {
 get(target, key, receiver) {
  // Reflect
  // Object.hasOwnProperty('name')
  // Object.keys({ a: 1, b: 2 })
  let value = Reflect.get(target, key, receiver);
  console.log('获取值', target, key, receiver)
  // state.name 记住 activeEffect state.name = {}
  track(target, key);
  return isObject(value) ? reactive(value) : value;
 },
 set(target, key, newValue, receiver) {
  const oldValue = target[key];;
  if (oldValue === newValue) {
   return false;
  }
  let result = Reflect.set(target, key, newValue, receiver);
  trigger(target, key);
  console.log('设置值', target, key, newValue, receiver)
  return result;
 },
}