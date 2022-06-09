/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
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
 */
// dfs (76 ms)

var rightSideView = function(root) {
 let res = [];
 dfs(root, 0)
 return res;

 function dfs(node, h) {
  if(!node) return []
  res[h] = node.val;
  dfs(node.left, h + 1);
  dfs(node.right, h + 1);
 }
};

// @lc code=end

