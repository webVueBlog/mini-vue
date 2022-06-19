/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
 * @return {boolean}
 */

var isPalindrome = function (head) {
    // 链表不能使用双指针，于是我们只能把原始链表反转再比较两者是否相同
    // 快慢指针，起初都指向表头，快指针一次走两步，慢指针一次走一步，遍历结束时：
    // 要么，slow 正好指向中间两个结点的后一个。
    // 要么，slow 正好指向中间结点。

    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 判断奇偶,
    if (fast !== null) {
        // 说明链表长度为奇数
        slow = slow.next;
    }
    // 反转slow，再比较
    let left = head, right = reverse(slow);
    while (right !== null) {
        if (left.val !== right.val) {
            return false;
        }

        left = left.next;
        right = right.next;
    }

    return true;
};
// 反转
const reverse = (head) => {
    let pre = null, cur = head;
    while (cur !== null) {
        let tmp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = tmp;
    }
    return pre;
}

// var isPalindrome = function(head) {
//  let slow = head, fast = head, prev, temp;
//  while(fast && fast.next) {
//   slow =  slow.next, fast = fast.next.next;
//  }
//  prev = slow, slow = slow.next, prev.next = null;
//  while(slow) {
//   temp = slow.next, slow.next = prev, prev = slow, slow = temp;
//  }
//  fast = head, slow = prev;
//  while(slow) {
//   if(fast.val !== slow.val) return false
//   else fast = fast.next, slow = slow.next
//  }
//  return true
// };
// @lc code=end

