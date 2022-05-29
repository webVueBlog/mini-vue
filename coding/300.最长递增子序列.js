/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
[10,9,2,5,3,7,101,18]
dp[4] 以5为结尾的最长递增子序列的长度
[10,9,2,5,3,7,101]
[10,9,2,5,3,7]
(160 ms)
 */
var lengthOfLIS = function(nums) {
 let len = nums.length;
 // 以每一项为结尾的最长递增子序列的长度
 let dp = new Array(len).fill(1);
 let max = 1;

 for(let i = 0; i < len; i++) {
  // 遍历数组的每一项
  for(let j = 0; j < i; j++) {
   // 针对左边的每一项遍历，得到左侧末尾的最长递增子序列的长度
   // dp[j]
   // [2,5,7] 2 => 5 < 7  3
   if(nums[j] < nums[i]) {
    // 如果当前左侧+1，dp[i]的最长递增子序列
    dp[i] = Math.max(dp[j] + 1, dp[i]);
   }
  }
  max = Math.max(dp[i], max)
 }
 return max;
};
// @lc code=end