## Json最大深度

```js
      a:1 -> 1
      a:'1' -> 1
      {a: 1} -> 2
      {a: [1, 2]} -> 3
  
let obj = {
  name: "abc",
  key: {
    name2: {
      name: "dd",
    },
  },
};   // 输出4
```
请实现isDeep函数

```js
// for-in是ES5标准，遍历的是key（可遍历对象、数组或字符串的key）；
// for-of是ES6标准，遍历的是value（可遍历对象、数组或字符串的value）。

// for in 遍历存在的问题
// 3.使用for-in会遍历数组所有的可枚举属性，包括原型。
//   原型方法method和name属性都会被遍历出来，
//   通常需要配合hasOwnProperty()方法判断某个属性是否该对象的实例属性，来将原型对象从循环中剔除。

function isDeep(obj) {
    let deep = 1;
    function myDeep(obj, num) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object") {
            myDeep(obj[key], num + 1);
          } else {
            // 如果 1 算 0 层，那么 
            // 开头 let depth = 0
            deep = Math.max(deep, num + 1);
          }
        }
      }
    }
    myDeep(obj, 1);
    return deep;
  }
  let res = isDeep({a:1});
  
  console.log(res)
```


```js
// for-in是ES5标准，遍历的是key（可遍历对象、数组或字符串的key）；
// for-of是ES6标准，遍历的是value（可遍历对象、数组或字符串的value）。

// for-in是ES5标准，遍历的是key（可遍历对象、数组或字符串的key）；
// for-of是ES6标准，遍历的是value（可遍历对象、数组或字符串的value）。

// for in 遍历存在的问题
// 3.使用for-in会遍历数组所有的可枚举属性，包括原型。
//   原型方法method和name属性都会被遍历出来，
//   通常需要配合hasOwnProperty()方法判断某个属性是否该对象的实例属性，来将原型对象从循环中剔除。

function getDepth(obj) {
  let depth = 0;
  if (!obj) return depth;
  for(let key in obj) {
    if(obj.hasOwnProperty(key) && typeof obj[key] == "object") {
      depth = Math.max(depth, getDepth(obj[key]));
    }
  }
  return depth + 1;
}

// 求JSON最大深度
function isDeep(obj) {
    let ans = 0;
    if (!obj) return ans;
    for (let key in obj) {
        const canLoop = obj[key] !== null && typeof obj[key] === 'object';
        if (canLoop) ans = Math.max(ans, isDeep(obj[key]));
    }

    return ans + 1;
}
```

```js
function getDepth(obj){
    let depth = 0
    for(let key in obj){
        // 有深度需要继续遍历
        if(obj.hasOwnProperty(key) && typeof obj[key]==='object'){
            depth = Math.max(depth, getDepth(obj[key]))
        }
    }
    //  需要判断一下传进来的是否是 string 或者 不是obj，如果是 string
    //  或者 1 这些数组  Object.keys(obj).length那么就是 不进行+1
    return (typeof obj === 'string' || !Object.keys(obj).length )  ? depth : depth+1
}
```