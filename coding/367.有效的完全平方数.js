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
var isPerfectSquare = function(num) {
 let [l, r] = [1, num]
 while(l <= r) {
  const mid = (l + r) >> 1
  if(mid * mid === num) return true
  if(mid * mid > num) r = mid - 1
  else l = mid + 1
 }
 return false
};
// @lc code=end

