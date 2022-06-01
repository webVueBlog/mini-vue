const MyPromise = require('./index')

const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve result')
        // reject('error')
    }, 2000)
})

p.then((res) => {
    console.log('success = ', res)
    return 'success'
}, (err) => {
    console.log('error = ', err)
    return 'fail'
}).then((res) => {
    console.log(res)
}, (error) => {
    console.log('err', error)
})


const p1 = new MyPromise(resolve => {
    setTimeout(() => {
        resolve(1)
    }, 3000)
})

const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('p2 失败了')
        // resolve(2)
    }, 2000)
})

// MyPromise.all([p1, p2]).then((res) => {
MyPromise.race([p1, p2]).then((res) => {
    console.log('promise static method success = ', res)
}, (errMsg) => {
    console.log('promise static method error = ', errMsg)
})
