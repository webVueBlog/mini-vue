/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

 */
//  (64 ms)
var zigzagLevelOrder = function(root) {
 if(!root) return []
 const res = []
 const queue = [root]
 let isOrderList = true
 while(queue.length) {
  let levelList = []
  const length = queue.length;
  for(let i = 0; i < length; i++) {
   // 遍历第一个取出第一个节点
   const node = queue.shift();
   if(isOrderList) {
    // 正常
    levelList.push(node.val);
   } else {
    // 反转
    levelList.unshift(node.val);
   }

   if(node.left !== null) {
    queue.push(node.left)
   }
   if(node.right !== null) {
    queue.push(node.right)
   }
  }
  res.push(levelList)
  isOrderList = !isOrderList
 }
 return res
};

// var zigzagLevelOrder = function(root) {
//  if(!root)return []
//  let res=[]
//  let aux=[root]
//  let h=0
//  while(aux.length>0){
//    h++
//    let len=aux.length
//    let vals=[]
//    for(let i=0;i<len;i++){
//      let node=aux.shift()
//      if(h%2===1)vals.push(node.val)
//      else vals.unshift(node.val)
//      if(node.left)aux.push(node.left)
//      if(node.right)aux.push(node.right)
//    }
//    res.push(vals)
//  }
//  return res    
// };

// function zigzagLevelOrder(root) {
//  let res = [];
//  go(root, 0, res);
//  return res;
// }

// function go(node, l, res) {  // l means level
//  if (!node) return;

//  if (res[l] == null) {
//    res.push([]);
//  }

//  if (l % 2 === 0) {
//    res[l].push(node.val);
//  } else {
//    res[l].unshift(node.val);
//  }

//  go(node.left, l + 1, res);
//  go(node.right, l + 1, res);
// }
// @lc code=end

