/*
 * @lc app=leetcode.cn id=263 lang=javascript
 *
 * [263] 丑数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
(68 ms)
 */
var isUgly = function(n) {
 if(n<=0) return false;
 while(parseInt(n/2) === n/2) {n/=2;}
 while(parseInt(n/3) === n/3) {n/=3;}
 while(parseInt(n/5) === n/5) {n/=5;}
 return n===1
};
// @lc code=end

