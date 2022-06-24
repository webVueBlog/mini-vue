/*
 * @lc app=leetcode.cn id=697 lang=javascript
 *
 * [697] 数组的度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findShortestSubArray = function(nums) {
    const map = {};
    let [times, minLen] = [0, 0];
    
    nums.forEach((num, i) => {
        if (!(num in map)) map[num] = [1, i, i];
        else {
            map[num][0]++;
            map[num][2] = i;
        }
        
        const [count, start, end] = map[num];
        if (count > times) [times, minLen] = [count, end - start];
        else if (count === times) minLen = Math.min(minLen, end - start);
    })
    
    return minLen + 1;
};
// @lc code=end

