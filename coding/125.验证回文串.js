/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

输入: "A man, a plan, a canal: Panama"
输出: true
解释："amanaplanacanalpanama" 是回文串

输入: "race a car"
输出: false
解释："raceacar" 不是回文串
 (64 ms)
 */
var isPalindrome = function(input) {
 var start = 0
 var end = input.length - 1
 while (start < end) {
     var s = input.charCodeAt(start)
     var e = input.charCodeAt(end)
 
     if (!isLetter(s)) {
         start++
         continue
     }
     if (!isLetter(e)) {
         end--
         continue
     }
 
     if (toLowerCase(s) !== toLowerCase(e)) {
         return false 
     } 
     start++
     end--
}
return true
};
var isLetter = function(code) {
 if (((code >= 48) && (code <= 57))  // numbers
 || ((code >= 65) && (code <= 90))  // uppercase
 || ((code >= 97) && (code <= 122))) {  // lowercase
     return true
 }
 else {
     return false
 }
}

var toLowerCase = function(code) {
 if (code >= 65 && code <= 90) {
     return code + 32    
 }
 else {
     return code
 }
}

// @lc code=end

