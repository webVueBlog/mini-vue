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
    let [left, right, maxLen] = [0, 0, 0];
    
    while (right < s.length) {
        set.has(s[right]) ? set.delete(s[left++]) : set.add(s[right++]);
        maxLen = Math.max(maxLen, set.size);
    }
    
    return maxLen;
};
// @lc code=end

