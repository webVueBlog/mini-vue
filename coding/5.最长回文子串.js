/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
babad
一个字符 b
二个字符 ab s[0] === s[1]
aba 判断两侧的是不是相等
a bcb a 加上判断中间是不是回文

dp[i][j] = j - i === 1 // 相邻
 ? s[i] === s[j]
 : s[i] ==== s[j] && dp[i+1][j-1]

 dp[0][4] => dp[1][3] => dp[2][2]
babad
   j
  i
i
思路：定义dp[i][j]表示子串i～j是否是回文子串，循环s的子串，看是否满足s[i]，s[j]相等，如果相等，则dp[i][j]是否为回文串取决于dp[i+1][j-1]是否也是回文子串，在循环的过程中不断更新最大回文子串的长度，注意子串的长度是0或1也算回文子串

复杂度：时间复杂度O(n^2)，两层循环。空间复杂度O(n^2)，即动态规划dp数组的空间。

(772 ms)
 */
function longestPalindrome(s) {
  // 长度
  const n = s.length;
  // 初始化二维的数组
  // 默认所有都不是回文
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  let ans = s[0]; //  初始化 1 <= s.length
  // 遍历一遍，每个单词都是回文
  for(let i = 0; i<n; i++) {
    dp[i][i] = 1; // true 1 false 0
  }

  for(let j = 1; j < n; j++) {
    for(i = j - 1; i>=0; i--) {
      // 区分情况
      if(s[i] === s[j] && (j - i === 1 || dp[i+1][j-1])) {
        dp[i][j] = 1; // 是回文子串标记
        // 当前回文子串的长度要比ans长
        if(ans.length < j - i + 1) {
          ans = s.slice(i, j+1);
        }
      }
    }
  }
  return ans;
}
// @lc code=end

