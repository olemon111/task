const helper = require("./helper");
const { bind, forEach, merge, extend } = helper;
const defaults = require("./default");
const interceporManager = require("./interceptorManager");
const handleRequest = require("./handleRequest");

class Axios {
	constructor(instanceConfig) {
		this.defaults = instanceConfig; //注意和defaults区分
		this.interceptors = {
			//拦截器方法
			request: new interceporManager(),
			response: new interceporManager()
		};
	}

	request(config) {
		if (typeof config === "string") {
			//若为这种调用axios("url", {config})
			config = arguments[1] || {};
			config.url = arguments[0];
		} else {
			//直接传入config
			config = config || {};
		}
		//合并配置对象
		config = merge(defaults, { method: "get" }, this.defaults, config);
		config.method = config.method ? config.method.toLowerCase() : "get"; //请求方法转为小写

		let chainArray = [handleRequest, undefined];
		//初始化一个promise且传入config配置对象
		let promise = Promise.resolve(config);

		this.interceptors.request.forEach(interceptor => {
			/* 请求拦截器是先进后出 */
			chainArray.unshift(interceptor.fulfilled, interceptor.rejected);
		});
		this.interceptors.response.forEach(interceptor => {
			/* 响应拦截器是先进先出 */
			chainArray.push(interceptor.fulfilled, interceptor.rejected);
		});

		while (chainArray.length) {
			//遍历数组，每次取出两项，即成功和失败的回调，传给promise.then()
			promise = promise.then(chainArray.shift(), chainArray.shift());
		}

		return promise;
	}

	all(promises) {
		return Promise.all(promises);
	}

	create(instanceConfig) {
		return createInstance(instanceConfig);
	}
}

function createInstance(defaultConfig) {
	/* 该方法拿到一个指向request的函数，且拥有Axios的原型方法和实例属性方法，并保证上下文为实例
	因此支持多种调用方式 */
	//创建一个实例
	let ctx = new Axios(defaultConfig);
	//使instance指向request方法，同时指定上下文ctx
	let instance = bind(Axios.prototype.request, ctx);
	//继承Axios原型方法，ctx指定上下文为该实例
	extend(instance, Axios.prototype, ctx);
	//获得ctx自身属性方法
	// extend(instance, ctx);
	instance.request = ctx.request;
	instance.all = ctx.all;
	instance.interceptors = ctx.interceptors;
	instance.create = instance;

	return instance;
}

/* 添加在原型上添加请求方法的调用
	例如axios.get()...
*/
forEach(["get", "head", "delete", "options"], function(method) {
	Axios.prototype[method] = function(url, config) {
		return this.request(
			merge(config || {}, {
				method,
				url
			})
		);
	};
});
forEach(["post", "put", "patch"], function(method) {
	Axios.prototype[method] = function(url, data, config) {
		return this.request(
			merge(config || {}, {
				method,
				url,
				data //携带data
			})
		);
	};
});

let axios = createInstance(defaults);
axios.Axios = Axios;
// axios.create = function(instanceConfig) {
// 	//支持axios.create()...
// 	// return createInstance(merge(defaults, instanceConfig));
// 	return createInstance(instanceConfig);
// };

// axios.create = function(instanceConfig) {
// 	return this.request(instanceConfig);
// };
// axios.create = function(instanceConfig) {
// 	return createInstance(instanceConfig);
// };

module.exports = axios;
module.exports.default = axios;
