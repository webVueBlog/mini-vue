/*
 * @lc app=leetcode.cn id=719 lang=javascript
 *
 * [719] 找出第 K 小的数对距离
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var smallestDistancePair = function(nums, k) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let left = 0;
    let right = nums[n - 1] - nums[0];
    
    while (left < right) {
        const mid = (left + right) >>> 1;
        if (check(mid, k, nums)) left = mid + 1;
        else right = mid;
    }
    
    return left;
};

const check = (mid, k, nums) => {
    let [count, start] = [0, 0];
    
    for (let i = 1; i < nums.length; i++) {
        while (nums[i] - nums[start] > mid) start++;
        
        count += i - start;
    }
    
    return count < k;
}
// @lc code=end

