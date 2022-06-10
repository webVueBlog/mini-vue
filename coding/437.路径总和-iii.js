/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
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
 * @return {number}
 */
// var pathSum = function(root, targetSum) {

// };

// 84
var pathSum = function(root, sum, presums = { '0': 1 }, prev = 0) {
 if (!root) return 0;
 let curr = prev + root.val;
 presums[curr] = (presums[curr] || 0) + 1;
 let res = (presums[curr - sum] || 0) - !sum;
 res += pathSum(root.left, sum, presums, curr) + pathSum(root.right, sum, presums, curr);
 presums[curr]--;
 return res;
};

// 64
// var pathSum = function (root, targetSum) {
//  // 前缀和,递归方式，KEY存前缀和，VAL存前缀和数量
//  const map = new Map();
//  let res = 0;
//  dfs(root, 0,)
//  return res;
//  function dfs(root, presum) {
//      if (!root) return 0;

//      map.set(presum, (map.get(presum) || 0) + 1);
//      let target = presum + root.val;
//      // 公共路径为当前节点和另一节点的差

//      res += (map.get(target - targetSum) || 0);
//      dfs(root.left, target);
//      dfs(root.right, target);
//      // 后序遍历，回溯，路径方向必须是向下
//      map.set(presum, map.get(presum) - 1)
//  }
// };

// @lc code=end

