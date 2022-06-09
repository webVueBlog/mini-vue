/*
 * @lc app=leetcode.cn id=606 lang=javascript
 *
 * [606] 根据二叉树创建字符串
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
 * @return {string}
输入：root = [1,2,3,4]
输出："1(2(4))(3)"

输入：root = [1,2,3,null,4]
输出："1(2()(4))(3)"

 */
var tree2str = function (root) {
    if (!root) {
        return "";
    }
    if (!root.left && !root.right) {
        return '' + root.val;
    }
    if (!root.right) {
        return root.val + '(' + tree2str(root.left) + ')';
    }
    return root.val + '(' + tree2str(root.left) + ')(' + tree2str(root.right) + ')';

};

// (68 ms)
// var tree2str = function(t) {
//     if (!t) return '';
//     const left = tree2str(t.left);
//     const right = tree2str(t.right);
//     return t.val + (left || right ? `(${left})` : '') + (right ? `(${right})` : '');
// };
// @lc code=end

