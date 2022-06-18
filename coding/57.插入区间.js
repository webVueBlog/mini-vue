/*
 * @lc app=leetcode.cn id=57 lang=javascript
 *
 * [57] 插入区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
难度：Hard

相关话题：`排序`、`数组`

给出一个*无重叠的 ，* 按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

思路：

一种最简单的想法就是，先添加`newIntervals`，然后重新按照起始端点排序，最后再处理重叠区间，就相当于`Leetcode 56`一模一样。

时间复杂度是`O(nlgn)`。

另外是时间复杂度`O(n)`的方法。

思路比较简洁的是重新构建区间，

检查每一段区间，如果`当前区间.end < 新区间.start`，那么当前区间肯定是在新区间前面且不重叠的，直接添加当前区间进结果就好。

如果`当前区间.start > 新区间.end`，那么当前区间肯定是在新区间后面且不重叠的，并且说明新区间已经处理完毕，直接添加新区间到结果。

其他情况，说明存在重叠区域，更新新区间的开始点和结束点。

 */
var insert = function(intervals, newInterval) {
 let len=intervals.length
 let [left,right]=newInterval
 let newArr = []
 let i = 0
 for (;i<len;i++) {
   let itv=intervals[i]
   if (itv[0]>right) break
   if (itv[1]<left) {
     newArr.push(itv)
   }else{
     left=Math.min(itv[0], left)
     right=Math.max(itv[1], right)
   }
 }
 newArr.push([left,right])
 if (i<len)newArr.push(...intervals.slice(i))
 return newArr    
};

// var insert = function (intervals, newInterval) {
//  if (intervals.length === 0) {
//      return [ newInterval ];
//  }

//  const result = [];
//  let flag = 0;
//  let i;

//  for (i = 0; i < intervals.length; i++) {
//      const interval = intervals[i];
//      if (newInterval[0] > interval[1]){
//          result.push(interval);
//      } else if (newInterval[1] < interval[0]){
//          result.push(newInterval);
//          flag = 1;
//          break;
//      } else {
//          newInterval[0] = Math.min(newInterval[0], interval[0]);
//          newInterval[1] = Math.max(newInterval[1], interval[1]);
//      }
//  }

//  if (flag === 0) {
//      result.push(newInterval);
//      return result;
//  } else {
//      return result.concat(intervals.splice(i));
//  }
// };
// @lc code=end

