/*
 * @lc app=leetcode.cn id=1448 lang=javascript
 *
 * [1448] 统计二叉树中好节点的数目
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
 var goodNodes = function(root) {
  return preorder(root, root.val);
};

const preorder = (node, val) => {
  if (!node) return 0;
  
  const max = Math.max(val, node.val);
  
  return (node.val >= val ? 1 : 0) + preorder(node.left, max) + preorder(node.right, max);
}
// @lc code=end

