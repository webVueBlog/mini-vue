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
// var threeSumClosest = function(nums, target) {
//  // 排序
//  nums.sort((a, b) => a - b)
//  // 结果 数值
//  let result = null;
//  let min = Infinity
//  for(let fix = 0; fix < nums.length - 2; fix ++) {
//   let left = fix + 1, right = nums.length - 1
//   let sum
//   while (left < right) {
//    sum = nums[fix] + nums[left] + nums[right]
//    if(Math.abs(sum - target) < min) {
//     min = Math.abs(sum - target)
//     if(min === 0) return target
//     result = sum
//    }
//    sum > target ? right-- : left++
//   }
//  }
//  return result
// };

var threeSumClosest = function (nums, target) {
    let len = nums.length, res = 0;
    let min = Infinity // 和 target 的最小差

    // 双指针前置条件，有序,这里先升序排序
    nums.sort((a, b) => a - b);

    for (let i = 0; i < len - 2; i += 1) {
        let basic = nums[i],
            l = i + 1, // 左指针先从 i 右侧的第一位开始尝试
            r = len - 1; // 右指针先从数组最后一项开始尝试

        while (l < r) {
            let sum = basic + nums[l] + nums[r] // 三数求和
            // 更新最小差
            let diff = Math.abs(sum - target)
            if (diff < min) {
                min = diff
                res = sum
            }

            if (sum < target) {
                // 和小于目标值，右移左指针
                l++
            } else if (sum > target) {
                // 和大于目标值，左移右指针
                r--
            } else {
                // 相等直接返回
                return sum
            }
        }

    }

    return res
}

// @lc code=end

