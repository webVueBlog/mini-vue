/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}

```
输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```

思路：

由于输入含有重复值，因此需要排序并且通过`if(i>start && nums[i]===nums[i-1])continue)`去重。


 */
var subsetsWithDup = function(nums) {
  let result=[],temp=[]
  nums.sort()
  backtrack(result,0,temp,nums)
  return result
  function backtrack(result,start,temp,nums){
    result.push(temp.slice())
    for(let i=start;i<nums.length;i++){
      if(i>start && nums[i]===nums[i-1])continue
      temp.push(nums[i])
      backtrack(result,i+1,temp,nums)
      temp.pop()
    }
  }
};
// @lc code=end

