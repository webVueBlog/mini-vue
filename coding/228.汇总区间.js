/*
 * @lc app=leetcode.cn id=228 lang=javascript
 *
 * [228] 汇总区间
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string[]}

输入：nums = [0,1,2,4,5,7]
输出：["0->2","4->5","7"]
解释：区间范围是：
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"

 */

var summaryRanges = function(nums) {
    var t = 0
    var ans = []
    nums.push('#')
    for(var i=1;i<nums.length;i++)
        if(nums[i]-nums[t] !== i-t){
            if(i-t>1)
                ans.push(nums[t]+'->'+(nums[i-1]))
            else
                ans.push(nums[t].toString())
            t = i
        }
    return ans
}

// @lc code=end

