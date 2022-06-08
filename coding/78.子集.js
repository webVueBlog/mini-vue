/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

输入：nums = [0]
输出：[[],[0]]

`回溯`，由于都是独立的数字，因此只需要每次递归时索引`+1`。

时间复杂度O（2^N） 空间复杂度O(N)
 (60 ms)
 */
var subsets = function(nums) {
 const ans = [];
 generatePowerset([], 0);

 function generatePowerset(path, index) {
  ans.push(path);
  for(let i = index; i < nums.length; i++) {
   generatePowerset([...path, nums[i]], i+1);
  }
 }
 return ans;
};

// var subsets = function(nums) {
//  let result=[]
//  backtrack(0,[])
//  return result

//  function backtrack(start,temp){
//    result.push(temp.slice())
//    for(let i=start;i<nums.length;i++){
//      temp.push(nums[i])
//      backtrack(i+1,temp)
//      temp.pop()
//    }
//  }
// };
// @lc code=end

