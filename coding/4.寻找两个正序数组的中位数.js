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
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    
    const [m, n] = [nums1.length, nums2.length];
    let [left, right, min, max] = [0, m, Infinity, -Infinity];
    
    while (left <= right) {
        const mid1 = (left + right) >>> 1;
        const mid2 = ((m + n + 1) >> 1) - mid1;
        
        const L1 = !mid1 ? max : nums1[mid1 - 1];
        const L2 = !mid2 ? max : nums2[mid2 - 1];
        const R1 = mid1 === m ? min : nums1[mid1];
        const R2 = mid2 === n ? min : nums2[mid2];
        
        if (L1 <= R2 && L2 <= R1) {
            const leftMax = Math.max(L1, L2);
            return (m + n) % 2 === 1 ? leftMax : (leftMax + Math.min(R1, R2)) / 2;
        }
        
        L1 < R2 ? (left = mid1 + 1) : (right = mid1 - 1);
    }
};
// @lc code=end