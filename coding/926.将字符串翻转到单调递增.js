/*
 * @lc app=leetcode.cn id=926 lang=javascript
 *
 * [926] 将字符串翻转到单调递增
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var minFlipsMonoIncr = function(s) {
  let [res, cntOnes] = [0, 0];
  
  for (let i = 0; i < s.length; i++)
      s[i] === '1' ? cntOnes++ : res = Math.min(res + 1, cntOnes);
  
  return res;
};
// @lc code=end

