/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
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
 * @return {void} Do not return anything, modify root in-place instead.

 思路：

这道题关键就是利用二叉搜索树的中序遍历，找出不符合要求的2个节点。

其中`O(n)`的思路是，使用一个数组保存中序遍历的结果，然后找出错误排序的2个节点，通过交换即可。




`O(1)`的思路也差不多，不过不需要使用一个数组来保存，而是3个变量`prevNode,s1,s2`，其中`s1`和`s2`为最终交换的节点。

`prevNode`为上一个节点，直接在原树上进行中序遍历，当发现顺序不对时，让`s1=prevNode, s2=root`，接着遍历，如果还存在顺序
不对，只需要更新`s2`即可。

 */
// var recoverTree = function(root) {
//   let aux=[]
//   function dfs(root){
//     if(root.left)dfs(root.left)
//     aux.push(root)
//     if(root.right)dfs(root.right)
//   }
//   dfs(root)
//   let s1,s2
//   for(let i=0;i<aux.length-1;i++){
//     if(aux[i].val>aux[i+1].val){
//       if(s1==null)s1=aux[i]
//       if(s1!=null)s2=aux[i+1]
//     }
//   }
//   let t=s1.val
//   s1.val=s2.val
//   s2.val=t
// };

var recoverTree = function(root) {
  let s1=null,s2=null,prev=null
  function dfs(root){
    if(root.left)dfs(root.left)
    if(prev && root.val<=prev.val){
      if(!s1)s1=prev
      if(s1)s2=root
    }
    prev=root
    if(root.right)dfs(root.right)
  }
  dfs(root)
  let t=s1.val
  s1.val=s2.val
  s2.val=t
};
// @lc code=end

