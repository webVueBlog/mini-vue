/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // x 为 num1长度， y 为 num2长度
    let  x = nums1.length, y = nums2.length;
    if(x>y) {
        // 如果num1长度大于num2长度
        return findMedianSortedArrays(nums2, nums1)
    }
    let lo = 0, hi = x;
    while(lo <= hi) {
        // partition1表示nums1的分割点，分割为左右两边；
        // partition2表示nums2的分割点，分割为左右两边；
        // 分割后的数量上，nums1左+nums2左===nums1右+nums2右 (±[-1~1])
        let partition1 = Math.floor((lo+hi)/2)
        let partition2 = Math.floor((x+y+1)/2)-partition1
        let left1 = partition1 === 0 ? -Infinity : nums1[partition1-1],
            left2 = partition2 === 0 ? -Infinity : nums2[partition2-1]

        let right1 = partition1 === x ? Infinity : nums1[partition1],
            right2 = partition2 === y ? Infinity : nums2[partition2]
        // 最终目的是nums1左全部小于nums2右；nums2左全部小于nums1右
        if(left1 <= right2 && left2 <= right1) {
            if((x+y)%2 === 0) {
                return (Math.max(left1,left2)+Math.min(right1,right2))/2
            } else {
                return Math.max(left1,left2)
            }
        } else if(left1 > right2) {
            hi=partition1-1
        } else {
            lo=partition1+1
        }
    }
};
// @lc code=end