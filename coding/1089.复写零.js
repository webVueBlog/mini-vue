/*
 * @lc app=leetcode.cn id=1089 lang=javascript
 *
 * [1089] 复写零
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
 var duplicateZeros = function(arr) {
  const n = arr.length;
  let countZero = 0;
  
  for (let num of arr) {
      if (!num) countZero++    
  }
  
  let j = n + countZero
  
  for (let i = n - 1; i >= 0; i--) {
      if (--j < n) arr[j] = arr[i]
      if (!arr[i] && --j < n) arr[j] = 0
  }
};
// @lc code=end

