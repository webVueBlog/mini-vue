/*
 * @lc app=leetcode.cn id=268 lang=javascript
 *
 * [268] 丢失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
(64 ms)
 */
var missingNumber = function(nums) {
 const res = new Array(nums.length+1).fill(-1);

 for(const num of nums) {
  res[num] = num;
 }

 return res.indexOf(-1);
};
// @lc code=end

