/*
 * @lc app=leetcode.cn id=65 lang=javascript
 *
 * [65] 有效数字
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
难度：Hard

相关话题：`数学`、`字符串`

验证给定的字符串是否可以解释为十进制数字。

例如:

 `"0"` => `true` 
 `" 0.1 "` => `true` 
 `"abc"` => `false` 
 `"1 a"` => `false` 
 `"2e10"` => `true` 
 `" -90e3 "` => `true` 
 `" 1e"` => `false` 
 `"e3"` => `false` 
 `" 6e-1"` => `true` 
 `" 99e2.5"` => `false` 
 `"53.5e93"` => `true` 
 `" --6 "` => `false` 
 `"-+3"` => `false` 
 `"95a54e53"` => `false` 

**说明:** 我们有意将问题陈述地比较模糊。在实现代码之前，你应当事先思考所有可能的情况。这里给出一份可能存在于有效十进制数字中的字符列表：

* 数字 0-9

* 指数 - "e"

* 正/负号 - "+"/"-"

* 小数点 - "."

当然，在输入中，这些字符的上下文也很重要。

思路：

这道题涉及的情况很多，先理顺各种情况先后关系，针对`s[i]`的每一种情况，写下来，然后再写代码，会清晰很多。


 */

var isNumber = function(S) {
 let exp = false, sign = false, num = false, dec = false
 for (let c of S)
     if (c >= '0' && c <= '9') num = true     
     else if (c === 'e' || c === 'E')
         if (exp || !num) return false
         else exp = true, sign = false, num = false, dec = false
     else if (c === '+' || c === '-')
         if (sign || num || dec) return false
         else sign = true
     else if (c === '.')
         if (dec || exp) return false
         else dec = true
     else return false
 return num
};
// @lc code=end

