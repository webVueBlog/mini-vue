/*
 * @lc app=leetcode.cn id=1268 lang=javascript
 *
 * [1268] 搜索推荐系统
 */

// @lc code=start
/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
 var suggestedProducts = function(products, searchWord) {
  products.sort();
  const ans = [];
  let left = 0;
  let right = products.length - 1;
  
  for (let i = 0; i < searchWord.length; i++) {
      const char = searchWord.charAt(i);
      const tmp = [];
      
      while (products[left]?.charAt(i) < char) left++;
      while (products[right]?.charAt(i) > char) right--;
      for (let j = 0; j < 3 && left + j <= right; j++) 
          tmp.push(products[left + j]);

      ans.push(tmp);
  }
  
  return ans;
};
// @lc code=end

