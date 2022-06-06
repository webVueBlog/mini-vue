/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}

输入：s = "   -42"
输出：-42

输入：s = "4193 with words"
输出：4193

难度：Middle

相关话题：`数学`、`字符串`

请你来实现一个 `atoi` 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为[&minus;231, 231&minus; 1]。如果数值超过这个范围，qing返回 INT_MAX (231&minus; 1) 或INT_MIN (&minus;231) 。

思路：

这道题涉及的情况有4种，因此需要先完全考虑清楚它们的关系，否则会容易漏掉一些规则出错。

1. 空格：空格只有在前面没有任何字符的情况下才能继续处理，如果前面存在任何字符，遇到空格直接跳出。
2. 字母：遇到字母直接跳出。
3. 正负号：只有在还没有出现正负号或者数字的情况，正负号才有效，否则跳出。
4. 数字：遇到数字如果前面无zhengfuhao正负号，说明是正号。

(76 ms)
 */
var myAtoi = function(str) {
 let isNeg = null
 let first = false
 let numS = 0
 for(let i = 0; i < str.length; i++) {
  if(!first && str[i] === ' ') continue
  first = true
  if(isNeg === null && str[i] === '+') {
   isNeg = false
  } else if(isNeg === null && str[i] === '-') {
   isNeg = true
  } else if(/\d/.test(str[i])) {
   isNeg = !!isNeg
   numS = numS*10+str[i]*1
  } else {
   break
  }
 }
 let res = isNeg ? -numS : numS,
     limit = Math.pow(2, 31)
 if(res > limit - 1) res = limit - 1
 if(res < -limit) res = -limit
 return res
}
// (72 ms)
// var myAtoi = function(s) {
//  return Math.max(Math.min(parseInt(s) || 0, 2147483647), -2147483648)
// };
// @lc code=end

