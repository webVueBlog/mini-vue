/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回 滑动窗口中的最大值 。

输入：nums = [1,3,-1,-3,5,3,6,7], k = 3 长度8
输出：[3,3,5,5,6,7] 长度6   8-3 + 1 = 6
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

 输入：nums = [1], k = 1
输出：[1]

 (352 ms)
[] 最左是最大值，单调递减
 */
var maxSlidingWindow = function(nums, k) {
    let ans = [];
    let window = [];
    let len = nums.length;
    for(let i = 0; i < len; i++) {
        let current = nums[i];
        while(window.length > 0 && window[0] <= i-k) {
            window.shift();
        }
        while(window.length > 0 && nums[window[window.length - 1]] < current) {
            window.pop();
        }
        window.push(i);
        if(i >= k - 1) {
            ans.push(nums[window[0]]);
        }
    }
    return ans;
}

// var maxSlidingWindow = function(nums, k) {
//     const dq = [];
//     const output = [];
    
//     for (let i = 0; i < nums.length; i++) {
//         while (dq.length && nums[dq.at(-1)] <= nums[i]) dq.pop();
        
//         dq.push(i);
//         if (dq[0] === i - k) dq.shift();
//         if (i + 1 >= k) output.push(nums[dq[0]]);
//     }
    
//     return output;
// };
// @lc code=end

