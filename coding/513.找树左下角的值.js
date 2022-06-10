/*
 * @lc app=leetcode.cn id=513 lang=javascript
 *
 * [513] 找树左下角的值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
//  (68 ms)
var findBottomLeftValue = function(root) {;
 let queue = [root] // [..., root]
 let node = root;
 while(queue.length) {
  node = queue.pop() // 取出当前节点
  if(node.right) {
   queue.unshift(node.right)
  }
  if(node.left) {
   queue.unshift(node.left)
  }
 }
 return node.val
};

//  (72 ms)
// var findBottomLeftValue = function(root) {
//  let queue = [root];
//  let node = root;
//  while (queue.length){
//      if(!queue){
//          return;
//      }
//      node = queue.pop();
//      if(node.right){
//          queue.unshift(node.right);
//      }
//      if(node.left){
//          queue.unshift(node.left);
//      }
//  }
//  return node.val;
// };
// @lc code=end

