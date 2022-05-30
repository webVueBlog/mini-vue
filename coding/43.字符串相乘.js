/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
     1 2 3
     4 5 6 i
  --------
     7 3 8
   6 1 5 0
 4 9 2 0 0
-----------
 5 7 0 8 8

 进位: 1

 123 * 456 =>
 (123*4 2个0) + （123*5 1个0）+（123*6 0个0）
 num1 = "2", num2 = "3"
 "6"
 从右到左，对每一对数字进行乘法运算，然后相加。让我们画出过程!从以下草案中，我们可以立即得出结论:

Num1 [i] * num2[j]将被放置在索引[i + j, i + j + 1]
(68 ms)
 */
var multiply = function(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0'
    const m = num1.length,
        n = num2.length,
        res = new Array(m + n).fill(0)

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const p1 = i + j,
                p2 = i + j + 1
            let sum = res[p2] + Number(num1[i]) * Number(num2[j])
            res[p2] = sum % 10
            res[p1] += Math.floor(sum / 10)
        }
    }
    if (res[0] === 0) res.shift()
    return res.join('')
};

// var multiply = function(num1, num2) {
//     let len2 = num2.length;
//     let sum = [];
//     for (let i = len2 - 1; i >= 0; i--) {
//         let fill = len2 - i - 1;
//         let product = multi(num1, num2[i], fill);
//         sum.push(product);
//     }
//     let result = sum.reduce((prev, next) => {
//         return addStrings(prev, next)
//     });
//     while (result.length > 1 && result[0] === '0') {
//         result = result.slice(1);
//     }
//     return result;
// };

function multi(n1, n2, fill) {
    fill = fill >= 0 ? fill : 0;
    let carry = 0;
    let result = '';
    let i = n1.length - 1;
    while (i >= 0) {
        let curr = n1[i];
        let product = Number(curr) * Number(n2) + carry;
        if (product >= 10) {
            let strPro = String(product);
            carry = strPro[0] * 1;
            result = strPro[1] + result;
        } else {
            carry = 0;
            result = product + result;
        }
        i--;
    }
    if (carry !== 0) {
        result = carry + result;
    }
    return result + '0'.repeat(fill);
}

var addStrings = function(num1, num2) {
    let len1 = num1.length;
    let len2 = num2.length;
    let i = len1 - 1;
    let j = len2 - 1;
    let carry = 0; // 进位
    let ans = '';
    while (i >= 0 || j >= 0) {
        let curr1 = i < 0 ? 0 : num1[i] * 1;
        let curr2 = j < 0 ? 0 : num2[j] * 1;
        let { result, nextCarry } = add(curr1, curr2, carry);
        carry = nextCarry;
        ans = result + ans;
        i--;
        j--;
    }
    if (carry !== 0) {
        ans = carry + ans
    }
    return ans;

};

function add(n1, n2, lastCarry) {
    let nextCarry = 0;
    let result = 0;
    let sum = n1 + n2 + lastCarry;
    if (sum >= 10) {
        let strSum = String(sum)
        result = strSum.slice(1) * 1
        nextCarry = strSum.slice(0, 1) * 1
    } else {
        result = sum
    }
    return {
        result,
        nextCarry
    }
}
// @lc code=end