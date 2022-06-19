/*
 * @lc app=leetcode.cn id=611 lang=javascript
 *
 * [611] 有效三角形的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
    let n = nums.length;
    if (n < 3) return 0;
    // 排序，双指针
    nums.sort((a, b) => a - b);
    let res = 0;

    for (let i = n - 1; i > 1; i -= 1) {
        let l = 0, r = i - 1;
        while (l < r) {
            // 组成三角形，两边只和大于第三边
            if (nums[l] + nums[r] > nums[i]) {
                res += r - l;
                r -= 1
            } else {
                l += 1
            }
        }
    }
    return res
};
// @lc code=end

