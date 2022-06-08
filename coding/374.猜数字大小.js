/*
 * @lc app=leetcode.cn id=374 lang=javascript
 *
 * [374] 猜数字大小
 */

// @lc code=start
/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 (56 ms)
 */
 // (52 ms)
var guessNumber = function(n) {
 const rec = (low, high) => {
  const mid = Math.floor((low + high) / 2)
  const res = guess(mid)
  if(res === 0) {
   return mid
  } else if(res === 1) {
   return rec(mid + 1, high)
  } else {
   return rec(low, mid - 1)
  }
 }
 return rec(1, n)
}
 // (60 ms)
// var guessNumber = function(n) {
//  let low = 1, hight = n;
//  while(low <= hight) {
//   const mid = Math.floor((low + hight) / 2)
//   const res = guess(mid);
//   if(res == 0) {
//    return mid
//   } else if(res === 1) {
//    low = mid + 1
//   } else {
//    hight = mid - 1
//   }
//  }
// }

// var guessNumber = function(n) {
//     let l = 0, r = n -1;
//     while(l <= r) {
//      let mid = Math.floor((l+r)/2);
//      let res = guess(mid);
//      if(res===0) return mid;
//      else if(res === 1) l = mid + 1;
//      else r = mid - 1;
//     }
//     return l;
// };
// @lc code=end

