/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
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
 * @param {ListNode[]} lists
 * @return {ListNode}

难度：Hard

相关话题：`堆`、`链表`、`分治算法`

合并*k* 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

```
输入:
[
 1->4->5,
 1->3->4,
 2->6
]
输出: 1->1->2->3->4->4->5->6
```

思路：

好几种方法能解决，

1. 直接排序，将每一个`node.val`添加到数组，然后排序后重新生成链表。

2. 优先队列，将每一个`node`加入`Priority Queue`，然后再从小到大导出即可。

3. 归并排序(见代码)。

4. 多指针(比较慢)，每一次都找出当前每一个`list[i]`中的最小值，找到的那个节点执行`list[i]=list[i].next`。

(64 ms)
 */
var mergeKLists = function(lists) {
  function merge2Lists(list1, list2) {
    if(list1 === null) return list2
    if(list2 === null) return list1
    // 如果l1的值小于l2的值
    if(list1.val < list2.val) {
      list1.next = merge2Lists(list1.next, list2);
      return list1
    } else {
      list2.next = merge2Lists(list1, list2.next);
      return list2
    }
  }
  function divid(lists, left, right) {
    if(left === right) return lists[left];
    if(left > right) return null
    // left < right 符合
    let mid = Math.floor((left+right)/2)
    let list1 = divid(lists, left, mid)
    let list2 = divid(lists, mid+1, right)
    return merge2Lists(list1, list2)
  }
  // 链表数组 数组长度
  return divid(lists, 0, lists.length - 1)
}
// (80 ms)
// var mergeLists = function(a, b) {
//  const dummy = new ListNode(0);
//  let temp = dummy;
//  while(a !== null && b !== null) {
//   if(a.val < b.val) {
//    temp.next = a;
//    a = a.next
//   } else {
//    temp.next = b;
//    b = b.next;
//   }
//   temp = temp.next;
//  }
//  if(a !== null) {
//   temp.next = a;
//  }
//  if(b !== null) {
//   temp.next = b;
//  }
//  return dummy.next;
// };

// var mergeKLists = function(lists) {
//  if(lists.length === 0) {
//   return null;
//  }
//  while(lists.length > 1) {
//   let a = lists.shift();
//   let b = lists.shift();
//   const h = mergeLists(a, b);
//   lists.push(h);
//  }
//  return lists[0];
// }
// @lc code=end

