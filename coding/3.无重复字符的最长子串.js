/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}

a b c a b c b b
  i
      j
a b c a b c b b
              i
                j
{
 a: 1,
 b: 1,
 c: 1
}
(72 ms)
 */
function lengthOfLongestSubstring(s) {
 let ans = 0;
 const map = new Map();
 let i = 0;
 for(let j = 0; j < s.length; j++) {
  const v = s[j];
  map.set(v, (map.get(v) || 0) + 1);
  // 如果当前v代表字符，它是由重复的
  while(map.get(v) > 1) {
   map.set(s[i], map.get(s[i])-1);
   i++;
  }
  ans = Math.max(j-i+1, ans)
 }
 return ans;
}
// @lc code=end

