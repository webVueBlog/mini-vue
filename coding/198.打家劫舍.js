/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
一夜之内偷窃的最高金额，相邻房屋不能偷
dp[i] = max ? 到某一天，偷窃的最高的金额

i=5
dp[5] = dp[4](可能第四天偷) / dp[3](第3天偷，第4天不偷) + nums[5]
dp[5] = dp[4] / dp[3] + nums[5]
dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
边界情况：
dp[0] // -1 -2
dp[0] dp[1] // 从2开始
(56 ms)
 */
var rob = function(nums) {
 let len = nums.length;
 let dp = new Array();
 dp[-1] = dp[-2] = 0;
 // 遍历
 for(let i = 0; i < nums.length; i++) {
  dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
 }
 return dp[len - 1]
};
// @lc code=end