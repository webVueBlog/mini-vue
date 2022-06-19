/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}

难度：Easy

相关话题：`数组`、`双指针`

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

```
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。
```

```
给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 `5`, 并且 nums中的前五个元素为 `0`, `1`, `3`, `0`, 4。

注意这五个元素可为任意顺序。

你不需要考虑数组中超出新长度后面的元素。
```

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**&ldquo;引用&rdquo;** 方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

思路：

和`NO.26`基本一致，检查条件改变为只要当前`nums[i]!==val`，那么就可以添加到`k`对应的索引中。


 */
// (56 ms) 返回移除后数组的新长度。
// var removeElement = function(nums, val) {
//  let k = 0
//  for(let i = 0; i < nums.length; i++) {
//   // 遍历数组
//   if(nums[i] !== val)
//   nums[k++] = nums[i]
//  }
//  return k
// };


var removeElement = function (nums, val) {
    let l = 0, r = nums.length;
    while (l < r) {
        if (nums[l] === val) {
            nums[l] = nums[r - 1];
            r--;
        } else {
            l++;
        }
    }
    return l;

};
// @lc code=end

