/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
难度：Middle

相关话题：`数组`、`二分查找`

给定一个按照升序排列的整数数组  `nums` ，和一个目标值  `target` 。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是*O* (log *n* ) 级别。

如果数组中不存在目标值，返回 `[-1, -1]` 。

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```

思路：

两个`二分查找`的变形。

在升序排列中：

`bsTail`的作用是，如果存在数字`n`，找出当前数字最后一个的位置；如果不存在数字`n`，找出比当前数字小的最大的数字。

`bsHead`的作用是，如果存在数字`n`，找出当前数字的第一个出现的位置；如果不存在，找出比当前数字大的最小的数字。


 */

var searchRange = function(nums, target) {
 let h=bsHead(nums,target)
 let t=bsTail(nums,target)
 if(nums[h]===target)return [h,t]
 return [-1,-1]
 
 function bsHead(arr,n){
   let lo=0,hi=arr.length-1
   while(lo<hi){
     let mid=Math.floor((lo+hi)/2)
     if(arr[mid]<n)lo=mid+1
     else hi=mid
   }
   return hi
 }
 function bsTail(arr,n){
   let lo=0,hi=arr.length-1
   while(lo<hi){
     let mid=Math.ceil((lo+hi)/2)
     if(arr[mid]>n)hi=mid-1
     else lo=mid
   }
   return lo
 }
};

// (60 ms)
// var searchRange = function(N, T) {
//  const find = (target, arr, left=0, right=arr.length) => {
//      while (left <= right) {
//          let mid = left + right >> 1
//          if (arr[mid] < target) left = mid + 1
//          else right = mid - 1
//      }
//      return left
//  } 
//  let Tleft = find(T, N)
//  if (N[Tleft] !== T) return [-1,-1]
//  return [Tleft, find(T+1, N, Tleft) - 1]
// };
// @lc code=end

