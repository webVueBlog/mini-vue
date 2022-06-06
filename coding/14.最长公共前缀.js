/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}

难度：Easy

相关话题：`字符串`

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""` 。

```
输入:["flower","flow","flight"]
输出: "fl"
```

```
输入:["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

所有输入只包含小写字母 `a-z` 。

(52 ms)
 */
var longestCommonPrefix = function(strs) {
 let res = strs[0]
 for(item of strs) {
  while(!item.startsWith(res)) {
   res = res.substring(0, res.length-1)
  }
 }
 return res
}

// var longestCommonPrefix = function(strs) {
//  if(strs === undefined || strs.length === 0) { return ''; }

//  return strs.reduce((prev, next) => {
//   let i = 0;
//   while(prev[i] && next[i] && prev[i] === next[i]) i++;
//   return prev.slice(0, i);
//  })
// };
// @lc code=end

