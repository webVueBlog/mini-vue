promise的resolve、reject静态方法

#### 实现核心：

​			1、返回一个promise

​            2、改变promise状态

​            3、兼容处理传入的值是普通值or传入的是一个promise

#### 测试代码

```js
//原生例子
 Promise.resolve('lala').then(value =>{
     console.log(value)
 })
 Promise.reject('baba').then(reason =>{
    console.log(reason)
})
let p1 = new Promise((resolve,reject)=>{
    // resolve('success')
    reject('fail')
})
Promise.resolve(p1).then(
    value =>{
        console.log(value)
    },
    reason =>{
        console.log(reason)
    }
)

// 我的promise例子
myPromise.reslove('lala').then(value =>{
    console.log(value)
})
let p2 = new myPromise((resolve,reject)=>{
    // resolve('success')
    reject('fail')
})
myPromise.reslove(p2).then(
    value =>{
        console.log(value)
    },
    reason =>{
        console.log(reason)
    }
)
myPromise.reject('baba').then(null,reason =>{
    console.log(reason)
})

```

#### 实现代码

```js
class myPromise{// class类中追求的是严格模式
    static PENDING ='pending'     // 准备状态
    static FUFILLED ='fulfilled' //  解决状态
    static REJECTED ='rejected' //   拒绝状态
    constructor(executor){//executor 为执行者,当执行者出现异常时触发拒绝状态
        this.status = myPromise.PENDING;
        this.value = null;//promise默认有值
        this.callbacks = []
        try {
            executor(this.resolve.bind(this),this.reject.bind(this))//执行
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value){// 状态只能改变一次，所以在 resolve 与 reject 添加条件判断
        if(this.status === this.PENDING){
            this.status = myPromise.FUFILLED;
            this.value = value;
            // setTimeout不加，执行就不是异步执行
            // 加了定时器会放到任务队列里，会等这一次的同步走完之后，下一次再执行
            setTimeout(()=>{
                this.callbacks.map(callback => {
                    callback.onFulfilled(this.value)
                })
            })
        }
    }
    reject(reason){
        if(this.status === this.PENDING){
            this.status = myPromise.REJECTED;
            this.value = reason;
            setTimeout(()=>{
                this.callbacks.map(callback => {
                    callback.onRejected(this.value)
                })
            })
        }
    }
    then(onFulfilled,onRejected){
        if(typeof onFulfilled !== 'function'){// 原生promise支持then方法不传or传null参数
            onFulfilled = () => this.value //封装一个函数 // 实现.then()的链式穿透
        }
        if(typeof onRejected !== 'function'){
            onRejected = () => this.value 
        }
        let promise = new myPromise((resolve,reject)=>{
            if(this.status === myPromise.PENDING){
                this.callbacks.push({
                    onFulfilled: value =>{// 因为异步，所以这里是能访问promise的
                        this.parse(promise,onFulfilled(value) , resolve , reject)
                    },
                    onRejected: value =>{
                        this.parse(promise,onRejected(value) , resolve , reject)
                    },
                })
            }
            if(this.status === myPromise.FUFILLED){// then方法不能立即执行，只有当promise状态改变了才能执行
                setTimeout(()=>{//setTimeout不立即执行，放到下一次的任务队列中执行，用来模拟promise异步效果
                    try {// 为了处理.then方法时，传入的onFulfilled方法里有代码执行错误的问题：console.log(abc)
                        this.parse(promise,onFulfilled(this.value) , resolve , reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.status === myPromise.REJECTED){// then方法不能立即执行，只有当promise状态改变了才能执行
                setTimeout(()=>{
                    try {// 为了处理.then方法时，传入的onRejected方法里有代码执行错误的问题
                        this.parse(promise,onRejected(this.value) , resolve , reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })
        return promise
    }
    parse(promise,result,reslove,reject){
        if(promise === result){
            throw new TypeError("不能返回自身的promise")
        }
        try {
            if(result instanceof myPromise){// then中返回的是个promise
                result.then(resolve,reject)
            }else{
                resolve(result) // then中返回的是个普通值，就直接传给下一个
            }
        } catch (error) {
            reject(error)
        }
    }
    static all(promises){
        return new myPromise((reslove,reject)=>{
            promises.forEach((promise)=>{
                const allValues = []
                promise.then(
                    value =>{
                        allValues.push(value);
                        if(allValues.length === promises.length){
                            reslove(allValues)
                        }
                    },
                    reason =>{
                        reject(reason)
                    }
                )
            })
        })
    }
    static race(promises){
        return new myPromise((reslove,reject)=>{
            promises.map(promise => {
                promise.then(value =>{
                    reslove(value)
                },reason =>{
                    reject(reason)
                })
            })
        })
    }
    static reslove(value){
        return new myPromise((reslove,reject)=>{
            if(value instanceof myPromise){
                value.then(resolve,reject)
            }else{
                reslove(value)
            }
        })
    }
    static reject(value){
        return new myPromise((reslove,reject)=>{
            reject(value)
        })
    }
}
```










