require('./index')

const context = {
    testProperty: 'test value'
}

function test(arg1, arg2) {
    console.log(this.testProperty, arg1, arg2)
}

// undefined arg1 arg2
test('arg1', 'arg2')
const fn = test.myBind(context, 'arg1')
// test value arg
fn('arg2')