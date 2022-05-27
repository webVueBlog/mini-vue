/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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

中序遍历：左，中，右
栈的特点是先进后出，因此出栈顺序为左，中，右
那么入栈顺序必须调整为出栈顺序的倒序，也就是右，中，左
 */
var inorderTraversal = function (root) {
  const stack = [];
  const ans = [];
  // root
  while(root || stack.length) {
    // 为了先入栈 中，左
    while(root) {
      stack.push(root)
      root = root.left
    }
    // 先放入 root, root.left，然后再取出
    
    // 取出左，中，放入值
    root = stack.pop() // 先左
    ans.push(root.val)
    root = root.right
  }
  return ans;
};

// @lc code=end

