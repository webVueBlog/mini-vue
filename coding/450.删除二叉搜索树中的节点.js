/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
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
 * @param {number} key
 * @return {TreeNode}
 (92 ms)
 */
 var deleteNode = function(root, key) {
    
  function callDFS(node) {
      if(!node) return null;
      if(node.val === key) {
          if(!node.left) return node.right;
          if(!node.right) return node.left;
          let curr = node.right;
          while(curr.left) curr = curr.left;
          curr.left = node.left;
          return node.right;
      }
      if(key > node.val) node.right = callDFS(node.right);
      else node.left = callDFS(node.left);
      return node;
  }
  return callDFS(root)
};
// @lc code=end

