/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}

一个可含重复数字的序列，按任意顺序返回所有不重复的全排列
深度回溯
(80 ms)
 */
var permuteUnique = function(nums) {
 const dfs = (curr, store, arr, len) => { // [] [1,1,2] [] 3
  if(curr.length === len) { // [1,2,1] [] [] 3
   arr.push([...curr]);
   return;
  }
  // [1] [1,2] [] 3
  // [1,1] [2] [] 3 => dfs
  for(let i = 0; i < store.length; i++) {
   if(i > 0 && store[i] === store[i-1]) {
    continue;
   }
   let select = store[i];
   dfs(
    curr.concat(select),
    store.slice(0, i).concat(store.slice(i+1)),
    arr,
    len
   )
  }
 }
 let ans = [];
 nums.sort((a, b) => a - b);
 dfs([], nums, ans, nums.length);
 return ans;
};
// @lc code=end