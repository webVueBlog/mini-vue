/*
 * @lc app=leetcode.cn id=526 lang=javascript
 *
 * [526] 优美的排列
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 * 假设有从 1 到 n 的 n 个整数。用这些整数构造一个数组 perm（下标从 1 开始），只要满足下述条件 之一 ，该数组就是一个 优美的排列 ：

perm[i] 能够被 i 整除
i 能够被 perm[i] 整除
给你一个整数 n ，返回可以构造的 优美排列 的 数量 。

{
 1:[1,2,3]
 2:[1,2]
 3:[1,3]
}

{
 1: true // 可用true
 2: true
 3: true
}
(140 ms)
 */
const countArrangement = (n) => {
	if (n < 3) return n;
    const visited = Array(n+1).fill(false);
	let ans = 0;

	const dfs = (i) => {
		if (i > n) {
            ans++;
            return;
        }

		for (let idx=1;idx<=n;idx++) {
            // need this here to avoid the double counting
            if (!visited[idx] && (idx % i === 0 || i % idx === 0)) {
                visited[idx] = true;
                dfs(i+1);
                visited[idx] = false;
            }
		}
        return;
	};

	dfs(1);
	return ans;
};
// @lc code=end

