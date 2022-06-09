/*
 * @lc app=leetcode.cn id=404 lang=javascript
 *
 * [404] 左叶子之和
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
 * @return {number}
 */
// (68 ms)
var sumOfLeftLeaves = function(root) {
 let sum = 0

 const traverse = (root) => {
  if(!root) return

  // 要判断是否存在 左叶子
  if(root.left && root.left.left === null && root.left.right === null) {
   sum += root.left.val
  }

  traverse(root.left)
  traverse(root.right)

 }
 traverse(root)

 return sum
};

// const sumOfLeftLeaves = (x, isLeft) => {
//  if (!x) return 0
//  if (!x.left && !x.right && isLeft) return x.val
 
//  return sumOfLeftLeaves(x.left, true) + sumOfLeftLeaves(x.right, false)
// }
// @lc code=end

