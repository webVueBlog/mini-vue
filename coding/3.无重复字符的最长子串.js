/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const set = new Set();
    let [start, end, maxLen] = [0, 0, 0];
    
    while(end < s.length) {
        set.has(s[end]) ? set.delete(s[start++]) : set.add(s[end++]);
        
        maxLen = Math.max(maxLen, set.size);
    }
    
    return maxLen;
};

// @lc code=end

