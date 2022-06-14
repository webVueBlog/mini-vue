/*
 * @lc app=leetcode.cn id=173 lang=javascript
 *
 * [173] 二叉搜索树迭代器
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
 */
var BSTIterator = function (root) {
    this.stack = [];
    this.index = 0;
    this.inorderTraversal(root, this.stack);
};
/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
    return this.stack[this.index++];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
    return this.index < this.stack.length;
};
BSTIterator.prototype.inorderTraversal = function(root, arr) {
    if (!root) {
        return;
    }
    this.inorderTraversal(root.left, arr);
    arr.push(root.val);
    this.inorderTraversal(root.right, arr);
};
/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end

