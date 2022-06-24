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
 */
 var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode();
    let curr = dummy;
    
    while (list1 && list2) {
        list1.val < list2.val
            ? [curr.next, list1] = [list1, list1.next]
            : [curr.next, list2] = [list2, list2.next];
        
        curr = curr.next;
            
    }
    
    curr.next = list1 || list2;
        
    return dummy.next;
};
// @lc code=end