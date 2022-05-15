/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

输入: numRows = 5
输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

输入: numRows = 1
输出: [[1]]
 (60 ms)
 */
var generate = function(numRows) {
 let arr = [[1]]
 for(let i = 1; i < numRows; i++) {
  arr[i] = [];
  arr[i][0] = 1;
  arr[i][i] = 1;
  for(let x = 1; x < i; x++){
   arr[i][x] = arr[i-1][x-1] + arr[i-1][x];
  }
 }
 return arr;
};
// @lc code=end

