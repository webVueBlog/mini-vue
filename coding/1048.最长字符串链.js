/*
 * @lc app=leetcode.cn id=1048 lang=javascript
 *
 * [1048] 最长字符串链
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
 var longestStrChain = function(words) {
  const cnt = Array.from({ length: 16 }, () => new Set());
  words.forEach(word => cnt[word.length - 1].add(word));
  
  const map = new Map();
  let ans = 1;
  
  for (let i = 15; i > 0; i--) {
      if (!cnt[i - 1].size) continue;
      
      for (const word of cnt[i]) {
          const wVal = map.get(word) ?? 1;
         
          for (let j = 0; j < word.length; j++) {
              const hash = word.slice(0, j) + word.slice(j + 1);
              if (cnt[i - 1].has(hash) && wVal >= (map.get(hash) ?? 1)) {
                  map.set(hash, wVal + 1);
                  ans = Math.max(ans, wVal + 1);
              }
          }
      }
  }

  return ans;
};
// @lc code=end

