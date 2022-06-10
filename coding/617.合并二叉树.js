/*
 * @lc app=leetcode.cn id=617 lang=javascript
 *
 * [617] 合并二叉树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
// 104
// var mergeTrees = function(root1, root2) {
//  if(!root1) return root2
//  if(!root2) return root1
//  return {
//   val: root1.val + root2.val,
//   left: mergeTrees(root1.left, root2.left),
//   right: mergeTrees(root1.right, root2.right)
//  }
// };

// 96
var mergeTrees = function(root1, root2) {
 if(!root1 && !root2) return null
 if(root1 && root2) {
  const newNode = new TreeNode(root1.val + root2.val);
  newNode.left = mergeTrees(root1.left, root2.left);
  newNode.right = mergeTrees(root1.right, root2.right);
  return newNode;
 }
 return root1 || root2
}

// var mergeTrees = function(t1, t2) {
//  if (t1 && t2) {
//      const newNode = new TreeNode(t1.val + t2.val);
//      newNode.left = mergeTrees(t1.left, t2.left);
//      newNode.right = mergeTrees(t1.right, t2.right);
//      return newNode;
//  } 
//  return t1 || t2;
// };

// var mergeTrees = function(t1, t2) {
//  if (!t1 && !t2) return null;
//  const root = new TreeNode((t1?.val || 0) + (t2?.val || 0));
//  root.left = mergeTrees(t1?.left, t2?.left);
//  root.right = mergeTrees(t1?.right, t2?.right);
//  return root;
// };


// @lc code=end

