/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
难度：Easy

相关话题：`数学`

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为[&minus;231, 231&minus; 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

思路：

使用字符串在反转并不是最好的选择，因为还需要处理负号和`0`的情况，用数字运算方式反转比较适合。

每次找到当前数的最后一位，然后作为反转数字的第一位，例如`123`：

```
123 --> 0*10  + 3
12  --> 3*10  + 2
1   --> 32*10 + 1
```

再注意保存开始的正负状态和结果的限制`[−2^31,  2^31 − 1]`。
 (68 ms)
 */
var reverse = function(x) {
 // 判断正负
 let symbol = x < 0 ? -1 : 1
 x=Math.abs(x)
 let res = 0
 while(x > 0) {
  let t = x%10
  res = res*10 + t
  x = Math.floor(x/10)
 }
 res*=symbol
 if(res < -Math.pow(2, 31) || res > Math.pow(2, 31) - 1) return 0
 // 返回值
 return res
};
// @lc code=end

