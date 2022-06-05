/*
 * @lc app=leetcode.cn id=396 lang=javascript
 *
 * [396] 旋转函数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxRotateFunction = function(A) {
    let n = A.length;

    let sum = 0
    let currFSum = 0
    A.forEach((e, i) => {
        sum += e;
        currFSum += e * i
    })

    let maxFSum = currFSum
    for (let i = 0; i < n - 1; i++) { // 1 iteration will be repeated if <n, but ans will be same
        currFSum = n * A[i] - sum + currFSum
        maxFSum = Math.max(maxFSum, currFSum)
    }
    return maxFSum;
};
// @lc code=end

