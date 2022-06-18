promise串行写法

给定一个数组urls，里面保存着一组请求的url。通过调用一个getResponse(url)方法 发送异步请求。该方法返回值为一个promise。

```js
const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
const ajax1 = () =>
  timeout(3000).then(() => {
    console.log("1");
    return 1;
  });
const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });
const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

const mergePromise = (ajaxArray) => {
  // 在这里实现你的代码
};
mergePromise([ajax1, ajax2, ajax3]).then((data) => {}); // data 为 [1, 2, 3]});
// 要求分别输出// 1// 2// 3// done// [1, 2, 3]

```


```js
const mergePromise = (ajaxArray) => {
    // 在这里实现你的代码
    let results = [], ajaxArray1 = [...ajaxArray, Promise.resolve()];
        return new Promise((resolve, reject) => {
            ajaxArray1.reduce(
                (previousPromise, nextPromise) => previousPromise.then((res) => {
                    if (res) results.push(res)
                    if (results.length === ajaxArray.length) {
                        console.log("done", results)
                        resolve(results);
                    }
                    return Promise.resolve(nextPromise())
                    })
                ,
                Promise.resolve()
            )

        })
};
```




















