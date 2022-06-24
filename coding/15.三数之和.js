/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const ans = []
    
    for (let i = 0; i < n - 2; i++) {
        if (nums[i] === nums[i - 1]) continue;
        
        let [l, r] = [i + 1, n - 1];
        while (l < r) {
            let sum = nums[i] + nums[l] + nums[r]
            if (!sum) {
                ans.push([nums[i], nums[l], nums[r]])
                while (l < r && nums[l] === nums[++l]);
                while (l < r && nums[r] === nums[--r]);
            }
            
            else sum < 0 ? l++ : r--;
        }
    }
    
    return ans;
};
// @lc code=end