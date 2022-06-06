/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
难度：Middle

相关话题：`数学`、`字符串`

罗马数字包含以下七种字符： `I` ， `V` ， `X` ， `L` ， `C` ， `D` 和 `M` 。

```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 2 写做 `II` ，即为两个并列的 1。12 写做 `XII` ，即为 `X` + `II` 。 27 写做 `XXVII` , 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII` ，而是 `IV` 。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX` 。这个特殊的规则只适用于以下六种情况：

* `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。

* `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和90。

* `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示400 和900。

给定一个整数，将其转为罗马数字。输入确保在 1到 3999 的范围内。

```
输入:3
输出: "III"
```

```
输入:4
输出: "IV"
```

```
输入:9
输出: "IX"
```

思路：

注意`4`和`9`的处理方式，由于`9`的罗马文需要用到`10`，

`I(1),V(5),X(10)`处理范围`[1,9]`；
`X(10),L(50),C(100)`处理范围`[10,90]`；
`C(100),D(500),M(1000)`处理范围`[100,900]`；

确定好处理范围后，对数字的每一位进行处理，再叠加字符串就是结果。

 */
//  (112 ms)
// var intToRoman = function(num) {
//  let bit={}
//  bit[0]=['I','V','X']
//  bit[1]=['X','L','C']
//  bit[2]=['C','D','M']
//  bit[3]=['M']
//  function toRoman(n,cur){
//    if(n===0)return ''
//    if(n<4)return cur[0].repeat(n)
//    if(n===4)return cur[0]+cur[1]
//    if(n<9)return cur[1]+cur[0].repeat(n-5)
//    if(n===9)return cur[0]+cur[2]
//  }
//  let str=num+''
//  let len=str.length
//  let res=''
//  let N=num
//  for(let i=len;i>=1;i--){
//    let curMod=Math.pow(10,i-1)
//    let n=Math.floor(N/curMod)
//    N %=curMod
//    res+=toRoman(n,bit[i-1])
//  }
//  return res
// };


// (120 ms)
const val = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
const rom = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]

var intToRoman = function(N) {
    let ans = ""
    for (let i = 0; N; i++)
        while (N >= val[i]) ans += rom[i], N -= val[i]
    return ans
};
// @lc code=end

