/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
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
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    if (n == 0) return [];
    
    return findAllUniqueTrees(1, n);

    function findAllUniqueTrees(start, end) {
        const ans = [];
        
        // base case
        if (start > end) {
            ans.push(null);
            return ans;
        };
        
        if (start == end) {
            ans.push(new TreeNode(start));
            return ans;
        }
        
        for (let i = start; i <= end; i++) {
            const leftSubTrees = findAllUniqueTrees(start, i - 1);
            const rightSubTrees = findAllUniqueTrees(i + 1, end);
            
            for (const leftSubTree of leftSubTrees) {
                for (const rightSubTree of rightSubTrees) {
                    const root = new TreeNode(i);
                    root.left = leftSubTree;
                    root.right = rightSubTree;
                    ans.push(root);
                }
            }
        }
        
        return ans;
    }
};
// @lc code=end

