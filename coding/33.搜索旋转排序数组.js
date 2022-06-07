/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
难度：Middle

相关话题：`数组`、`二分查找`

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]` )。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是*O* (log*n* ) 级别。

```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```

思路：

`二分`，首先要找到旋转点；

* 找旋转点：选择一个随机位置`mid`，如果这个位置比`nums[0]`大，那么说明旋转点还在右边；
如果这个位置比`nums[0]`更小，说明旋转点就是当前点或者在当前点的左边。

    找出旋转点后，整个数组就被分割成了旋转点以左和旋转点以右，这两边都是有序的。

* 找`target`点：判断`target`在左侧还是在右侧，接着用最基本的二分查找`target`。
 (60 ms)
 */
 var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
    
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    // When dividing the roated array into two halves, one must be sorted.
    
    // Check if the left side is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        // target is in the left
        right = mid - 1;
        
      } else {
        // target is in the right
        left = mid + 1;
      }
    } 
    
    // Otherwise, the right side is sorted
    else {
      if (nums[mid] <= target && target <= nums[right]) {
        // target is in the right
        left = mid + 1;

      } else {
        // target is in the left
        right = mid - 1;
      }
    }
    
    
  }
    
  return -1;
};

// var search = function(nums, target) {
//  if(nums.length===0)return -1
//  let rotateIdx=findPivot(nums)
 
//  if(target>=nums[0] && target<=nums[rotateIdx-1]){
//    return bs(nums,0,rotateIdx-1)
//  }else{
//    return bs(nums,rotateIdx,nums.length-1)
//  }
 
//  function findPivot(arr){
//    let lo=0,hi=arr.length-1
//    while(lo<hi){
//      let mid=Math.floor((lo+hi)/2)
//      if(arr[mid]>=arr[0]) lo=mid+1
//      else hi=mid
//    }
//    return lo
//  }
 
//  function bs(nums,lo,hi){
//    while(lo<=hi){
//      let mid=Math.floor((lo+hi)/2)
//      if(nums[mid]>target) hi=mid-1
//      else if(nums[mid]<target)lo=mid+1
//      else return mid
//    }
//    return -1
//  }
// };
// @lc code=end

