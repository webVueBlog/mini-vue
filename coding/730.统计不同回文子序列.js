/*
 * @lc app=leetcode.cn id=730 lang=javascript
 *
 * [730] 统计不同回文子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var countPalindromicSubsequences = function(s) {
  const [mod, n] = [1e9 + 7, s.length];
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  
  for (let i = 0; i < n; i++) dp[i][i] = 1;
  
  for (let k = 1; k < n; k++) {
      for (let i = 0; i < n - k; i++) {
          let j = i + k;
          if (s[i] !== s[j]) dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
          
          else {
              dp[i][j] = 2 * dp[i + 1][j - 1];
              let [l, r] = [i + 1, j - 1];
              
              while (l <= r && s[l] !== s[i]) l++;
              while (l <= r && s[r] !== s[i]) r--;
              
              if (l === r) dp[i][j]++;
              l > r ? dp[i][j] += 2 : dp[i][j] -= dp[l + 1][r - 1];
          }
          
          dp[i][j] = (dp[i][j] + mod) % mod;
      }
  }
  
  return dp[0][n - 1];
};
// @lc code=end

