/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
难度：Middle

相关话题：`数组`、`回溯算法`

给定一个**无重复元素** 的数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

 `candidates` 中的数字可以无限制重复被选取。

 * 所有数字（包括 `target` ）都是正整数。

* 解集不能包含重复的组合。

```
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
```

```
输入: candidates = [2,3,5], target = 8,
所求解集为:
[
 [2,2,2,2],
 [2,3,3],
 [3,5]
]
```

思路：

`回溯`，每一次回溯，遍历当前数组尝试每一个值。

由于要求不包含重复组合，不使用`hash`的话，就对每一次回溯都只遍历上一次遍历最后的索引`i`之后的值；

但题目提示每个值都能重复使用无限次，因此每次遍历都从上一个`i`开始，既可以保证没有重复的组合，也确保每个值都尽可能的多用。


 */
// (88 ms)
var combinationSum = function(candidates, target) {
 let result=[]
 backtrack([],target,0)
 return result
 
 function  backtrack(temp,rest,start){
   if(rest<0)return
   if(rest===0)result.push(temp.slice())
   for(let i=start;i<candidates.length;i++){
     temp.push(candidates[i])
     backtrack(temp,rest-candidates[i],i)
     temp.pop()
   }
 }
};

// (68 ms)
// function combinationSum(candidates, target) {
//  var buffer = [];
//  var result = [];
//  search(0, target);
//  return result;

//  function search(startIdx, target) {
//    if (target === 0) return result.push(buffer.slice());
//    if (target < 0) return;
//    if (startIdx === candidates.length) return;
//    buffer.push(candidates[startIdx]);
//    search(startIdx, target - candidates[startIdx]);
//    buffer.pop();
//    search(startIdx + 1, target);
//  }
// }
// @lc code=end

