/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
难度：Easy

相关话题：`栈`、`字符串`

给定一个只包括  `'('` ， `')'` ， `'{'` ， `'}'` ， `'['` ， `']'` 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。

2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

```
输入: "()"
输出: true
```

```
输入: "()[]{}"
输出: true
```

```
输入: "(]"
输出: false
```

```
输入: "([)]"
输出: false
```

```
输入: "{[]}"
输出: true
```

思路：

括号问题一般使用`stack`，按照开始必有结束的原则。

 */
// (60 ms)
var isValid = function(s) {
  let match = {
    "(": ")",
    "[": "]",
    "{": '}'
  }
  // 栈，上面匹配
  let stack = [];
  for(let i = 0; i < s.length; i++) {
    // 遍历字符串
    // 获取当前值
    let cur = s[i]
    // 如果当前属性 ( 存在
    if(match[cur]) stack.push(cur) // ( [ {
    else if (match[stack.pop()] !== cur) {
      // 从栈顶取出值匹配是否 ] } )
      // 不是为false
      return false
    }
  }
  // 如果栈为0，true
  return stack.length === 0
}
// (68 ms)
// var isValid = function(s) {
//  const stack = [];
//  // push
//  for(let i = 0; i < s.length; i++) {
//   // 获取当前字符串的值
//   let c = s.charAt(i);
//   // switch比较 )
//   switch(c) {
//    case '(': stack.push(')');
//     break;
//    case '[': stack.push(']');
//     break;
//    case '{': stack.push('}');
//     break;
//    default:
//     if(c !== stack.pop()) {
//      return false;
//     }
//   }
//  }
//  return stack.length === 0;
// };
// @lc code=end

