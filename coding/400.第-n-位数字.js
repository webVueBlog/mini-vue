/*
 * @lc app=leetcode.cn id=400 lang=javascript
 *
 * [400] 第 N 位数字
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 (60 ms)
 */
var findNthDigit = function(n) {
    let i = 1;
    while (i * 10 ** i < n) {
        n += 10 ** i;
        i++;
    }
    return `${n / i}`[n % i]
};
// @lc code=end