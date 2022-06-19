/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
思路：

这道题有一个特点就是每个数之和它后面的数组合，例如`[1,2,3,4]`，组合成4个数的，只存在`[1,2,3,4]`,不会出现`[3,2,1,4]`之类的。

因此可以跟踪一个变量`start`，维护每次开始的索引位置，当长度打到`k`后，停止并且保存到结果。

思路：

这道题有一个特点就是每个数之和它后面的数组合，例如`[1,2,3,4]`，组合成4个数的，只存在`[1,2,3,4]`,不会出现`[3,2,1,4]`之类的。

因此可以跟踪一个变量`start`，维护每次开始的索引位置，当长度打到`k`后，停止并且保存到结果。

 */
var combine = function(n, k) {
 let res = []
 function backtrack(start, arr) {
  if(arr.length === k) {
   return res.push(arr.slice())
  }
  for(let i = start; i <= n; i++) {
   arr.push(i);
   backtrack(i+1, arr)
   arr.pop()
  }
 }
 backtrack(1, [])
 return res
};
// @lc code=end

