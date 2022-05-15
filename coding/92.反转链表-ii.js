/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

 输入：head = [1,2,3,4,5], left = 2, right = 4
输出：[1,4,3,2,5]

输入：head = [5], left = 1, right = 1
输出：[5]

(60 ms)
 */

var reverseBetween = function(head, left, right) {
 // 虚拟头部
 let dummy = new ListNode(-1, head);
 // 先遍历找到left之前的节点
 let prev = dummy;
 for(let i = 0; i < left - 1; i++) {
  prev = prev.next;
 }
 let cur = prev.next;
 for(let i = 0; i < right - left; i++) {
  let next = cur.next;
  // 穿针引线
  cur.next = next.next;
  next.next = prev.next;
  prev.next = next;
 }
 return dummy.next;
}

// var reverseBetween = function(head, left, right) {
//   let start = head, cur = head;
//   let i = 1;
//   while(i < left) {
//     start = cur;
//     cur = cur.next;
//     i++;
//   }
//   let prev = null, tail = cur; // tail截尾
//   while(i <= right) {
//     let next = cur.next;
//     cur.next = prev;
//     prev = cur;
//     cur = next;
//     i++;
//   }
//   start.next = prev;
//   tail.next = cur;
//   return left == 1 ? prev : head;
// };
  
// @lc code=end

