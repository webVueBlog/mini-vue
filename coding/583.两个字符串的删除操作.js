/*
 * @lc app=leetcode.cn id=583 lang=javascript
 *
 * [583] 两个字符串的删除操作
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var minDistance = function(word1, word2) {
  const [m, n] = [word1.length, word2.length];
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1], dp[i][j] + (word1[i] === word2[j] ? 1 : 0));
      }
  }
  
  return m + n - 2 * dp[m][n];
};
// @lc code=end

