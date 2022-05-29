/*
 * @lc app=leetcode.cn id=1343 lang=javascript
 *
 * [1343] 大小为 K 且平均值大于等于阈值的子数组数目
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
输入：arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
输出：3

[2,2,2,2,5,5,5,8]
 i   j
子数组的长度为3， 平均数值 大于等于 4
 (68 ms)
 */
var numOfSubarrays = function(arr, k, threshold) {
 let sum = 0;
 const len = arr.length;
 let count = 0;
 for(let i = 0; i < len; i++) {
  sum += arr[i];
  if(i >= k) {
   sum -= arr[i-k];
  }
  if(i >= k-1 && sum / k >= threshold) {
   count++;
  }
 }
 return count;
};
// @lc code=end

