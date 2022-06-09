/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
这是标准的二分搜索解决方案，但关键是在JS中你需要使用Math。这让我有点措手不及。否则你会得到一个中间浮动，这会导致错误的答案。


[true, true, false, false, false]
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let l = 0, r = n, firstBad;
        while(l <= r) {
            let mid = (l + r) >>> 1;
            if(isBadVersion(mid)) {
                // 坏的
                firstBad = mid;
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return firstBad
    };
};


// var solution = function(isBadVersion) {
//     /**
//      * @param {integer} n Total versions
//      * @return {integer} The first bad version
//      */
//     return function(n) {
//         // binary search
//        var start = 1, end = n;
//        while(start < end){
//            var mid = Math.floor(start + (end-start) / 2);
//            if(isBadVersion(mid)){
//                 end = mid; // look on left side of mid
//            }else{
//                start = mid+1; // look on the right side of mid
//            }
//        }
//        return start;
//     };
// };

// @lc code=end

