/*
 * @lc app=leetcode.cn id=532 lang=javascript
 *
 * [532] 数组中的 k-diff 数对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findPairs = function(nums, k) {
  nums.sort((a, b) => a - b);
  const map = {};
  
  nums.forEach(num => map[num] ? map[num]++ : map[num] = 1);
  
  return Object
      .keys(map)
      .reduce((cnt, num) => cnt += ((k > 0 && map[k + +num]) || (!k && map[num] > 1)) ? 1 : 0, 0);    
};
// @lc code=end

