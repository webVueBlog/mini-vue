const Child = require('./index')

const ins = new Child('arg1', 'arg2')

// child name
console.log(ins.childName)
// parent name
console.log(ins.name)
// args = ['arg1', 'arg2']
console.log(ins.parentFn())