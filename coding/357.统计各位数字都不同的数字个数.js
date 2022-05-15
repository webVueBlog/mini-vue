/*
 * @lc app=leetcode.cn id=357 lang=javascript
 *
 * [357] 统计各位数字都不同的数字个数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
给你一个整数 n ，统计并返回各位数字都不同的数字 x 的个数，其中 0 <= x < 10n 。

输入：n = 2
输出：91
解释：答案应为除去 11、22、33、44、55、66、77、88、99 外，在 0 ≤ x < 100 范围内的所有数字。 

输入：n = 0
输出：1

(48 ms)
 */
  // (60 ms)
var countNumbersWithUniqueDigits = function(n) {
 if(n === 0) return 1;
 if(n === 1) return 10;

 let res = 9;
 for(let i = 0; i < n - 1; i++) {
  res *= 9 - i;
 }

 return res + countNumbersWithUniqueDigits(n-1);
}

// var countNumbersWithUniqueDigits = function(n) {
//  if(n === 0) return 1
//  if(n === 1) return 10

//  let [res, curr] = [10, 9];

//  for(let i = 0; i < n-1; i++) {
//   curr *= 9 - i
//   res += curr
//  }

//  return res
// };
// @lc code=end

