/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
nums1 中数字 x 的下一个更大元素是指 x 在 nums2中对应位置右侧的第一个比 x 大的元素。

给你两个没有重复元素的数组 nums1和 nums2 ，下标从0开始计数，其中nums1 是 nums2 的子集。
对于每个0 <= i < nums1.length ，找出满足nums1[i] == nums2[j] 的下标j ，并且在nums2确定nums2[j] 的下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。
返回一个长度为 nums1.length的数组ans作为答案，满足ans[i] 是如上所述的下一个更大元素 。
示例1：
输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
输出：[-1,3,-1]
解释：nums1中每个值的下一个更大元素如下所述：
- 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
- 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是3 。
- 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
示例2：
输入：nums1 = [2,4], nums2 = [1,2,3,4].
输出：[3,-1]
解释：nums1中每个值的下一个更大元素如下所述：
- 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是3 。
- 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。

暴力解法  (72 ms)
1、获取nums2中相等的index
2、从当前index之后去找大于num1的值


 (76 ms)
 单调栈 过
// 创建一个临时栈，一个map，然后遍历 nums2。
// 若当前栈无数据，则当前数字入栈备用。
// 若当前栈有数据，则用当前数字与栈顶比较：
// 3.1 当前数字 > 栈顶，代表栈顶对应下一个更大的数字就是当前数字，则将该组数字对应关系，记录到哈希表。
// 3.2 当前数字 < 栈顶，当前数字压入栈，供后续数字判断使用。
// 这样，我们就可以看到哈希表中存在部分 nums2 数字的对应关系了，而栈中留下的数字，代表无下一个更大的数字，我们全部赋值为 -1 ，然后存入哈希表即可。
// 遍历 nums1，直接询问哈希表拿对应关系即可。
 */
// let nextGreaterElement = function (nums1, nums2) {
//  let map = new Map(),stack = [], ans = [];

//  nums2.forEach((item) => {
//    while (stack.length && item > stack[stack.length - 1]) {
   
//      map.set(stack.pop(), item);
//    }
//    stack.push(item);
//  });


//  stack.forEach((item) => map.set(item, -1));
//  nums1.forEach((item) => ans.push(map.get(item)));

//  console.log(map, stack, ans, 1);

//  return ans;
// };

//  (64 ms)
var nextGreaterElement = function(findNums, nums) {
 return findNums.map(n => {
     let found = nums.indexOf(n);
     
     if (found !== -1) {
         // find the next greater element's index
         while (nums[++found] < n);
         // -1 if not found
         if (found >= nums.length) found = -1;
         else found = nums[found];
     }
     
     return found;
 });
};

// var nextGreaterElement = function (nums1, nums2) {
 
//  const res = [];

//  for (let i = 0; i < nums1.length; i += 1) {
//    const c = nums1[i];

//    for (let j = 0; j < nums2.length; j += 1) {
//      const c1 = nums2[j];
//      if (c === c1) {
//        let equalIndex = j;
//        for (let k = equalIndex; k < nums2.length; k += 1) {
//          const c2 = nums2[k];
//          if (c2 > c) {
//            res[i] = c2;
//            break;
//          } else {
//            res[i] = -1;
//          }
//        }
//      }
//    }
//  }
//  return res;
// };
// @lc code=end

