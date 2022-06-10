/*
 * @lc app=leetcode.cn id=563 lang=javascript
 *
 * [563] 二叉树的坡度
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
// 68
var findTilt = function(root) {
 let res = 0;
 const sum = (root) => {
  if(!root) return 0

  let l = sum(root.left)
  let r = sum(root.right)

  res += Math.abs(l - r)

  return l + r + root.val
 }
 sum(root)
 return res;
};

// dfs
// var findTilt = function(root) {
//  const tilt = { val: 0 };
//  dfs(root, tilt);
//  return tilt.val;
// };

// function dfs(root, tilt) {
//  if (!root) return 0;
//  let left = dfs(root.left, tilt);
//  let right = dfs(root.right, tilt);
//  tilt.val += Math.abs(left - right);
//  return root.val + left + right;
// }

// @lc code=end

