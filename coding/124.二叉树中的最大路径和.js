/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
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
难度：Hard

相关话题：`树`、`深度优先搜索`

给定一个**非空** 二叉树，返回其最大路径和。

本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径**至少包含一个** 节点，且不一定经过根节点。

思路：

对于某一个节点root，它可以有2种选择：

* 不与父节点连接，那么它的连接路径最大值就是

    `Math.max(左节点值+当前值+右节点值，左节点值+当前值，右节点值+当前值，左节点值，右节点值，当前值)`
    
    这个值不需要返回给父节点，直接记录为`res`。

* 如果与父节点连接，那么它的连接路径最大值就是

    `Math.max(左节点值+当前值，右节点值+当前值，当前值)`
    
    这个值需要返回，连接它的父节点值。

可以看到，`1`和`2`内部存在重复，因此减少重复后，不与父节点连接的实际就是：

`Math.max(左节点值+当前值+右节点值，左节点值，右节点值)`

最终从`1`和`2`中选取出最大的值。



 */
var maxPathSum = function(root) {
  let res=-Infinity
  function _maxPathSum(root) {
    if(!root)return -Infinity

    let leftV=_maxPathSum(root.left),
        rightV=_maxPathSum(root.right),
        cV=root.val

    // 与父节点连接中断的path的数值
    res=Math.max(res,leftV,rightV,cV+leftV+rightV)
    // 与父节点连接继续的path的数值
    return Math.max(cV+leftV,cV+rightV,cV)
  }
  return Math.max(_maxPathSum(root),res)
};
// @lc code=end

