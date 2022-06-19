/*
 * @lc app=leetcode.cn id=115 lang=javascript
 *
 * [115] 不同的子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
难度：Hard

相关话题：`字符串`、`动态规划`

给定一个字符串**S** 和一个字符串**T** ，计算在 **S**  的子序列中 **T**  出现的个数。

一个字符串的一个子序列是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如， `"ACE"` 是 `"ABCDE"` 的一个子序列，而 `"AEC"` 不是）

思路：

DP，`dp[i][j]`表示`[0,i]`区间的`t`和`[0,j]`区间的`s`，之间有多少个独立子序列。

设置所有`dp[0][i]`为`true`，表示当`t`为空字符串时，总是存在1个独立子序列。

当`s[j-1]===t[i-1]`，那么`dp[i][j]`就是除了当前相等的两个的序列数(`dp[i-1][j-1]`)和上一个`s`和当前`j`能匹配的序列数(`dp[i][j-1]`)。

方程为：`dp[i][j]=dp[i-1][j-1]+dp[i][j-1]`

当`s[j-1]!==t[i-1]`，那么只需要将上一次`s`与当前`j`的匹配数赋值给当前`dp[i][j]`。

方程为：`dp[i][j]=dp[i][j-1]`


 */
var numDistinct = function(s, t) {
  let M=t.length, N=s.length
  let dp=Array(M+1).fill().map(()=>Array(N+1).fill(0))
  for(let i=0;i<N;i++){
    dp[0][i]=1
  }
  for(let i=1;i<=M;i++){
    for(let j=1;j<=N;j++){
      let si=j-1,ti=i-1
      if(s[si]===t[ti]){
        dp[i][j]=dp[i-1][j-1]+dp[i][j-1]
      }else{
        dp[i][j]=dp[i][j-1]
      }
    }
  }
  return dp[M][N]
};
// @lc code=end

