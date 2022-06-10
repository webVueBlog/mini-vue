/*
 * @lc app=leetcode.cn id=653 lang=javascript
 *
 * [653] 两数之和 IV - 输入 BST
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
 * @param {number} k
 * @return {boolean}
输入: root = [5,3,6,2,4,null,7], k = 9
输出: true

dfs
 */
//  (88 ms)
var findTarget = function(root, k) {
 if (!root) return false;
 const set = new Set();
 const stack = [root];
 while (stack.length) {
   const node = stack.pop();
   if (set.has(k - node.val)) return true;
   set.add(node.val);
   if (node.right) stack.push(node.right);
   if (node.left) stack.push(node.left);
 }
 return false;
};
// @lc code=end

