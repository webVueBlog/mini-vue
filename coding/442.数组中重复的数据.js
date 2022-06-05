/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
(120 ms)
 */
var findDuplicates = function(nums) {
    const cache = {};
    for (const num of nums) {
        // If num not in cache
        if (!(num in cache)) {
            // Start counting num. Here we can also just mark is as true (found)
            cache[num] = 1;
        }
        // If num already in cache, increment count.
        else cache[num] += 1;
    }

    const duplicates = [];
    for (const num in cache) {
        // If any number has count = 2 (2 duplicates):
        if (cache[num] === 2) duplicates.push(num);
    }

    return duplicates;
};

// @lc code=end

