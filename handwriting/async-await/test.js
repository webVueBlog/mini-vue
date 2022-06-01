function *test() {
    yield console.log(0)
    yield new Promise((resolve) => {
        setTimeout(() => {
            console.log(1)
            resolve()
        }, 2000)
    })
    yield console.log(2)
    return console.log(3)
}

// 依次输出 0 2 3 1
// const yieldExp = test()
// yieldExp.next()
// yieldExp.next()
// yieldExp.next()
// yieldExp.next()

const asyncAwait = require('./index')
// 依次输出 0 1 2 3
asyncAwait(test)