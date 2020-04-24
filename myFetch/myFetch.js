/*
 * @Author: your name
 * @Date: 2020-03-19 17:28:18
 * @LastEditTime: 2020-03-23 19:07:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\myFetch\myFetch.js
 */
(function(self) {
	"use strict";
	/* 如果自身有fetch就直接返回 */
	if (self.fetch) {
		// return;
	}

	const support = {
		//support对象记录是否支持
		iterable: "Symbol" in self && "iterator" in Symbol,
		blob: "FileReader" in self && "Blob" in self,
		formData: "FormData" in self, //FormData
		arrayBuffer: "ArrayBuffer" in self, //二进制存储
		searchParams: "URLSearchParams" in self //queryString处理函数
	};
	const methodArray = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

	/* 设置遍历属性 */
	function setIterator(items) {
		if (support.iterable && items[Symbol.iterator]) {
			//自身支持遍历则返回
			return items[Symbol.iterator];
		} //否则构造遍历器，添加next方法支持访问
		let iterator = {
			next: () => {
				let value = items.shift();
				return {
					value: value,
					done: value === undefined //判断遍历是否结束
				};
			}
		};
		return iterator;
	}

	/* 检查规范类函数 */
	function normalizeValue(value) {
		//将header的value转为字符串
		if (typeof value !== "string") {
			value = String(value);
		}
		return value;
	}
	function normalizeName(name) {
		//将header的name转为小写
		if (typeof name !== "string") {
			name = String(name);
		}
		// if (/[^0-9a-z^\-#$%&'*+.`|~]/i.test(name)) {
		if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
			//检查name开头字符
			throw new TypeError("invalid header name!");
		}
		return name.toLowerCase();
	}
	function normalizeMethod(method) {
		let temp = method.toUpperCase(); //方法名改成大写
		return methodArray.includes(temp) ? temp : method; //判断数组里是否含有
	}

	function isUsed(body) {
		//保证body只读一次
		if (body.bodyUsed) {
			return Promise.reject(new TypeError("used before!"));
		}
		body.bodyUsed = true;
	}

	function isDataView(obj) {
		//该函数用于判断一个对象是不是DataView类型, Dataview用来读写ArrayBuffer
		return obj && DataView.prototype.isPrototypeOf(obj);
		// return obj && Object.prototype.isPrototypeOf.call(DataView, obj);
	}
	function fileReaderReady(reader) {
		//判断FilReader是否读取完，返回的是一个实例化的promise
		return new Promise((resolve, reject) => {
			reader.onload = () => resolve(reader.result);
			reader.onerror = () => reject(reader.error);
		});
	}
	function readBlobAsArrayBuffer(blob) {
		//读取blob为ArrayBuffer对象
		let reader = new FileReader(); //实例化一个FileReader对象，传给fileReaderReady
		let readPromise = fileReaderReady(reader);
		reader.readAsArrayBuffer(blob);
		return readPromise;
	}
	function readBlobAsText(blob) {
		//读取blob为文本
		let reader = new FileReader();
		reader.readAsText(blob);
		let readPromise = fileReaderReady(reader);
		return readPromise;
	}
	function readArrayBufferAsText(buffer) {
		//读取ArrayBuffer为文本
		let view = new Uint8Array(buffer); //将读取文件的二进制数按照无符号8位整型编码
		let chars = [...view];
		for (let i = 0; i < view.length; i++) {
			chars[i] = String.fromCharCode(view[i]); //通过fromCharCode转换为字符
		}
		return chars.join(""); //返回字符连接成的字符串
	}
	function cloneBuffer(buffer) {
		//返回将传入的buffer的拷贝值
		if (buffer.slice) {
			//如果可以slice
			return buffer.slice(0);
		} //否则手动创建后复制
		let view = new Uint8Array(buffer.byteLength);
		view.set(new Uint8Array(buffer));
		return view.buffer;
	}

	class Headers {
		constructor(headers) {
			this.map = {}; //保存headers的对象
			if (headers instanceof Headers) {
				//若为Headers的实例
				headers.forEach(function(value, name) {
					//直接添加键值
					this.append(name, value); //这里直接调用append方法
				}, this);
			} else if (headers instanceof Array) {
				//若为数组，上方检测了isArray
				headers.forEach(function(header) {
					this.append(header[0], header[1]);
				}, this);
			} else if (headers) {
				/* 一开始漏了elseif里的headers，导致headers为空时因无法将其转为对象而报错 */
				//若为对象
				Object.getOwnPropertyNames(headers).forEach(function(name) {
					this.append(name, headers[name]);
				}, this);
			}
		}

		append(name, value) {
			name = normalizeName(name);
			value = normalizeValue(value);
			let temp = this.map[name]; //检测该键名原来是否有值
			this.map[name] = temp ? temp + "," + value : value; //若有则用逗号分隔多个值
		}
		["delete"](name) {
			//delete关键字这里得用方括号表示法
			name = normalizeName(name);
			delete this.map[name];
		}
		has(name) {
			// name = normalizeName(name);
			// return Object.hasOwnProperty.call(this.map, name);
			return this.map.hasOwnProperty(normalizeName(name));
		} //eslint建议用Object.hasOwnProperty代替直接has...
		set(name, value) {
			//这里会覆盖原有的值，不会追加
			this.map[normalizeName(name)] = normalizeValue(value);
		}
		get(name) {
			name = normalizeName(name);
			return this.has[name] ? this.map[name] : null;
		}
		forEach(callback, thisValue) {
			//把数组的forEach方法实现在对象上
			for (let name in this.map) {
				if (Object.hasOwnProperty.call(this.map, name)) {
					//如果包含属性则调用
					callback.call(thisValue, this.map[name], name, this);
				}
			}
		}
		/* keys, values, entries 均返回iterator */
		keys() {
			//返回结果是iterable对象
			let items = [];
			this.forEach((value, name) => {
				items.push(name);
			});
			return setIterator(items);
		}
		values() {
			//返回结果是iterable对象
			let items = [];
			this.forEach(value => {
				items.push(value);
			});
			return setIterator(items);
		}
		entries() {
			//返回结果是iterable对象，获得二维数组[[key, value]...]
			let items = [];
			this.forEach((value, name) => {
				items.push([name, value]);
			});
			return setIterator(items);
		}
	}
	if (support.iterable) {
		//如果支持遍历，则将默认的迭代器接口设置为原型上的entries
		Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	}

	function parseHeaders(previousHeaders) {
		/* 该方法将原始的HTTP报文头部转换为Headers的实例
			因为HTTP通过utf-8明文传输，所以浏览器收到的报文是一段原始字符串
			这里是在xhr的getAllResponseHeaders方法里获得的		
		*/
		let headers = new Headers(); //先实例化一个Headers
		//对换行符\r\n或者\n进行判断替换
		previousHeaders
			.replace(/\r?\n[\t ]+/g, " ")
			.split(/\r?\n/) //得到每行
			.forEach(line => {
				let splitedLine = line.split(":"); //分离键值
				let key = splitedLine.shift().trim();
				if (key) {
					let value = splitedLine.join(":").trim();
					headers.append(key, value);
				}
			});
		console.log("parseheaders___________________");
		console.log(headers);
		console.log("___________________");
		return headers;
	}

	//Request和Response对象继承Body获得其方法
	class Body {
		constructor() {
			this.bodyUsed = false;
			//这段判断支持类型真心不太会，还得再看看qwq
			/* 关于_initBody方法，Request和Response中将options.body传入_initBody里（用户传入的options.body)
				支持的body格式有undefined, String, Blob, FormData, URLEncode, DataView, ArrayBuffer, Object
				如果没有content-type，最后再根据body类型在headers里设置对应content-type字段
			*/
			// eslint-disable-next-line complexity
			this._initBody = function(body) {
				this._bodyInit = body; //这里先保留原先传入的body
				//判断body的数据类型
				if (!body) {
					this._bodyText = ""; //设置为空
				} else if (typeof body === "string") {
					//字符串类型
					this._bodyText = body;
				} else if (
					support.blob &&
					Blob.prototype.isPrototypeOf(body)
					// Object.prototype.isPrototypeOf.call(Blob, body)
				) {
					//blob类型
					this._bodyBlob = body;
				} else if (
					support.formData &&
					Object.prototype.isPrototypeOf.call(FormData, body)
				) {
					//FormData类型
					this._bodyFormData = body;
				} else if (
					support.searchParams &&
					Object.prototype.isPrototypeOf.call(URLSearchParams, body)
				) {
					this._bodyText = body.toString(); //数据的格式类似于 a=1&b=2&c=3
				} else if (support.arrayBuffer && support.blob && isDataView(body)) {
					//ArrayBuffer一般是通过DataView或者各种Float32Array,Uint8Array来操作
					this._bodyArrayBuffer = cloneBuffer(body.buffer); //复制了ArrayBuffer
					this._bodyInit = new Blob([this._bodyArrayBuffer]); //重新设置了_bodyInit
				} else if (
					support.arrayBuffer &&
					Object.prototype.isPrototypeOf.call(ArrayBuffer, body)
				) {
					this._bodyArrayBuffer = cloneBuffer(body);
				} else {
					throw new Error("unsupported BodyInit type");
				}
				console.log("setbody:" + body);
				//这里设置content-type
				if (!this.headers.get("content-type")) {
					if (typeof body === "string") {
						//若为字符串类型
						this.headers.set("content-type", "text/plain;charset=UTF-8");
					} else if (this._bodyBlob && this._bodyBlob.type) {
						//blob且有type属性
						this.headers.set("content-type", this._bodyBlob.type);
					} else if (
						//支持URLSearchParams
						support.searchParams &&
						Object.prototype.isPrototypeOf.call(URLSearchParams, body)
					) {
						this.headers.set(
							"content-type",
							"application/x-www-form-urlencoded;charset=UTF-8"
						);
					}
				}
			};
		}

		//用在Response上，reponse实例返回promise的值后在下一个then的回调中获得数据
		text() {
			let isRejected = isUsed(this);
			if (isRejected) {
				return isRejected; //返回promise
			}
			if (this._bodyBlob) {
				console.log("111111111111");
				return readBlobAsText(this._bodyBlob);
			} else if (this._bodyArrayBuffer) {
				console.log("222222222222");
				return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
			}
			console.log("333333333333333");
			return Promise.resolve(this._bodyText);
		}
		json() {
			//竟然忘了（）服了服了
			return this.text().then(JSON.parse); //建立在text方法基础上，返回promise，传入json
		}
	}

	/* Response和Request继承了Body对象 */
	class Request extends Body {
		// eslint-disable-next-line complexity
		constructor(input, options) {
			super();
			options = options || {};
			let body = options.body;
			if (input instanceof Request) {
				//若已经是Request的实例
				if (input.bodyUsed) {
					//判断是否读过
					throw new TypeError("used before!");
				}
				this.url = input.url;
				this.credentials = input.credentials;
				if (!options.headers) {
					//设置headers
					this.headers = new Headers(input.headers);
				}
			} else {
				//如果input不是Request实例，就只能是String
				this.url = String(input);
			}
			this.credentials = options.credentials || this.credentials || "omit";
			this.method = normalizeMethod(options.method || this.method || "GET");

			/* 一开始漏了这种情况，导致单独传url的时候headers总是undefined报错 */
			if (options.headers || !this.headers) {
				this.headers = new Headers(options.headers);
			}
			if ((this.method === "GET" || this.method === "HEAD") && body) {
				//fetch不允许method为GET或POST的报文里带有主体body
				throw new TypeError("No GET or HEAD requests for Body!");
			}
			console.log("before_initbody: " + body);
			this._initBody(body); //将options.body里的主体信息给加到Request实例上去
		}

		clone() {
			//clone方法返回新的Request实例
			return new Request(this, { body: this._bodyInit });
		}
	}
	class Response extends Body {
		constructor(bodyInit, options) {
			super();
			options = options || {};

			this.status = options.status === undefined ? 200 : options.status;
			this.ok = this.status >= 200 && this.status < 300;
			this.statusText = "statusText" in options ? options.statusText : "OK";
			this.headers = new Headers(options.headers);
			this.url = options.url || "";
			this._initBody(bodyInit); //解析并且设置content-type
		}

		clone() {
			return new Response(this._bodyInit, {
				status: this.status,
				statusText: this.statusText,
				headers: new Headers(this.headers),
				url: this.url
			});
		}
	}

	/* 主体 */
	self.Headers = Headers;
	self.Request = Request;
	self.Response = Response;
	self.myFetch = function(input, init) {
		return new Promise(function(resolve, reject) {
			//返回一个promise
			let request = new Request(input, init); //初始化Request对象
			let xhr = new XMLHttpRequest(); //初始化xhr对象

			xhr.onload = function() {
				//请求成功
				let options = {
					status: xhr.status,
					statusText: xhr.statusText,
					headers: parseHeaders(xhr.getAllResponseHeaders() || "")
				};
				let body = "response" in xhr ? xhr.response : xhr.responseText;
				options.url =
					"responseURL" in xhr
						? xhr.responseURL
						: options.headers.get("X-Request-URL");

				resolve(new Response(body, options)); //resolve进入下一阶段并传入Response对象
			};

			xhr.onerror = () => reject(new TypeError("request error!")); //请求错误
			xhr.ontimeout = () => reject(new TypeError("request timeout!")); //请求超时

			xhr.open(request.method, request.url, true); //打开xhr连接

			if (request.credentials === "include") {
				//设置xhr的withCredientials表示跨域请求时是否需要使用凭证
				xhr.withCredentials = true;
			} else if (request.credentials === "omit") {
				xhr.withCredentials = false;
			}
			if ("responseType" in xhr && support.blob) {
				//设置xhr的responseType为blob
				xhr.responseType = "blob";
			}
			request.headers.forEach((value, name) => {
				//设置Header
				xhr.setRequestHeader(name, value);
			});

			xhr.send(request._bodyInit); //发送请求
		});
	};
	self.fetch.polyfill = true; //标记为polyfill
})(typeof self !== "undefined" ? self : this);
//源码里不用window, 使其能够在web worker, service worker里使用
// myFetch("https://api.myjson.com/bins/qrhbs")
// 	.then(res => {
// 		return res.text();
// 	})
// 	.then(data => {
// 		console.log(data);
// 	});
myFetch("https://api.myjson.com/bins/qrhbs")
	.then(res => {
		return res.json();
	})
	.then(data => {
		console.log(data);
	});
