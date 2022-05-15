/*
 * @lc app=leetcode.cn id=371 lang=javascript
 *
 * [371] 两整数之和
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 给你两个整数 a 和 b ，不使用 运算符 + 和 - ​​​​​​​，计算并返回两整数之和。
输入：a = 1, b = 2
输出：3

输入：a = 2, b = 3
输出：5

(56 ms)
(60 ms)
 */
var getSum = function(a, b) {
 let carry;
 while((a & b) !== 0) {
  carry = (a & b) << 1;
  a = a ^ b;
  b = carry;
 }
 return a ^ b;
}

// var getSum = function(a, b) {
// return !b ? a : getSum(a ^ b, (a & b) << 1);
// };
// @lc code=end

