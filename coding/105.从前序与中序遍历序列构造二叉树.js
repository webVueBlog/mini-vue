/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
难度：Middle

相关话题：`树`、`深度优先搜索`、`数组`

根据一棵树的前序遍历与中序遍历构造二叉树。

**注意:** 
你可以假设树中没有重复的元素。



 */
var buildTree = function(preorder, inorder) {
  let preIdx=0
  return createTree(0,inorder.length-1)
  
  function createTree(lo,hi){
    if(lo>hi)return null
    let val=preorder[preIdx++]
    let idx=inorder.indexOf(val)
    let node=new TreeNode(val)
    node.left=createTree(lo,idx-1)
    node.right=createTree(idx+1,hi)
    return node
  }
};
// @lc code=end

