// Solution
// 思路：

// 移动右指针扩大窗口，同时将新元素添加到 set 里面
// 如果 set 中含有这个元素，就说明这个元素与窗口最左边的元素相同
// 此时，移动左指针缩小左边的窗口，同时将元素从 set 中删除
// 在缩放窗口的同时比较 set 的大小,找出最大的 size

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set()
  let [left, right, max] = [0, 0, 0]

  while (right < s.length) {
    // 若 set 中含有 s[right] 就删除窗口最左边的元素同时缩小窗口，否则扩大窗口并添加新元素
    set.has(s[right]) ? set.delete(s[left++]) : set.add(s[right++])

    // 比较 set 的大小并找出最大值
    max = Math.max(max, set.size)
  }

  return max
}