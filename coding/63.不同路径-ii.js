/*
 * @lc app=leetcode.cn id=63 lang=javascript
 *
 * [63] 不同路径 II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
难度：Middle

相关话题：`数组`、`动态规划`

一个机器人位于一个 *m x n* 网格的左上角 （起始点在下图中标记为&ldquo;Start&rdquo; ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为&ldquo;Finish&rdquo;）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/robot_maze.png)

网格中的障碍物和空位置分别用  `1`  和  `0`  来表示。

**说明：** *m* 和 *n* 的值均不超过 100。

```
输入:[
 [0,0,0],
 [0,1,0],
 [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
```

思路：

比`NO.62`多了一个条件：障碍，同样还是`DP`的思路；

`dp[i][j]`表示从开始到当前`[i,j]`位置，总共有多少种不同的路径；

对于每一个`dp[i][j]`，因为机器人只能**向右**和**向下**；

那么右侧同样也能继承当前`[i,j]`的路径，即`dp[i][j+1]+=dp[i][j]`，下侧同理，`dp[i+1][j]+=dp[i][j]`；

如果遇到障碍则不能去计算，可以对所有障碍设置为`dp[x][y]=null`，因此在状态转移方程中，
需要额外一个判断条件：`dp[i+1][j]!=null`或者`dp[i][j+1]!=null`。


 */
var uniquePathsWithObstacles = function(obstacleGrid) {
 if(obstacleGrid[0][0]===1)return 0
 let m=obstacleGrid.length,n=obstacleGrid[0].length
 let dp=Array(m).fill().map(()=>Array(n).fill(0))
 for(let i=0;i<m;i++){
   for(let j=0;j<n;j++){
     if(obstacleGrid[i][j]===1)dp[i][j]=null
   }
 }
 dp[0][0]=1
 for(let i=0;i<m;i++){
   for(let j=0;j<n;j++){
     if(i<m-1 && dp[i+1][j]!=null)dp[i+1][j]+=dp[i][j]
     if(j<n-1 && dp[i][j+1]!=null)dp[i][j+1]+=dp[i][j]
   }
 }
 return dp[m-1][n-1]
};

// var uniquePathsWithObstacles = function(OG) {
//  if (OG[0][0]) return 0
//  let m = OG.length, n = OG[0].length
//  let dp = Array.from({length: m}, el => new Uint32Array(n))
//  dp[0][0] = 1
//  for (let i = 0; i < m; i++)
//      for (let j = 0; j < n; j++)
//          if (OG[i][j] || (!i && !j)) continue
//          else dp[i][j] = (i ? dp[i-1][j] : 0) + (j ? dp[i][j-1] : 0)
//  return dp[m-1][n-1]
// };
// @lc code=end

