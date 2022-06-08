/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}

难度：Easy

相关话题：`动态规划`

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警** 。

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

// (60 ms) 时间复杂度 O(N) 空间复杂度 O(N)
var rob = function(nums) {
 if(nums.length === 0) { return 0 }
 const dp = [0, nums[0]]
 for(let i = 2; i <= nums.length; i++) {
  dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i-1])
 }
 return dp[nums.length]
}

// var rob = function(nums) {
//  let len = nums.length;
//  let dp = new Array();
//  dp[-1] = dp[-2] = 0;
//  // 遍历
//  for(let i = 0; i < nums.length; i++) {
//   dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
//  }
//  return dp[len - 1]
// };
// @lc code=end