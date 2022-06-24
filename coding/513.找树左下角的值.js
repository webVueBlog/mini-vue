/*
 * @lc app=leetcode.cn id=513 lang=javascript
 *
 * [513] 找树左下角的值
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
 var findBottomLeftValue = function(root) {
  const stack = [root];
  
  while (stack.length) {
      root = stack.pop();
      if (root.right) stack.unshift(root.right);
      if (root.left) stack.unshift(root.left);
  }
  
  return root.val;
};
// @lc code=end

