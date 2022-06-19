/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
难度：Hard

相关话题：`栈`、`数组`

给定 *n*  个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

思路：

利用栈构建一个递增序列，如果存在一个递增序列，例如`[1,3,5]`，那么`3`这个高度对应的宽度就很好计算了。

举个例子：`[2,4,5,3,1]`
  
假设现在`stack`为`[2,4,5]`，当前是遍历的值是`3`；

现在不满足递增序列了，因此`pop`，删除`5`，那么就要计算删掉的`5`它对应的宽度`width`。

`5`的宽度就是在`4`和`3`之间的所有索引，也就是`idx(3)-idx(4)-1`，相当于`i-stack[stack.lenght-1]-1`；

同理，接下来删除`4`，`4`的宽度就是`idx(3)-idx(1)-1`；

栈变为`[2,3]`，遇到下一个值`1`，继续上面的步骤，当前不能满足递增序列，删`3`，删`2`；

注意，这里删除`2`的时候，由于`2`已经是当前栈的最后一个值，因此`2`的宽度其实就是`idx(1)`，我将初始`stack`设置为`-1`，也是为了可以继续套用`i-stack[stack.lenght-1]-1`。


 */
var largestRectangleArea = function(heights) {
  let stack=[-1],maxArea=0
  for(let i=0;i<=heights.length;i++){
    while(stack.length>1 && (i===heights.length || heights[i]<heights[stack[stack.length-1]])){
      let lastId=stack.pop(),
          lastH=heights[lastId],
          width=i-stack[stack.length-1]-1
      maxArea=Math.max(maxArea,width*lastH)
    }
    stack.push(i)
  }
  return maxArea
};
// @lc code=end

