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
 方法：初等数学
 我们使用变量来跟踪进位，并从包含最低有效位的表头开始模拟逐位相加的过程
 对两数相加方法的可视化：342+465=807，每个结点都包含一个数字，并且数字按位逆序存储
 
    l1 = 3 -> 4 -> 2 -> null
    l2 = 4 -> 6 -> 5 -> null
result = 7 -> 0 -> 8
 carry = 0
 
 将当前结点初始化为返回列表的哑结点
 将进位carry初始化为0
 遍历列表l1和l2直至到达它们的尾端
 若达到l1末尾，则只计算l2
 若达到l2末尾，则只计算l1
 设定sum = x + y + carry
 创建一个数值为sum%10的新结点，并将其设置为当前结点的下一个结点，然后将当前结点前进到下一个结点。
 更新进位的值，carry为sum的十位
 将l1和l2前进到下一个节点
 检查carry = 1是否成立，如果成立，则向返回列表追加一个含有数字1的新结点
 
 复杂度分析

时间复杂度：O(\max(m,n))O(max(m,n))，其中 mm 和 nn 分别为两个链表的长度。我们要遍历两个链表的全部位置，而处理每个位置只需要 O(1)O(1) 的时间。

空间复杂度：O(1)O(1)。注意返回值不计入空间复杂度。
 
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