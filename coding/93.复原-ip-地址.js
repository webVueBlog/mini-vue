/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
```
输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
```

思路：

`回溯`，注意几个规则：

1. 变量`cur`表示当前值，如果这个值`>255`，不成立，同时，如果这个值存在`前导0`，同样不成立。

2. 变量`remain`表示还剩下的`IP`值(初始为`4`)。

3. 变量`str`表示还剩下的字符串，如果`str.length>remain*3`，不成立，因为每一个`IP`数值不可能超过`3`位。


 */
var restoreIpAddresses = function(s) {
  let result=[]
  function backtrack(str,remain,cur,res){
    if(str.length>remain*3)return
    if(+cur>255 || (cur.length>1 && cur[0]==="0"))return
    if(remain===0)return result.push(res.substring(1))
    for(let i=1;i<=3;i++){
      if(str.length<i)continue
      let cur=str.substring(0,i)
      backtrack(str.substring(i),remain-1,cur,res+'.'+cur)
    }
  }
  backtrack(s,4,'','')
  return result
};
// @lc code=end

