/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    let l = 0, r = s.length - 1;

    while (l < r) {
        if (s[l] !== s[r]) { // 指向的字符不一样，还不能死刑 
            // 转为判断删掉一个字符后，是否回文
            return isPali(s, l + 1, r) || isPali(s, l, r - 1);
        }
        l++;
        r--;
    }
    return true;
};

function isPali(str, l, r) { // 判断str是否回文
    while (l < r) {
        if (str[l] !== str[r]) {  // 指向的字符不一样，不是回文串
            return false;
        }
        l++; // 指针相互逼近
        r--;
    }
    return true; // 始终没有不一样，返回true
}
// @lc code=end

