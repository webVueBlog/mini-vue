/*
 * @lc app=leetcode.cn id=191 lang=javascript
 *
 * [191] 位1的个数
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number}
编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。

输入：00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

输入：11111111111111111111111111111101
输出：31
解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。

 (76 ms)
 */
 var hammingWeight = function(n) {
    
  let num_of_1s = 0;
  
  for( let i=0 ; i < 32; i++ ){
      
      num_of_1s += n & 1;
      
      n >>= 1;

  }
  
  return num_of_1s
};
// @lc code=end

