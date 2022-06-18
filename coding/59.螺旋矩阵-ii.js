/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
难度：Middle

相关话题：`数组`

给定一个正整数*n* ，生成一个包含 1 到*n* 2所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

```
输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```

思路：

与`NO.54`差不多，一层一层地处理添加到`result`中。


 */
// var generateMatrix = function(n) {
//  let start=0,end=n-1,num=1
//  let result=[]
//  for(let i=0;i<n;i++){
//    result[i]=[]
//  }
//  while(end>=start){
//    let i=start  
//    while(i<=end)result[start][i++]=num++
//    i=start+1
//    while(i<=end)result[i++][end]=num++
//    i=end-1
//    while(i>=start)result[end][i--]=num++
//    i=end-1
//    while(i>=start+1)result[i--][start]=num++
//    start++;end--        
//  }
//  return result
// };

var generateMatrix = function(n) {
    
 let output = new Array(n).fill(0).map(() => new Array(n).fill(0))
 
 let count = 0;
 
 let size = n * n;
 
 let left = 0;
 
 let right = n - 1;
 
 let top = 0;
 
 let bottom = n -1;
 
 while(count < size){
     
     //going left
     for(let i = left; i <= right; i++){
         count++;
         output[top][i] = count;
     }
     top++;
             
     // going down
     for(let i = top; i <= bottom; i++){
         count++;
         output[i][right] = count;
     }
     right--;
     
     //going left
     for(let i = right; i >= left; i--){
         count++;
         output[bottom][i] = count;
     }
     bottom--;
     
     //going up
     for(let i = bottom; i >= top; i--){
         count++;
         output[i][left] = count;
     }
     left++;
 }
 
 return output;
 
};
 
// @lc code=end

