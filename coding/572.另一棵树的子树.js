/*
 * @lc app=leetcode.cn id=572 lang=javascript
 *
 * [572] 另一棵树的子树
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
 if(root === null) return subRoot === null
 const isSameTree = (p, q) => {
  if (!p && !q) return true;
  if(p && q && p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)) {
   return true
  }else{
   return false
  }
 }
 if(isSameTree(root, subRoot)) {
  return true
 }
 return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
};




// var isSubtree = function(s, t) {
//  if (!s) return !t;
//  return isEqual(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
// };

// function isEqual(root1, root2) {
//  if (!root1 || !root2) return !root1 && !root2;
//  if (root1.val !== root2.val) return false;
//  return isEqual(root1.left, root2.left) && isEqual(root1.right, root2.right);
// }
// @lc code=end

