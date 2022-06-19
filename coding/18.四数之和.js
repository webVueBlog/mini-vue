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
 (72 ms)

 */
var fourSum = function (nums, target) {
    if (nums.length < 4) return [];

    // 双指针套路,排序
    nums.sort((a, b) => a - b);
    let res = [];
    for (let i = 0; i < nums.length - 3; i += 1) {
        // 如果遇到重复的数字，则跳过
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (let j = i + 1; j < nums.length - 2; j += 1) {
            // 如果遇到重复的数字，则跳过
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            const twoSum = nums[i] + nums[j];

            let l = j + 1, r = nums.length - 1;
            // 套路循环
            while (l < r) {
                const sum = twoSum + nums[l] + nums[r]
                if (sum == target) {
                    res.push([nums[i], nums[j], nums[l], nums[r]])
                    // 去重
                    while (l < r && nums[l] == nums[++l]);
                    while (l < r && nums[r] == nums[--r]);
                } else if (sum < target) {
                    l++
                } else {
                    r--
                }
            }
        }
    }
    return res
};

// var fourSum = function(nums, target) {
//   // 把数组排序好，方便去重
//   nums.sort((a,b) => a-b)
//   let res = []
//   for(let i = 0; i < nums.length - 3; i++) {
//     if(i>0 && nums[i] === nums[i-1]) continue
//     for(let j = i + 1; j < nums.length-2; j++) {
//       if(j > i+1 && nums[j] === nums[j - 1]) continue
//       let targ = target - (nums[i] + nums[j])
//       let lo = j + 1, hi = nums.length - 1
//       while(lo < hi) {
//         let sum = nums[lo] + nums[hi]
//         if(sum > targ) {
//           hi--
//         }else if(sum < targ) {
//           lo++
//         }else {
//           res.push([nums[i], nums[j], nums[lo], nums[hi]])
//           while(nums[lo] === nums[lo+1]) lo++
//           while(nums[hi] === nums[hi-1]) hi--
//           lo++
//           hi--
//         }
//       }
//     }
//   }
//   return res
// };
// @lc code=end

