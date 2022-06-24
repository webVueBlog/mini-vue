/*
 * @lc app=leetcode.cn id=715 lang=javascript
 *
 * [715] Range 模块
 */

// @lc code=start

var RangeModule = function() {
 this.intervals = [];
};

/** 
* @param {number} left 
* @param {number} right
* @return {void}
*/
RangeModule.prototype.addRange = function(left, right) {
 const intv = this.intervals;
 let newInterval = [left, right];
 let i = 0;
 
 while (i < intv.length && intv[i][1] < newInterval[0]) i++;
 while (i < intv.length && intv[i][0] <= newInterval[1]) {
     newInterval = [Math.min(intv[i][0], newInterval[0]), Math.max(intv[i][1], newInterval[1])];
     intv.splice(i, 1);
 }
 
 intv.splice(i, 0, newInterval);
};

/** 
* @param {number} left 
* @param {number} right
* @return {boolean}
*/
RangeModule.prototype.queryRange = function(left, right) {
 const intv = this.intervals;
 let [low, high] = [0, intv.length - 1];
 while (low <= high) {
     const mid = (low + high) >>> 1;
     if (intv[mid][0] <= left && intv[mid][1] >= right) return true;

     if (intv[mid][0] > left) high = mid - 1;
     else low = mid + 1;
 }

 return false;
};

/** 
* @param {number} left 
* @param {number} right
* @return {void}
*/
RangeModule.prototype.removeRange = function(left, right) {
 const intv = this.intervals;
 let i = 0;
 while (i < intv.length && intv[i][1] < left) i++;
 
 if (i < intv.length && intv[i][0] < left) {
     let newIntervalBefore = [intv[i][0], left];

     // 要删除的区间在其中一个区间内
     if (right < intv[i][1]) {
         let newIntervalAfter = [right, intv[i][1]];
         intv.splice(i, 1, newIntervalBefore, newIntervalAfter);
         return;
     }

     intv.splice(i, 1, newIntervalBefore);
     i++;
 }
 
 while (i < intv.length && right >= intv[i][1]) intv.splice(i, 1);

 if (i < intv.length && right > intv[i][0]) {
     let newIntervalAfter = [right, intv[i][1]];
     intv.splice(i, 1, newIntervalAfter);
 }    
};

/** 
* Your RangeModule object will be instantiated and called as such:
* var obj = new RangeModule()
* obj.addRange(left,right)
* var param_2 = obj.queryRange(left,right)
* obj.removeRange(left,right)
*/
// @lc code=end

