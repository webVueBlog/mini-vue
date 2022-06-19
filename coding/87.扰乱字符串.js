/*
 * @lc app=leetcode.cn id=87 lang=javascript
 *
 * [87] 扰乱字符串
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
思路：

对`s1`遍历，将`s1`和`s2`分割为`[0,i]`，`[i,length]`；

如果`s1[0,i]`与`s2[0,i]`不是相同字母(相同字母指字母相同但顺序不一定相同)，并且`s1[0,i]`与`s2[length-i,length]`也不是相同字母，那么当前分割就是无效的。
继续遍历`i`，直到找出有效分割点。

注意，因此对于每一次分割点，只需要检查头和尾；

例如`great`，

第一次分割有以下情况：

`g`，`reat`，交换后，`reat`，`g`

`gr`，`eat`，交换后，`eat`，`gr`

`gre`，`at`，交换后，`at`，`gre`

`grea`，`t`，交换后，`t`，`grea`

可以发现，交换前，左侧在左，右侧在右；交换后，左侧在右，右侧在左。

 */
const _isScramble = function (s1, s2, trackMap) {    
    if (s1.length !== s2.length) return false;
    if (s1 === s2) return true;
    if (s1.length === 0 || s2.length === 0) return true;
    const trackKey = s1 + s2;
    if (trackKey in trackMap) return !!trackMap[trackKey];

    let result = false;
    let xorFW = 0;
    let xorBW = 0;

    for (var i = 0, j = s1.length - 1, iPlus = 1; i < s1.length - 1; i++, j--, iPlus++) {
        xorFW ^= s1.charCodeAt(i) ^ s2.charCodeAt(i);
        xorBW ^= s1.charCodeAt(i) ^ s2.charCodeAt(j);

        if (xorFW === 0 &&
            _isScramble(s1.substring(0, iPlus), s2.substring(0, iPlus), trackMap) &&
            _isScramble(s1.substring(iPlus), s2.substring(iPlus), trackMap)) {
            result = true;
            break;
        }

        if (xorBW === 0 &&
            _isScramble(s1.substring(0, iPlus), s2.substring(s1.length - iPlus), trackMap) &&
            _isScramble(s1.substring(iPlus), s2.substring(0, s1.length - iPlus), trackMap)) {
            result = true;
            break;
        }
    }

    trackMap[trackKey] = result;
    trackMap[s2 + s1] = result;
    return result;
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const isScramble = function (s1, s2) {
    return _isScramble(s1, s2, {});
};
// @lc code=end

