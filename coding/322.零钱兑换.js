/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
[1,2,5] 11
dp[11] 总金额为11的

dp[i] = dp[i-coin] + coin
dp[i] = Math.min(dp[i-coin] + 1, dp[i-coin] + 1 ...)
dp[11] = dp[6] + (5) / dp[9] + (2) / dp[10] + (1)
dp[6] dp[9] dp[10]
dp[6] = dp[1] + (5) / dp[4] + (2) / dp[5] + (1)
dp[1] dp[4] dp[5]
dp[1] = dp[-4] + (5) / dp[-1] + 2 / dp[0] + (1)
凑成总金额所需的最少的硬币个数
求最小的
                           [1,2,5] 11
(96 ms)

 */
var coinChange = function(coins, amount) {
 const dp = new Array(amount + 1).fill(Infinity)
 dp[0] = 0;
 // 从1到11
 for(let i = 1; i <= amount; i++) {
  // dp[1]到dp[11]
  for(let coin of coins) {
   if(i - coin < 0) continue;
   dp[i] = Math.min(dp[i], dp[i-coin] + 1)
  }
 }
 return dp[amount] === Infinity ? -1 : dp[amount]
};
// @lc code=end

