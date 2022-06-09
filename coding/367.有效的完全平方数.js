/*
 * @lc app=leetcode.cn id=367 lang=javascript
 *
 * [367] 有效的完全平方数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。

进阶：不要 使用任何内置的库函数，如  sqrt 。

输入：num = 16
输出：true

输入：num = 14
输出：false
(64 ms)
 */
// var isPerfectSquare = function(num) {
//  let [l, r] = [1, num]
//  while(l <= r) {
//   const mid = (l + r) >> 1
//   if(mid * mid === num) return true
//   if(mid * mid > num) r = mid - 1
//   else l = mid + 1
//  }
//  return false
// };

// 泰勒级数
// var isPerfectSquare = function(num) {
//  let i = 1;
//  while(num > 0){
//      num -= i;
//      i += 2
//  }
//  return num === 0
// };

// Binary search
// var isPerfectSquare = function(num) {
// if(num < 1){
//     return false
// }
// if(num === 1){
//     return true
// }
// let left = 1;
// let right = num;
// while(left <= right){
//     let mid = Math.floor((left+right)/2);
//     if(mid*mid === num){
//         return true;
//     }else if(mid*mid > num){
//         right = mid - 1;
//     }else if(mid*mid < num){
//         left = mid+1
//     }
// }
// return false
// };

// 44
var isPerfectSquare = function(num) {
 let left = 1, right = Math.floor(num / 2) + 1;
 while(left <= right) {
  const mid = Math.floor((left + right) / 2);
  if(mid*mid === num) {
   return true
  } else if(mid*mid > num) {
   right = mid - 1;
  } else if(mid*mid < num) {
   left = mid + 1;
  }
 }
 return false
}


// var isPerfectSquare = function(num) {
//  let res = Math.floor(Math.sqrt(num));
//  return res * res === num
// }
// @lc code=end

