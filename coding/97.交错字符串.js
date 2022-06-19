/*
 * @lc app=leetcode.cn id=97 lang=javascript
 *
 * [97] 交错字符串
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
难度：Hard

相关话题：`字符串`、`动态规划`

给定三个字符串*s1* , *s2* , *s3* , 验证*s3* 是否是由*s1* 和*s2* 交错组成的。

思路：

DP，`dp[i][j]`表示`s1[0,i]`和`s2[0,j]`是否能交叉形成`s3[0,i+j-1]`。

设定`dp`的行高为`s1.length+1`，多出的一行为空值。

设定`dp`的列宽为`s2.length+1`，多出的一列为空值。

`dp[0][0]=true`。

设定第一行的初始值：`dp[0][i]=dp[0][i-1] && s2[i-1]===s3[i-1]`，因为是第一行，所以`s1[0]`为空值，只需要判断`s2`和`s3`；

设定第一列的初始值：`dp[i][0]=dp[i-1][0] && s1[i-1]===s3[i-1]`，同样`s2[0]`为空值，只需要判断`s1`和`s3`；

后续的转移方程：

`dp[i][j]=(s1[i-1]===s3[k] && dp[i-1][j]) || (s2[j-1]===s3[k] && dp[i][j-1])`，其中`k=i+j-1`；

后续需要判断2种情况，`s1`和`s3`或者`s2`和`s3`。

 */
var isInterleave = function(s1, s2, s3) {
  let len1=s1.length,len2=s2.length,len3=s3.length
  if(len3!==len1+len2)return false
  let dp=Array(len1+1).fill().map(()=>Array(len2+1).fill(false))
  dp[0][0]=true
  for(let i=1;i<len2+1;i++){
    dp[0][i]=dp[0][i-1] && s2[i-1]===s3[i-1]
  }
  for(let i=1;i<len1+1;i++){
    dp[i][0]=dp[i-1][0] && s1[i-1]===s3[i-1]
  }

  for(let i=1;i<dp.length;i++){
    for(let j=1;j<dp[i].length;j++){
      let k=i+j-1
      dp[i][j]=(s1[i-1]===s3[k] && dp[i-1][j]) || (s2[j-1]===s3[k] && dp[i][j-1])
    }
  }
  return dp[s1.length][s2.length]
};
// @lc code=end

