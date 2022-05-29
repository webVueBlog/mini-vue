/*
 * @lc app=leetcode.cn id=1338 lang=javascript
 *
 * [1338] 数组大小减半
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
[3,3,3,3,5,5,5,2,2,7] 10 target = 5

{
 3:4,
 5:3,
 2:2,
 7:1
}

[4,3,2,1]

sort

[4,3,2,1]

4,3
(140 ms)
 */
var minSetSize = function(arr) {
 let map = {};
 let len = arr.length;
 let times = [];
 let targetLen = len / 2;
 let count = 0;

 for(let i = 0; i < len; i++) {
  let value = arr[i];
  if(!map[value]) {
   map[value] = 0;
  }
  ++map[value];
 }

 Object.keys(map).forEach(key => {
  times.push(map[key]);
 });

 times.sort((x,y) => y-x);

 let dels = 0;
 for(let i = 0; i < times.length; i++) {
  if(dels >= targetLen) break;
  dels += times[i];
  count++;
 }
 return count;
};
// @lc code=end

