/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
难度：Hard

相关话题：`回溯算法`

*n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n* &times;*n*  的棋盘上，并且使皇后彼此之间不能相互攻击。

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)

上图为 8 皇后问题的一种解法。

给定一个整数 *n* ，返回所有不同的*n* 皇后问题的解决方案。

每一种解法包含一个明确的*n*  皇后问题的棋子放置方案，该方案中  `'Q'`  和  `'.'`  分别代表了皇后和空位。

```
输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

思路：

经典的回溯问题，主要思想就是不断尝试每一行每一个位置能否放置`Q`。

定义3个`hash`，用来保存已经放置的`Q`能攻击到的范围，分别是`col`，`dia1`，`dia2`(竖线和2对角线)

并且定义一个`board`来记录每个`Q`放置的位置，因为最终输出需要输出整个棋盘位置。

由于每一行最多只可能存在一个`Q`，那么如果第`i`行放置了，那么就继续第`i+1`行，检查是否有位置能放置。

检查的过程有一个高效的方法，`col`很简单，关键在两条斜线，可以思考这两条斜线的延长线最终到达第一行的位置。

左下到右上斜线`[i,j]`延长线最终能到达第一行的位置就是`[0,j+i]`，因此只需要保存`j+i`；

左上到右下的斜线`[i,j]`延长线最终能到达第一行的位置就是`[0,j-i]`，因此只需要保存`j-i`。





 */
var solveNQueens = function(n) {
 let dia1=Array(2*n).fill(false),
     dia2=Array(2*n).fill(false),
     col=Array(n).fill(false)
 let board=Array(n).fill().map(()=>Array(n).fill('.'))
 let res=[]
 backtrack(board,0,0)
 return res
 function backtrack(board,setCount,rowId){
   if(setCount===n){
     let ans=[]
     for(let i=0;i<n;i++){
       ans.push(board[i].join(''))
     }
     res.push(ans)
   }
   for(let j=0;j<n;j++){
     let lt2rd=j-rowId+n,rt2ld=j+rowId
     // 检查竖线，两斜线是否冲突
     if(col[j] || dia1[lt2rd] || dia2[rt2ld])continue
     col[j]=true
     dia1[lt2rd]=true
     dia2[rt2ld]=true
     board[rowId][j]="Q"
     backtrack(board,setCount+1,rowId+1)
     board[rowId][j]="."
     dia2[rt2ld]=false
     dia1[lt2rd]=false
     col[j]=false
   }
 }
};

// var solveNQueens = function(n) {
//  const res = [];
//  backtrack(res, n);
//  return res;
// };

// function backtrack(res, n, board = [], r = 0) {
//  if (r === n) {
//      res.push(board.map(c => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));
//      return;
//  }
//  for (let c = 0; c < n; c++) {
//      if (!board.some((bc, br) => bc === c || bc === c + r - br || bc === c - r + br)) {
//          board.push(c);
//          backtrack(res, n, board, r + 1);
//          board.pop();
//      }
//  }
// }
// @lc code=end

