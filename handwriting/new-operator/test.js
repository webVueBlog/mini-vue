const newOperator = require('./index')

function Fn() {
    this.testProperty = 'test value'
}

Fn.prototype.testFn = function() {
    console.log('test fn')
}

const ins = newOperator(Fn)

// test value
console.log(ins.testProperty)
// test fn`
console.log(ins.testFn())

console.log('========================= 分割线 ============================')

function Test() {
    this.testProperty = 'test value'
    return {}
}

const insTest = newOperator(Test)
// {}，上面没有 testProperty 属性
console.log(insTest)
