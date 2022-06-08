/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}

// 解题思路
// 知道未来价格 
// 见好就收，见差就不动，局部最优
// 新建变量统计总利润
// 遍历，高就卖，低就买

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

// (48 ms)
// var maxProfit = function(prices) {
//  let profit = 0;
//  for(let i = 0; i < prices.length; i++) {
//   if(prices[i] > prices[i-1]) {
//    profit += prices[i] - prices[i - 1]
//   }
//  }
//  return profit;
// }
// @lc code=end

