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

难度：Middle

相关话题：`数组`、`双指针`

给定 *n*  个非负整数 *a* 1，*a* 2，...，*a* n，每个数代表坐标中的一个点(*i* ,*ai* ) 。在坐标内画 *n*  条垂直线，垂直线 *i* 的两个端点分别为(*i* ,*ai* ) 和 (*i* , 0)。找出其中的两条线，使得它们与*x* 轴共同构成的容器可以容纳最多的水。

思路：

双指针，`i`和`j`分别从头和尾开始，面积和最短的边界相关；

如果`height[i]<height[j]`，`i`可以继续右移，因为这时候的短板是`i`，因此`i`对应的数如果增大，面积也会增大；

如果`height[i]>=height[j]`，短板变为`j`，那么`i`移动对面积就没有任何变化了，因此要左移`j`，直到下一次`heigth[i]<height[j]`的时候，短板又交换。

 (68 ms)
 */

var maxArea = function(height) {
 let ans = 0, l = 0, r = height.length - 1
 // l 循环去遍历
 while(l < r) {
     ans = Math.max(ans, Math.min(height[l], height[r]) * (r - l))
     height[l] < height[r] ? l++ : r--
 }
 return ans;
}
// var maxArea = function(height) {
//     // 定义两个指针，和一个结果
//     let ans = 0,
//         l = 0,
//         r = height.length - 1
//     // l循环去遍历
//     while (l < r) {
//         ans = Math.max(ans, Math.min(height[l], height[r]) * (r - l))
//         height[l] < height[r] ? l++ : r--
//     }
//     return ans
// };

// @lc code=end