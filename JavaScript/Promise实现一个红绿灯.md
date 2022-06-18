Promise实现一个红绿灯

```js
/**
 * 题目
 *  红灯3秒亮一次，
 *  黄灯2秒亮一次，
 *  绿灯1秒亮一次；
 *  如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：
 */
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

// 实现
const light = (func, ms) => new Promise((resolve, reject) => {
    setTimeout(() => {
        func();
        resolve();
    }, ms);
    
});
const step = () => Promise.resolve()
    .then(() => {
        return light(red, 3000);
    })
    .then(() => {
        return light(yellow, 2000);
    })
    .then(() => {
        return light(green, 1000);
    }).then(() => {
        return step();
    })
step();

```






```js
function timer(color, delay) {
 return new Promise((res, rej) => {
  setTimeout(() => {
   console.log(color);
   res();
  }, delay)
 })
}

async function light() {
 await timer("red", 3000)
 await timer("green", 2000)
 await timer("yellow", 1000)
 await light();
}


light()
```





