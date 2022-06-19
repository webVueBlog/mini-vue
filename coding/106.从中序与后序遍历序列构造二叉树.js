/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
难度：Middle

相关话题：`树`、`深度优先搜索`、`数组`

根据一棵树的中序遍历与后序遍历构造二叉树。

思路：

按照`postorder`的倒序从`inorder`内部查找，对于查找到的索引`idx`，将当前`inorder`的左`lo`和右`hi`边界继续分割为`[lo,idx-1]`和`[idx+1,hi]`，继续递归处理。

和`NO.105`的区别在于`postorder`需要从右向左，并且先`right`子树再`left`子树。

 */
var buildTree = function(inorder, postorder) {
  let postIdx=postorder.length-1
  function createTree(lo,hi){
    if(lo>hi)return null
    let val=postorder[postIdx--]
    let idx=inorder.indexOf(val)
    let node=new TreeNode(val)
    node.right=createTree(idx+1,hi)
    node.left=createTree(lo,idx-1)
    return node
  }
  return createTree(0,inorder.length-1)
};
// @lc code=end

