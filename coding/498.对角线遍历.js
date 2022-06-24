/*
 * @lc app=leetcode.cn id=498 lang=javascript
 *
 * [498] 对角线遍历
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
 var findDiagonalOrder = function(mat) {
  const [m, n] = [mat.length, mat[0].length];
  const nums = [];
  
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          nums[i + j] ? nums[i + j].push(mat[i][j]) : nums[i + j] = [mat[i][j]];
      }
  }
  
  return nums.reduce((arr, curr, i) => {
      !(i % 2) ? arr.push(...curr.reverse()) : arr.push(...curr);
      
      return arr;
  }, [])
};
// @lc code=end

