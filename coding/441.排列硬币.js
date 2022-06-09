/*
 * @lc app=leetcode.cn id=441 lang=javascript
 *
 * [441] 排列硬币
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
你总共有 n 枚硬币，并计划将它们按阶梯状排列。对于一个由 k 行组成的阶梯，其第 i 行必须正好有 i 枚硬币。阶梯的最后一行 可能 是不完整的。

给你一个数字 n ，计算并返回可形成 完整阶梯行 的总行数。

输入：n = 5
输出：2
解释：因为第三行不完整，所以返回 2 。

 */
//  (84 ms)
var arrangeCoins = function(n) {
 let stairs = 1;
 while(stairs <= n) {
  n -= stairs;
  stairs++;
 }
 return stairs-1
}
// (92 ms)
// var arrangeCoins = function(n) {
//  let stairs = 0;
//  while(stairs <= n) {
//   n -= stairs;
//   stairs++;
//  }
//  return stairs-1
// };
// @lc code=end

