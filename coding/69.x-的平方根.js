/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 * 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

输入：x = 4
输出：2

输入：x = 8
输出：2
解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。

简单的二分查找。

记住每个X的平方根必须在[1,X /2 + 1]内

所以我们可以在第一个地方减半。

棘手的一点是，如果没有找到平方根，我们将返回右。

原因是平方根在[n-1, n]之间，我们可以知道当while被右打破时一定是n-1

(68 ms)
 */
var mySqrt = function(x) {

    var left = 1;
    var right = Math.floor(x / 2) + 1;
    var mid;

    while (left <= right) {
        mid = Math.floor((left + right) / 2);

        if (mid * mid > x) {
            right = mid - 1;
        } else if (mid * mid < x) {
            left = mid + 1;
        } else {
            return mid;
        }
    }

    return right;
};
// @lc code=end