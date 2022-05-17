/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 *  (60 ms)
 */
 var postorderTraversal = function(root) {
  if(!root) return [];

  const stack = [root];
  const result = [];
  while(stack.length > 0) {
      const node = stack.pop();
      result.push(node.val);
      if(node.left) stack.push(node.left);
      if(node.right) stack.push(node.right);
  }
  
  return result.reverse();
};
// @lc code=end

