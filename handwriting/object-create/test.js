require('./index')

const obj = Object.myCreate(null)

// {}，没有原型的空对象
console.log(obj)

const objProps = Object.myCreate({}, {
    foo: {
        value: 'test'
    }
})

// test
console.log(objProps.foo)