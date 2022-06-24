/*
 * @lc app=leetcode.cn id=979 lang=javascript
 *
 * [979] 在二叉树中分配硬币
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
 var distributeCoins = function(root) {
  let ans = 0;
  
  const dfs = node => {
      if (!node) return 0;
      
      const left = dfs(node.left);
      const right = dfs(node.right);
      ans += Math.abs(left) + Math.abs(right);
      
      return node.val + left + right - 1;
  }
  
  dfs(root);
  
  return ans;
};
// @lc code=end

