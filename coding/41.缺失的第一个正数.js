/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
(140 ms)
 */
var firstMissingPositive = function(A) {
  let n=A.length
  for(let i=0;i<n;i++){
    while(A[i]>0 && A[i]<=n && A[A[i] - 1]!==A[i]){
      swap(i, A[i]-1)
    }
  }
  for(let i=0;i<n;i++){
    if(A[i]!==i+1)return i+1
  }
  return n+1
  
  function swap(i,j){
    let t=A[i]
    A[i]=A[j]
    A[j]=t
  }
};

// @lc code=end

