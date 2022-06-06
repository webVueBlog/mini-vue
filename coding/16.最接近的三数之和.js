/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}

难度：Middle

相关话题：`数组`、`双指针`

给定一个包括*n*  个整数的数组 `nums` ** 和 一个目标值 `target` 。找出 `nums` ** 中的三个整数，使得它们的和与 `target` 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```

思路：

和`NO.15`基本一样的方式，相差在于：

1. 不需要去重。
2. 不需要完全相等，而是比较当前`sum`和`target`的绝对值的差。
(68 ms)
 */
var threeSumClosest = function(nums, target) {
 // 排序
 nums.sort((a, b) => a - b)
 // 结果 数值
 let result = null;
 let min = Infinity
 for(let fix = 0; fix < nums.length - 2; fix ++) {
  let left = fix + 1, right = nums.length - 1
  let sum
  while (left < right) {
   sum = nums[fix] + nums[left] + nums[right]
   if(Math.abs(sum - target) < min) {
    min = Math.abs(sum - target)
    if(min === 0) return target
    result = sum
   }
   sum > target ? right-- : left++
  }
 }
 return result
};
// @lc code=end

