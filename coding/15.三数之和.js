/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
数组排好序，[-4,-1,-1,0,1,2]
[-4,-1,-1,0,1,2]
  i
        l     l
              r
l 是小的一方 r 是大的一方
sum = -3 => -4 -1 2 => 一旦l等于r或超过，没有意义
i 指向下一个索引，如果sum=0+ l和r同时移动，否则不符合条件
跳过：
l = l + 1
r = r - 1
i = i + 1
 (120 ms)
*/

var threeSum = function(nums) {
    // 把数组排序好，方便去重
    nums.sort((a, b) => a - b);
    // 收集答案
    const ans = [];
    // 数组长度
    const n = nums.length;
    // i l r
    // 遍历数组每个元素
    for(let i = 0; i < n-1; i++) {
        const cur = nums[i];
        // 一样跳过 第一个遍历，第二个遍历发现与第一个相等
        if(nums[i] === nums[i-1]) {
            continue;
        }
        // 指针
        let l = i+1, r = n-1;
        // 满足条件
        while(l < r) {
            // 求和
            const sum = cur + nums[l] + nums[r];

            if(sum > 0) {
                // 大于0, r--
                // 当 l < r 防止 r--; r-1 === r
                while(l < r && nums[r-1] === nums[r]) r--;
                r--;
            } else if(sum < 0) {
                // 小于0，l++ ; l+1 === l
                while(l < r && nums[l+1] === nums[l]) l++;
                l++;
            } else {
                // 等于0 一起移动
                ans.push([cur, nums[l], nums[r]])
                while(l < r && nums[r-1] === nums[r]) r--;
                while(l < r && nums[l+1] === nums[l]) l++;
                l++;
                r--;
            }
        }
    }
    return ans;
}

// @lc code=end