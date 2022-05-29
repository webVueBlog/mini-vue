/*
 * @lc app=leetcode.cn id=735 lang=javascript
 *
 * [735] 行星碰撞
 */

// @lc code=start
/**
 * @param {number[]} asteroids
 * @return {number[]}
2 5 不会
10 -2
-2 -5 不会
-2 5 不会
[5, 10, -5]

[2, 1, -5]
[-5]
 (72 ms)
 */

var asteroidCollision = function(asteroids) {
 let stack = []; // 建立栈
 for(let i = 0; i < asteroids.length; i++) {
  // 遍历数组里的每一个星球
  let asteroid = asteroids[i]; 
  // 栈为空
  if(stack.length === 0) {
   stack.push(asteroid);
   continue;
  }
  // 要栈里有行星
  while(stack.length > 0 && stack[stack.length - 1] > 0 && asteroid < 0) {
   let top = stack[stack.length - 1];
   let sum = top + asteroid
   if(sum > 0) { // 栈顶的正数大
    // 当前行星爆炸
    asteroid = null
    break
   }
   if(sum === 0) { // 栈顶行星爆炸
    stack.pop()
    // 当前行星爆炸
    asteroid = null
   }
   if(sum < 0) { // 栈顶行星爆炸,asteroid不爆炸
    stack.pop()
   }
  }
  if(asteroid!==null) {
    stack.push(asteroid)
  }
 }
 // 返回栈
 return stack;
};

// @lc code=ende