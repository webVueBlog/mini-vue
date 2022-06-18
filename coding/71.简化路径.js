/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}

难度：Middle

相关话题：`栈`、`字符串`

以 Unix 风格给出一个文件的**绝对路径** ，你需要简化它。或者换句话说，将其转换为规范路径。

在 Unix 风格的文件系统中，一个点（ `.` ）表示当前目录本身；此外，两个点 （ `..` ）表示将目录切换到上一级（指向父目录）；两者都可以是复杂相对路径的组成部分。更多信息请参阅：[Linux / Unix中的绝对路径 vs 相对路径](https://blog.csdn.net/u011327334/article/details/50355600)

请注意，返回的规范路径必须始终以斜杠  `/`  开头，并且两个目录名之间必须只有一个斜杠  `/` 。最后一个目录名（如果存在）**不能** 以  `/`  结尾。此外，规范路径必须是表示绝对路径的**最短** 字符串。

思路：

先以`/`分割`path`。

用`stack`保存当前的路径，遇到`..`，则回退一级`stack.pop()`，如果不是`.`也不是`''`，那么将当前路径名添加到`stack`。

最后再转换为字符串，开头添加`/`后返回结果。



 */
var simplifyPath = function(path) {
 let stack=[]
 let p=path.split('/')
 for(let s of p){
   if(s==='..'){
     if(stack.length>0)stack.pop()
   }else if(s!=='.' && s!==''){
     stack.push(s)
   }
 }
 let result=stack.join('/')
 return '/'+result
};

//  var simplifyPath = function(path) {
//   let stack = [];
//   path = path.split('/');
  
//   for (let i=0;i<path.length;i++) {
//       if (path[i]=='.' || path[i]=='') continue;
//       if (path[i]=='..') stack.pop();
//       else stack.push(path[i]);
//   }
  
//   return '/'+stack.join('/');
// };
// @lc code=end

