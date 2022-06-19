/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
返回入环点的位置
 * 2(x+y) = x+2y+z
 * x = z 
(72 ms)
 */

var detectCycle = function (head) {
    // 快慢指针，与141相同，成环即快指针追上慢指针一圈
    // 快指针所走的即是环的k 倍，那么假设相遇点是M 那么距离头结点就是k-m

    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) break;
    }
    // fast 为null时说明没成换
    if (fast == null || fast.next == null) {
        return null;
    }
    // 重置慢指针
    slow = head;
    // 快慢指针同步前进，相交点就是环起点
    while (slow !== fast) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
};

// var detectCycle = function(head) {
//     if (!head || head.next === null) return null
//     let p = q = head
//     do {
//         p = p.next
//         q = q.next.next
//     } while (p !== q && q && q.next)

//     if (p !== q) return null
//     p = head
//     while (p !== q) {
//         p = p.next
//         q = q.next
//     }
//     return p
// };
// @lc code=end

// var detectCycle = function(head) {
//     if (!head || head.next === null) return null

//     const map = new Map()
//     let p = head
//     while (p) {
//         if (!map.has(p)) {
//             map.set(p, p)
//             p = p.next
//         } else {
//             return p
//         }
//     }
//     return false
// };