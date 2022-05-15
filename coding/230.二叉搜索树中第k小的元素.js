/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
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
 * @param {number} k
 * @return {number}
 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
输入：root = [3,1,4,null,2], k = 1
输出：1

输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
(76 ms)
 */
var kthSmallest = function(root, k) {
 let [n, res] = [0, 0]
 const dfs =  node => {
  if(!node) return

  dfs(node.left)
  if(n++ < k) res = node.val
  dfs(node.right)
 }

 dfs(root)
 return res
}

// var kthSmallest = function(root, k) {
//  let vals = [];
//  (function dfs(node) {
//   if(node.left) {
//    dfs(node.left);
//   }
//   vals.push(node.val);
//   if(node.right) {
//    dfs(node.right)
//   }
//  })(root)
//  return vals[k-1];
// };
// @lc code=end

