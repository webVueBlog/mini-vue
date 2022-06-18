/*
 * @lc app=leetcode.cn id=74 lang=javascript
 *
 * [74] 搜索二维矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
难度：Middle

相关话题：`数组`、`二分查找`

编写一个高效的算法来判断*m*  x *n* 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

* 每行中的整数从左到右按升序排列。

* 每行的第一个整数大于前一行的最后一个整数。

思路：

方法一：`O(m+n)`，`m`为行高，`n`为列宽。

根据矩阵性质，从第一行开始，检查每一行的最后一列，如果存在`matrix[i][n-1]>=target`，说明`target`只有可能在当前行，再遍历检查当前行。

方法二：`O(log(m*n))`

思路是将二维矩阵转化为**一维数组**(当然不需要真的转换，只需索引在一维和二维互相转换)，通过索引进行二分搜索。



 */
var searchMatrix = function(matrix, target) {
 if(matrix.length===0)return false
 let m=matrix.length,n=matrix[0].length
 let searchRow=null
 for(let i=0;i<m;i++){
   if(matrix[i][n-1]>=target){
     searchRow=i
     break
   }
 }
 if(searchRow==null)return false
 for(let i=0;i<n;i++){
   if(matrix[searchRow][i]===target)return true
 }
 return false
};

// var searchMatrix = function(matrix, target) {
//  if(matrix.length===0)return false
//  let m=matrix.length,n=matrix[0].length
//  let lo=0,hi=m*n-1
//  while(lo<=hi){
//    let mid=Math.floor((lo+hi)/2)
//    let [x,y]=to2(mid)
//    let midV=matrix[x][y]
//    if(midV===target)return true
//    else if(midV<target)lo=mid+1
//    else hi=mid-1
//  }
//  return false
 
//  function to2(x){
//    return [Math.floor(x/n),x%n]
//  }
//  function to1([x,y]){
//    return x*m+y
//  }
// };

// var searchMatrix = function(matrix, target) {
//  if (!matrix.length || !matrix[0].length) return false;

//  let row = 0;
//  let col = matrix[0].length - 1;

//  while (col >= 0 && row <= matrix.length - 1) {
//    if (matrix[row][col] === target) return true;
//    else if (matrix[row][col] > target) col--;
//    else if (matrix[row][col] < target) row++;
//  }

//  return false;
// }
// @lc code=end

