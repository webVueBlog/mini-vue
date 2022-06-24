/*
 * @lc app=leetcode.cn id=1092 lang=javascript
 *
 * [1092] 最短公共超序列
 */

// @lc code=start
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
 var shortestCommonSupersequence = function(str1, str2) {
  let [i, j, ans] = [0, 0, ''];
  
  for (let char of lcs(str1, str2)) {
      while (str1[i] !== char) ans += str1[i++];
      while (str2[j] !== char) ans += str2[j++];
      
      ans += char;
      i++;
      j++;
  }
  
  return ans + str1.slice(i) + str2.slice(j);
};

const lcs = (str1, str2) => {
  const [m, n] = [str1.length, str2.length];
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(''));
  
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          dp[i + 1][j + 1] = str1[i] === str2[j]
              ? dp[i][j] + str1[i]
              : dp[i + 1][j].length > dp[i][j + 1].length ? dp[i + 1][j] : dp[i][j + 1];
      }
  }
  
  return dp[m][n];
}
// @lc code=end

