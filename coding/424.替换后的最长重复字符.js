/*
 * @lc app=leetcode.cn id=424 lang=javascript
 *
 * [424] 替换后的最长重复字符
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
 var characterReplacement = function(s, k) {
  const map = {};
  let [left, right, maxCnt] = [0, 0, 0];
  
  while (right < s.length) {
      const char = s.charAt(right);
      map[char] ? map[char]++ : map[char] = 1;
      maxCnt = Math.max(maxCnt, map[char]);
      
      while (maxCnt + k < right - left + 1) map[s.charAt(left++)]--;
      
      right++;
  }
  
  return right - left;
};
// @lc code=end

