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
  let max = 0;
  
  const maxDepth = node => {
      if (!node) return 0;
      
      const left = maxDepth(node.left);
      const right = maxDepth(node.right);
      max = Math.max(max, left + right);
      
      return 1 + Math.max(left, right);
  }
  
  maxDepth(root);
  
  return max;
};
// @lc code=end

