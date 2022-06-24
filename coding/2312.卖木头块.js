/*
 * @lc app=leetcode.cn id=2312 lang=javascript
 *
 * [2312] 卖木头块
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} prices
 * @return {number}
 */
 var sellingWood = function(m, n, prices) {
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  
  for (const [h, w, price] of prices) dp[h][w] = price;
  
  for (let h = 0; h <= m; h++) {
      for (let w = 0; w <= n; w++) {
          for (let nh = 0; nh <= h / 2; nh++) 
              dp[h][w] = Math.max(dp[h][w], dp[nh][w] + dp[h - nh][w]);
          
          for (let nw = 0; nw <= w / 2; nw++)
              dp[h][w] = Math.max(dp[h][w], dp[h][nw] + dp[h][w - nw]);
      }
  }
  
  return dp[m][n];
};
// @lc code=end

