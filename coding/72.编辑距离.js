/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 
   '' h o r s e word1
''  0 1 2 3 4 5
r   1
o   2
s   3

   插入
dp[i][j]: word1 的前i个字符转换为 word2 的前j个字符

hors => ros
hor => ro

dp[3][2] ? hor => ro
 插入 dp[3][1] + 1 // hor => r r => ro // hor => r + 插入o(1)
 删除 dp[2][2] + 1 // hor => ro ho => ro // ror => ro 删除r
 替换 dp[2][1] + 1 // hor hoo ro => ro // ho => r rr 替换 ro

dp[i][j] = word1[i-1] === word2[j-1]
 ? dp[i-1][j-1]
 : min(dp[i][j-1] + 1 || dp[i-1][j] + 1 || dp[i-1][j-1] + 1)

 (88 ms)
 */
var minDistance = function(word1, word2) {
 const m = word1.length;
 const n = word2.length;
 const dp = new Array(m+1).fill(0).map(() => new Array(n+1).fill(0));
 // 遍历word1
 for(let i = 0; i <= m; i++) {
  dp[i][0] = i;
 }
 // 遍历word2
 for(let j = 0; j <= n; j++) {
  dp[0][j] = j;
 }

 for(let i = 1; i <= m; i++) {
  for(let j = 1; j <= n; j++) {
   if(word1[i-1] === word2[j-1]) {
    dp[i][j] = dp[i-1][j-1];
   } else {
    dp[i][j] = Math.min(
     dp[i][j-1],
     dp[i-1][j],
     dp[i-1][j-1]
    ) + 1;
   }
  }
 }
 return dp[m][n]
};
// @lc code=end

