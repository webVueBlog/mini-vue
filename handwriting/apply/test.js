require('./index')

const context = {
    testProperty: 'test value'
}

function test(arg) {
    console.log(this.testProperty, arg)
}

// undefined arg
test('arg')
// test value arg
test.myApply(context, ['arg'])