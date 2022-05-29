/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
(88 ms)
 */
var moveZeroes = function(nums) {
 var pos = 0;
 for (var i = 0; i < nums.length; i++) {
     if (nums[i] !== 0) {
         nums[pos++] = nums[i];
     }
 }
 for (i = pos; i < nums.length; i++) {
     nums[i] = 0;
 }
};
// @lc code=end

