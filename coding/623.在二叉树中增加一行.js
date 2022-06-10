/*
 * @lc app=leetcode.cn id=623 lang=javascript
 *
 * [623] 在二叉树中增加一行
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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}

 */
var addOneRow = function(root, val, depth) {
 if(depth === 1) return new TreeNode(val, root, null) // 值 左 右
 if(depth === 2) {
  root.left = new TreeNode(val, root.left, null)
  root.right = new TreeNode(val, null, root.right)
 } else {
  if(root.left) addOneRow(root.left, val, depth-1) // 剪掉父节点
  if(root.right) addOneRow(root.right, val, depth-1)
 }
 return root
};

// @lc code=end

