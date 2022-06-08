/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *(60 ms)
 */
// var intersection = function(nums1, nums2) {
//  return [...new Set(nums1)].filter((item) => nums2.includes(item));
// };

//  (56 ms)
var intersection = function (nums1, nums2) {
 const map = new Map();
 nums1.forEach((n) => {
     map.set(n, true)
 })

 const res = [];

 nums2.forEach((m) => {
     if (map.get(m)) {
         res.push(m);
         map.delete(m)
     }
 })

 return res;
};
// @lc code=end

