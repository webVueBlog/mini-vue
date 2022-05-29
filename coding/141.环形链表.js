/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 * 给你一个链表的头节点 head ，判断链表中是否有环。

 (76 ms)
 
 */
// 解法二：快慢指针法
var hasCycle = function(head) {
 if(!head || head.next === null) return false
 let p = q = head;
 do {
  p = p.next
  q = q.next.next
 } while (p!==q && q !== null && q.next !== null)
 return p === q
}

// (148 ms)
// 解放一：暴力破解法
// 从头节点开始遍历这个指针，看是否能遍历到末尾的空节点
// 或者是遍历到这个 或者是某一个节点被重复遍历了两次 证明链表有环的
// var hasCycle = function(head) {
//  // 首先我们判断一下这个链表是不是空的链表，或者是这个链表是不是只有一个节点
//  // 如果是的话那就说明它不可能构造 环形链表，则返回false
//  if(!head || head.next === null) return false
//  // 否则的话，我们从头指针开始遍历一下这个链表
//  let p = head
//  const arr = [];
//  while(p !== null) {
//   if(!arr.includes(p)) {
//    arr.push(p);
//    p = p.next
//   } else {
//    // 第二次走到，出现
//    return true
//   }
//  }
//  // 如果走到末尾空节点
//  return false
// }

// @lc code=end
