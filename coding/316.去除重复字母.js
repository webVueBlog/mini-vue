/*
 * @lc app=leetcode.cn id=316 lang=javascript
 *
 * [316] 去除重复字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
栈，正序
cbabc
[c]

当前字符比栈顶字符小，删除栈顶（i指针后面还有栈顶字符）
(64 ms)
 */
var removeDuplicateLetters = function(s) {
 const stack = [];
 // 统计所有字符的数量
 const countMap = {}; // o(1)
 // 栈里存在了这个字符
 const exist = {}
 const n = s.length

 for(let i = 0; i < n; i++) {
  const v = s[i];
  if(countMap[v] === undefined) {
   countMap[v] = 0;
  }
  countMap[v]++;
 }

 for(let i = 0; i < n; i++) {
  const v = s[i];
  // 遍历的时候，把统计的减一
  countMap[v]--;

  if(exist[v]) {
   continue;
  }

  // 栈顶的字符去比
  while(stack.length && stack[stack.length - 1] > v) {
   if(countMap[stack[stack.length - 1]] === 0) {
    break;
   }
   exist[stack.pop()] = false
  }
  stack.push(v);
  exist[v] = true;
 }

 return stack.join('')
};
// @lc code=end

