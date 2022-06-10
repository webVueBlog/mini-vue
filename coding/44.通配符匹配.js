/*
 * @lc app=leetcode.cn id=44 lang=javascript
 *
 * [44] 通配符匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (string, pattern) {
  let s = 0, p = 0;
  let starIdx = -1, pointer = -1;

  while (s < string.length) {
    if ((p < pattern.length && string[s] === pattern[p]) || pattern[p] === "?") {
      s++;
      p++;
    } 
	else if (p < pattern.length && pattern[p] === "*") {
      starIdx = p;
      pointer = s;
      p++;
    } 
	else if (starIdx === -1) return false;
    else {
      p = starIdx + 1;
      s = pointer + 1;
      pointer = s;
    }
  }
  for (let idx = p; idx < pattern.length; idx++) {
    if (pattern[idx] !== "*") return false;
  }
  return true;
};

// var isMatch = function(s, p) {

// };
// @lc code=end

