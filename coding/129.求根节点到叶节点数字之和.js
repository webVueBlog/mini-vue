/*
 * @lc app=leetcode.cn id=129 lang=javascript
 *
 * [129] 求根节点到叶节点数字之和
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

(56 ms)
 */
var sumNumbers = function(root) {
 let sum = 0
 const bst = (current, node) => {
  if(!node) return
  if(!node.left && !node.right) {
   sum += (current + node.val ) * 1;
   return
  }
  bst(current + node.val, node.left);
  bst(current + node.val, node.right);
 }
 bst('', root);
 return sum
}

// var sumNumbers = function(root) {
//  function traverse(node, num) {
//   if(!node) return null;
//   num += node.val
//   if(!node.left && !node.right) return +num;
//   return traverse(node.left, num) + traverse(node.right, num);
//  }
//  return traverse(root, '');
// };

// var sumNumbers = function(root) {
//  if(!root) return null;
//  let sum = 0;
 
//  function traverse(node, num) {
//      num += node.val
//      if(!node.left && !node.right) sum += +num;
//      if(node.left) traverse(node.left, num)
//      if(node.right) traverse(node.right, num);
//  }
//  traverse(root, '');
//  return sum;
// };

// var sumNumbers = function(root) {
    
//  function traverse(node, num) {
//      if(!node) return null;
//      num += node.val
//      if(!node.left && !node.right) return +num;
//      return traverse(node.left, num) + traverse(node.right, num);
//  }
//  return traverse(root, '');
// };
// @lc code=end

