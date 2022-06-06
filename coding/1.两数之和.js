/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
难度：Easy

相关话题：`数组`、`哈希表`

给定一个整数数组  `nums` 和一个目标值  `target` ，请你在该数组中找出和为目标值的那**两个** 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

 (68 ms)
 */
var twoSum = function(nums, target) {
 // 初始化哈希表
 let hash = {}
 // 遍历数组
 for(let i = 0; i < nums.length; i++) {
  // 判断哈希表的属性值是否存在
  if(hash[nums[i]] != null) {
   // 存储值
   return [hash[nums[i]], i]
  }
  // 值存在，返回I
  hash[target-nums[i]] = i
 }
}
// var twoSum = function(nums, target) {
//  let map = new Map();
//  for(let i = 0; i < nums.length; i++) {
//   if(map.has(target - nums[i])) {
//    return [map.get(target - nums[i]), i]
//   } else {
//    map.set(nums[i], i);
//   }
//  }
//  return [];
// }

//  (64 ms) 时间复杂度为O(n)。
// var twoSum = function(nums, target) {
//  let hash = {};
//  for(let i = 0; i < nums.length; i++) {
//   // 获取当前数组的值
//   const n = nums[i];
//   if(hash[target - n] !== undefined) {
//    return [hash[target-n], i];
//   }
//   // 当前对象 属性值为所在索引位置
//   hash[n] = i;
//  }
//  return [];
// };

// (68 ms) 时间复杂度为O(n)。
// var twoSum = function(nums, target) {
//  let map = new Map();
//  for(let i = 0; i < nums.length; i++) {
//   // 遍历数组
//   if(map.has(target - nums[i])) {
//    // 返回索引数组答案
//    return [map.get(target - nums[i]), i];
//   } else {
//    map.set(nums[i], i);
//   }
//  }
//  return [];
// };
// @lc code=end

