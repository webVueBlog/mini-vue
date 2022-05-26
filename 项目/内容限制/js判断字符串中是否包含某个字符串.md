## 方法一: indexOf()

var str = '123';
console.lot(str.indexOf('3') != -1); // true

indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

Array.prototype.indexOf()

String.prototype.indexOf()

indexOf() 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。

## 方法二: search()

String.prototype.search()

search() 方法执行正则表达式和 String 对象之间的一个搜索匹配。

var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re)); // returns 4, which is the index of the first capital letter "J"
console.log(str.search(re2)); // returns -1 cannot find '.' dot punctuation

## 方法三:match()

String.prototype.match()

match() 方法检索返回一个字符串匹配正则表达式的结果。

match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。

const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]

var str = '123';
var reg = RegExp(/3/);
if(str.match(reg)) {}

## 方法四:test()

RegExp.prototype.test()

test() 方法用于检索字符串中指定的值。返回 true 或 false。

test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。

const str = 'table football';

const regex = new RegExp('foo*');
const globalRegex = new RegExp('foo*', 'g');

console.log(regex.test(str));
// expected output: true

console.log(globalRegex.lastIndex);
// expected output: 0

console.log(globalRegex.test(str));
// expected output: true

console.log(globalRegex.lastIndex);
// expected output: 9

console.log(globalRegex.test(str));
// expected output: false

## 方法五:exec()

RegExp.prototype.exec()

exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。



