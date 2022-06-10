/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
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
var diameterOfBinaryTree = function(root) {
 let max = 0
 dfs(root)
 return max

 function dfs(node) {
  if(!node) return 0
  const l = dfs(node.left)
  const r = dfs(node.right)
  max = Math.max(max, l+r)
  return Math.max(l, r) + 1
 }
}

// var diameterOfBinaryTree = function(root) {
//  let diameter = 0;
//  dfs(root);
//  return diameter;
//  function dfs(node, level) {
//      if (!node) return 0;
//      const left = dfs(node.left);
//      const right = dfs(node.right);
//      diameter = Math.max(diameter, left + right);
//      return 1 + Math.max(left, right);
//  }
// };
// @lc code=end

