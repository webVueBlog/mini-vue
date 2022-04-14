1. promise是具有then行为符合本规范的方法或函数
2. thenable是定义then方法的对象或函数
3. value是任何合法的js值(undefined, thenable, promise)
4. 异常是使用throw语句抛出的值
5. reason是一个值，表示一个承诺被拒绝的原因

npm init -y
npm i promises-aplus-tests -D

adapter适配器

```js
var promisesAplusTests = require('promises-aplus-tests');
promisesAplusTests(adapter, function(err) {});

promisesAplusTests(adapter, {reporter: 'dot'}, function(err) {
	
})
```

```js
./node_modules/.bin/promises-aplus-tests src/promise.js
```

<!-- 872 passing (49s)

测试用例调用失败 null -->