/*
 * @lc app=leetcode.cn id=96 lang=javascript
 *
 * [96] 不同的二叉搜索树
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
 var numTrees = function(n) {
  let res = 1;
  
  for (let i = 0; i < n; ++i) 
      res = res * 2 * (2 * i + 1) / (i + 2);
  
  return res;   
};
// @lc code=end

