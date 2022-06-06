/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
难度：Easy

相关话题：`数组`、`双指针`

```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums的前两个元素被修改为 `1`, `2`。 

你不需要考虑数组中超出新长度后面的元素。
```

```
给定nums= [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums的前五个元素被修改为 `0`, `1`, `2`, `3`, `4`。

你不需要考虑数组中超出新长度后面的元素。
```

 */
// (64 ms)
// var removeDuplicates = function(nums) {
//  let k = 0
//  // 遍历数组
//  for(let i = 0; i < nums.length; i++) {
//     if(i === 0 || nums[i] - nums[k-1] > 0) {
//       nums[k++] = nums[i]
//     }
//  }
//  return k
// }
//(76 ms) 返回新数组的长度

var removeDuplicates = function(nums) {
   let j = 0;
   // 遍历数组
   for(let i = 0; i < nums.length; i++) {
      let cur = nums[i]
      if(cur !== nums[j]) {
         nums[++j] = cur
      }
   }
   return ++j;
}
// @lc code=end

