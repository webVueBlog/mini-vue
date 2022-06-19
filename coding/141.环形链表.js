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
// (76 ms)
var hasCycle = function (head) {
    // 1.成环形即被超一圈，可以理解成操场跑操，快的同学是否把慢的同学超过一圈
    let p1 = head;
    let p2 = head;

    while (p1 && p1.next && p2) {

        // p1为快指针，p2为慢指针
        p1 = p1.next.next;
        p2 = p2.next;

        // 如果值相同了，表示成环了
        if (p1 === p2) {
            return true
        }
    }

    return false
};

// var hasCycle = function(head) {
//  let fast = head;
//  while(fast && fast.next) {
//   head = head.next
//   fast = fast.next.next
//   if(head === fast) return true
//  }
//  return false
// }
// 解法二：快慢指针法

// var hasCycle = function(head) {
//  if(!head || head.next === null) return false
//  let p = q = head;
//  do {
//   p = p.next
//   q = q.next.next
//  } while (p!==q && q !== null && q.next !== null)
//  return p === q
// }

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
