/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}

输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]

输入：root = [1]
输出：[[1]]

输入：root = []
输出：[]

// 题解
// 1.记录层级
// 2.并将每层数据放在相同层级数组中
// 3.逐层遍历，可以用广度优先

二叉树级别的顺序遍历通常推荐广度优先搜索(BFS)方法，并使用队列数据结构。当我们处理一个节点(curr)时，我们将按想要遍历的顺序(在本例中是从左到右)将该节点的子节点推到队列的末尾。通过这种方式，我们将在完成对这一行的迭代的同时，完成将下一行放入队列。

为了帮助跟踪行，我们只需将主循环嵌套在另一个循环中。在外层循环的开始，我们捕获队列的长度，它将告诉我们行有多长。然后我们可以遍历这些节点，每次将它们从队列的前面取出，然后处理任何行尾指令。在这个问题的情况下，这将意味着将当前行数组(row)推入我们的答案数组(ans)。

我们将继续这个过程，直到队列为空，此时我们将到达二叉树的末端，并可以返回ans。

(60 ms)
 */
// var levelOrder = function(root) {
//     let q = [root], ans = []
//     while (q[0]) {
//         let qlen = q.length, row = []
//         for (let i = 0; i < qlen; i++) {
//             let curr = q.shift()
//             row.push(curr.val)
//             if (curr.left) q.push(curr.left)
//             if (curr.right) q.push(curr.right)
//         }
//         ans.push(row)            
//     }
//     return ans
// };



var levelOrder = function (root) {

    if (!root) { return [] }
    const stack = [[root, 0]]; // 记录层级，默认为0

    let res = [];
    while (stack.length) {
        // 抛出栈头
        const [n, l] = stack.shift();
        // 层级记录了，那么就需要把值根据层级放入数组
        if (!res[l]) {
            res.push([n.val])
        } else {
            res[l].push(n.val)
        }

        if (n.left) { stack.push([n.left, l + 1]) };
        if (n.right) { stack.push([n.right, l + 1]) }
    }
    return res
};
// @lc code=end