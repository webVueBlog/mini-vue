## Axios 请求拦截器

请求拦截 -> 请求 -> 响应拦截

role: user

role: manager

```js
// InterceptorManager.js
"use strict";
var utils = require('./../utils');

function InterceptorManager() {
	this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
	this.handlers.push({
		fulfilled: fulfilled,
		rejected: rejected,
		synchronous: options ? options.synchronous : false,
		runWhen: options ? options.runWhen : null
	});
	return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function eject(id) {
	if(this.handlers[id]) {
		this.handlers[id] = null;
	}
}

InterceptorManager.prototype.forEach = function forEach(fn) {
	utils.forEach(this.handlers, function forEachMandler(h) {
		if(h != null) {
			fn(h);
		}
	});
};

module.exports = InterceptorManager;
```


```js
import axios from 'axios';

axios.interceptors.request.use((config) => {
	config.headers['role'] = 'user';
	return config;
}, (err) => {
	return err;
}

// 订单
axios.interceptors.request.use((config) => {
	config.headers['role'] = 'manager';
	return config;
}, (err) => {
	return err;
})
```

```js
axios({
	
})
aixos.request

axios.interceptors.request.use((config) => {
	config.handers['role'] = config.headers['role'] + ',user';
	// role: manager,user
	return config;
}, (err) => {
	return err;
})
```

chain 链

