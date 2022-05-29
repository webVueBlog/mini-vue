/*
 * @lc app=leetcode.cn id=220 lang=javascript
 *
 * [220] 存在重复元素 III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
[1,5,9,1,5,9], 索引之差小于等于 k = 2, 值之差小于等于 t = 3

(392 ms)
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
 let len = nums.length;
 let window = [];
 let ans = false;
 // 遍历每一个数组
 out: for(let i = 0; i < len; i++) {
  // 获取当前值
  let value = nums[i];
  // 遍历当前窗口
  for(let j = 0; j < window.length; j++) {
   // 获取当前窗口的值
   let w = window[j];
   if(Math.abs(w - value) <= t) {
    ans = true;
    break out;
   }
  }
  // 如果找不到
  window.push(value)
  if(window.length > k) {
   window.shift();
  }
 }
 return ans;
};

// @lc code=end