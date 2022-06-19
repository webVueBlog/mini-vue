/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
数组排好序，[-4,-1,-1,0,1,2]
[-4,-1,-1,0,1,2]
  i
        l     l
              r
l 是小的一方 r 是大的一方
sum = -3 => -4 -1 2 => 一旦l等于r或超过，没有意义
i 指向下一个索引，如果sum=0+ l和r同时移动，否则不符合条件
跳过：
l = l + 1
r = r - 1
i = i + 1


难度：Middle

相关话题：`数组`、`双指针`

给定一个包含 *n*  个整数的数组 `nums` ，判断 `nums` 中是否存在三个元素 *a，b，c ，* 使得*a + b + c =* 0 ？找出所有满足条件且不重复的三元组。

**注意：** 答案中不可以包含重复的三元组。


```
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

思路：

最优解的时间复杂度是`O(N^2)`，排序是为了能避免没有必要的计算。

遍历`nums`，如果当前数字是`nums[i]`，那么另外2个数的和就是`-nums[i]`，由于是有序的，可以使用双指针，一个头`i`，一个尾`j`，

如果当前和`>0`，说明需要减小，因此`j--`，相反则`i++`；

如果相等则添加到结果，额外还需要去重。

 (120 ms)
*/

var threeSum = function(nums) {
    // 把数组排序好，方便去重
    nums.sort((a, b) => a - b);
    // 收集答案
    const ans = [];
    // 数组长度
    const n = nums.length;
    // i l r
    // 遍历数组每个元素
    for(let i = 0; i < n-1; i++) {
        const cur = nums[i];
        // 一样跳过 第一个遍历，第二个遍历发现与第一个相等
        if(nums[i] === nums[i-1]) {
            continue;
        }
        // 指针
        let l = i+1, r = n-1;
        // 满足条件
        while(l < r) {
            // 求和
            const sum = cur + nums[l] + nums[r];

            if(sum > 0) {
                // 大于0, r--
                // 当 l < r 防止 r--; r-1 === r
                while(l < r && nums[r-1] === nums[r]) r--;
                r--;
            } else if(sum < 0) {
                // 小于0，l++ ; l+1 === l
                while(l < r && nums[l+1] === nums[l]) l++;
                l++;
            } else {
                // 等于0 一起移动
                ans.push([cur, nums[l], nums[r]])
                while(l < r && nums[r-1] === nums[r]) r--;
                while(l < r && nums[l+1] === nums[l]) l++;
                l++;
                r--;
            }
        }
    }
    return ans;
}





// var threeSum = function (nums) {
//     const res = [];
//     nums.sort((a, b) => a - b)
//     for (let i = 0; i < nums.length - 2; i += 1) {
//         let l = i + 1, r = nums.length - 1;
//         // 如果遇到重复的数字，则跳过
//         if (i > 0 && nums[i] === nums[i - 1]) {
//             continue
//         }
//         while (l < r) {
//             if (nums[i] + nums[l] + nums[r] > 0) {
//                 r--;
//                 // 处理右指针元素重复的情况
//                 while (l < r && nums[r] === nums[r + 1]) {
//                     r--;
//                 }
//             } else if (
//                 nums[i] + nums[l] + nums[r] < 0
//             ) {
//                 l++;
//                 // 处理左指针元素重复的情况
//                 while (l < r && nums[l] === nums[l - 1]) {
//                     l++;
//                 }
//             } else {
//                 // 得到目标数字组合，推入结果数组
//                 res.push([nums[i], nums[l], nums[r]])
//                 // 左右指针一起前进
//                 l++;
//                 r--;
//                 // 若左指针元素重复，跳过
//                 while (l < r && nums[l] === nums[l - 1]) {
//                     l++;
//                 }
//                 // 若右指针元素重复，跳过
//                 while (l < r && nums[r] === nums[r + 1]) {
//                     r--;
//                 }
//             }
//         }
//     }
//     return res
// };
// @lc code=end