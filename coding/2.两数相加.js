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

难度：Middle

相关话题：`链表`、`数学`

给出两个**非空**  的链表用来表示两个非负的整数。其中，它们各自的位数是按照**逆序** 的方式存储的，并且它们的每个节点只能存储**一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0开头。

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

只不过数据结构换成链表，而且给的是反向链表，方便我们进行进位操作。

对`l1`和`l2`只需要逐步遍历，如果一方不存在，则认为`val`为0。

注意最后遍历完还要检查`carry`，如果`carry>0`还在再次添加一个链表`new ListNode(carry)`。
 (100 ms)
 */
var addTwoNumbers = function(l1, l2) {
 // 初始化空节点
 let res = new ListNode()
 // 进位
 let carry = 0
 // 临时节点
 let node = res
 // 当链表有值，进位有值
 while(l1 || l2 || carry > 0) {
  // 链表存在
  let v1 = l1 ? l1.val : 0,
      v2 = l2 ? l2.val : 0
  // 总数
  let sum = v1 + v2 + carry
  // 求进位
  carry = Math.floor(sum/10);
  // 求个位
  sum = sum % 10
  // 个位有了放到下一个节点
  node.next = new ListNode(sum)
  // 判断链表是否还有值
  if(l1) l1 = l1.next
  if(l2) l2 = l2.next
  // 临时节点下一个
  node = node.next
 }
 return res.next
}
// (100 ms)
//  var addTwoNumbers = function(l1, l2) {
//   // 创建链表 List.next为结果值
//   var List = new ListNode(0);
//   // 临时链表
//   var head = List;
//   var sum = 0;
//   // 进位
//   var carry = 0;

//   while(l1!==null||l2!==null||sum>0){
//       // 2->4->3
//       if(l1!==null){
//           // 当前链表的值
//           sum = sum + l1.val;
//           l1 = l1.next;
//       }
//       if(l2!==null){
//           sum = sum + l2.val;
//           l2 = l2.next;
//       }
//       if(sum>=10){
//           carry = 1;
//           sum = sum - 10;
//       }
//       // head.next 就是下一个值
//       head.next = new ListNode(sum);
//       // 赋值下一个head
//       head = head.next;
//       // 有值的话下一个相加
//       sum = carry;
//       carry = 0;

//   }

//   return List.next;
// };
// @lc code=end

