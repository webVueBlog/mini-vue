/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
s dict 字典 [...]

dp[i] = ? 能否由 dist 拼出来前i个字符

lee
dp[3] = for(i in [0, i-1]) { dp[j] && dict[j-i] }
'' + lee
l + ee
le + e

 (60 ms)
 */
const wordBreak = (s, wordDict) => {
 const n = s.length
 const dp = new Array(n + 1).fill(false);
 // 0个字符
 dp[0] = true
 // 前1个字符
 for(let i = 1; i <= n; i++) {
  for(let j = 0; j < i; j++) {
   if(dp[j] && wordDict.indexOf(s.slice(j, i)) !== -1) {
    dp[i] = true;
    break;
   }
  }
 }
 return dp[n];
};
// @lc code=end

