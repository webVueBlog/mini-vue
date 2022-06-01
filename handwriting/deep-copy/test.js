const deepCopy = require('./index')

/**
 * 示例
 */
// 包含特殊属性的对象
const obj = {
	[Symbol()]: 'symbol value',
	fn: function fn(arg1, arg2) { return arg1 + arg2 },
	arr: [1, 2, { key: 'value' }],
	map: new Map([['k1', 'v1'], ['k2', 'v2']]),
	key: 'value'
}
// 构建循环引用
obj.obj = obj
console.log('original object = ', obj)

// 深拷贝
const copy = deepCopy(obj)
console.log('copy obj = ', copy)

// false
console.log(obj.fn === copy.fn)
// false
console.log(obj.arr === copy.arr)
// false
console.log(obj.arr[2] === copy.arr[2])