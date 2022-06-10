/*
 * @lc app=leetcode.cn id=515 lang=javascript
 *
 * [515] 在每个树行中找最大值
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
输入: root = [1,3,2,5,3,null,9]
输出: [1,3,9]

 */
var largestValues = function(root) {
 let res = [];
 const traverse = (node, depth) => {
  if(!node) return;

  if(res[depth] === undefined || res[depth] < node.val) {
   res[depth] = node.val
  }

  if(node.left) traverse(node.left, depth+1)
  if(node.right) traverse(node.right, depth+1)
 }
 traverse(root, 0)
 return res
};

// var largestValues = function(root) {
//  let res = [];
//  if(!root) return res;
//  function trav(node, level){
//      if(!node) return;
//      if(res[level] == undefined || res[level] < node.val ) res[level] =node.val;
//      if(node.left) trav(node.left, level+1);
//      if(node.right) trav(node.right, level+1);
//  }
//  trav(root, 0);
//  return res;
 
// };
// @lc code=end

