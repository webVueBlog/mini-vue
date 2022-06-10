/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

  (60 ms)
 */
// var isSameTree = function(p, q) {
//  if(!p && !q) return true;
//  if(!p || !q || p.val !== q.val) return false
//  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
// };

// var isSameTree = function(p, q) {
//  return !p && !q ? true : (!p || !q || p.val !== q.val ? false : isSameTree(p.left, q.left) && isSameTree(p.right, q.right))
// }

// function isSameTree(p, q) {
//   if (!p && !q) return true;
//   if (!p || !q || p.val !== q.val) return false;
  
//   return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
// }

var isSameTree = function (p, q) {
  // 直接比较两棵树
  if (!p && !q) return true;

  if (
      p && q &&
      p.val === q.val &&
      isSameTree(p.left, q.left) &&
      isSameTree(p.right, q.right)
  ) {
      return true
  } else {
      return false
  }
};
// @lc code=end

