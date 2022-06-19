/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
难度：Middle

相关话题：`排序`、`数组`、`双指针`

给定一个包含红色、白色和蓝色，一共*n* 个元素的数组，**[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、1 和 2 分别表示红色、白色和蓝色。

**注意:** 
不能使用代码库中的排序函数来解决这道题。

* 一个直观的解决方案是使用计数排序的两趟扫描算法。
首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。

* 你能想出一个仅使用常数空间的一趟扫描算法吗？



思路：

定义一个`startIdx`，表示当前从哪个索引开始检查，遍历`s`，并且通过`map`保存当前检查的字母，

如果当前字母在`map`中存在，并且它对应的索引在`startIdx`之后，说明这个字母在当前的检查范围内重复了，需要更新`startIdx`；

如果这个字母对应的索引在`startIdx`之前，说明虽然重复，但不在当前检查范围内，因此不需任何操作。



 */
var sortColors = function(nums) {
    let l=0,r=nums.length-1
    let pivot=1
    for(let i=0;i<=r;i++){
      if(nums[i]<pivot) swap(nums,i,l++)
      else if(nums[i]>pivot) swap(nums,i--,r--)
    }
    function swap(arr,i,j){
      let t=arr[i]
      arr[i]=arr[j]
      arr[j]=t
    }
    return nums
};
// @lc code=end

