/*
 * @lc app=leetcode.cn id=419 lang=javascript
 *
 * [419] 甲板上的战舰
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {number}
 */
var countBattleships = function(board) {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'X'
                && board[i][j-1] !== 'X'
                && (!board[i-1] || board[i-1][j] !== 'X')) count++;
        }
    }
    return count;
};
// @lc code=end

