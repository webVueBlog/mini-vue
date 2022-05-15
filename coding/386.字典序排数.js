/*
 * @lc app=leetcode.cn id=386 lang=javascript
 *
 * [386] 字典序排数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 给你一个整数 n ，按字典序返回范围 [1, n] 内所有整数。

你必须设计一个时间复杂度为 O(n) 且使用 O(1) 额外空间的算法。

输入：n = 13
输出：[1,10,11,12,13,2,3,4,5,6,7,8,9]

输入：n = 2
输出：[1,2]
 (68 ms)
 */

var lexicalOrder = function(n) {
 const res = [];
 const pushFromTo = (start = 1, end = 9) => {
  while(start <= end && start <= n) {
   res.push(start);
   pushFromTo(start * 10, start * 10 + 9)
   start++
  }
 }
 pushFromTo()
 return res;
}

// var lexicalOrder = function(n) {
//  function pushFromTo(start, end) {
//   while(start <= end && start <= n) {
//    result.push(start);
//    pushFromTo(start*10, start*10+9)
//    start++
//   }
//  }
//  var result = [];
//  pushFromTo(1,9);
//  return result;
// };

// var lexicalOrder = function(n) {
//  const ret = [];
//  let number = 1;
//  for(let i = 0; i < n; i++) {
//   ret.push(number);
//   if(number * 10 <= n) {
//    number *= 10;
//   } else {
//    while(number + 1 > n || number % 10 == 9) {
//     number = Math.floor(number / 10);
//    }
//   }
//  }
// };
// @lc code=end

