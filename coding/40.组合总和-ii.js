/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}

难度：Middle

相关话题：`数组`、`回溯算法`

给定一个数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

 `candidates` 中的每个数字在每个组合中只能使用一次。

 * 所有数字（包括目标数）都是正整数。

* 解集不能包含重复的组合。

```
输入: candidates =[10,1,2,7,6,1,5], target =8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

思路：

和`NO.39`区别：

1. 存在重复数字，需要去重。

2. 每个数字只能用1次。

对于第一个区别，需要对数组排序，排序是为了能更方便的去重，每次遍历时，检查`i>start && candidates[i]===candidates[i-1]`，其中`start`是当前回溯的开始索引，
如果条件成立，说明当前值和上一个值是相同的，因此跳过以避免重复。

对于第二个区别，下一次的回溯，都是从索引`i+1`开始。

 */
//  (56 ms)
var combinationSum2 = function(candidates, target) {
 let result=[]
 candidates.sort()
 backtrack([],0,target)
 return result
 
 function backtrack(temp,start,rest){
   if(rest<0)return
   if(rest===0)result.push(temp.slice())
   for(let i=start;i<candidates.length;i++){
     if(i>start && candidates[i]===candidates[i-1])continue
     temp.push(candidates[i])
     backtrack(temp,i+1,rest-candidates[i])
     temp.pop()
   }
 }
};

// var combinationSum2 = function(candidates, target) {
//  if (!candidates || candidates.length == 0) return [];
//  let res = [];
//  candidates.sort((a,b) => a-b);
//  var helper = function(curSum, cur, index){
//      if (curSum == target){
//          res.push([...cur]);
//          return;
//      }
//      for(let i = index; i < candidates.length; i++){
//          if (i != index && candidates[i] == candidates[i-1]) continue; //already return, go next loop(not recursion)
//          if (curSum > target) return;
//          cur.push(candidates[i]);
//          helper(curSum+candidates[i], cur, i+1);
//          cur.pop();
//      }
//  }
//  helper(0, [], 0);
//  return res;
// };
// @lc code=end

