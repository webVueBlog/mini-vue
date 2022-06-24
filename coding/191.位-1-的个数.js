/*
 * @lc app=leetcode.cn id=191 lang=javascript
 *
 * [191] 位1的个数
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
 var hammingWeight = function(n) {
  let ones = 0;
  
  while (n) {
      ones += (n & 1);
      n >>>= 1;
  }
  
  return ones;
};
// @lc code=end

