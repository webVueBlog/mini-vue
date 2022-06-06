/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
难度：Middle

相关话题：`字符串`、`回溯算法`

给出*n* 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且**有效的** 括号组合。

例如，给出*n* =** 3，生成结果为：

```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

思路：

每一个位置都有2个选择，放置`(`或者`)`。

如果`(`的数量超过了`n`说明一定不成立；

如果`)`的数量超过了`(`的数量，也一定不成立；

如果两个的数量都为`n`，那么就是一个有效的完整组合。

 */
//  (64 ms)
var generateParenthesis = function(n) {
 // 每次生成的字符串符合
 let s = ''
 let l = "(", r = ")"
 // 放入数组
 let res = []
 function dfs(s, n, lN, rN) {
  // s符合字符串，n次数，lN 次数， rN 右次数
  // 如果`(`的数量超过了`n`说明一定不成立
  // 如果`)`的数量超过了`(`的数量，也一定不成立
  if(lN > n || lN < rN) return
  // 等于n
  if(lN === n && rN === n) res.push(s)
  // 否则回溯
  // 左
  dfs(s+l, n, lN+1, rN)
  // 右
  dfs(s+r, n, lN, rN+1)
 }
 dfs(s,n,0,0)
 return res;
}

// (68 ms)
// var generateParenthesis = function(n) {
//  let res = [];
//  // cur: 当前字符，left：当前字符左括号，right: 当前字符右括号
//  const dfs = (cur, left, right) => {
//   if(cur.length === n*2) {
//    res.push(cur)
//    return
//   }
//   if(left<n) {
//    dfs(cur+'(',left+1,right)
//   }
//   if(right<left) {
//    dfs(cur+')',left,right+1)
//   }
//  };
//  dfs('',0,0);
//  return res;
// };
// @lc code=end

