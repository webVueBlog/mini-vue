/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

输入: g = [1,2,3], s = [1,1]
输出: 1
解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。

输入: g = [1,2], s = [1,2,3]
输出: 2
解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.

// 局部最优，既能满足孩子 还能消耗最少
// 遍历，找到能满足第一个孩子的饼干
// 继续遍历，直到着地第n 个
(100 ms)
 */
 var findContentChildren = function(g, s) {
  g.sort((a,b) => a-b);
  s.sort((a,b) => a-b);
  let j = 0, res = 0;
  for (let num of s) {
      if (num >= g[j]) res++, j++;
  }
  return res;
  // Time Complexity: O(nlogn)
  // Space Complexity: O(1)
};

// var findContentChildren = function (g, s) {
//  const sortFunc = (a, b) => a - b;
//  g.sort(sortFunc)
//  s.sort(sortFunc)

//  // 第一个
//  let i = 0;

//  s.forEach((n) => {
//      if(n >= g[i]) {
//          i += 1
//      }
//  })
//  return i
// };
// @lc code=end

