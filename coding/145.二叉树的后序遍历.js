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
后序遍历：左，右，中
栈的特点是先进后出，因此出栈顺序为左，右，中
那么入栈顺序必须调整为出栈顺序的倒序，也就是中，右，左
 */
var postorderTraversal = function (root) {
  if(!root) return []

  const stack = []
  const ans = []
  let curr = root

  while(stack.length || curr) {
    // 有当前curr  中 右
    if(curr) {
      ans.push(curr.val)
      stack.push(curr) // 存储节点
      curr = curr.right // 每次先遍历右节点，再遍历左节点
    } else {
      // 右子树走到底之后，再从获取已经遍历过右子树的中间结果
      // 将它出栈，并遍历它的左子树
      const node = stack.pop();
      curr = node.left
    }
  }

  return ans.reverse();
}

// @lc code=end

