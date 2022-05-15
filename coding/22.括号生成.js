/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

输入：n = 1
输出：["()"]
 (68 ms)
 */
var generateParenthesis = function(n) {
 let res = [];
 // cur: 当前字符，left：当前字符左括号，right: 当前字符右括号
 const dfs = (cur, left, right) => {
  if(cur.length === n*2) {
   res.push(cur)
   return
  }
  if(left<n) {
   dfs(cur+'(',left+1,right)
  }
  if(right<left) {
   dfs(cur+')',left,right+1)
  }
 };
 dfs('',0,0);
 return res;
};
// @lc code=end

