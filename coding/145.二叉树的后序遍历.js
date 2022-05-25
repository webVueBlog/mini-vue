/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 *  (60 ms)
取跟节点为目标节点，开始遍历
1.左孩子入栈 -> 直至左孩子为空的节点
2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
左右中
 */
var postorderTraversal = function (root) {
  const result = [];
  const stack = [];
  let last = null; // 标记上一个访问的节点
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (!current.right || current.right == last) {
      current = stack.pop();
      result.push(current.val);
      last = current;
      current = null; // 继续弹栈
    } else {
      current = current.right;
    }
  }
  return result;
}
//  var postorderTraversal = function(root) {
//   if(!root) return [];

//   const stack = [root];
//   const result = [];
//   while(stack.length > 0) {
//       const node = stack.pop();
//       result.push(node.val);
//       if(node.left) stack.push(node.left);
//       if(node.right) stack.push(node.right);
//   }
  
//   return result.reverse();
// };
// @lc code=end

