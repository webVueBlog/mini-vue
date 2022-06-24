/*
 * @lc app=leetcode.cn id=515 lang=javascript
 *
 * [515] 在每个树行中找最大值
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
 var largestValues = function(root) {
  if (!root) return [];
  
  const queue = [root];
  const ans = [];
  
  while (queue.length) {
      const size = queue.length;
      let max = -Infinity;
      
      for (let i = 0; i < size; i++) {
          const { val, left, right } = queue.shift();
          max = Math.max(max, val);
          
          if (left) queue.push(left);
          if (right) queue.push(right);
      }
      
      ans.push(max);
  }
  
  return ans;
};
// @lc code=end

