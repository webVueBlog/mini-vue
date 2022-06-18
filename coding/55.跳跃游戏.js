/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
难度：Middle

相关话题：`贪心算法`、`数组`

给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个位置。

思路：

贪心，对于每一个点，找到它能跳跃的最大位置，直到最后一个点，最后检查最大位置是否超过最后的点。

 */
// var canJump = function(nums) {
//  let reach = 0;
//  for (let i=0; i<nums.length-1 && i<=reach;++i){
//    reach=Math.max(i+nums[i], reach);
//  }
//  return reach >= nums.length-1
// };

var canJump = function(nums) {
 let idx = 0;
 let max = 0;
 let target = nums.length - 1;

 while(idx < nums.length) {
   max = Math.max(max, idx + nums[idx]);
   
   if (max >= target) {
     return true;
   }
   
   if (max <= idx && nums[idx] === 0) {
     return false;
   }
   
   idx++;
 }
 
 return false;
};
// @lc code=end

