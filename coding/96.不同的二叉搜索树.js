/*
 * @lc app=leetcode.cn id=96 lang=javascript
 *
 * [96] 不同的二叉搜索树
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
难度：Middle

相关话题：`树`、`动态规划`

给定一个整数 *n* ，求以1 ...*n* 为节点组成的二叉搜索树有多少种？

思路：

与`NO.95`不同在于，这题不需要找出划分后具体的树，只需要保留结果，因此使用`DP`。

`dp[i]`表示从数量为`i`有多少种划分，初始`dp[0]=1`，即`root`为`null`就是1种划分。

`dp[i]=dp[j]*dp[i-j-1]`，`j`的范围为`0<=j<i`，其中`j`表示左子树的数量，`i-j-1`表示右子树的数量。


 */
var numTrees = function(n) {
  let dp=Array(n+1).fill(0)
  dp[0]=1
  for(let i=1;i<=n;i++){
    for(let j=0;j<i;j++){
      dp[i]+=dp[j]*dp[i-j-1]
    }
  }
  return dp[n]
};
// @lc code=end

