/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
  const ans = [];
  const go = node => {
      if (!node) return ans.push(null);
      
      const { val, left, right } = node;
      go(right);
      go(left);
      ans.push(val);
  }
  
  go(root);
  
  return ans;
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function(data) {
  const build = () => {
      const currVal = data.pop();
      if (currVal === null) return null;
      
      return new TreeNode(currVal, build(), build());
  }
  
  return build();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

