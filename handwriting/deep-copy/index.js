/**
 * 深拷贝
 * 
 * @param { any } src 原数据
 * @returns 返回拷贝后的数据
 */
module.exports = function deepCopy(src, cache = new WeakMap()) {
	// 拷贝原始值，直接返回原始值本身
	if (isPrimitiveType(src)) return src

	// 解决循环引用的问题，该 if 分支写这里方便理解
	if (cache.has(src)) return src
	cache.set(src, true)

	// 拷贝数组
	if (isArray(src)) {
		const ret = []
		for (let i = 0, len = src.length; i < len; i++) {
			ret.push(deepCopy(src[i], cache))
		}
		return ret
	}

	// 拷贝 Map 对象
	if (isMap(src)) {
		const ret = new Map()
		src.forEach((value, key) => {
			ret.set(key, deepCopy(value, cache))
		})
		return ret
	}

	// 拷贝函数
	if (isFunction(src)) {
		copyFunction(src)
	}

	// 拷贝对象
	if (isObject(src)) {
		// 获取对象上的所有 key
		const keys = [...Object.keys(src), ...Object.getOwnPropertySymbols(src)]
		const ret = {}
		// 遍历所有的 key，递归调用 deepCopy 拷贝 obj[key] 的值
		keys.forEach(item => {
			ret[item] = deepCopy(src[item], cache)
		})
		// 返回拷贝后的对象
		return ret
	}

	// 可以在这里扩展其他情况，比如 set、WeakMap、WeakSet...
}


/**
 * 判断数据是否为原始值类型（Number、Boolean、String、Symbol、BigInt、Null、Undefined）
 * @param { any } data
 * @returns Boolean
 */
function isPrimitiveType(data) {
	const primitiveType = ['Number', 'Boolean', 'String', 'Symbol', 'BigInt', 'Null', 'Undefined']

	return primitiveType.includes(getDataType(data))
}

/**
 * 判断数据是否为 Object 类型
 * @param { any } data 
 * @returns Boolean
 */
function isObject(data) {
	return getDataType(data) === 'Object'
}

/**
 * 判断数据是否为 函数
 * @param { any } data 
 */
function isFunction(data) {
	return getDataType(data) === 'Function'
}

/**
 * 判断数据是否为 数组
 * @param { any } data 
 */
function isArray(data) {
	return getDataType(data) === 'Array'
}

/**
 * 判断数据是否为 Map
 * @param { any } data 
 */
function isMap(data) {
	return getDataType(data) === 'Map'
}

/**
 * 获取数据的类型
 * @param { any } data 
 * @returns Number, Boolean, String, Symbol, BigInt, Null, Undefined, Object, Array, Function, Date...
 */
function getDataType(data) {
	return Object.prototype.toString.apply(data).slice(8, -1)
}

/**
 * 拷贝函数
 * @param { Function } src 
 * @returns Function
 */
function copyFunction(src) {
	const fnName = src.name
	let srcStr = src.toString()
	// 匹配 function fnName，比如 function fnName() {}
	const fnDecExp = new RegExp(`function (${fnName})?`)
	// 切除匹配内容, srcStr = (xxx) {} 或 (xxx) => {} 
	srcStr = srcStr.replace(fnDecExp, '')
	// 匹配函数参数
	const argsExg = /\((.*)\)/
	let args = argsExg.exec(srcStr)
	// 函数体
	const fnBody = srcStr.replace(argsExg, '').trim()
	// { return 'test' } => return 'test'
	const fnBodyCode = /^{(.*)}$/.exec(fnBody)
	// 得到了函数的名称、参数、函数体，重新声明函数
	return new Function(...args[1].split(','), fnBodyCode[1])
}
