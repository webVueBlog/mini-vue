/*
 * @lc app=leetcode.cn id=32 lang=javascript
 *
 * [32] 最长有效括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
关于括号题 有效指的是 一段有效字符，它的左右括号的数量是相等的
其次在你从左向右 遍历过程中 不能出现右括号 数量 大于左号的
push 一个参照物
pop 一个参照物
保持栈不能为空
 (60 ms)
 */
var longestValidParentheses = function(s) {
 // 字符串的长度
 const n = s.length
 // 栈默认给 -1 作为参照物
 const stack = [-1]
 let ans = 0
 // 遍历字符串
 for(let i = 0; i < n; i++) {
  const ch = s[i]
  if(ch === '(') {
   stack.push(i); // 索引放进来，栈里的东西作为参照物
  } else {
   // 遇到右括号，直接pop最后一个参照物
   stack.pop()
   // 如果栈不为空
   // 当前i位置到栈里的最后参照物的 中间是一段有效字符
   // (() [-1,0,1] 2  => 2 - 0
   if(stack.length) {
    ans = Math.max(ans, i - stack[stack.length - 1])
   } else {
    // )() [-1] [1]
    // -1取出了，左边没有参照物，就push进来就好
    // 当作最新的参照物
    stack.push(i)
   }
  }
 }
 return ans
};
// @lc code=end

