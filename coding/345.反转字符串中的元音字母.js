/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
    let arr = s.split('');
    let left = 0, right = arr.length - 1;
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

    while (left < right) {
        if (vowels.includes(arr[left])) {
            if (vowels.includes(arr[right])) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
                left++
            }
            right--
        } else {
            left++
        }
    }

    return arr.join('')
};
// @lc code=end

