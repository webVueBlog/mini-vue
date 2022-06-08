/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
进阶：你可以运用递归和迭代两种方法解决这个问题吗？
(64 ms)
 */
var isSymmetric = function(root) {
 const isMirror = (l, r) => {
  if(!l && !r) return true
  if(l && r && l.val === r.val && isMirror(l.left, r.right) && isMirror(l.right, r.left)) {
   return true
  } else {
   return false
  }
 }
 return !root ? true : isMirror(root.left, root.right)
}

// 迭代
// var isSymmetric = function(root) {
//  let queue = [root, root];
//  while(queue.length > 0) {
//   let r1 = queue.shift();
//   let r2 = queue.shift();
//   if(!r1 && !r2) continue;
//   if(!r1 || !r2) return false;
//   if(r1.val !== r2.val) return false;
//   queue.push(r1.left)
//   queue.push(r2.right)
//   queue.push(r1.right)
//   queue.push(r2.left);
//  }
//  return true
// }


// (60 ms)
// var isSymmetric = function(root) {
//  if(!root) return true;

//  const isMirror = (l, r) => {
//   if(!l && !r) return true

//   if(l && r && l.val === r.val && isMirror(l.left, r.right) && isMirror(l.right, r.left)) {
//    return true
//   } else {
//    return false
//   }
//  }

//  return isMirror(root.left, root.right)
// }


//递归
// var isSymmetric = function(root) {
//  function isMirror(r1, r2) {
//   if(!r1 && !r2) return true
//   if(!r1 || !r2) return false
//   return r1.val === r2.val && isMirror(r1.left, r2.right) && isMirror(r1.right, r2.left)
//  }
//  return isMirror(root, root)
// }

//  var isSymmetric = function(root) {
//   if (!root) return true;
  
//   return symmetryChecker(root.left, root.right);
// };

// function symmetryChecker(left, right) {
//   if (left == null && right == null) return true;
//   if (left == null || right == null) return false;
//   if (left.val !== right.val) return false;
  
//   return symmetryChecker(left.left, right.right) && symmetryChecker(left.right, right.left);
// }
// @lc code=end

