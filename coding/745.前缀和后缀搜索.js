/*
 * @lc app=leetcode.cn id=745 lang=javascript
 *
 * [745] 前缀和后缀搜索
 */

// @lc code=start
/**
 * @param {string[]} words
 */
 var WordFilter = function(words) {
  this.map = {};
  for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length; j++) {
          const target = word.slice(j) + '#' + word;
          let node = this.map;
          for (let c of target) {
              if (!node[c]) node[c] = {};
              node = node[c];
              node.w = i;
          }           
      }
  }
};

/** 
* @param {string} prefix 
* @param {string} suffix
* @return {number}
*/
WordFilter.prototype.f = function(prefix, suffix) {
  let node = this.map;
  const target = suffix + '#' + prefix;
  for (let c of target) {
      if (!node[c]) return -1;
      node = node[c];
  }

  return node.w;
};

/** 
* Your WordFilter object will be instantiated and called as such:
* var obj = new WordFilter(words)
* var param_1 = obj.f(prefix,suffix)
*/
// @lc code=end

