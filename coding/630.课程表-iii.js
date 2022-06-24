/*
 * @lc app=leetcode.cn id=630 lang=javascript
 *
 * [630] 课程表 III
 */

// @lc code=start
/**
 * @param {number[][]} courses
 * @return {number}
 */
 var scheduleCourse = function(courses) {
  courses.sort((a, b) => a[1] - b[1]);
  const pq = new MaxPriorityQueue();
  let time = 0;
  
  for (const [duration, lastDay] of courses) {
      time += duration;
      pq.enqueue(duration);

      if (time > lastDay) time -= pq.dequeue().element;
  }
  
  return pq.size();
};
// @lc code=end

