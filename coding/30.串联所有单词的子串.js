/*
 * @lc app=leetcode.cn id=30 lang=javascript
 *
 * [30] 串联所有单词的子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
难度：Hard

相关话题：`哈希表`、`双指针`、`字符串`

给定一个字符串**s** 和一些长度相同的单词**words。** 找出 **s** 中恰好可以由**words** 中所有单词串联形成的子串的起始位置。

注意子串要与**words** 中的单词完全匹配，中间不能有其他字符，但不需要考虑**words** 中单词串联的顺序。

```
输入：
  s = "barfoothefoobarman",
words =["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
```

```
输入：
  s = "wordgoodgoodgoodbestword",
words =["word","good","best","word"]
**输出：** []
```

两种思路，

一：因为题目提示了`words`内的长度都相等，因此，我们先用2个`hash`分别保存`words`内部单词的重复数量和每个单词的首字母，
并且去除单词的长度`eachLen`和所有单词总长度`allLen`。

遍历`s`，一旦发现存在匹配首字母，我们可以根据`eachLen`来判断当前单词是否存在`words`中，如果存在，记录它的次数，
一旦发现它的次数>原`words`中次数，相当于失败。

如果当遍历了`allLen`的长度后，说明成功，记录这时候的`索引`。

var findSubstring = function(s, words) {
  let hash={},head={}
  let eachLen=0,allLen=0
  for(let w of words){
    eachLen=w.length
    allLen+=w.length
    head[w[0]]=true
    if(hash[w]==null)hash[w]=1
    else hash[w]++
  }
  let res=[]
  for(let i=0;i<=s.length-allLen;i++){
    let used={}
    for(let j=i;j<allLen+i;j+=eachLen){
      if(!head[s[j]])break
      let checkWord=s.substring(j,j+eachLen)
      if(!hash[checkWord])break
      if(!used[checkWord])used[checkWord]=1
      else used[checkWord]++
      if(used[checkWord]>hash[checkWord])break
      if(j===allLen+i-eachLen)res.push(i)
    }
  }
  return res
};

二：不需要管`words`内的长度是否相等，我们使用简化的`tire`记录`words`内的所有字母，当到一个单词的最后一个字母时，
使用一个`idx`属性保存这个单词在`words`内的索引，同时也用一个`hash`保存`words·内部单词的重复数量。

遍历`s`，不断判断每一个字母是否符合`tire`，如果发现存在`tire.idx`说明一个单词判断到最尾部，这时，记录一下这个单词的使用次数，
如果发现使用次数>原`words`内的次数，失败。

如果当遍历了`allLen`的长度后，说明成功，记录这时候的`索引`。


 (152 ms)
 */
var findSubstring = function(s, words) {
 let hash={}
 let acode="a".charCodeAt(0)
 for(let w of words){
   if(hash[w]==null)hash[w]=1
   else hash[w]++
 }
 let tire={},len=0
 for(let i=0;i<words.length;i++){
   let t=tire
   len+=words[i].length
   for(let j=0;j<words[i].length;j++){
     let code=words[i].charCodeAt(j)-acode
     if(!t[code])t[code]={}
     t=t[code]
     if(j===words[i].length-1)t.idx=i
   }
 }
 
 let res=[]

 for(let i=0;i<=s.length-len;i++){
   let t=tire
   let used={}
   for(let j=i;j<i+len;j++){
     let code=s.charCodeAt(j)-acode
     t=t[code]
     if(!t)break
     if(t.idx!=null){
       let curWord=words[t.idx]
       if(!used[curWord])used[curWord]=1
       else used[curWord]++
       if(used[curWord]>hash[curWord]) break
       t=tire
     }      
     if(j===i+len-1) res.push(i)
   }
 }
 return res
};
// @lc code=end

