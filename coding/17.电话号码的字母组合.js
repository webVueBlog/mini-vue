/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
难度：Middle

相关话题：`字符串`、`回溯算法`

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

思路：

`回溯算法`，对每一个数字上的每一个字母都要进行全排列处理。

 */
 // (56 ms)
var letterCombinations = function(digits) {
 if (digits === '') return []
 let alphArr=[null,null,'abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
 let len = digits.length // 字符串的长度
 let result = []
 function bt(result,temp,len,digits,start){
  // 判断条件
  if(temp.length === len) {
   result.push(temp)
   return
  }
  // 获取字符串 abc
  let cur = alphArr[digits[start]]
  for(let i = 0; i < cur.length; i++) {
   // 遍历当前cur字符串
   bt(result, temp+cur[i], len, digits, start+1)
  }
 }
 bt(result,'',len,digits,0) // 结果[] '', 字符数值长度, 数值字符串, 0开始
 return result
}

// @lc code=end

