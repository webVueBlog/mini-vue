/*
 * @lc app=leetcode.cn id=378 lang=javascript
 *
 * [378] 有序矩阵中第 K 小的元素
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 给你一个 n x n 矩阵 matrix ，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
请注意，它是 排序后 的第 k 小元素，而不是第 k 个 不同 的元素。

你必须找到一个内存复杂度优于 O(n2) 的解决方案。

输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
输出：13
解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13


输入：matrix = [[-5]], k = 1
输出：-5
(68 ms)
 */
var kthSmallest = function(matrix, k) {
    let lo = matrix[0][0], 
    hi = matrix[matrix.length-1][matrix[0].length-1] + 1; 
    while (lo < hi) {
        let mid = lo + Math.floor((hi-lo)/2);
        let count = 0;
        for (let i = 0;i<matrix.length;i++) {
            for (let j=0;j<matrix.length;j++) {
                if (matrix[i][j] <= mid) count++;
                else break;
            }
        }
        if (count < k) lo = mid+1;
        else hi = mid;
    }
    return lo
};
// @lc code=end

