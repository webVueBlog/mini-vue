/*
 * @lc app=leetcode.cn id=85 lang=javascript
 *
 * [85] 最大矩形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
难度：Hard

相关话题：`栈`、`数组`、`哈希表`、`动态规划`

给定一个仅包含0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

思路：

`DP+Stack`，`heights`表示在当前行以上的整个状态，例如

```
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
```

第一行，`heights=[1,0,1,0,0]`，表示它内部有2个高度为`1`的矩形；

第二行，`heights=[2,0,2,1,1]`，表示第一列高度为`2`，第二列高度为`0`...；

第三行，`heights=[3,1,3,2,2]`；

第四行，`heights=[1,0,0,3,0]`，注意，因为第`2`列、第`3`列和第`5`列在当前行都是`0`，因此`heights[i]=0`。

对于每一行的状态`heights`，利用`NO.84`的方法求出最大面积，最后筛选出最大面积。


 */
var maximalRectangle = function(matrix) {
  function getMaxArea(heights){
    let stack=[-1],maxArea=0
    for(let i=0;i<=heights.length;i++){
      while(stack.length>1 && (i===heights.length || heights[i]<heights[stack[stack.length-1]])){
        let lastId=stack.pop(),
            lastH=heights[lastId],
            width=i-stack[stack.length-1]-1
        maxArea=Math.max(maxArea,width*lastH)
      }
      stack.push(i)
    }
    return maxArea
  }
  
  if(matrix.length===0)return 0
  let maxArea=0
  let dp=Array(matrix[0].length).fill(0)
  for(let i=0;i<matrix.length;i++){
    for(let j=0;j<matrix[i].length;j++){
      if(matrix[i][j]==="0") dp[j]=0
      else dp[j]+=1
    }
    let area=getMaxArea(dp)
    maxArea=Math.max(maxArea,area)
  }
  return maxArea
};
// @lc code=end

