/*
 * @lc app=leetcode.cn id=538 lang=javascript
 *
 * [538] 把二叉搜索树转换为累加树
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
 * @return {TreeNode}
 */
// var convertBST = function(root) {
//     let sum = 0, prev = 0;
//     function rec(root){
//         if(root){
//             rec(root.right);
//             sum += root.val;
//             root.val += prev;
//             prev = sum;
//             rec(root.left);
//         }
//     }
    
//     rec(root);
//     return root;
// }

var convertBST = function(root) {
    // 记录累加和
    let sum = 0;
    const traverse = (root) => {
        if(!root) return;

        traverse(root.right)
        sum += root.val;
        root.val = sum;

        traverse(root.left)
    }

    traverse(root)

    return root
};
// @lc code=end

