## 实现一个reduce

```js
Array.prototype.myReduce = function(fn, initialValue) {
 if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null or undefined");
    }
  if(typeof fn !== 'function'){
        throw new TypeError('not a function')
    }
  if(initialValue === undefined && arguments.length === 2){
          return NaN
      }
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;
  res = initialValue ? initialValue : arr[0]; // 不传默认取数组第一项
  startIndex = initialValue ? 0 : 1;
  for(var i = startIndex; i < arr.length; i++) {
    // 把初始值、当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].reduce((initVal,curr,index,arr))
    res = fn.call(null, res, arr[i], i, this); 
  }
  return res;
}
```

```js
/**
 * reduce是一个数组方法
 * 会对数组的每个元素进行处理，处理的函数作为形式参数传入
 * reduce最后只返回一个结果
 */

let arr = [1, 2, 3]
/**
 * arr累计器
 * cur当前值
 * index索引
 * array原数组
 * 
 * 每处理一个元素，callback都有返回值，这个返回值就是累计器，并最终成为单个结果
 */
// arr.reduce((acc, cur, index, arr) => { }, initialValue)

/**
 * 1.reduce是个函数，且有一个返回值
 * 2.reduce接受两个参数，callback和初始值
 * 3.callback接受四个参数 ：累加器，当前值，当前索引，原数组
 * 4.callback有返回值，且返回值会赋值给第一个参数
 */

Array.prototype.myReduce = function (callback, initialValue) {
    const originArr = this
    if (!originArr.length) {
        return '你这个是空数组啊'
    }
    // 累计器
    let accumular
    if (initialValue === undefined) {
        accumular = originArr[0]
    } else {
        accumular = initialValue
    }

    for (let i = 0; i < originArr.length; i++) {
        // 如果没有初始值 而且是最后一次循环 不再执行callback
        if (initialValue === undefined && (i + 1) === originArr.length) break

        accumular = callback(accumular, initialValue === undefined ? originArr[i + 1] : originArr[i], i, originArr)
    }
    return accumular

}

const r = [2, 4, 8, 1].myReduce((a, b) => Math.max(a, b))
console.log(r) // 输出： 8
```

```js
Array.prototype.myReduce = function(fn, initVal){
    // 参数校验
    if(Object.prototype.toString.call(fn) !== '[object Function]'){
        throw new Error('Not a function');
    }

    // 是否传入初始值
    let arr = this;
    if(arr.length === 0 && arguments.length === 1){
        throw new Error('TypeError: Reduce of empty array with no initial value')
    }

    let initIndex;
    // 累加器
    let accumulator;

    // 是否传入initVal
    // 就算是传入undefined也会作为初始值，因此不能判断initVal是否等于undefined来判断
    // 通过参数的长度来判断是否传入
    // 如果没有传入了第二个参数，那么初始索引我们在第二项开始执行，因为累加器会默认为数组的第一项
    // 如果传入了第二个参数，那么初始索引从0开始，因为累加器会默认为initval
    initIndex = arguments.length === 1 ? 1 : 0;
    // 设置累加器初始值
    accumulator = arguments.length === 1 ? arr[0] : initVal;

    for(let i = initIndex; i < arr.length; i++){
        // 调用回调函数并赋值给累加器
        // 回调函数中传入四个参数，分别为当前累加器的值，当前要进行累加的值，当前索引，原数组
        accumulator =  fn(accumulator, arr[i], i, arr);
    }
    return accumulator;
}
```



