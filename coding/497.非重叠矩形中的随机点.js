/*
 * @lc app=leetcode.cn id=497 lang=javascript
 *
 * [497] 非重叠矩形中的随机点
 */

// @lc code=start
/**
 * @param {number[][]} rects
 */
 var Solution = function(rects) {
  this.rects = rects;
  this.sum = 0;
  this.arr = [];
  
  for (const [x1, y1, x2, y2] of rects) {
      const x = x2 - x1 + 1;
      const y = y2 - y1 + 1;
      this.sum += x * y;
      this.arr.push(this.sum);
  }
};

/**
* @return {number[]}
*/
Solution.prototype.pick = function() {
  const k = Math.random() * this.sum;
  let [left, right] = [0, this.arr.length - 1];
  while (left < right) {
      const mid = (left + right) >>> 1;        
      this.arr[mid] >= k ? (right = mid) : (left = mid + 1);
  }
  
  const [x1, y1, x2, y2] = this.rects[right];
  const x = ~~(Math.random() * (x2 - x1 + 1)) + x1;
  const y = ~~(Math.random() * (y2 - y1 + 1)) + y1;
  
  return [x, y];
};

/** 
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(rects)
* var param_1 = obj.pick()
*/
// @lc code=end

