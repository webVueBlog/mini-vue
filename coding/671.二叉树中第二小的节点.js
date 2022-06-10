/*
 * @lc app=leetcode.cn id=671 lang=javascript
 *
 * [671] 二叉树中第二小的节点
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
// 给定一个非空特殊的二叉 每个节点的子节点数量只能为 2 或 0
 root.val = min(root.left.val, root.right.val) 总成立。
 */
//  (48 ms)
var findSecondMinimumValue = function(root) {
 if((!root.left && !root.right) ) return -1;
 let left = root.left.val, right = root.right.val;

 if (root.val === root.left.val) {
  left = findSecondMinimumValue(root.left)
 }

 if (root.val === root.right.val) {
  right = findSecondMinimumValue(root.right)
 }

 if (left === -1) return right;
 if (right === -1) return left;

 // 如果第二小的值不存在的话，输出 -1 。
 return Math.min(left, right)
};

// dfs (52 ms)
// var findSecondMinimumValue = function(root) {
//  if (!root) return -1;
//  const min1 = root.val;
//  let min2 = Infinity;
//  const stack = [root];
//  while (stack.length) {
//    const node = stack.pop();
//    if (min1 < node.val && node.val < min2) min2 = node.val;
//    if (node.left) stack.push(node.left);
//    if (node.right) stack.push(node.right);
//  }
//  return min2 === Infinity ? -1 : min2;
// };
// @lc code=end

