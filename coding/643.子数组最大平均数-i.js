/*
 * @lc app=leetcode.cn id=643 lang=javascript
 *
 * [643] 子数组最大平均数 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
    let sum = 0;
    // 先求和
    for (let i = 0; i < k; i += 1) {
        sum += nums[i]
    }

    // 再对比最大
    let maxSum = sum;
    for (let i = k; i < nums.length; i += 1) {
        sum = sum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum / k;
};
// @lc code=end

