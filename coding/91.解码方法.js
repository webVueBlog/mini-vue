/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
思路：

DP，`dp[i+1]`为当前索引`i`以及之前的字符串有多少种组合，

那么，如果存在一个`i`(i>0)，那么`dp[i+1]=s[i]的组合*dp[i] + (s[i-1],s[i])的组合*dp[i-1]`。

例如：`[1,3,6,2,1,2]`:
  
当`i`为`2`，对应的`s[i]`为`6`，那么`dp[i+1]`就是`(6的组合 * [1,3]的组合) + ([3,6]的组合 * [1]的组合)`。

如果索引`i`为`1`，那么前面只有1位数，因此我们初始默认`dp[0]=1`。

最后就是组合的算法，**1位数**的组合计算就是除了输入为`"0"`返回`0`，其他都可以返回`1`。

**2位数**的组合计算，需要判断这个2位数是否在`[10,26]`之内，在则返回`1`，不在的返回`0`；
如果一个2位数是`07`，也是同样返回`0`，这里不能当做1位数来计算，否则会重复。


 */
var numDecodings = function(s) {
  let dp=[]
  dp[0]=1
  dp[1]=s[0]==="0" ? 0 : 1
  for(let i=1;i<s.length;i++){
    dp[i+1]=calc1(s[i])*dp[i]+calc2(s[i-1],s[i])*dp[i-1]
  }
  return dp[dp.length-1]
  function calc1(s){
    if(s==="0")return 0
    else return 1
  }
  function calc2(s1,s2){
    let n=+(s1+s2)
    if(n<=26 && n>=10){
      return 1
    }else{
      return 0
    }
  }
};
// @lc code=end

