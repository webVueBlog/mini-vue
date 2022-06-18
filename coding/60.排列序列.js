/*
 * @lc app=leetcode.cn id=60 lang=javascript
 *
 * [60] 排列序列
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
难度：Middle

相关话题：`数学`、`回溯算法`

给出集合 `[1,2,3,&hellip;,n]` ，其所有元素共有*n* ! 种排列。

按大小顺序列出所有排列情况，并一一标记，当*n* = 3 时, 所有排列如下：

1.  `"123"` 

2.  `"132"` 

3.  `"213"` 

4.  `"231"` 

5.  `"312"` 

6.  `"321"` 

给定*n*  和*k* ，返回第*k* 个排列。

**说明：** 

* 给定*n* 的范围是 [1, 9]。

* 给定 *k* 的范围是[1, *n* !]。

思路：

因为题目给出了`n<=9`，在这个范围内可以使用暴力解(回溯)，但肯定不是最优解，一旦`n>=12`耗时就很可怕了。

这里最优解使用的是`Cantor expansion 康拓逆展开`。

什么是`康拓展开`和`康拓逆展开`呢，维基百科写的很清楚，这里也简单说一下。

例如，`2431`有多少种排列方式会比它小的，那么我们的计算方式是：

`1 * 3! + 2 * 2! + 1 * 1! + 0 * 0! = 11`

解释：

第一个数`2`，比它小的有1个，后续能排列数量有`3!`

第二个数`4`，减去它之前的`2`，比它小的还有2个，后续能排列数量有`2!`

第三个数`3`，减去它之前的`2`，比它小的还有1个，后续能排列数量有`1!`

...

这就是康拓展开，那么康拓逆展开就是反过来。

例如 `n=4, k=12`

那么首先前面有`k-1=11`个排序是比当前小的。
3 2
第一个数字，`11 除以 3!`，结果为`1`余`5`，说明有1个比它小，因此第一个数字是`2`；

第二个数字，`5 除以 2!`，结果为`2`余`1`，说明有2个比它小，因为上面`2`已经使用了，因此这里是`4`；

第三个数字，`1 除以 1!`，结果为`1`余`0`，说明有1个比它小，上面`2`已经使用了，因此这里是`3`；

第四个数字，`0 除以 0!`，`0`为分母无法计算，这里是最后一个数字`1`。

时间复杂度是`O(n)`。



 */
var getPermutation = function(n, k) {
 function factorial(n){
   if(n===0)return 0
   let m=1
   for(let i=n;i>=1;i--){
     m*=i
   }
   return m
 }
 let cache=[1,2,3,4,5,6,7,8,9]
 let res=''
 k-=1
 for(let i=n-1;i>=0;i--){
   let f=factorial(i)
   let chooseID=f===0? 0 : Math.floor(k/f)
   res+=cache[chooseID]
   cache.splice(chooseID,1)
   k=k % f
 }
 return res
};

// var getPermutation = function(n, k) {
//  let factorial = [1];
//  for (let i=1;i<=n;i++) factorial[i]= i * factorial[i-1];

//  let nums = Array.from({length: n}, (v, i) => i+1);
//  let res = "";
//  for (let i=n;i>0;i--) {
//      index = Math.ceil(k / factorial[i - 1]); // decide to use which permutation set
//      res+=nums[index - 1];
//      nums.splice(index - 1, 1);
//      k -= (factorial[i-1] * (index - 1));
//  }
//  return res;
// };
// @lc code=end

