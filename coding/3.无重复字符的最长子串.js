/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
(76 ms)
 */
function lengthOfLongestSubstring(s) {
  // set
  let set = new Set();
  let [left, right, max] = [0, 0, 0];
  while(right < s.length) {
    set.has(s[right]) ? set.delete(s[left++]) : set.add(s[right++])
    max = Math.max(max, set.size)
  }
  return max
}
// @lc code=end

