/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @param {number} targetSum
 * @return {number[][]}
 */
// (68 ms)
var pathSum = function(root, sum) {
 let res = []
 function dfs(root, sum, arr) {
  if(!root) return
  if(sum === root.val & !root.left && !root.right) {
   arr.push(root.val)
   res.push(arr.slice())
   arr.pop()
   return
  }
  arr.push(root.val)
  dfs(root.left, sum-root.val, arr)
  dfs(root.right, sum-root.val, arr)
  arr.pop()
 }
 dfs(root, sum, [])
 return res
};

// (64 ms)
// var pathSum = function(root, sum, res = [], path = []){
//     if(root){
//         path.push(root.val);
//         if(!root.left && !root.right && sum - root.val === 0) res.push([...path]);
//         pathSum(root.left, sum - root.val, res, path);
//         pathSum(root.right, sum - root.val, res, path);
//         path.pop();
//     }
//     return res;
// };
// @lc code=end

