/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
难度：Easy

相关话题：`数学`

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

思路：

使用字符串就是判断回文字符串，很简单。

注意：如果遇到负数直接返回`false`。

 */
//  (144 ms)
var isPalindrome = function(x) {
 if(x < 0) return false
 let n = x
 let rev = 0
 while(n > 0) {
  let t = n%10
  rev = rev*10 + t
  n = ~~(n/10)
 }
 return rev === x
}
// (168 ms)
// var isPalindrome = function(x) {
//  return String(x).split('').reverse().join('') == String(x);
// };

// @lc code=end

