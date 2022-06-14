/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

(68 ms)
 */
var isBalanced = function (root) {
    let isBalanced = true;
    const maxDepth = (root) => {
        if (!root) return 0;

        let leftMaxDepth = maxDepth(root.left);
        let rightMaxDepth = maxDepth(root.right);

        // 如果左右最大深度大于 1，就不是平衡二叉树
        if (Math.abs(rightMaxDepth - leftMaxDepth) > 1) {
            isBalanced = false;
        }

        return 1 + Math.max(leftMaxDepth, rightMaxDepth);
    }
    maxDepth(root)
    return isBalanced
};

// var isBalanced = function(root) {
    
//  let dfs = function(node) {
//      if (!node) return 0;
//      let left = 1 + dfs(node.left);
//      let right = 1 + dfs(node.right);
//      if (Math.abs(left - right) > 1) return Infinity;
//      return Math.max(left, right);
//  }
 
//  return dfs(root)==Infinity?false:true;
// };
// @lc code=end

