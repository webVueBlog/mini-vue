/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
    const cnt = new Array(128).fill(0);
    let [start, end] = [-Infinity, Infinity];
    let [left, right, count] = [0, 0, t.length];
    
    for (let i = 0; i < t.length; i++) 
        cnt[t.charCodeAt(i)]++;
    
    while (right < s.length) {
        if (cnt[s.charCodeAt(right)]-- > 0) count--;
        
        while (!count) {
            if (end - start > right - left) [start, end] = [left, right];
            if (++cnt[s.charCodeAt(left++)] > 0) count++;
        }
        
        right++;
    }
    
    return end === Infinity ? '' : s.substring(start, end + 1);
};
// @lc code=end

