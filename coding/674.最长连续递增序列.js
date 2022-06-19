/*
 * @lc app=leetcode.cn id=674 lang=javascript
 *
 * [674] 最长连续递增序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * [1,3,5,4,7]
 */
// var findLengthOfLCIS = function(nums) {
//     let len = nums.length;
//     let max = 0; // 最长连续递增的长度
//     let count = 1; // 本轮最长连续长度count
//     // 从左到右遍历就可以了
//     for (let i = 0; i < len; i++) {
//         if (nums[i] < nums[i + 1]) {
//             count++;
//         } else {
//             max = Math.max(count, max);
//             count = 1;
//         }
//     }
//     return max; // 返回结果
// };

var findLengthOfLCIS = function (nums) {
    let res = 0, start = 1, n = nums.length;

    if (n === 1) return 1;

    for (let i = 1; i < n; i += 1) {
        if (nums[i] <= nums[i - 1]) {
            // 小于前一个值重新计数
            start = 1;
        } else {
            // 满足递增
            start += 1
        }
        res = Math.max(res, start);
    }

    return res
};
// @lc code=end