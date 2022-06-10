/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
//  (80 ms)
var countNodes = function(root) {
    
 function leftDepth(node) {
     if(!node) return 0;
     return leftDepth(node.left) + 1;
 }
 
 function rightDepth(node) {
     if(!node) return 0;
     return rightDepth(node.right) + 1;
 }
 
 function traverse(node) {
     const leftLen = leftDepth(node);
     const rightLen = rightDepth(node);
     
     if(leftLen === rightLen) return Math.pow(2, leftLen) - 1;
     return traverse(node.left) + traverse(node.right) + 1;
 }
 return traverse(root);
};

// var countNodes = function (root) {
//  if (!root) return 0
//  // 棵完全二叉树的两棵子树，至少有一棵是满二叉树，通过树高计算
//  let leftRoot = root, rightRoot = root;
//  let leftHight = 0, rightHight = 0;

//  // 分别记录左右子树高度
//  while (leftRoot !== null) {
//      leftRoot = leftRoot.left;
//      leftHight += 1;
//  }
//  while (rightRoot !== null) {
//      rightRoot = rightRoot.right;
//      rightHight += 1;
//  }
//  // 如果高度相同，则是一颗满二叉树
//  if (leftHight === rightHight) {
//      return Math.pow(2, leftHight) - 1;
//  }
//  // 不同按照普通高度计算 =====================================
//  return countNodes(root.left) + countNodes(root.right) + 1
// };
// @lc code=end

