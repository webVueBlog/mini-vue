/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
 var recoverTree = function(root) {
  let [prev, small, big] = [null, null, null];
  
  const inorderTree = node => {
      if (!node) return;
      
      inorderTree(node.left);
      
      if (prev && prev.val > node.val) {
          small = node;
          if (!big) big = prev;
      }
      
      prev = node;
      
      inorderTree(node.right);
  }
  
  inorderTree(root);
  
  [small.val, big.val] = [big.val, small.val];
};
// @lc code=end

