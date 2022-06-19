/*
 * @lc app=leetcode.cn id=109 lang=javascript
 *
 * [109] 有序链表转换二叉搜索树
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
难度：Middle

相关话题：`深度优先搜索`、`链表`

给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树*每个节点* 的左右两个子树的高度差的绝对值不超过 1。

思路：

为了达到`平衡树`，每次都要插入`中间值`，左子树再插入左侧的中间值，右子树插入右侧的中间值，然后递归。

可以将链表转化为数组，然后通过`mid=Math.floor((lo+hi)/2)`去查找中间值；

也可以直接通过链表的`slow=slow.next;fast=fast.next.next`找中间值。



 */
var sortedListToBST = function(head) {
  let arr=[]
  let listNode=head
  while(listNode){
    arr.push(listNode.val)
    listNode=listNode.next
  }
  function createTree(arr,lo,hi){
    if(lo>hi)return null
    let mid=Math.floor((lo+hi)/2)
    let node=new TreeNode(arr[mid])
    node.left=createTree(arr,lo,mid-1)
    node.right=createTree(arr,mid+1,hi)
    return node
  }
  return createTree(arr,0,arr.length-1)
};
// @lc code=end

