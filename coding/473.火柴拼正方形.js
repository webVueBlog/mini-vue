<<<<<<< HEAD
/*
 * @lc app=leetcode.cn id=473 lang=javascript
 *
 * [473] 火柴拼正方形
 */

// @lc code=start
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function(matchsticks) {

};
// @lc code=end

=======
/*
 * @lc app=leetcode.cn id=473 lang=javascript
 *
 * [473] 火柴拼正方形
 */

// @lc code=start
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 (380 ms)
 */
 var makesquare = function(matchsticks) {
  const totalNum = matchsticks.reduce((cur, item) => cur + item, 0);
  if(totalNum % 4 !== 0) return false
  matchsticks.sort((a, b) => b - a);
  // 存储每一边的状态
  const  edges = new Array(4).fill(0),
  len = ~~(totalNum / 4);
  let dfs = (start) => {
   if(start === matchsticks.length) {
    return true;
   } else {
    for(let i = 0; i < edges.length; i++) {
     edges[i] += matchsticks[start];
     if(edges[i] <= len && dfs(start + 1)) {
      return true;
     }
     edges[i] -= matchsticks[start];
    }
    return false;
   }
  }
  return dfs(0);
};
// @lc code=end

>>>>>>> 08c9278d04c86a90f4c29aed10af5c20871fdb0e
