/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
难度：Middle

相关话题：`数组`、`二分查找`

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 `[0,0,1,2,2,5,6]` 可能变为 `[2,5,6,0,0,1,2]` )。

编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 `true` ，否则返回 `false` 。


* 这是 [搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/)
的延伸题目，本题中的 `nums`  可能包含重复元素。

* 这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？

思路：

参考`NO.33`，最大的不同点在于这道题在找出旋转点`rotateIdx`后，还需要检查是否有重复的旋转点；

检查重复：
```
while(nums[rotateIdx]>=nums[rotateIdx-1]){
  rotateIdx=rotateIdx-1
}
```

如果有重复的旋转点，需要跳转到第一个旋转点的位置，才能开始二分搜索。


 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  if(nums.length===0)return false
  let rotateIdx=findPivot(nums)
  
  /* 额外增加，消除重复值*/
  while(nums[rotateIdx]>=nums[rotateIdx-1]){
    rotateIdx=rotateIdx-1
  }
  
  if(target>=nums[0] && target<=nums[rotateIdx-1]){
    return bs(nums,0,rotateIdx-1)
  }else{
    return bs(nums,rotateIdx,nums.length-1)
  }
  
  function findPivot(arr){
    let lo=0,hi=arr.length-1
    while(lo<hi){
      let mid=Math.floor((lo+hi)/2)
      if(arr[mid]>=arr[0]) lo=mid+1
      else hi=mid
    }
    return lo
  }
  
  function bs(nums,lo,hi){
    while(lo<=hi){
      let mid=Math.floor((lo+hi)/2)
      if(nums[mid]>target) hi=mid-1
      else if(nums[mid]<target)lo=mid+1
      else return true
    }
    return false
  }
};
// @lc code=end

