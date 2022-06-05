/*
 * @lc app=leetcode.cn id=485 lang=javascript
 *
 * [485] 最大连续 1 的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。

输入：nums = [1,1,0,1,1,1]
输出：3
解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.

输入：nums = [1,0,1,1,0,1]
输出：2

(68 ms)
 */

var findMaxConsecutiveOnes = function(nums) {
    return nums.join('').split('0').reduce((max, ones) => 
    Math.max(max, ones.length), 0)
};
// @lc code=end