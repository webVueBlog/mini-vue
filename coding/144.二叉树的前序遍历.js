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
中左右

中左右
 */

var preorderTraversal = function (root) {
  if(!root) return []
  const ans = []
  const stack = [root]
  while(stack.length) {
    const {val,left,right} = stack.pop()
    ans.push(val) // 处理当前节点
    if(right) stack.push(right) // 先右
    if(left) stack.push(left) // 后左
  }
  return ans
}

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

