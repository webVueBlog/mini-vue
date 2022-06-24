/*
 * @lc app=leetcode.cn id=890 lang=javascript
 *
 * [890] 查找和替换模式
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
 var findAndReplacePattern = function(words, pattern) {
  return words.filter(word => replaceStr(word) === replaceStr(pattern));
};

const replaceStr = str => {
  const cnt = new Map();
  const res = [];
  
  for (let i = 0; i < str.length; ++i) {
      if (!cnt.has(str[i])) cnt.set(str[i], cnt.size);
      res[i] = cnt.get(str[i]);
  }
  
  return res.join('');
}
// @lc code=end

