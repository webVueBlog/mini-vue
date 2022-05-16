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
 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

输入：root = [1,null,2,3]
输出：[1,3,2]

输入：root = []
输出：[]

输入：root = [1]
输出：[1]
(56 ms)
 */
var inorderTraversal = function(root) {
 const stack = [];
 const res = [];
 while(root || stack.length) {
  if(root) {
   stack.push(root);
   root = root.left;
  } else {
   root = stack.pop();
   res.push(root.val);
   root = root.right;
  }
 } 
 return res;
};
// @lc code=end

