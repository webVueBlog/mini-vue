/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const dummy = new ListNode();
    let [curr, carry] = [dummy, 0];
    
    while(l1 || l2) {
        let sum = 0;
        sum += (l1?.val || 0) + (l2?.val || 0) + carry;
        curr.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10);
        
        l1 = l1?.next;
        l2 = l2?.next;
        curr = curr.next;
    }
        
    if (carry) curr.next = new ListNode(carry);
    
    return dummy.next;
};
// @lc code=end

