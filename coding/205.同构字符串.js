/*
 * @lc app=leetcode.cn id=205 lang=javascript
 *
 * [205] 同构字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 给定两个字符串 s 和 t ，判断它们是否是同构的。

如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

输入：s = "egg", t = "add"
输出：true

(80 ms)
 */
 var isIsomorphic = function(s, t) {
  var obj = {};

  for(var i = 0; i < s.length; i++){
      if(!obj['s' + s[i]]) obj['s' + s[i]] = t[i];
      if(!obj['t' + t[i]]) obj['t' + t[i]] = s[i];
      if(t[i] != obj['s' + s[i]] || s[i] != obj['t' + t[i]]) return false;
  }
  return true;
};
// @lc code=end

