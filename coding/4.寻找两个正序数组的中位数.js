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
难度：Hard

相关话题：`数组`、`二分查找`、`分治算法`

给定两个大小为 m 和 n 的有序数组 `nums1`  和 `nums2` 。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为O(log(m + n))。

你可以假设 `nums1` 和 `nums2` 不会同时为空。

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0

nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5

思路：

对于中位数，如果我们能将**一半的小的数字**放左边，**另一半大的数字**放右边，那么如果他们的数字总和为偶数，就是`(小堆的最大值+大堆的最小值)/2`；
如果是奇数，那么就是`小堆的最大值`。

因此，如何将它们分割成了问题的关键。

我们先选择`nums1`的分割点`partition1`为`Math.floor((m+n)/2)`，这里`m`是`nums1.length`，`n`是`nums2.length`，由于两边的数量要平衡，
因此对`nums2`的分割点`partition2`也可以确定，为`Math.floor((m+n+1)/2)-partition1`。

因为是有序的，`nums`左侧一定小于右侧，因此需要检查分割后的`nums1`左边的最大值是否能小于等于`nums2`右边的最小值，并且`nums2`左边的最大值是否小于等于`nums1`右边的最小值；

如果能达到这两个条件，说明分割是成功的，可以直接求出中位值；

如果`nums1`左侧最大值大于`nums2`右侧最小值，说明`nums1`的分割点还需要左移；

如果`nums2`左侧的最大值大于`nums1`右侧最小值，说明`nums2`的分割点还需要左移，也就是`nums1`的分割点需要右移。

[左侧小，左侧大，右侧小，右侧大] // num1
        左侧大 > 右侧小

[左侧小，左侧大，右侧小，右侧大]
 (124 ms)
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