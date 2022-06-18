/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
难度：Middle

相关话题：`数组`

给定一个包含*m*  x *n* 个元素的矩阵（*m*  行, *n*  列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```

```
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

思路：

* 模拟+`DFS`

最直观的思路就是模拟这个旋转的过程，定义`4`个方向，就是顺时针方向，这里我使用`dfs`，对于当前方向，计算能走的步数`limit`，走到底，然后换下一个方向，
直到当前方向能走的步数`limit`为0。

* 层叠

官方解答的做法，思路很清晰。

就像剥洋葱一样，将当前矩阵一层一层剥掉，例如：

```
[[1, 1, 1, 1, 1, 1, 1],
 [4, 5, 5, 5, 5, 5, 2],
 [4, 8, 9, 9, 9, 6, 2],
 [4, 8, 7, 7, 7, 6, 2],
 [4, 3, 3, 3, 3, 3, 2]]
```

数字代表遍历的顺序，也就是加入结果的顺序，很明了而且很有规律，定义4个变量`t,d,l,r`，分别表示当前`上下左右`边界，
每剥掉一层对应的`t--;d++;l++;r--`，直到`d<t || r<l`。


 */
var spiralOrder = function(matrix) {
 if(matrix.length===0)return []
 let m=matrix.length,n=matrix[0].length
 let l=0,r=n-1,t=0,d=m-1
 let res=[]
 while(r-l>=0 && d-t>=0){
   for(let i=l;i<=r;i++)res.push(matrix[t][i])
   for(let i=t+1;i<=d;i++)res.push(matrix[i][r])
   if(d>t){
     for(let i=r-1;i>=l+1;i--)res.push(matrix[d][i])   
   }
   if(r>l){
     for(let i=d;i>=t+1;i--)res.push(matrix[i][l])   
   }

   l++;r--;t++;d--
 }
 return res
};


// var spiralOrder = function(matrix) {
//  if(matrix.length===0)return []
//  let rl=matrix[0].length,cl=matrix.length-1
//  let res=[]
//  let moves=[[0,1],[1,0],[0,-1],[-1,0]]
//  let mID=0
//  function dfs([x,y]){
//    let limit
//    if(mID===0 || mID===2) limit=rl--
//    else limit=cl--
//    if(limit<=0)return
//    let [dx,dy]=moves[mID]
//    if(++mID===4)mID=0
//    let nx=x+dx,ny=y+dy
//    while(limit-->0){
//      res.push(matrix[nx][ny])
//      nx+=dx
//      ny+=dy
//    }
//    dfs([nx-dx,ny-dy])
//  }
//  dfs([0,-1])
//  return res
// };


// var spiralOrder = function(matrix) {
//  const res = []
//  while(matrix.length){
//    const first = matrix.shift()
//    res.push(...first)
//    for(const m of matrix){
//      let val = m.pop()
//      if(val)
//        res.push(val)
//        m.reverse()   
//    }
//    matrix.reverse()
//  }
//  return res
// };
// @lc code=end

