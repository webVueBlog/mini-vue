/*
 * @lc app=leetcode.cn id=312 lang=javascript
 *
 * [312] 戳气球
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
[3, 1, 5, 8]
 0  1  2  3
dp[0][1] + nums[-1] * nums[2] * nums[len] + dp[3][3]

dp[0][1] = ?
 dp[0][0] = 
 dp[1][1] = 
dp[3][3] = ?

dp[0][3][?] = Math coin
dp[0][3][k] = dp[0][k] + dp[k][3] + num[0] * nums[k] * nums[3]
dp[i][j][k] = dp[i][k] + dp[k][j] + num[i] * nums[k] * nums[k]
(168 ms)
 */
var maxCoins = function(nums) {
 nums = [1, ...nums, 1];
 let len = nums.length;
 let dp = new Array(len).fill(0).map(_ => new Array(len).fill(0));
 // 起始位置
 for(let i = len-3; i >= 0; i--) {
  // 结束位置
  for(let j = i+2; j < len; j++) {
   // dp[1][5] k = 2/3/4
   for(let k = i + 1; k < j; k++) {
    dp[i][j] = Math.max(
     dp[i][j],
     dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j]
    );
   }
  }
 }
 return dp[0][len-1];
};
// @lc code=end

