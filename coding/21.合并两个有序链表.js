/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}

难度：Easy

相关话题：`链表`

将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```
 (64 ms)
 */
var mergeTwoLists = function(l1, l2) {
    // 如果l1不存在
    if(l1 === null) return l2
    // 如果l2不存在
    if(l2 === null) return l1
    // 判断有序
    if(l1.val < l2.val) {
     l1.next = mergeTwoLists(l1.next, l2)
     return l1
    } else {
     l2.next = mergeTwoLists(l1, l2.next)
     return l2
    }
}
// (68 ms)
// var mergeTwoLists = function(l1, l2) {
//     var mergedHead = { val: -1, next: null },
//         crt = mergedHead;
//     while (l1 && l2) {
//         if (l1.val > l2.val) {
//             crt.next = l2;
//             l2 = l2.next;
//         } else {
//             crt.next = l1;
//             l1 = l1.next;
//         }
//         crt = crt.next;
//     }
//     crt.next = l1 || l2;
//     return mergedHead.next;
// };
// @lc code=end