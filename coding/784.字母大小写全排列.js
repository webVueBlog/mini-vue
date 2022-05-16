/*
 * @lc app=leetcode.cn id=784 lang=javascript
 *
 * [784] 字母大小写全排列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。

返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。

'a'.charCodeAt() // 97

'z'.charCodeAt() // 122

A-Z 65-90
回溯 递归
(88 ms)
 */
var letterCasePermutation = function (s) {
  // current '' index是按照字符串索引排序，没有跳过等情况, res[]
  const dfs = (current, index, res) => {
    // a1 2 []
    if (current.length === s.length) {
      // 是否满足要求的一种答案
      res.push(current)
    }
    if (index >= s.length) {
      // 终止条件
      return
    }
    // 拿到当前值
    let str = s[index]
    if (isLetter(str)) {
      let lower = str.toLowerCase() // b
      let upper = str.toUpperCase() // B
      dfs(current + lower, index + 1, res) // a1b 3
      dfs(current + upper, index + 1, res) // a1B 3
    } else {
      dfs(current + str, index + 1, res) // a1b2 a1B2
    }
  }
  let ans = []
  dfs('', 0, ans)
  return ans
}

function isLetter(str) {
  let code = str.charCodeAt()
  return (code >= 97 && code <= 122) || (code >= 65 && code <= 90)
}
// @lc code=end
