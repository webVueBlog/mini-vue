/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 方法一：暴力求解
 逐个生成子字符串
 看它是否不含有重复的字符
 
 方法二：滑动窗口及优化
 关键字：重复字符 -> 出现1次
 模式识别1:一旦涉及出现次数，需要用到散列表
 构造子串，散列表下标
 模式识别2:涉及子串，考虑滑动窗口
 
 举例分析思路
 p w w k e w
 
 测试：
 字符串为空的情况
 字符串均为重复字符的情况
 测试其他常规输入
 
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

