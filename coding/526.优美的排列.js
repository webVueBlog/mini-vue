/*
 * @lc app=leetcode.cn id=526 lang=javascript
 *
 * [526] 优美的排列
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
 var countArrangement = function(n) {
    const visited = new Array(n + 1).fill(false);
    let count = 0;
    
    const backtrack = (num = 1) => {
        if (num > n) return count++;
        
        for (let i = 1; i <= n; i++) {
            if (!visited[i] && (!(num % i) || !(i % num))) {
                visited[i] = true;
                backtrack(num + 1);
                visited[i] = false;
            }
        }
    }
    
    backtrack();
    
    return count;
};
// @lc code=end

