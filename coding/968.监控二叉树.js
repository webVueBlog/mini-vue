/*
 * @lc app=leetcode.cn id=968 lang=javascript
 *
 * [968] 监控二叉树
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
 */
 var minCameraCover = function(root) {
  let ans = 0;
  
  const dfs = node => {
      if (!node) return 0;
      
      const total = dfs(node.left) + dfs(node.right);
      if (!total) return 3;
      if (total < 3) return 0;
      
      ans++;
      
      return 1;
  }
  
  return dfs(root) > 2 ? ans + 1 : ans;
};
// @lc code=end

