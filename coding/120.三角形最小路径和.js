/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
难度：Middle

相关话题：`数组`、`动态规划`

给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。


 */

var minimumTotal = function(triangle) {
  let lastLayer=[triangle[0][0]]
  for(let i=1;i<triangle.length;i++){
    for(let j=lastLayer.length;j>=0;j--){
      let left=Infinity,right=Infinity
      if(j>0)left=lastLayer[j-1]
      if(j<lastLayer.length)right=lastLayer[j]
      if(lastLayer[j]==null)lastLayer[j]=0
      lastLayer[j]=triangle[i][j]+Math.min(left,right)
    }
  }
  return Math.min.apply(Math,lastLayer)
};

// var minimumTotal = function(triangle) {
//   for(let i=1;i<triangle.length;i++){
//     for(let j=0;j<triangle[i].length;j++){
//       let left=Infinity,right=Infinity
//       if(j>0)left=triangle[i-1][j-1]
//       if(j<triangle[i-1].length)right=triangle[i-1][j]
//       triangle[i][j]+=Math.min(left,right)
//     }
//   }
//   return Math.min.apply(Math,triangle[triangle.length-1])
// };
// @lc code=end

