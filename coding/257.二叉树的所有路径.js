/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
输入：root = [1,2,3,null,5]
输出：["1->2->5","1->3"]

输入：root = [1]
输出：["1"]

 (56 ms)
 */
var binaryTreePaths = function(root) {
 return !root ? [] : (root.left === null && root.right === null ? [`${root.val}`] : [...(binaryTreePaths(root.left).map(x=>root.val + '->' + x)), ...(binaryTreePaths(root.right).map(x=>root.val + '->' + x))])
};

// var binaryTreePaths = function(root) {
//  if(root === null) return [];
//  else if(root.left === null && root.right === null) return [`${root.val}`];
//  else {
//   let left = binaryTreePaths(root.left).map(x => root.val + '->' + x);
//   let right = binaryTreePaths(root.right).map(x => root.val + '->' + x);
//   return [...left, ...right];
//  }
// }
// @lc code=end

