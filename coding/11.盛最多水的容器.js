/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 * 双指针
矩形，高度由较小的决定的

初始状态，我们把两个线（指针）的指向开头和末尾，开始的时候有矩形面积，最短的判断高度

移动两个线之间较短的那一根 计算面积

指针逐渐移动最短的线, 高度相同的线，哪个都一样
 (68 ms)
 */
var maxArea = function(height) {
    // 定义两个指针，和一个结果
    let ans = 0,
        l = 0,
        r = height.length - 1
    // l循环去遍历
    while (l < r) {
        ans = Math.max(ans, Math.min(height[l], height[r]) * (r - l))
        height[l] < height[r] ? l++ : r--
    }
    return ans
};

// @lc code=end