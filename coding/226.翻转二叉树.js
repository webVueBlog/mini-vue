/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
// (56 ms)
function invertTree(root) {
 if(!root) return root;
 [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
 return root;
}

// (64 ms)
// function invertTree(root) {
//  if(!root) return null
//  return {
//   val: root.val,
//   left: invertTree(root.right),
//   right: invertTree(root.left)
//  }
// }
// @lc code=end

