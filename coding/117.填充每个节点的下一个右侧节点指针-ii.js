/*
 * @lc app=leetcode.cn id=117 lang=javascript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
 var connect = function (root) {
  // 因为不是完成二叉树，所以不能使用递归，这里用bfs
  if (!root) return null;

  let q = [root];
  while (q.length) {
      const n = q.length;
      let last = null;
      for (let i = 1; i <= n; ++i) {
          let f = q.shift();
          if (f.left !== null) {
              q.push(f.left);
          }
          if (f.right !== null) {
              q.push(f.right);
          }
          if (i !== 1) {
              last.next = f;
          }
          last = f;
      }
  }
  return root;
};

// (80 ms)
// var connect = function(root) {
//  let curr = root;
 
//  while (curr != null) {
//      let start = null; // (1)
//      let prev = null;
 
//      while (curr != null) { // (2)
//          if (start == null) { // (3)
//              if (curr.left) start = curr.left;
//              else if (curr.right) start = curr.right;
             
//              prev = start; // (4)
//          }
         
//          if (prev != null) {
//              if (curr.left && prev != curr.left) {
//                  prev = prev.next = curr.left; // (5)
//              }
//              if (curr.right && prev != curr.right) {
//                  prev = prev.next = curr.right;
//              }
//          }

//          curr = curr.next; // (6)
//      }

//      curr = start; // (7)
//  }
 
//  return root;
// };
// @lc code=end

