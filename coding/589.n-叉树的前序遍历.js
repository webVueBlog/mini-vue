/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N 叉树的前序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
预序遍历是深度优先搜索(DFS)方法的一种，DFS问题通常用递归函数来解决。在这种情况下，我们甚至可以使主函数成为它自己的递归函数，而不必定义单独的递归助手。为了实现这一点，我们需要为函数创建一个新的默认实参来保存我们的答案数组(ans)，它应该默认为一个空数组。

在预DFS遍历中，先处理一个节点，然后转移到它的子节点，然后从左到右处理子节点。然后我们的递归函数应该通过将当前节点(根)的值推到ans来处理它，然后我们应该遍历根节点。子函数，并在每个子函数上调用递归函数。

对于除main函数调用外的所有函数，返回值都是未使用的，但是在main函数返回它的时候ans应该已经完成了。

输入：root = [1,null,3,2,4,null,5,6]
输出：[1,3,5,6,2,4]
 */
var preorder = function(root) {
    const res = []
    const traverse = (root) => {
     if(!root) return
     res.push(root.val)

     for(let child of root.children) {
      traverse(child)
     }
    }
    traverse(root)
    return res
};

//  (76 ms)
// var preorder = function(root, ans=[]) {
//  if (!root) return ans
//  ans.push(root.val)
//  for (let child of root.children)
//      preorder(child, ans)
//  return ans
// };
// @lc code=end

