/*
 * @lc app=leetcode.cn id=478 lang=javascript
 *
 * [478] 在圆内随机生成点
 */

// @lc code=start
/**
 * @param {number} radius
 * @param {number} x_center
 * @param {number} y_center
 */
 var Solution = function(radius, x_center, y_center) {
  this.radius = radius;
  this.x_center = x_center;
  this.y_center = y_center;
};

/**
* @return {number[]}
*/
Solution.prototype.randPoint = function() {
  const len = Math.sqrt(Math.random()) * this.radius;
  const deg = Math.random() * Math.PI * 2;
  const x = this.x_center + len * Math.cos(deg);
  const y = this.y_center + len * Math.sin(deg);
  
  return [x, y];
};

/** 
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(radius, x_center, y_center)
* var param_1 = obj.randPoint()
*/
// @lc code=end

