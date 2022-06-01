/**
 * Object.create
 * @param { Object } proto，新对象的原型对象  
 * @param { Object } props Object.defineProperties 的第二个参数，要定义其可枚举属性或修改的属性描述符的对象。对象中存在的属性描述符主要有两种：数据描述符和访问器描述符
 */
Object.myCreate = function(proto, props) {
    if (typeof proto !== 'object') {
        console.error('Object prototype may only be an Object or null')
        return
    }
    // 创建的空对象
    const obj = {}
    // 设置原型对象
    Object.setPrototypeOf(obj, proto)
    // 设置对象的初始数据
    if (props) {
        Object.defineProperties(obj, props)
    }

    return obj
}