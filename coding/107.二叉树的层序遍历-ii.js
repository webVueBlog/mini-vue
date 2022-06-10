/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层序遍历 II
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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
 let res = [];
 if(!root) return res

 const queue = [root];
 while(queue.length !== 0) {
  let length = queue.length;
  // 记录节点
  let levelList = [];
  for(let i = 0; i < length; i++) {
   const node = queue.shift();
   levelList.push(node.val); // [当前节点值]

   if(node.left !== null) {
    queue.push(node.left)
   }

   if(node.right !== null) {
    queue.push(node.right)
   }
  }
  res.unshift(levelList);
 }

 return res
};

// var levelOrderBottom = function(root) {
//  if (root == null) {
//    return [];
//  }
//  let queue = [];
//  let results = [];
//  queue.push(root);
//  while (queue.length > 0) {
//    /* level-order traversal */
//    let level = []; /* collect node.vals for current level */
//    let size = queue.length; /* instead of using recursion, we will use a loop bounded by the queue size */
//    while (size > 0) {
//      let current = queue.shift(); /* remove and capture next item from queue */
//      level.push([current.val]); /* add the current val to the current level array */

//      /* if we have a left or right subtree, explore */
//      if (current.left != null) {
//        queue.push(current.left);
//      }

//      if (current.right != null) {
//        queue.push(current.right);
//      }

//      size--; /* level complete, decrement size and proceed */
//    }

//    results.push(level); /* push the last level's results */
//  }
//  return results.reverse(); /* return results, in reverse order */
// };
// @lc code=end

