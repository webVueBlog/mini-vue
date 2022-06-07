/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 */

// @lc code=start
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
难度：Middle

相关话题：`数学`、`二分查找`

给定两个整数，被除数 `dividend` 和除数 `divisor` 。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 `dividend` 除以除数 `divisor` 得到的商。

```
输入: dividend = 10, divisor = 3
输出: 3
```

```
输入: dividend = 7, divisor = -3
输出: -2
```

* 被除数和除数均为 32 位有符号整数。

* 除数不为0。

* 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [&minus;231, 231&minus; 1]。本题中，如果除法结果溢出，则返回 231&minus; 1。




var divide = function(dividend, divisor) {
  let negative=(dividend ^ divisor)<0,
      limit=Math.pow(2,31)
  
  if(dividend<divisor)return 0
  
  let res=0,count=0
  let n=0, m=dividend
  while(true){
    n+=divisor
    if(m-n>0){
      count+=1
      m=m-n
      res+=count
    }else {
      // 已经减到0了
      if(n===divisor){
        if(m-n===0)res++
        break
      }
      // 重置
      count=0
      n=0
    }
  }
  if(negative){
    return Math.max(-res,-limit)
  }else{
    return Math.min(res,limit-1)
  }
};

思路：

* 使用减法，最直观的就是每次从被除数`dividend`中减去除数`divisor`，直到`dividend<divisor`，但是效率太低，因为数值是`32`位的数值，很容易`TLE`。

* 使用叠加减法，和上面的思路差不多，但并不是每一次都只减去`divisor`，设定变量`m`，`n`分别为`dividend`还剩下的值，和当前被减的值。

   每一次都减去`divisor*i`，直到`m<0`，重置`n`，继续重复。


* 使用位操作，位操作中`>>`相当于`/2`，`<<`相当于`*2`，因此对于`dividend`，找出一个`idx`，使得`dividend>>idx`后，刚好还比`divisor`大。

    这说明`idx`对应的除数是有效的，这个除数就是`1<<idx`，再将`dividend`减去当前除数`divisor * ((1 << idx))`，也就是`(divisor << idx)`。

    另外，由于`js`存在位溢出问题，因此在执行位运算时，计算绝对值`let absBit=Math.abs((dividend >> idx))`。 
 */
// (60 ms)
var divide = function(dividend, divisor) {
  if(!dividend) return 0;

  const [min, max] = [-(2 ** 31), 2 ** 31 - 1];
  if(dividend === min && divisor === -1) return max;
  if(dividend === min && divisor === 1) return min;

  let res = 0;
  const isNeg = (dividend ^ divisor) < 0;
  [dividend, divisor] = [Math.abs(dividend), Math.abs(divisor)];

  for(let i = 31; i >= 0; i--) {
    if(dividend >>> i >= divisor) {
      res += 1 << i;
      dividend -= divisor << i;
    }
  }

  return isNeg ? -res : res;
}
// (72 ms)
// var divide = function(dividend, divisor) {
//   let negative=(dividend ^ divisor)<0,
//       limit=Math.pow(2,31)
//   dividend=Math.abs(dividend)
//   divisor=Math.abs(divisor)
//   if(dividend<divisor)return 0
  
//   let res=0,idx=32
//   while(idx>=0){
//     // JS避免位溢出
//     let absBit=Math.abs((dividend >> idx))
//     if(absBit >= divisor){
//       res+=(1 << idx)
//       dividend-=(divisor << idx)
//     }
//     idx--
//   }
//   if(negative){
//     return Math.max(-res,-limit)
//   }else{
//     return Math.min(res,limit-1)
//   }
// };
// @lc code=end

