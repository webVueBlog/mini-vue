/*
 * @lc app=leetcode.cn id=559 lang=javascript
 *
 * [559] N 叉树的最大深度
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
 var maxDepth = function(root) {
    if (!root) return 0;
    
    let max = 0;
    for (let child of root.children) {
        max = Math.max(max, maxDepth(child));
    }
    
    return max + 1;
};
// @lc code=end

