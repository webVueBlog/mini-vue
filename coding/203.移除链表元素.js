/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
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
 * @param {number} val
 * @return {ListNode}给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

输入：head = [], val = 1
输出：[]

输入：head = [7,7,7,7], val = 7
输出：[]
 (72 ms)
 */
var removeElements = function(head, val) {
 if (!head) return head;

 while(head) {
     if(head.val === val) {
         head = head.next;
     } else {
         break;
     }
 }
 
 let curr = head;
 while(curr && curr.next) {
     if (curr.next.val === val) curr.next = curr.next.next;
     else curr = curr.next;
 }
 
 return head;
};
// @lc code=end

