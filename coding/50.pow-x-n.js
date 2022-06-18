/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
难度：Middle

相关话题：`数学`、`二分查找`

实现[pow(*x* , *n* )](https://www.cplusplus.com/reference/valarray/pow/)
，即计算 x 的 n 次幂函数。

思路：

先处理特殊情况`n===0`，`n===1`，`n===-1`；

然后对`n`分别是偶数和奇数进行处理，最终目标就是让`n`为偶数，然后`pow(x,n)===pow(x*x,n/2)`。


 */
var myPow = function(x, n) {
 // console.log(x,n)
 if(n===0)return 1
 if(n===1)return x
 if(n===-1)return 1/x
 if(n % 2===0){
   return myPow(x*x,n/2)
 }else{
   return x*myPow(x*x,(n-1)/2)
 }
};

// var myPow = function(x, n) {
//  if (n===0) return 1;
 
//  let pow = Math.abs(n);
 
// let result = pow%2===0 ? myPow(x*x,pow/2) : myPow(x*x,(pow-1)/2) * x;
 
//  return n < 0 ? 1/result : result;
// };
// @lc code=end

