/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    // 在都是整数情况下使用滑动窗口
    let l = 0, r = 0;
    let sum = 0, res = Number.MAX_VALUE;

    while (r < nums.length) {
        sum += nums[r];
        r += 1;
        while (sum >= target && l < r) {
            // 达到target，缩小窗口大小
            res = Math.min(res, r - l);
            sum -= nums[l];
            l += 1
        }
    }
    return res === Number.MAX_VALUE ? 0 : res
};
// @lc code=end

