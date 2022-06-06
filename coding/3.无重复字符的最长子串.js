/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
难度：Middle

相关话题：`哈希表`、`双指针`、`字符串`、`Sliding Window`

给定一个字符串，请你找出其中不含有重复字符的**最长子串** 的长度。

输入:"abcabcbb"
输出:3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入:"bbbbb"
输出:1
解释:因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入:"pwwkew"
输出:3
解释:因为无重复字符的最长子串是"wke"，所以其长度为 3。
    请注意，你的答案必须是 子串的长度，"pwke"是一个子序列，不是子串。

思路：

定义一个`startIdx`，表示当前从哪个索引开始检查，遍历`s`，并且通过`map`保存当前检查的字母，

如果当前字母在`map`中存在，并且它对应的索引在`startIdx`之后，说明这个字母在当前的检查范围内重复了，需要更新`startIdx`；

如果这个字母对应的索引在`startIdx`之前，说明虽然重复，但不在当前检查范围内，因此不需任何操作。
 (76 ms)
 */
function lengthOfLongestSubstring(s) {
  // 如果字符串为空，返回0
  if(s==='') return 0
  // map数据结构
  let map = new Map();
  // 开始索引检查 0开始
  let startIdx = 0
  // 答案，默认为0
  let max = 0
  // 遍历字符串
  for(let i = 0; i < s.length; i++) {
    // 当前值
    let cur = s[i]
    // 当前map中是否有cur 并且 获取get(cur) 的索引是否大于等于 开始索引
    if(map.has(cur) && map.get(cur) >= startIdx) {
      // 满足，就重复了，更新 startIdx
      startIdx = map.get(cur) + 1
    }
    // 不需要检查的 map.set 当前值，索引
    map.set(cur, i)
    // 每轮最大值
    max = Math.max(max, i - startIdx + 1)
  }
  return max
}
// function lengthOfLongestSubstring(s) {
//   // set
//   let set = new Set();
//   let [left, right, max] = [0, 0, 0];
//   while(right < s.length) {
//     set.has(s[right]) ? set.delete(s[left++]) : set.add(s[right++])
//     max = Math.max(max, set.size)
//   }
//   return max
// }
// @lc code=end

