/*
 * @lc app=leetcode.cn id=662 lang=javascript
 *
 * [662] 二叉树最大宽度
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
 var widthOfBinaryTree = function (root) {
  // 递归遍历，给宽度编号
  if (!root) return 0;
  const queue = [[root, 0]];
  let maxWidth = 0; // 全局维护最大值

  let left = 0; // 记录当前层最左边节点的计数值
  let right = 0; // 记录当前层最右边节点的计数值

  while (queue.length) {
      left = queue[0][1];
      const len = queue.length;
      for (let i = 0; i < len; i += 1) {
          let [node, depth] = queue.shift();
          right = depth;
          if (node.left) {
              queue.push([node.left, 2 * (depth - left)])
          }; // 重点，优化掉左边不需要计数的部分
          if (node.right) {
              queue.push([node.right, 2 * (depth - left) + 1])
          };
      }
      maxWidth = Math.max(maxWidth, right - left + 1);
  }
  return maxWidth
};

// dfs
// var widthOfBinaryTree = function(root) {
//  if(!root)return 0
//  let arr=[[root,0]]
//  let maxWidth=0
//  while(arr.length>0){
//    let len=arr.length
//    let l=null,r=null
//    for(let i=0;i<len;i++){
//      let [node,pos]=arr.shift()
//      if(l==null)l=pos
//      else r=pos
//      if(node.left)arr.push([node.left,pos*2])
//      if(node.right)arr.push([node.right,pos*2+1])
//    }
//    let w=0
//    if(l==null || r==null)w=1
//    maxWidth=Math.max(maxWidth,r-l+1)
//  }
//  return maxWidth
// };

//  (64 ms)
// var widthOfBinaryTree = function(root) {
//  const minPos = [0];
//  let maxWidth = 0;
 
//  callDFS(root, 0, 0);
//  return maxWidth;
 
//  function callDFS(node, level, pos) {
//      if(!node) return;
//      if(minPos[level] === undefined) minPos.push(pos);
     
//      const diff = pos - minPos[level];
//      maxWidth = Math.max(maxWidth, diff+1);
     
//      callDFS(node.left, level+1, diff*2);
//      callDFS(node.right, level+1, diff*2+1);
//  }
// };
// @lc code=end

