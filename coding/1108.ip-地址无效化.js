/*
 * @lc app=leetcode.cn id=1108 lang=javascript
 *
 * [1108] IP 地址无效化
 */

// @lc code=start
/**
 * @param {string} address
 * @return {string}
 */
 var defangIPaddr = function(address) {
  return address.replace(/[.]/g, '[.]');
};
// @lc code=end

