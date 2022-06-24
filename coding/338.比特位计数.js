/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
 var countBits = function(n) {
  const dp = new Array(n + 1).fill(0);
  
  for (let i = 1; i <= n; i++) {
      dp[i] = dp[i & (i - 1)] + 1;
  }
  
  return dp;
};
// @lc code=end

