/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
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
 * @return {number[][]}
输入：root = [1,null,3,2,4,null,5,6]
输出：[[1],[3,2,4],[5,6]]

 */
// var levelOrder = function(root) {
//     let res = []
//     const traverse = (node, depth) => {
//      if(!node) return

//      if(res[depth]) {
//       res[depth].push(node.val)
//      } else {
//       res[depth] = [node.val]
//      }

//      for(let i = 0; i < node.children.length; i++) {
//       traverse(node.children[i], depth+1)
//      }

//     }
//     traverse(root, 0)
//     return res
// };

// Time Complexity: O(N^2) consider .shift() takes linear
// Space Complexity: O(N)

// var levelOrder = function(root) {
//  const res = [], queue = [];
//  let depth = 0, num = 0;
//  if (root) queue.push(root);
//  while (queue.length) {
//      res.push([]);
//      num = queue.length;
//      for (let i = 0; i < num; i++) {
//          const curr = queue.shift();
//          if (!curr) continue;
//          res[depth].push(curr.val);
//          queue.push(...curr.children);
//      }
//      depth++;
//  }
//  return res;
// };


// Recursive Level-order Traverse
// Time Complexity:
// O(N)
// Space Complexity:
// O(log N) in average case.
// O(N) in worst case, that there is an unbalanced tree.

var levelOrder = function(root) {
 const res = []; // [[]]
 BFS(root, 0);
 return res;
 
 function BFS(node, depth) {
     if (!node) return;
     if (depth === res.length) {
         res.push([]);
     }
     res[depth].push(node.val);
     for (child of node.children) {
         BFS(child, depth + 1);
     }
 }
};
// @lc code=end

