/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.

难度：Hard

相关话题：`哈希表`、`回溯算法`

编写一个程序，通过已填充的空格来解决数独问题。

一个数独的解法需**遵循如下规则** ：

1. 数字 `1-9` 在每一行只能出现一次。

2. 数字 `1-9` 在每一列只能出现一次。

3. 数字 `1-9` 在每一个以粗实线分隔的 `3x3` 宫内只能出现一次。

空白格用 `'.'` 表示。

答案被标成红色。

* 给定的数独序列只包含数字 `1-9` 和字符 `'.'` 。

* 你可以假设给定的数独只有唯一解。

* 给定数独永远是 `9x9` 形式的。

思路：

这道题要求填充，解决办法就是`回溯`，但是每填一个数字，需要检查是否有效，如果每次都重新检查，时间消耗太高。

因此用`hash`保存初始`行`，`列`，`块`的数字，后面回溯过程中，每填一个数字，只要检查`hash`便可以，有效即更新`hash`。


 */
// (68 ms)
var solveSudoku = function(board) {
 let memRow=Array(9).fill().map(()=>Array(10).fill(false)),
     memCol=Array(9).fill().map(()=>Array(10).fill(false)),
     memBox=Array(9).fill().map(()=>Array(10).fill(false))
 let needToFill=[]
 for(let r=0;r<9;r++){
   for(let c=0;c<9;c++){
     let curVal=board[r][c]
     if(curVal!=='.'){
       memRow[r][curVal]=true
       memCol[c][curVal]=true
       let boxID=Math.floor(r/3)*3+Math.floor(c/3)
       memBox[boxID][curVal]=true
     }else{
       needToFill.push([r,c])
     }
   }
 }
 dfs(0)
 function dfs(index){
   if(index===needToFill.length)return true
   let [r,c]=needToFill[index]
   let boxID=Math.floor(r/3)*3+Math.floor(c/3)
   for(let val=1;val<10;val++){
     if(!memRow[r][val] && !memCol[c][val] && !memBox[boxID][val]){
       memRow[r][val]=true
       memCol[c][val]=true
       memBox[boxID][val]=true
       board[r][c]=val+''
       if(dfs(index+1))return true
       board[r][c]='.'
       memRow[r][val]=false
       memCol[c][val]=false
       memBox[boxID][val]=false
     }
   }
 }
};

// (124 ms)
// function solveSudoku(board) {
//  const n = board.length;
//  dfs(board, n);
// }

// function dfs(board, n) {
//  // for every cell in the sudoku
//  for (let row = 0; row < n; row++) {
//    for (let col = 0; col < n; col++) {
//      // if its empty
//      if (board[row][col] !== '.') continue;
//      // try every number 1-9
//      for (let i = 1; i <= 9; i++) {
//        const c = i.toString();
//        // if that number is valid
//        if (isValid(board, row, col, n, c)) {
//          board[row][col] = c;
//          // continue search for that board, ret true if solution is reached
//          if (dfs(board, n)) return true;
//        }
//      }
//      // solution wasnt found for any num 1-9 here, must be a dead end...
//      // set the current cell back to empty
//      board[row][col] = '.';
//      // ret false to signal dead end 
//      return false;
//    }
//  }
//  // all cells filled, must be a solution
//  return true;
// }

// function isValid(board, row, col, n, c) {
//  const blockRow = Math.floor(row / 3) * 3;
//  const blockCol = Math.floor(col / 3) * 3;
//  for (let i = 0; i < n; i++) {
//    if (board[row][i] === c || board[i][col] === c) return false;
//    const curRow = blockRow +  Math.floor(i / 3);
//    const curCol = blockCol +  Math.floor(i % 3);
//    if (board[curRow][curCol] === c) return false;
//  }
//  return true;
// }
// @lc code=end

