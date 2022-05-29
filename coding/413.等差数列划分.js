/*
 * @lc app=leetcode.cn id=413 lang=javascript
 *
 * [413] 等差数列划分
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
从第三个元素开始，判断以当前元素为结尾的三个数是不是等差数列
是，那么以当前为结尾的等差数组个数为 dp[i-1] + 1
不是，那么以当前数为结尾的等差数组的个数为 0

[1,2,3,4,5,6]
[1,2,3,4] [2,3,4]
[1,2,3,4,5] [2,3,4,5] [3,4,5]

dp[i] 以i为结尾的等差子数组的个数
(56 ms)
 */
var numberOfArithmeticSlices = function(A) {
    let sum = 0;
    dp = Array(A.length).fill(0);
    for (var i = 2; i <= dp.length - 1; i++) {
        if (A[i] - A[i - 1] === A[i - 1] - A[i - 2]) {
            dp[i] = 1 + dp[i - 1];
            sum += dp[i];
        }
    }
    return sum;
};
// @lc code=end