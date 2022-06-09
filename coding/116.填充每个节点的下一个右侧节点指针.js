/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
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

想法- BFS

BFS使用队列

当我们移动节点时，将它连接到队列中的下一个节点


理念- DFS

之前的订单扫描

在恢复前设置子节点排列

 */

// BFS
// (64 ms)
// var connect = function(root) {
//  if (root == null) return root;
//  let queue = [root];
//  while(queue.length!=0) {
//      let next = [];
//      while(queue.length!=0) {
//          let node = queue.shift();
//          node.next = queue[0]||null;
//          if (node.left!=null) {
//              next.push(node.left);
//              next.push(node.right);
//          }
//      }
//      queue = next;
//  }
//  return root;
// };

// DFS
//  (76 ms)
// var connect = function(root) {
//  if (root === null || root.left === null) return root;
//  root.left.next = root.right;
//  root.right.next = root.next ? root.next.left:null;
//  connect(root.left);
//  connect(root.right);
//  return root;
// }

// (96 ms)
var connect = function(root) {
 if(!root) return null
 const traverse = (l, r) => {
  if(l === null || r === null) {
   return
  }

  l.next = r;
  traverse(l.left, l.right)
  traverse(r.left,  r.right)

  traverse(l.right, r.left)
 }
 traverse(root.left, root.right)
 return root
}
// @lc code=end

