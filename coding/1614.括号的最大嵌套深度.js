/*
 * @lc app=leetcode.cn id=1614 lang=javascript
 *
 * [1614] 括号的最大嵌套深度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var maxDepth = function(s) {
  let [count, max] = [0, 0];
  
  for (let p of s) {
      if (p === '(') {
          count++;
          max = Math.max(max, count);
      }
      
      else if (p === ')') count--;
  }
  
  return max;
};
// @lc code=end

