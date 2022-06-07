/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
难度：Middle

相关话题：`数组`

实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
 `1,2,3`  &rarr;  `1,3,2` 
 `3,2,1`  &rarr;  `1,2,3` 
 `1,1,5`  &rarr;  `1,5,1` 

思路：

从最低位开始找(倒序遍历)；

1. 如果当前`nums[i]`的后面存在一个数`nums[k]>nums[i]`，那么交换`i`和`k`就是当前下一个的排列。

2. 如果不能存在这个数，那么说明`nums[i]`比它后面所有的数都大，要将它放到最末尾，通过插入排序的方法，将它与后面一个个交换直到末尾。

也就是说，对于`nums[i]`，它后面的是一个递增序列，递增序列才能保证存在`条件1`的数`nums[k]`是一个比`nums[i]`大的最小值。

 */
var nextPermutation = function(nums) {
 for(let i = nums.length-2; i>=0; i--) {

  for(let k = i; k < nums.length-1; k++) {
   if(nums[i] < nums[k+1]) return swap(nums, i, k+1)
  }

  for(let k = i; k < nums.length-1; k++) {
   swap(nums, k, k+1)
  }

 }

 function swap(arr, i, j) {
  let t = arr[i]
  arr[i] = arr[j]
  arr[j]= t
 }
}
//  (68 ms)
// var nextPermutation = function(nums) {
    
//  for(let i = nums.length-1; i >= 0; i--) {
//      if(nums[i] < nums[i+1]) {
//          const large = nextLarge(i);
//          swap(i, large);
//          reverse(i+1);
//          return;
//      }
//  }

// // If there is no next permutation reverse the arr
//  nums.reverse()
 
//  function swap(i, j) {
//      [nums[i], nums[j]] = [nums[j], nums[i]];
//  }
 
//  function reverse(idx) {
//      let start = idx, end = nums.length-1;
     
//      while(start < end) {
//          swap(start, end);
//          start++;
//          end--;
//      }
//  }
 
//  function nextLarge(idx) {
//      for(let i = nums.length-1; i > idx; i--) {
//          if(nums[i] > nums[idx]) return i;
//      }
//  }
// };
// @lc code=end

