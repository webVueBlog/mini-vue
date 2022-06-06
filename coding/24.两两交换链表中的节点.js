/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
 * @return {ListNode}
难度：Middle

相关话题：`链表`

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

**你不能只是单纯的改变节点内部的值** ，而是需要实际的进行节点交换。

```
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

思路：

假设一组内含有2个节点，定义一个`startNode`为每一组的前一个节点(方便两两交换)，初始为一个空节点`new ListNode(null)`。

每次检查`node`和`node.next`都存在，说明当前组有效的，是不缺少节点的。

例如`[1,2,3]`，初始`startNode`为额外空节点，第一次检查`Node(1)`和`Node(2)`都存在，只需要将两个交换后得到`[2,1,3]`；

接着，更新`startNode`为`Node(2)`，第二次检查只有`Node(3)`存在，当前组只有1个节点，退出循环。

 (72 ms)
 */
var swapPairs = function(head) {
 // 如果当前节点不存在 为null
 if(!head) return null
 // 初始为一个空节点
 let root = new ListNode(null)
 // 指向头节点
 root.next = head
 // 初始`startNode`为额外空节点
 let startNode = root
 // 临时头节点
 let node = root.next
 // 检查`Node(1)`和`Node(2)`都存在
 // null-> 1->2 -> 3->4
 while(node && node.next) {
  let nxt = node.next
  node.next = nxt.next
  startNode.next = nxt
  nxt.next = node
  startNode = node
  node = node.next
 }
 return root.next
};
// @lc code=end

