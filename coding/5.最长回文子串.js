/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
  const n = s.length;
  let [start, maxLen] = [0, 1];
  
  const expendAroundMiddle = (left, right) => {
      while (left >= 0 && right < n && s[left] === s[right]) {
          const currLen = right - left + 1;
          if (currLen > maxLen) {
              maxLen = currLen;
              start = left;
          }
          
          left--;
          right++;
      }
  }
  
  for (let i = 0; i < n; i++) {
      expendAroundMiddle(i, i);
      expendAroundMiddle(i, i + 1);
  }
  
  return s.slice(start, start + maxLen);
};
// @lc code=end

