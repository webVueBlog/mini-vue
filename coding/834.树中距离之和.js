/*
 * @lc app=leetcode.cn id=834 lang=javascript
 *
 * [834] 树中距离之和
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
 var sumOfDistancesInTree = function(n, edges) {
  const graph = Array.from({ length: n }, () => new Set());
  const count = new Array(n).fill(1);
  let ans = new Array(n).fill(0);
  
  for (const [u, v] of edges) {
      graph[u].add(v);
      graph[v].add(u);
  }
  
  const postOrder = (node, parent) => {
      for (const next of graph[node]) {
          if (next === parent) continue;
          
          postOrder(next, node);
          
          count[node] += count[next];
          ans[node] += ans[next] + count[next];
      }
  }
  
  const preOrder = (node, parent) => {
      for (const next of graph[node]) {
          if (next === parent) continue;
          
          ans[next] = ans[node] - count[next] + n - count[next];
          preOrder(next, node)
      }
  }
  
  postOrder(0, -1);
  preOrder(0, -1);
  
  return ans;
};
// @lc code=end

