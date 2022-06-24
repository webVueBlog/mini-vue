/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(nums, k) {
  return quickSelect(nums, k)
};

const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];

const partition = (arr, start, end) => {
  const pivot = arr[end];
  let [i, j] = [start, end - 1];
  while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;
  
      if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
      }
  }
  
  swap(arr, i, end);
  
  return i;
}

const quickSelect = (arr, k) => {
  const n = arr.length;
  const finalIdx = n - k;
  let [low, high] = [0, n - 1];
  
  while (low <= high) {
      const pivotIdx = partition(arr, low, high);
      
      if (pivotIdx === finalIdx) return arr[pivotIdx];
      
      if (pivotIdx < finalIdx) low = pivotIdx + 1;
      else high = pivotIdx - 1;
  }
}

// @lc code=end

