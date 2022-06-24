/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var checkInclusion = function(s1, s2) {
  const cnt = new Array(26).fill(0);
  const a = 'a'.charCodeAt();
  const n = s1.length;
  
  for (let i = 0; i < n; i++) {
      cnt[s1.charCodeAt(i) - a]++;
      cnt[s2.charCodeAt(i) - a]--;
  }
  
  if (check(cnt)) return true;
  
  for (let i = n; i < s2.length; i++) {
      cnt[s2.charCodeAt(i) - a]--;
      cnt[s2.charCodeAt(i - n) - a]++;
      if (check(cnt)) return true;
  }

  return false;
};

const check = nums => nums.every(num => !num);
// @lc code=end

