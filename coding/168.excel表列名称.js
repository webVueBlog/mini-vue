/*
 * @lc app=leetcode.cn id=168 lang=javascript
 *
 * [168] Excel表列名称
 */

// @lc code=start
/**
 * @param {number} columnNumber
 * @return {string}
给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称。

A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...

输入：columnNumber = 1
输出："A"

输入：columnNumber = 28
输出："AB"

输入：columnNumber = 701
输出："ZY"

输入：columnNumber = 2147483647
输出："FXSHRXW"
 (64 ms)
 */
var convertToTitle = function(n) {
 if (n == 0) return null;
 let result = '';
 while (n > 0) {
     let r = n % 26;
     let d = parseInt(n / 26);
     if (r == 0) {
         r = 26;
         d = d - 1;
     }
     result += String.fromCharCode (64 + r);
     n = d;
 }
 return result.split('').reverse().join("");
};
// @lc code=end

