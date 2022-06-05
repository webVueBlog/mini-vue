/*
 * @lc app=leetcode.cn id=274 lang=javascript
 *
 * [274] H 指数
 */

// @lc code=start
/**
 * @param {number[]} citations
 * @return {number}
 (68 ms)
 */
function hIndex(citations) {
  var map = {};
  var h = citations.length;
  var i = 0;
  var max = 0;
  citations.map(c => map[c] = map[c] ? map[c] + 1 : 1);
  for (; i <= h; i++) {
    max = Math.max(max, h >= i ? i : 0);
    h -= map[i] ? map[i] : 0;
  }
  return max;
}

// @lc code=end

