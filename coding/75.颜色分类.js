/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var sortColors = function(nums) {
  let [i, l, r] = [0, 0, nums.length - 1];
  
  while (i <= r) {
      if (!nums[i]) [nums[i++], nums[l++]] = [nums[l], nums[i]];
      else if (nums[i] === 2) [nums[i], nums[r--]] = [nums[r], nums[i]];        
      else i++;                                    
  }                                                                                                                                                        
};
// @lc code=end

