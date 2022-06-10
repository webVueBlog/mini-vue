/*
 * @lc app=leetcode.cn id=2295 lang=javascript
 *
 * [2295] 替换数组中的元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number[][]} operations
 * @return {number[]}
 */
// (224 ms)
 var arrayChange = function(nums, operations) {
  let map = new Map()
  
  for(let i = 0; i < nums.length; i++){
      let num = nums[i]
      map.set(num, i)
  }
  
  for(let op of operations){
      let key = op[0]
      let value = op[1]

      // if key exists
      if(map.has(key)){
          const idx = map.get(key)
          map.set(value, idx)
          map.delete(key)
      }
  }
  
  for(let [key, idx] of map){
      nums[idx] = key
  }
  
  return nums
  
};
// @lc code=end

