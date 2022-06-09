/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * 给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
返回它的最大深度 3 。

// 题解
// 1.最大深度，考虑深度优先遍历
// 2.每次遍历记录层级

 (64 ms)
 */
var maxDepth = function(root) {
    return root ? Math.max(maxDepth(root.left), maxDepth(root.right)) + 1 : 0
};

// var maxDepth = function(root) {
//     if(root === undefined || root===null){
//         return 0;
//     }
//     return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
// };


// var maxDepth = function (root) {
//     // 定义一个变量来记录层级
//     let res = 0;
//     const dfs = (n, l) => {
//         if (!n) { return; }

//         // 当为叶子节点时刷新
//         if(!n.left && !n.right) {
//             res = Math.max(res, l)
//         }
        
//         // 遇到子节点加1
//         dfs(n.left, l + 1)
//         dfs(n.right, l + 1)
//     }

//     // 层级初始化为1
//     dfs(root, 1)

//     return res
// };
// @lc code=end