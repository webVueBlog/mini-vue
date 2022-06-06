/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
难度：Middle

相关话题：`链表`、`双指针`

给定一个链表，删除链表的倒数第*n* 个节点，并且返回链表的头结点。

```
给定一个链表: 1->2->3->4->5, 和 *n*  = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

给定的 *n* 保证是有效的。

你能尝试使用一趟扫描实现吗？

思路：

定义`双指针`，其中`指针2`比`指针1`慢`n`，等到`指针1`到达最后的时候，需要删除的就是`指针2.next`。

注意：

如果定义时`指针1`已经为`null`，说明要删除的就是头一个，直接返回`head.next`。

 (64 ms)
 */
var removeNthFromEnd = function(head, n) {
 // 如果头节点不存在返回null
 if(!head) return null
 // 快慢指针
 let first = head, second = head
 // 其中`指针2`比`指针1`慢`n`
 while(first&& n-- > 0) first = first.next
 // 直接返回`head
 if(!first) return head.next
 // `指针1`到达最后的时候
 while(first && first.next) {
  first = first.next
  second = second.next
 }
 let nxt = second.next
 second.next = nxt.next
 return head
};
// @lc code=end

