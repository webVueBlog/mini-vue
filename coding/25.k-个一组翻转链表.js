/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}

难度：Hard

相关话题：`链表`

给出一个链表，每*k* 个节点一组进行翻转，并返回翻转后的链表。

*k* 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是*k* 的整数倍，那么将最后剩余节点保持原有顺序。

给定这个链表： `1->2->3->4->5` 

当*k* = 2 时，应当返回:  `2->1->4->3->5` 

当*k* = 3 时，应当返回:  `3->2->1->4->5` 

* 你的算法只能使用常数的额外空间。

* **你不能只是单纯的改变节点内部的值** ，而是需要实际的进行节点交换。

思路：

相当于重复多个链表的部分转换，参考`NO.92`。

首先计算出原链表`head`的长度，计算出反转`k`个节点，能执行几次反转。

反转链表需要一个一个节点来处理。

例如 `[1->2->3->4->5],k=3`

反转从第`1`个节点开始，我们首先要找到头部节点(一个空的新节点)，因为后续所有的反转都是在头部节点的`next`上处理的。

同时，我们需要找到一个尾巴节点，例如反转`3`的时候，节点`1`就是尾巴节点，它的作用就是将要反转的`3`后面的节点连接起来。

这两个节点`头部节点(空)`和`尾巴节点(1)`是不变的。

当反转`2`时，将`头结点`和`2`相连，`2`和`1`相连，`1`和`3`相连；

当反转`3`时，将`头结点`和`3`相连，`3`和`2`相连，`1`和`4`相连。

 (104 ms)
 */
var reverseKGroup = function(head, k) {
 // 如果头部节点不存在
 if(!head) return null
 let len = 0, node = head
 while(node) {
  node=node.next
  len++
 }
 let root=new ListNode(null)
 root.next=head
 let startNode=root,tailNode=startNode.next
 node=root.next
 let t=Math.floor(len/k)
 while(t-->0){
  let n=k
  node=node.next
  while(n-->1){
    let secondNode=startNode.next
    let nxt=node.next
    startNode.next=node
    node.next=secondNode
    tailNode.next=nxt
    node=nxt
  }
  startNode=tailNode
  tailNode=startNode.next
 }
 return root.next
};
// @lc code=end

