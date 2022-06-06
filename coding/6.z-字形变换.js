/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
难度：Middle

相关话题：`字符串`

将一个给定字符串根据给定的行数，以从上往下、从左到右进行Z 字形排列。

比如输入字符串为  `"LEETCODEISHIRING"` 行数为 3 时，排列如下：

```
L   C   I   R
E T O E S I I G
E   D   H   N
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如： `"LCIRETOESIIGEDHN"` 。

请你实现这个将字符串进行指定行数变换的函数：

```
string convert(string s, int numRows);
```

```
输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
```

```
输入: s = "LEETCODEISHIRING", numRows =4
输出:"LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G
```

思路：

定义一个`rows`，它的作用是用来保存每一行的字母，根据题目，可以很轻松的得出第一个字母就在`第1行`，第二个字母在`第2行`...第`N`个字母在第`numsRow`行；

然后开始往上，第`N+1`个字母在`numsRow-1`行...

因此遍历`s`，并且将每一个字母添加到对应的行中，最后在将每一行字母合并就是结果。
 (84 ms)
 */
var convert = function(s, numRows) {
 // 如果1行，直接返回s
 if(numRows === 1) return s
 // 保存每行的字母
 let rows = {}
 // 每行保存多少
 for(let i = 0; i < numRows; i++) {
  rows[i] = []
 }
 let curRow = 0, direction = 1;
 // 遍历字符串
 for(let i = 0; i < s.length; i++) {
  rows[curRow].push(s[i])
  curRow += direction
  if(curRow === numRows || curRow === -1) {
   direction *= -1
   curRow += 2*direction
  }
 }
 let res = ''
 for(let i = 0; i < numRows; i++) {
  res += rows[i].join('')
 }
 return res
};
// @lc code=end

