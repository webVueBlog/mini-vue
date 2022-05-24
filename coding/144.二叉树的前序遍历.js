/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
 * (60 ms)
取跟节点为目标节点，开始遍历
1.访问目标节点
2.左孩子入栈 -> 直至左孩子为空的节点
3.节点出栈，以右孩子为目标节点，再依次执行1、2、3
 */

var preorderTraversal = function (root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      result.push(current.val);
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current = current.right;
  }
  return result;
};

// var preorderTraversal = function(root) {
//   if (!root) return [];
//   var result = [];
//   var stack = [root];

//   while(stack.length) {
//     var node = stack.pop();
//     result.push(node.val);
//     if (node.right) stack.push(node.right);
//     if (node.left) stack.push(node.left);
//   }
//   return result;
// };
// @lc code=end

