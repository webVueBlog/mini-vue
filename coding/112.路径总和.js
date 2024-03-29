/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @return {boolean}
给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点。

输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true

输入：root = [1,2,3], targetSum = 5
输出：false
解释：树中存在两条根节点到叶子节点的路径：
(1 --> 2): 和为 3
(1 --> 3): 和为 4

输入：root = [], targetSum = 0
输出：false
解释：由于树是空的，所以不存在根节点到叶子节点的路径。

// 题解，深度优先遍历求和，最大深度记录层级类似
(68 ms)
 */
var hasPathSum = function(root, sum) {
 return root ? (!root.left && !root.right ? sum === root.val : hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)) : false
};

// var hasPathSum = function (root, targetSum) {
//     if (!root) { return false }

//     let res = false;
//     const dfs = (n, s) => {
//         // 判断叶子节点
//         if (n.left === null && n.right === null && s === targetSum) {
//             res = true
//         }

//         if (n.left) { dfs(n.left, n.left.val + s) };
//         if (n.right) { dfs(n.right, n.right.val + s) }

//     }

//     dfs(root, root.val)

//     return res
// };

// @lc code=end

