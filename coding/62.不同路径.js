/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}

(56 ms)
 */
var uniquePaths = function(m, n) {
 let dp = new Array(m).fill(0).map(v => new Array(n).fill(0));
 dp[0][0] = 1;
 for(let i = 0; i < m; i++) {
  for(let j = 0; j < n; j++) {
   // 起始
   if(i === 0 && j === 0) continue;
   // 不越界
   let top = i <= 0 ? 0 : dp[i-1][j];
   let left = j <= 0 ? 0 : dp[i][j-1];
   dp[i][j] = top + left;
  }
 }
 return dp[m-1][n-1]
};
// @lc code=end

