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

难度：Hard

相关话题：`字符串`、`动态规划`

给定一个只包含  `'('` 和  `')'` 的字符串，找出最长的包含有效括号的子串的长度。

```
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"
```

```
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"
```

思路：

一般来说，遇到括号问题，首先会想到用`stack`，这道题也同样，用`stack`保存每一个括号的索引值，每次`pop`的时候，
记录最大值。

另外这道题也可以用`DP`，`DP`的思路是当存在`()`，需要`+2`，当存在`(()())`，需要`+2`后再加上第一个`(`上的值。


 (60 ms)
 */
var longestValidParentheses = function(s) {
  // let stack=[-1]
  // let max=0
  // for(let i=0;i<s.length;i++){
  //   if(s[i]==="("){
  //     stack.push(i)
  //   }else{
  //     if(stack.length>1){
  //       stack.pop()
  //       max=Math.max(max,i-stack[stack.length-1])
  //     }else{
  //       stack[0]=i
  //     }
  //   }
  // }
  // return max

  var max = 0;
  var n = s.length;
  var dp = Array(n).fill(0);
  for(var i = 1; i < n; i++) {
   if(s[i] === ')' && s[i-1] === '(') {
    dp[i] = (dp[i-2] || 0) + 2;
   } else {
    if(s[i] === ')' && dp[i-1] > 0 && s[i-dp[i-1] - 1] === '(') {
     dp[i] = 2 + dp[i-1];
     dp[i] += (dp[i-dp[i]] || 0)
    }
   }
   max = Math.max(max, dp[i])
  }
  return max
}
// var longestValidParentheses = function(S) {
//   let stack = [-1], ans = 0
//   for (let i = 0; i < S.length; i++)
//       if (S[i] === '(') stack.push(i)
//       else if (stack.length === 1) stack[0] = i
//       else stack.pop(), ans = Math.max(ans, i - stack[stack.length-1])
//   return ans
// };

// var longestValidParentheses = function(s) {
//  // 字符串的长度
//  const n = s.length
//  // 栈默认给 -1 作为参照物
//  const stack = [-1]
//  let ans = 0
//  // 遍历字符串
//  for(let i = 0; i < n; i++) {
//   const ch = s[i]
//   if(ch === '(') {
//    stack.push(i); // 索引放进来，栈里的东西作为参照物
//   } else {
//    // 遇到右括号，直接pop最后一个参照物
//    stack.pop()
//    // 如果栈不为空
//    // 当前i位置到栈里的最后参照物的 中间是一段有效字符
//    // (() [-1,0,1] 2  => 2 - 0
//    if(stack.length) {
//     ans = Math.max(ans, i - stack[stack.length - 1])
//    } else {
//     // )() [-1] [1]
//     // -1取出了，左边没有参照物，就push进来就好
//     // 当作最新的参照物
//     stack.push(i)
//    }
//   }
//  }
//  return ans
// };
// @lc code=end

