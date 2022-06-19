/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
思路：

建立一个链表头`less`和链表头`greater`，遍历链表`head`，如果`head.val<x`，放入`less`中，如果`head.val>=x`放入`greater`中。

最后合并`less`和`greater`。
 */
var partition = function(head, x) {
  let node=new ListNode(0),less=node,
      node2=new ListNode(0),greater=node2
  while(head){
    if(head.val<x){
      less.next=head
      less=less.next
    }else{
      greater.next=head
      greater=greater.next
    }
    head=head.next
  }
  less.next=node2.next
  greater.next=null
  return node.next
};
// @lc code=end

