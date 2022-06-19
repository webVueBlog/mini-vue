/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    //需要的字符
    let need = {}, win = {};
    //统计异位词的数量
    for (let a of p) {
        need[a] = (need[a] || 0) + 1;
    }
    //左右指针
    let l = 0, r = 0;
    //窗口中和need中字符数量一致的字符种类
    let val = 0;
    let res = [];
    while (r < s.length) {
        let c = s[r];
        // 右边的字符进入窗口
        r += 1;
        if (need[c]) {
            // 当前字符在need中，更新窗口中的字符数量
            win[c] = (win[c] || 0) + 1;
            if (win[c] == need[c]) {
                // 该字符在窗口中和need中的字符匹配时，字符种类+1
                val += 1;
            }
        }
        // 不断出窗口
        while (r - l >= p.length) {
            // 如果此时窗口中的子串和p是异位词则将左边界加入res中
            if (val == Object.keys(need).length) {
                res.push(l);
            }
            let d = s[l];
            // 出窗口
            l += 1;
            // 如果该字符在need中 更新窗口中的字符数量 和字符种类
            if (need[d]) {
                if (win[d] == need[d]) {
                    val -= 1;
                }
                win[d] -= 1;
            }
        }
    }
    return res;
};
// @lc code=end

