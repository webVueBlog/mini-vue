/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
(140 ms)
 */
var firstMissingPositive = function(nums) {    
    let m = new Map();
    for (let i = 0; i < nums.length; i++) {
        m.set(nums[i], 1);
    }
    for (let i = 1; i <= nums.length; i++) {
        if (!m.has(i)) return i;
    }
    return nums.length + 1; // the array is [1,2,...,n]
    // Time Complexity: O(n)
    // Space Complexity: O(n)
    /*
    The worst case (the first missing positive being the greatest) is
    when the array is [1,2..,n]. Therefore, in all other cases except this case, 
    the first missing positive number is less than or equal to n (nums.length).
    */
}
// @lc code=end

