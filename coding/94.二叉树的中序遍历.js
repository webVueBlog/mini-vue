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
取跟节点为目标节点，开始遍历
1.左孩子入栈 -> 直至左孩子为空的节点
2.节点出栈 -> 访问该节点
3.以右孩子为目标节点，再依次执行1、2、3
 */
var inorderTraversal = function (root) {
 const result = [];
 const stack = [];
 let current = root;
 while (current || stack.length > 0) {
   while (current) {
     stack.push(current);
     current = current.left;
   }
   current = stack.pop();
   result.push(current.val);
   current = current.right;
 }
 return result;
};
// var inorderTraversal = function(root, array = []) {
//  const stack = [];
//  const res = [];
//  while(root || stack.length) {
//   if(root) {
//    stack.push(root);
//    root = root.left;
//   } else {
//    root = stack.pop();
//    res.push(root.val);
//    root = root.right;
//   }
//  } 
//  return res;
// };
// var inorderTraversal = function(root, array = []) {
//  if(root) {
//   inorderTraversal(root.left, array)
//   array.push(root.val)
//   inorderTraversal(root.right, array)
//  }
//  return array;
// };
// @lc code=end

