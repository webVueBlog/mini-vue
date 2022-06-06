/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}

难度：Hard

相关话题：`字符串`、`动态规划`、`回溯算法`

给定一个字符串( `s` ) 和一个字符模式( `p` )。实现支持  `'.'` 和 `'*'` 的正则表达式匹配。

```
'.' 匹配任意单个字符。
'*' 匹配零个或多个前面的元素。
```

匹配应该覆盖**整个** 字符串( `s` ) ，而不是部分字符串。

* `s` 可能为空，且只包含从 `a-z` 的小写字母。

* `p` 可能为空，且只包含从 `a-z` 的小写字母，以及字符 `.` 和 `*` 。

```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```

```
输入:
s = "aa"
p = "a*"
输出: true
解释:'*' 代表可匹配零个或多个前面的元素, 即可以匹配 'a' 。因此, 重复 'a' 一次, 字符串可变为 "aa"。
```

```
输入:
s = "ab"
p = ".*"
输出: true
解释:".*" 表示可匹配零个或多个('*')任意字符('.')。
```

```
输入:
s = "aab"
p = "c*a*b"
输出: true
解释:'c' 可以不被重复, 'a' 可以被重复一次。因此可以匹配字符串 "aab"。
```

思路：

`动态规划`,`dp[i][j]`代表到索引`[0,i]`的`p`是否能被索引`[0,j]`的`s`匹配。

如果`p[i]===s[j] || p[i]==='.'`，说明它们匹配，`dp[i][j]=dp[i-1][j-1]`。

如果不匹配，但是`p[i]==='*'`，

1. 如果`p`的前一个能和当前`s`匹配并且`dp[i][j-1]===true`，说明`*`可以延长上一个的`p`来匹配当前的`s`；
2. 如果上面条件不符合，但是`dp[i-2][j]===true`，也就是说前2个的`p`能和当前`s`匹配，那么`*`可以作为数量`0`,相当与忽略前一个`p`。

(76 ms)
 */
//  (100 ms)
var isMatch = function(s, p) {
  let pLen=p.length,sLen=s.length
  let dp=Array(pLen+1).fill().map(()=>Array(sLen+1).fill(false))
  
  for(let i=0;i<pLen+1;i++){
    for(let j=0;j<sLen+1;j++){
      if(i===0 && j===0){
        dp[i][j]=true
      }else if(p[i-1]==="*" && j===0){
        dp[i][j]=dp[i-2][j]
      }
    }
  }
  for(let i=1;i<pLen+1;i++){
    for(let j=1;j<sLen+1;j++){
      let r=i-1,c=j-1
      if(p[r]===s[c] || p[r]==='.'){
        dp[i][j]=dp[i-1][j-1]
      }else if(p[r]==="*"){
        if(((p[r-1]===s[c] || p[r-1]===".") && dp[i][j-1]) || dp[i-2][j])
          dp[i][j]=true
      }
    }
  }
  return dp[pLen][sLen]
};
// var isMatch = function(s, p) {
//  var lenS = s.length;
//  var lenP = p.length;
//  var map = {};

//  return check(0, 0);

//  function check(idxS, idxP) {
//   if(map[idxS + ':' + idxP] !== undefined) return map[idxS + ':' + idxP];
//   if(idxS > lenS) return false;
//   if(idxS === lenS && idxP === lenP) return true;

//   if(p[idxP] === '.' || p[idxP] === s[idxS]) {
//    map[idxS + ':' + idxP] = p[idxP + 1] === '*' ? 
//     check(idxS + 1, idxP) || check(idxS, idxP + 2) :
//     check(idxS + 1, idxP + 1);
//   } else {
//    map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
//    check(idxS, idxP + 2) : false;
//   }
//   return map[idxS + ':' + idxP];
//  }
// };
// @lc code=end

