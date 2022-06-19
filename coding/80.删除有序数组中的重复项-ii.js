/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
难度：Middle

相关话题：`数组`、`双指针`

给定一个排序数组，你需要在**[原地](http://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)
修改输入数组** 并在使用 O(1) 额外空间的条件下完成。

思路：

因为已经排序，并且要求最多2个重复，因此检查`nums[i]>nums[k-2]`，如果条件成立，说明`nums[i]`要么没有重复，要么有重复不超过2个，

替换`nums[k++]`，其中`k`为一个索引，`k`之前代表都是符合条件的数值。

 */
var removeDuplicates = function(nums) {
 let k = 0
 for(let i = 0; i < nums.length; i++) {
  if(i < 2 || nums[i] > nums[k-2]) {
   nums[k++] = nums[i]
  }
 }
 return k
};
// @lc code=end

