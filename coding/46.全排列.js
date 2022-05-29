/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
给定一个不含重复数字的数组nums，返回其所有可能全排列。你可以按任意顺序返回答案

(80 ms)
 */
var permute = function(nums) {
 const dfs = (curr, store) => {
  // 1.满足条件，记录结果
  // 2.满足终止条件，立即终止
  if(curr.length === nums.length) {
   ans.push([...curr]);
   return;
  }
  // 3.继续尝试
  for(let i = 0; i < store.length; i++) {
   // i = 1;
   // [] [1,2,3]
   // [2] [1,3]
   dfs(
    curr.concat(store[i]),
    store.slice(0, i).concat(store.slice(i+1))
   )
  }
 };
 let ans = [];
 dfs([], nums);
 return ans;
};
// @lc code=end

