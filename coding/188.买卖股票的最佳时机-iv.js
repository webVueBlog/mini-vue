/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
最多完成k笔交易，获取最大利润
dp[3][0][0] = dp[2][0][0] dp[2][-1][1]+prices[3]
dp[3][0][1] = dp[2][0][0]-prices[3] dp[2][0][1]
(92 ms)
 */
var maxProfit = function(K, prices) {
 const n = prices.length;

 if(n === 0) return 0;

 const dp = new Array(n).fill(0).map(() => {
  return new Array(K+1).fill(0).map(() => {
   return new Array(2).fill(0)
  })
 });

 for(let i = 0; i < n; i++) {
  for(let k = 0; k <= K; k++) {
   //判断i=0
   if(i === 0) {
    dp[i][k][0] = 0;
    dp[i][k][1] = -prices[i];
    continue
   }
   // 0笔
   if(k === 0) {
    // 0笔 未持有
    dp[i][k][0] = 0
   } else {
    dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k-1][1] + prices[i]);
   }
   dp[i][k][1] = Math.max(dp[i-1][k][0] - prices[i], dp[i-1][k][1]);
  }
 }

 return dp[n-1][K][0]
};
// @lc code=end

