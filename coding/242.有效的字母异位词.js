/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
(100 ms)
 */
var isAnagram = function(s, t) {
 return s.split('').sort().join('') === t.split('').sort().join('')
};
// @lc code=end

