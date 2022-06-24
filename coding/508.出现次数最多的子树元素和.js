/*
 * @lc app=leetcode.cn id=508 lang=javascript
 *
 * [508] 出现次数最多的子树元素和
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
 * @return {number[]}
 */
 var findFrequentTreeSum = function(root) {
    const cnt = {};

    const dfs = node => {
        if (!node) return 0;
        
        const s = node.val + dfs(node.left) + dfs(node.right);
        cnt[s] ? cnt[s]++ : cnt[s] = 1;
        
        return s;
    }
    
    dfs(root);
    const maxCount = Math.max(...Object.values(cnt));
    
    return Object
        .entries(cnt)
        .reduce((arr, [num, count]) => {
            if (count === maxCount) arr.push(+num);
        
            return arr;
        }, [])
};
// @lc code=end

