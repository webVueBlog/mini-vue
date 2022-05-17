/*
 * @lc app=leetcode.cn id=171 lang=javascript
 *
 * [171] Excel 表列序号
 */

// @lc code=start
/**
 * @param {string} columnTitle
 * @return {number}

A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...

输入: columnTitle = "A"
输出: 1

输入: columnTitle = "AB"
输出: 28

输入: columnTitle = "ZY"
输出: 701
 (76 ms)
 */
var titleToNumber = function(s) {
 const charCodeBase = 'A'.charCodeAt(0) - 1;
 const n = s.length;
 let number = 0;

 /* 
  * Think of it as base 26. For example,
  * Column number of "AB" = 1 * 26^1 + 2 * 26^0 
  */
 for (let i = 0; i < n; i++)
     number += (s.charCodeAt(i) - charCodeBase) * Math.pow(26, n-i-1);
 
 return number;
};
// @lc code=end

