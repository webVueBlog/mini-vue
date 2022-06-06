/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
难度：Middle

相关话题：`数组`、`哈希表`、`双指针`

给定一个包含*n*  个整数的数组 `nums` 和一个目标值 `target` ，判断 `nums` 中是否存在四个元素 *a，* *b，c* 和 *d* ，使得*a*  + *b*  + *c*  + *d* 的值与 `target` 相等？找出所有满足条件且不重复的四元组。

答案中不可以包含重复的四元组。

```
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

思路：

时间复杂度`O(N^3)`，`3SUM`的基础上增加一个循环，参考`NO.15`。

 */
var fourSum = function(nums, target) {

};
// @lc code=end

