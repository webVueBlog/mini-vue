```js
// get

new Vue({
	el: '#app',
	data() {
		return {
			info: null
		}
	},
	mounted() {
		axios.get('...url')
		.then(response => (this.info = response))
		.catch(function (error) {
			// 请求失败处理
			console.log(error);
		})
	}
})

// 传递参数
// 直接在url 上添加参数 id = 1
axios.get('/user?id=1')
.then(function(response) {
	console.log(response);
})
.catch(function(error) {
	console.log(error);
});

// 也可通过 params 设置参数
axios.get('/user', {
	params: {
		id: 1
	}
})
.then(function (response) {
	console.log(response);
})
.catch(function (error) {
	console.log(error);
});

// post方法

new Vue({
	el: '#app',
	data() {
		return {
			info: null
		}
	},
	mounted() {
		axios.post('xxxurl')
		.then(response => (this.info = response))
		.catch(function (error){
			// 请求失败处理
			console.log(error);
		});
	}
})


axios.post('/user', {
    firstName: 'Fred',        // 参数 firstName
    lastName: 'Flintstone'    // 参数 lastName
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
  
axios(config)
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
//  GET 请求远程图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
axios(url[, config])
// 发送 GET 请求（默认的方法）
axios('/user/12345');

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

并发
处理并发请求的助手函数：

axios.all(iterable)
axios.spread(callback)

创建实例
可以使用自定义配置新建一个 axios 实例：

axios.create([config])
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// - 浏览器专属：FormData, File, Blob
// - Node 专属： Stream

// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
// 如果请求花费了超过 `timeout` 的时间，请求将被中断

// `withCredentials` 表示跨域请求时是否需要使用凭证
// `responseType` 表示服务器响应的数据类型，可以是 "arraybuffer", "blob", "document", "json", "text", "stream"

// `maxContentLength` 定义允许的响应内容的最大尺寸
maxContentLength: 2000,

// "proxy" 定义代理服务器的主机名称和端口
// `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据

拦截器

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
})

// 如果你想在稍后移除拦截器，可以这样：

var myInterceptor = axios.interceptors.request.use(function () {})

// axios.interceptors.request.use
// axios.interceptors.response.use

axios.interceptors.request.eject(myInterceptor);

// 可以为自定义 axios 实例添加拦截器。

var instance = axios.create();
instance.interceptors.request.use(function() {})

// 错误处理
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });


取消
使用 cancel token 取消请求

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/123',{
	cancelToken: source.token
}).catch(function(thrown) {
	if(axios.isCancel(thrown)) {
		console.log('canceled', thrown.message);
	} else {
		// 处理错误
	}
});

// 取消请求
source.cancel('error')


// 还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：

var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();



// 览器

// 在浏览器环境，你可以使用 URLSearchParams API：

const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);

// URLSearchParams 不是所有的浏览器均支持。

// 除此之外，你可以使用 qs 库来编码数据:

const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));

// Or in another way (ES6),

import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```