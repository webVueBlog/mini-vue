/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列

难度：Easy

相关话题：`字符串`

报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

```
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

 `1` 被读作 `"one 1"` ( `"一个一"` ) , 即 `11` 。
 `11`  被读作 `"two 1s"` ( `"两个一"` ）, 即 `21` 。
 `21`  被读作 `"one 2"` , " `one 1"` （ `"一个二"` , `"一个一"` ), 即 `1211` 。

 给定一个正整数 *n* （1 &le;*n* &le; 30），输出报数序列的第 *n*  项。

 注意：整数顺序将表示为一个字符串。

```
输入: 1
输出: "1"
```

```
输入: 4
输出: "1211"
```

思路：

按照题意从`i===2`开始，读出`s`，并且更新`s`，直到`i>n`。

这里的`读`，就是对连续数字一个合并，例如`11112`，前面有`4`个`1`连续，因此读为`41`，后面`1`个`2`，读为`12`，连在一起就是`4112`。



 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
//  (68 ms)
 var countAndSay = function(n) {
  let s='1'
  for(let i=2;i<=n;i++){
    let cur=s[0],count=1,news=''
    for(let j=1;j<s.length;j++){
      if(s[j]===s[j-1]){
        count++
      }else{
        news+=count+''+cur
        cur=s[j]
        count=1
      }
    }
    s=news+count+cur
  }
  return s
};

// (88 ms)
// var countAndSay = function(n) {
//  var str = '1';
//  for (var i=1; i < n; i++) {
//      var strArray = str.split('');
//      str ='';
//      var count = 1;
//      // Loop through current nth level line
//      for (var j=0; j < strArray.length; j++) {
//          // Next digit is different
//          if (strArray[j] !== strArray[j+1]) {
//              // Go to next non-matching digit
//              str += count + strArray[j];
//              count = 1;
//          }
//          else {
//              count++;
//          }
//      }
//  }
//  return str;
// };
// @lc code=end

