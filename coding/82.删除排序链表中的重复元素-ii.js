/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
 * @return {ListNode}给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。

输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5]

输入：head = [1,1,1,2,3]
输出：[2,3]
(64 ms)
 */
// var deleteDuplicates = function(head) {
//  if(head === null || head.next === null) {
//   return head
//  }
//  if(head.val !== head.next.val) {
//   head.next = deleteDuplicates(head.next);
//  } else {
//   // 如果2个节点相同，就先把相同的节点全部移除
//   let temp = head.next;
//   while(temp !== null && head.val === temp.val) {
//    temp = temp.next
//   }
//   // 找到不重复的为止
//   return deleteDuplicates(temp)
//  }
//  return head
// };

var deleteDuplicates = function (head) {
    // 下一个和下一个的下一个比, 如果相同, 记录该值
    // 只要下一个值和这值一样就把当前的下一个指针
    let node = new ListNode(-1)
    node.next = head
    let p = node;

    while (p.next && p.next.next) {
        if (p.next.val === p.next.next.val) {
            let val = p.next.val;
            while (p.next && p.next.val === val) {
                p.next = p.next.next
            }
        } else {
            // 不重复,跳过
            p = p.next
        }
    }

    return node.next
};
// @lc code=end

