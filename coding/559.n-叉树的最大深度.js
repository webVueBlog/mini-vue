/*
 * @lc app=leetcode.cn id=559 lang=javascript
 *
 * [559] N 叉树的最大深度
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
// DFS
var maxDepth = function(root) {
    if(!root) return 0
    let max = 0;
    for(let child of root.children) {
     max = Math.max(max, maxDepth(child))
    }
    return max + 1;
};


// BFS
// var maxDepth = function(root) {
//  if(!root) return 0;
//  // Note: it is not advised to use array as queue
//  let queue = [], depthCount = 0;
//  queue.push(root);
 
//  while(queue.length > 0){
//      let len = queue.length;
     
//      for(let i = 0; i < len; i++){
//          let node = queue.shift();
//          for(let child of node.children) queue.push(child);
//      }
//      depthCount++;
//  }
//  return depthCount;
// }

// @lc code=end

