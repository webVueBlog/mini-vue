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
前序遍历：中，左，右
栈的特点是先进后出，因此出栈顺序为中，左，右
那么入栈顺序必须调整为出栈顺序的倒序，也就是右，左，中
 */

// BFS 解法一
var preorderTraversal = function (root) {
  // 如果root不存在，返回[]
  if(!root) return []
  const ans = []

  // 先放入栈中
  const stack = [root]
  // 栈内一直有值
  while(stack.length) {
    const { val, left, right } = stack.pop()
    ans.push(val); // 处理当前节点
    
    if(right) stack.push(right); // 先右
    if(left) stack.push(left); // 后左
  }
  return ans
}

// BFS 解法二
// var preorderTraversal = function (root) {
//   if(!root) return [];
//   const ans = [];
//   const stack = [root];
//   while(stack.length) {
//     let curr = stack.pop();
//     while(curr) {
//       ans.push(curr.val)
//       if(curr.right) stack.push(curr.right) // push右子节点
//       curr = curr.left // 将指针指向左子节点
//     }
//   }
//   return ans
// }

// @lc code=end

