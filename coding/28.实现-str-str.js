/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
难度：Easy

相关话题：`双指针`、`字符串`

给定一个haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回 **-1** 。

示例 1：
输入：haystack = "hello", needle = "ll" // 5 2 3
输出：2

示例 2：
输入：haystack = "aaaaa", needle = "bba"
输出：-1

示例 3：
输入：haystack = "", needle = ""
输出：0

当 `needle` 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。


对于本题而言，当 `needle` 是空字符串时我们应当返回 0 。这与C语言的[strstr()](https://baike.baidu.com/item/strstr/811469)
以及 Java的[indexOf()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#indexOf(java.lang.String))
定义相符。

 */
//  (56 ms)
var strStr = function(haystack, needle) {
    if(haystack === needle) return 0
    for(let i = 0; i <= haystack.length - needle.length; i++) {
        let j = 0
        for(; j < needle.length; j++) {
            if(haystack[i+j] !== needle[j]) break
        }
        if(j === needle.length) return i
    }
    return -1
};
// @lc code=end