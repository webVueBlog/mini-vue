/*
 * @lc app=leetcode.cn id=52 lang=javascript
 *
 * [52] N皇后 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
思路：

基本与`NO.51`一致，甚至还更简单，不需要提供`board`去记录每个`Q`的位置，

定义3个`hash`，用来保存已经放置的`Q`能攻击到的范围，分别是`col`，`dia1`，`dia2`(竖线和2对角线)

由于每一行最多只可能存在一个`Q`，那么如果第`i`行放置了，那么就继续第`i+1`行，检查是否有位置能放置。

检查的过程有一个高效的方法，`col`很简单，关键在两条斜线，可以思考这两条斜线的延长线最终到达第一行的位置。

左下到右上斜线`[i,j]`延长线最终能到达第一行的位置就是`[0,j+i]`，因此只需要保存`j+i`；

左上到右下的斜线`[i,j]`延长线最终能到达第一行的位置就是`[0,j-i]`，因此只需要保存`j-i`。


 */

var totalNQueens = function(n) {
 let dia1=Array(2*n).fill(false),
     dia2=Array(2*n).fill(false),
     col=Array(n).fill(false)
 let res=0
 backtrack(0,0)
 return res
 function backtrack(setCount,rowId){
   if(setCount===n) res++
   for(let j=0;j<n;j++){
     let lt2rd=j-rowId+n,rt2ld=j+rowId
     // 检查竖线，两斜线是否冲突
     if(col[j] || dia1[lt2rd] || dia2[rt2ld])continue
     col[j]=true
     dia1[lt2rd]=true
     dia2[rt2ld]=true
     backtrack(setCount+1,rowId+1)
     dia2[rt2ld]=false
     dia1[lt2rd]=false
     col[j]=false
   }
 }    
};


//  var totalNQueens = function(N) {
//   let ans = 0
  
//   const place = (i, vert, ldiag, rdiag) => {
//       if (i === N) ans++
//       else for (let j = 0; j < N; j++) {
//           let vmask = 1 << j, lmask = 1 << (i+j), rmask = 1 << (N-i-1+j)
//           if (vert & vmask || ldiag & lmask || rdiag & rmask) continue
//           place(i+1, vert | vmask, ldiag | lmask, rdiag | rmask)
//       }
//   }

//   place(0,0,0,0)
//   return ans
// };
// @lc code=end

