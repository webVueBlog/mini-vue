/*
 * @lc app=leetcode.cn id=508 lang=javascript
 *
 * [508] 出现次数最多的子树元素和
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
 * @return {number[]}
 */
// 72
 var findFrequentTreeSum = function (root) {
  // 二叉树的递归分为「遍历」和「分解问题」两种思维模式，
  // 这道题需要用到「分解问题」的思维，同时要利用后序位置来计算答案。

  let map = new Map();

  // 遍历二叉树，记录子树值
  const sum = (root) => {
      if (!root) { return null }

      let leftSum = sum(root.left);
      let rightSum = sum(root.right);
      let res = root.val + leftSum + rightSum;

      map.set(res, (map.get(res) || 0) + 1);
      return res
  }
  sum(root);

  // 找出最大出现频率
  let maxCount = 0;
  for(count of map.values()) {
      maxCount = Math.max(maxCount, count);
  }
 
  // 找出最大频率子树和
  let res = [];

  for(key of map.keys()) {
      if(map.get(key) === maxCount) {
          res.push(key)
      }
  }

  return res
};


// dfs
// var findFrequentTreeSum = function(root) {
//  const counts = {};
//  const max = { val: -Infinity };
//  dfs(root, counts, max);
//  const sums = [];
//  for (let key in counts) {
//      if (counts[key] === max.val) sums.push(parseInt(key));
//  }
//  return sums;
// };

// function dfs(root, counts, max) {
//  if (!root) return 0;
//  let sum = root.val + dfs(root.left, counts, max) + dfs(root.right, counts, max);
//  counts[sum] = (counts[sum] || 0) + 1;
//  max.val = Math.max(max.val, counts[sum]);
//  return sum;
// }
// @lc code=end

