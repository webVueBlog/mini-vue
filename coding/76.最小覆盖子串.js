/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
时间复杂度：O（M + N) m 就是t的长度， n 就是s长度
空间复杂度：新建了一个字典，最坏的情况就是t的长度, O(k) k就是t里面不同字符的个数

// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"

// 输入：s = "a", t = "a"
// 输出："a"

// 输入: s = "a", t = "aa"
// 输出: ""

(80 ms)

// 题解
// 找出所有子串
// 找出最短子串

// 双指针维护一个滑动窗口

 */
// (104 ms)
var minWindow = function(s, t) {
 // 定义左右指针或者叫做快慢指针,起始都是从零开始的
 let l = 0;
 let r = 0;

 // 创建一个集合用来存储t,键为item, 值为item出现的次数
 let map = new Map();
 for(let item of t) {
     map.set(item, map.get(item) ? map.get(item) + 1 : 1)
 }

 let mapType = map.size;
 let res = '';
 // 遍历S
 while(r < s.length) {
     const c = s[r];

     // 如果包含当前值，就更新map
     if(map.has(c)) {
         map.set(c, map.get(c) - 1);

         // 什么时候停止呢？当map的value 小于等于0时，这里我们不用再去遍历
         if(map.get(c) === 0) {
             mapType -= 1
         }
     }

     // 左指针怎么移动,
     // 左指针什么时候移动呢？就是当我们找到在S中找到了所有t,也就是mapType === 0的时候
     while(mapType === 0) {

         const newRes = s.substring(l, r+1);
         if(!res || newRes.length < res.length) {
             res = newRes
         }
         // 获取左指针当前值
         const c2 = s[l];

         // 如果左指针存在于map中，给value + 1
         if(map.has(c2)) {
             map.set(c2, map.get(c2) + 1);

             if(map.get(c2) === 1) {
                 mapType += 1
             }
         }

         l += 1
     }


     r += 1;
 }
 return res
};

// var minWindow = function (s, t) {
// 	// `right` is -1 since every loop, we start by expanding the right boundary
// 	// setting this to -1 ensures that we will check the first char on the first time
//     let min = "", left = 0, right = -1;
//     let map = {};
	
// 	// this creates a map for the characters we need to include in the substring
// 	// we store the character and its count since it can be repeated
// 	// for example: "BAAC"
//     t.split('').forEach(element => {
//         if (map[element]==null) map[element] = 1;
//         else map[element] = map[element] + 1;
//     });
	
// 	// sets how many different characters we still have
// 	// for example: given the input "BAAC", we still have 3 different characters need to check
//     let count = Object.keys(map).length;

//     while (right <= s.length) {
// 		// found a valid substring
//         if (count == 0) {
		
// 			// try to shift left boudary to the right, this means the very left character will be removed
// 			// because of this, we need to check whats the affect by removing that character, 
//             let current = s[left];
			
// 			// if this chacter is in our map, it means we ll need to find another one in the future
//             if (map[current] != null) map[current]++;
			
// 			// * we must have the condition `>0` because for case like "BBBA...", count for B could be negative
//             if (map[current] > 0) count++;    
			
//             let temp = s.substring(left, right+1)
//             if (min == "") min = temp;
//             else min = min.length<temp.length?min:temp;
			
//             left++;
//         } else {
//             right++;
//             let current = s[right];
			
// 			// decrease the count for this character
//             if (map[current] != null) map[current]--;
			
//             if (map[current] == 0) count--;
//         }
//     }
//     return min;
// }
// @lc code=end

