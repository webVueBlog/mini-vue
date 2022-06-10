/*
 * @lc app=leetcode.cn id=687 lang=javascript
 *
 * [687] 最长同值路径
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
 var longestUnivaluePath = function(root) {
  let maxLen=0
  function dfs(root){
    if(!root)return 0
    let leftL=dfs(root.left),
        rightL=dfs(root.right)
    let l=0,r=0
    let val=root.val
    if(root.left && root.left.val===val)l=leftL+1
    if(root.right && root.right.val===val)r=rightL+1
    maxLen=Math.max(maxLen,l+r)
    return Math.max(l,r)
  }
  dfs(root)
  return maxLen
};

// var longestUnivaluePath = function(root) {
//  let level = 0 
//  function helper( parent, current) {
//   if (current === null) return 0
//   let left = helper(current.val, current.left)
//   let right = helper(current.val, current.right)
//   level = Math.max(level, left + right)
//   return current.val === parent ? Math.max(left, right) + 1 : 0
//  }
//  if (root !== null) helper(root.val, root)
//  return level
// }
// @lc code=end

