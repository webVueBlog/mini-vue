/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
 * 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

输入：head = [1,1,2]
输出：[1,2]

输入：head = [1,1,2,3,3]
输出：[1,2,3]
 (72 ms)
 */
var deleteDuplicates = function (head) {
    // 1.题目中已排序，告诉我们所以重复链表都相同
    // 2.删除相同，这道题比较简单

    let p = head;
    // 循环，因为要与下一个值作比较，所以也要进行判断
    while (p && p.next) {
        if (p.val === p.next.val) {
            // 删除下一个
            p.next = p.next.next
        } else {
            // 这边要注意的是继续下一步时要考虑的可能后面也相同，所以我们让循环多执行一次
            p = p.next
        }
    }

    // 直接返回原链表即可
    return head
};

// var deleteDuplicates = function(head) {
//     let current = head;
//     while(current) {
//         if(current.next && current.val === current.next.val) {
//             current.next = current.next.next
//         } else {
//             current = current.next
//         }
//     }
//     return head
// };
// @lc code=end