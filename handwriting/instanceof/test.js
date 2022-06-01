const customInstanceof = require('./index')
/**
 * 示例
 */
function Fn() {}
const ins = new Fn()

// true
console.log(customInstanceof(ins, Fn))
// true
console.log(customInstanceof(ins, Object))
// false
console.log(customInstanceof(ins, Array))