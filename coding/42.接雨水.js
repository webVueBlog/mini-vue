/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}

你有一个水桶，或者一个凹槽

它能接多少雨水，取决于就是它两侧最短的那根柱子 就是最短

左侧最高的柱子，和右侧最高的

最左的，那个是0，从索引1开始

最右的是最高的柱子，从索引height-1 - 1开始

思路：我们只需要知道每一个柱子左侧最高的柱子的高度是多少 每一个柱子右侧最高的柱子的高度是多少
然后就能知道当前这根柱子上能不能接雨水，即能接多少鱼水 所以，我们需要两个左右柱子高度
(72 ms)
 */
var trap = function(height) {
    // 首先我们需要柱子的个数
    const n = height.length;
    // 左侧柱子最高的高度
    const left = new Array(n).fill(0);
    // 右侧柱子最高的高度
    const right = new Array(n).fill(0);
    // 接多少雨水
    let ans = 0;
    // 左侧 当前左侧最高的柱子
    for (let i = 1; i < n; i++) {
        // i左侧最高柱子的高度 
        left[i] = Math.max(left[i - 1], height[i - 1]);
    }
    // 右侧 最高的柱子
    for (let i = n - 2; i >= 0; i--) {
        right[i] = Math.max(right[i + 1], height[i + 1]);
        // 左右侧最短的柱子
        let short = Math.min(left[i], right[i]);
        // 两侧的柱子要高于当前的柱子，就能接雨水
        if (short > height[i]) { 
            ans += short - height[i];
        }
    }
    return ans;
};
// @lc code=end