/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {boolean}
难度：Middle

相关话题：`哈希表`

判断一个9x9 的数独是否有效。只需要**根据以下规则** ，验证已经填入的数字是否有效即可。

1. 数字 `1-9` 在每一行只能出现一次。

2. 数字 `1-9` 在每一列只能出现一次。

3. 数字 `1-9` 在每一个以粗实线分隔的 `3x3` 宫内只能出现一次。

数独部分空格内已填入了数字，空白格用 `'.'` 表示。

```
输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: true
```

* 一个有效的数独（部分已被填充）不一定是可解的。

* 只需要根据以上规则，验证已经填入的数字是否有效即可。

* 给定数独序列只包含数字 `1-9` 和字符 `'.'` 。

* 给定数独永远是 `9x9` 形式的。

思路：

因为存在`9`行，`9`列，`9`个`3*3`的格子，因此可以遍历`[0,9]`，分别检查对应索引的行，列和块。

具体检查步骤就是创建`hash`，如果内部存在相同的数字，则返回`false`。

行列检查都很简单，块需要将`id`转化为行开始的索引，行结束的索引，列开始的索引，列结束的索引。

`[行开始，行结束]`为`[Math.floor(id/3)*3,Math.floor(id/3)*3+2]`

`[列开始，列结束]`为`[id%3*3,id%3*3+2]`


 */
var isValidSudoku = function(board) {
 function rowIsValid(id){
   let hash={}
   for(let i=0;i<board[id].length;i++){
     let cur=board[id][i]
     if(hash[cur])return false
     if(cur!=='.')hash[cur]=true
   }
   return true
 }
 function colIsValid(id){
   let hash={}
   for(let i=0;i<board.length;i++){
     let cur=board[i][id]
     if(hash[cur])return false
     if(cur!=='.')hash[cur]=true
   }
   return true
 }
 function boxIsValid(id){
   let f=Math.floor(id/3),
       m=id % 3
   let rs=f*3,re=f*3+2,
       cs=m*3,ce=m*3+2
   let hash={}
   for(let i=rs;i<=re;i++){
     for(let j=cs;j<=ce;j++){
       let cur=board[i][j]
       if(hash[cur])return false
       if(cur!=='.')hash[cur]=true
     }
   }
   return true
 }
 
 for(let i=0;i<9;i++){
   if(!rowIsValid(i) || !colIsValid(i) || !boxIsValid(i))return false
 }
 return true
};
// var isValidSudoku = function(board) {
//  for (let i = 0; i < 9; i++) {
//    let row = new Set(),
//        col = new Set(),
//        box = new Set();

//    for (let j = 0; j < 9; j++) {
//      let _row = board[i][j];
//      let _col = board[j][i];
//      let _box = board[3*Math.floor(i/3)+Math.floor(j/3)][3*(i%3)+(j%3)]
     
//      if (_row != '.') {
//        if (row.has(_row)) return false;
//        row.add(_row);
//      }
//      if (_col != '.') {
//        if (col.has(_col)) return false;
//        col.add(_col);
//      }
     
//      if (_box != '.') {
//        if (box.has(_box)) return false;
//        box.add(_box);
//      } 
//    }
//  }
//  return true
// };
// @lc code=end

