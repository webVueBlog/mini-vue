/*
 * @lc app=leetcode.cn id=1695 lang=javascript
 *
 * [1695] 删除子数组的最大得分
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maximumUniqueSubarray = function(nums) {
  const set = new Set();
  let [start, end, sum, ans] = [0, 0, 0, 0];
  
  while (end < nums.length) {
      if (!set.has(nums[end])) {
          sum += nums[end];
          set.add(nums[end++]);
          ans = Math.max(sum, ans);
      }
      
      else {
          sum -= nums[start];
          set.delete(nums[start++]);
      }
  }
  
  return ans;
};
// @lc code=end

