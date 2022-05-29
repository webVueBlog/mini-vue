/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
获取的最大利润，最多可以完成两笔交易。
// i第几天 k第几笔 j持有/未持有
dp[3][0][0] = max(dp[2][0][0], dp[2][-1][1] + prices[3]);
dp[3][0][1] = max(dp[2][0][0] - prices[3], dp[2][0][1]);
 (732 ms)
 */
var maxProfit = function(prices) {
 const n = prices.length;
 const dp = new Array(n).fill(0).map(() => {
  return new Array(3).fill(0).map(() => {
   return new Array(2).fill(0)
  })
 })

 // 转移状态
 for(let i = 0; i < n; i++) {
  // 最多两笔
  for(let k = 0; k <= 2; k++) {
   if(i === 0) {
    dp[i][k][0] = 0
    dp[i][k][1] =  -prices[i]
    continue;
   }
   if(k === 0) {
    // 0笔交易，没有持有股票
    dp[i][k][0] = 0;
   } else {
    dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k-1][1] + prices[i]);
   }
   dp[i][k][1] = Math.max(dp[i-1][k][0] - prices[i], dp[i-1][k][1]);
  }
 }
 // 最后一天两笔未持有
 return dp[n-1][2][0];
};
// @lc code=end

