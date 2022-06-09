/*
 * @lc app=leetcode.cn id=652 lang=javascript
 *
 * [652] 寻找重复的子树
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
    // 记录所有子树以及出现的次数
    const memo = new Map();
    const res = [];
    const traverse = (node) => {
        // 对于空节点，可以用一个特殊字符表示
        if (!node) {
            return "#";
        }
        // 将左右子树序列化成字符串，左右子树加上自己，就是以自己为根的二叉树序列化结果
        const key = node.val + "," + traverse(node.left) + traverse(node.right);
       
        let value = memo.get(key) || 0;
        // 多次重复也只会被加入结果集一次
        if (value === 1) {
            // 有人和我重复，把自己加入结果列表
            res.unshift(node);
        }
        // 给子树对应的出现次数加一
        memo.set(key, value + 1);
        return key;
    };

    traverse(root);
    return res
};

// var findDuplicateSubtrees = function(root) {
//   let hash=new Map(),result=[]
//   function stringify(node){
//     if(!node)return 'N'
//     let str= node.val+'-'+stringify(node.left)+'-'+stringify(node.right)
//     if(!hash.has(str))hash.set(str,1)
//     else hash.set(str,hash.get(str)+1)
//     if(hash.get(str)===2)result.push(node)
//     return str
//   }
//   stringify(root)
//   return result
// };

// dfs (100 ms)
// var findDuplicateSubtrees = function(root) {
//   const map = new Map(), res = []
//   dfs(root, map, res)
//   return res
// };

// function dfs(root, map, res){
//   if(!root) return '#'
//   const subtree = `${root.val}.${dfs(root.left,map,res)}.${dfs(root.right, map,res)}`
//   map.set(subtree,(map.get(subtree)||0) + 1)
//   if(map.get(subtree) === 2){
//     res.push(root)
//   }
//   return subtree
// }
// @lc code=end

