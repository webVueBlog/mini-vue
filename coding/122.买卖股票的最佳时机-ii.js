/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
[7,1,5,3,6,4] 第0天到第5天

dp[5][1] = Math.max(dp[4][1], dp[4][0] - price[5]) // 买
dp[5][0] = Math.max(dp[4][0], dp[4][1] + price[5]) // 卖
(64 ms)
 */
var maxProfit = function(prices) {
 const n = prices.length;
 const dp = new Array(n).fill(0).map(() => new Array(2).fill(0))
 // 第0天
 dp[0] = [0, -prices[0]]
 for(let i = 1; i < n; i++) {
  dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
  dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
 }
 // 状态转移 n-1 长度
 return dp[n-1][0];
};
// @lc code=end

