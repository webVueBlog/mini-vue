/*
 * @lc app=leetcode.cn id=1401 lang=javascript
 *
 * [1401] 圆和矩形是否有重叠
 */

// @lc code=start
/**
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {boolean}
 */
 var checkOverlap = function(radius, xCenter, yCenter, x1, y1, x2, y2) {
  const edgeX = (xCenter < x1) ? x1 : (xCenter > x2) ? x2 : xCenter;
  const edgeY = (yCenter < y1) ? y1 : (yCenter > y2) ? y2 : yCenter;
  const distX = xCenter - edgeX;
  const distY = yCenter - edgeY;
  
  return distX ** 2 + distY ** 2 <= radius ** 2;
};
// @lc code=end

