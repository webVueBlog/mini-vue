/*
 * @lc app=leetcode.cn id=187 lang=javascript
 *
 * [187] 重复的DNA序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    let n = s.length;
    let defaultLength = 10;
    let map = new Map();
    let res = [];

    for (let i = 0; i <= n - defaultLength; i += 1) {
        const sub = s.slice(i, i + defaultLength);

        // 记录次数
        map.set(sub, (map.get(sub) || 0) + 1);

        // 防止了多次添加重复的元素
        if (map.get(sub) === 2) {
            res.push(sub);
        }
    }
    return res
};

// var findRepeatedDnaSequences = function(s) {
//     let curr = s.slice(0, 10);
//     const seen = new Set([curr]);
//     const res = new Set();
    
//     for(let i = 10; i < s.length; i++) {
//         curr = curr.slice(1) + s[i];
//         if(seen.has(curr)) res.add(curr);
//         seen.add(curr);
//     }
//     return [...res];
// };
// @lc code=end

