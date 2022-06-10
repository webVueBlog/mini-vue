/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// (84 ms)
var averageOfLevels = function(root) {
 let res = [];
 if(!root) return res;
 let queue = [root]
 while(queue.length) {
  let size = queue.length
  let sum = 0;

  // 遍历
  for(let i = 0; i < size; i++) {
   let curr = queue.shift()
   sum += curr.val

   if(curr.left) queue.push(curr.left)
   if(curr.right) queue.push(curr.right)
  }

  res.push(sum/size)
 }
 return res
};

// var averageOfLevels = function(root) {
//  let q = [root], ans = []
//  while (q.length) {
//      let qlen = q.length, row = 0
//      for (let i = 0; i < qlen; i++) {
//          let curr = q.shift()
//          row += curr.val
//          if (curr.left) q.push(curr.left)
//          if (curr.right) q.push(curr.right)
//      }
//      ans.push(row/qlen)
//  }
//  return ans
// };
// @lc code=end

