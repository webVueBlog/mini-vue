/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
dp[最后一天][持有/未持有] = ？

[买入，卖出，冷冻期，买入，卖出] 满足最大利润条件下，尽可能地完成更多的交易
dp[3][0] = dp[2][1] dp[2][0] // 这两个不用考虑 dp[1][1] dp[1][0]
dp[3][0] = Math.max(dp[2][1] + prices[3], dp[2][0]);

dp[3][1] = dp[2][1]  dp[1][0] // 冷冻期  dp[2][0] 不需要考虑 dp[1][1]
dp[3][1] = Math.max(dp[2][1], dp[1][0] - prices[3])
(64 ms)
 */
var maxProfit = function(prices) {
 const n = prices.length;
 const dp = new Array(n).fill(0).map(() => new Array(2).fill(0));
 // -1天需要的参数
 dp[-1] = [0];
 dp[0] = [0, -prices[0]];
 // 从第一天开始
 for(let i = 1; i < n; i++) {
  dp[i][0] = Math.max(dp[i-1][1] + prices[i], dp[i-1][0]);
  dp[i][1] = Math.max(dp[i-1][1], dp[i-2][0] - prices[i]);
 }
 // 返回最后一天不持有股票
 return dp[n-1][0]
};
// @lc code=end

