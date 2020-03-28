/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/axios.js":
/*!**********************!*\
  !*** ./src/axios.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const helper = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\r\nconst { bind, forEach, merge, extend } = helper;\r\nconst defaults = __webpack_require__(/*! ./default */ \"./src/default.js\");\r\nconst interceporManager = __webpack_require__(/*! ./interceptorManager */ \"./src/interceptorManager.js\");\r\nconst handleRequest = __webpack_require__(/*! ./handleRequest */ \"./src/handleRequest.js\");\r\n\r\nclass Axios {\r\n\tconstructor(instanceConfig) {\r\n\t\tthis.defaults = instanceConfig; //注意和defaults区分\r\n\t\tthis.interceptors = {\r\n\t\t\t//拦截器方法\r\n\t\t\trequest: new interceporManager(),\r\n\t\t\tresponse: new interceporManager()\r\n\t\t};\r\n\t}\r\n\r\n\trequest(config) {\r\n\t\tif (typeof config === \"string\") {\r\n\t\t\t//若为这种调用axios(\"url\", {config})\r\n\t\t\tconfig = arguments[1] || {};\r\n\t\t\tconfig.url = arguments[0];\r\n\t\t} else {\r\n\t\t\t//直接传入config\r\n\t\t\tconfig = config || {};\r\n\t\t}\r\n\t\t//合并配置对象\r\n\t\tconfig = merge(defaults, { method: \"get\" }, this.defaults, config);\r\n\t\tconfig.method = config.method ? config.method.toLowerCase() : \"get\"; //请求方法转为小写\r\n\r\n\t\tlet chainArray = [handleRequest, undefined];\r\n\t\t//初始化一个promise且传入config配置对象\r\n\t\tlet promise = Promise.resolve(config);\r\n\r\n\t\tthis.interceptors.request.forEach(interceptor => {\r\n\t\t\t/* 请求拦截器是先进后出 */\r\n\t\t\tchainArray.unshift(interceptor.fulfilled, interceptor.rejected);\r\n\t\t});\r\n\t\tthis.interceptors.response.forEach(interceptor => {\r\n\t\t\t/* 响应拦截器是先进先出 */\r\n\t\t\tchainArray.push(interceptor.fulfilled, interceptor.rejected);\r\n\t\t});\r\n\r\n\t\twhile (chainArray.length) {\r\n\t\t\t//遍历数组，每次取出两项，即成功和失败的回调，传给promise.then()\r\n\t\t\tpromise = promise.then(chainArray.shift(), chainArray.shift());\r\n\t\t}\r\n\r\n\t\treturn promise;\r\n\t}\r\n\r\n\tall(promises) {\r\n\t\treturn Promise.all(promises);\r\n\t}\r\n\r\n\tcreate(instanceConfig) {\r\n\t\treturn createInstance(instanceConfig);\r\n\t}\r\n}\r\n\r\nfunction createInstance(defaultConfig) {\r\n\t/* 该方法拿到一个指向request的函数，且拥有Axios的原型方法和实例属性方法，并保证上下文为实例\r\n\t因此支持多种调用方式 */\r\n\t//创建一个实例\r\n\tlet ctx = new Axios(defaultConfig);\r\n\t//使instance指向request方法，同时指定上下文ctx\r\n\tlet instance = bind(Axios.prototype.request, ctx);\r\n\t//继承Axios原型方法，ctx指定上下文为该实例\r\n\textend(instance, Axios.prototype, ctx);\r\n\t//获得ctx自身属性方法\r\n\t// extend(instance, ctx);\r\n\tinstance.request = ctx.request;\r\n\tinstance.all = ctx.all;\r\n\tinstance.interceptors = ctx.interceptors;\r\n\tinstance.create = instance;\r\n\r\n\treturn instance;\r\n}\r\n\r\n/* 添加在原型上添加请求方法的调用\r\n\t例如axios.get()...\r\n*/\r\nforEach([\"get\", \"head\", \"delete\", \"options\"], function(method) {\r\n\tAxios.prototype[method] = function(url, config) {\r\n\t\treturn this.request(\r\n\t\t\tmerge(config || {}, {\r\n\t\t\t\tmethod,\r\n\t\t\t\turl\r\n\t\t\t})\r\n\t\t);\r\n\t};\r\n});\r\nforEach([\"post\", \"put\", \"patch\"], function(method) {\r\n\tAxios.prototype[method] = function(url, data, config) {\r\n\t\treturn this.request(\r\n\t\t\tmerge(config || {}, {\r\n\t\t\t\tmethod,\r\n\t\t\t\turl,\r\n\t\t\t\tdata //携带data\r\n\t\t\t})\r\n\t\t);\r\n\t};\r\n});\r\n\r\nlet axios = createInstance(defaults);\r\naxios.Axios = Axios;\r\n// axios.create = function(instanceConfig) {\r\n// \t//支持axios.create()...\r\n// \t// return createInstance(merge(defaults, instanceConfig));\r\n// \treturn createInstance(instanceConfig);\r\n// };\r\n\r\n// axios.create = function(instanceConfig) {\r\n// \treturn this.request(instanceConfig);\r\n// };\r\n// axios.create = function(instanceConfig) {\r\n// \treturn createInstance(instanceConfig);\r\n// };\r\n\r\nmodule.exports = axios;\r\nmodule.exports.default = axios;\r\n\n\n//# sourceURL=webpack:///./src/axios.js?");

/***/ }),

/***/ "./src/default.js":
/*!************************!*\
  !*** ./src/default.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n * @Author: your name\r\n * @Date: 2020-03-24 12:24:29\r\n * @LastEditTime: 2020-03-27 00:57:10\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\myAxiose:\\web\\task\\test\\src\\default.js\r\n */\r\nmodule.exports = {\r\n\tmethod: \"get\",\r\n\tbaseURL: \"\",\r\n\theaders: {\r\n\t\t\"Content-Type\": \"text/plain;charset=UTF-8\",\r\n\t\tcommon: {\r\n\t\t\tAccept: \"application/json,text/plain,*/*\",\r\n\t\t\t\"X-Request-By\": \"XMLHttpRequest\"\r\n\t\t}\r\n\t},\r\n\tget: {},\r\n\tpost: {}\r\n};\r\n\n\n//# sourceURL=webpack:///./src/default.js?");

/***/ }),

/***/ "./src/handleRequest.js":
/*!******************************!*\
  !*** ./src/handleRequest.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\r\n * @Author: your name\r\n * @Date: 2020-03-26 14:57:23\r\n * @LastEditTime: 2020-03-26 16:21:08\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\test\\src\\handleRequest.js\r\n */\r\nconst { merge, forEach } = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\r\nconst xhrAdapter = __webpack_require__(/*! ./xhrAdapter */ \"./src/xhrAdapter.js\");\r\n\r\nmodule.exports = function handleRequest(config) {\r\n\tconfig.headers = config.headers || {};\r\n\t// config.data = transformData(\r\n\t// \tconfig.data,\r\n\t// \tconfig.headers,\r\n\t// \tconfig.transformRequest\r\n\t// );\r\n\t//合并配置\r\n\tconfig.headers = merge(\r\n\t\tconfig.headers.common || {},\r\n\t\tconfig.headers[config.method] || {},\r\n\t\tconfig.headers || {}\r\n\t);\r\n\r\n\t//删除headers中的method属性\r\n\tforEach([\"post\", \"delete\", \"get\", \"head\", \"put\", \"patch\", \"common\"], function(\r\n\t\tmethod\r\n\t) {\r\n\t\tdelete config.headers[method];\r\n\t});\r\n\r\n\treturn xhrAdapter(config).then(\r\n\t\tresponse => {\r\n\t\t\treturn response;\r\n\t\t},\r\n\t\treason => {\r\n\t\t\treturn Promise.reject(reason);\r\n\t\t}\r\n\t);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/handleRequest.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n * @Author: your name\r\n * @Date: 2020-03-25 22:41:08\r\n * @LastEditTime: 2020-03-28 00:11:43\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\test\\src\\helper.js\r\n */\r\n//绑定指向\r\nfunction bind(func, thisArg) {\r\n\treturn function wrap() {\r\n\t\treturn func.apply(thisArg, [...arguments]);\r\n\t};\r\n}\r\n//可遍历对象\r\nfunction forEach(obj, func) {\r\n\tif (obj === null || typeof obj === \"undefined\") {\r\n\t\treturn;\r\n\t}\r\n\tif (typeof obj !== \"object\") {\r\n\t\tobj = [obj];\r\n\t}\r\n\tif (Array.isArray(obj)) {\r\n\t\tfor (let i = 0; i < obj.length; i++) {\r\n\t\t\tfunc(obj[i], obj);\r\n\t\t}\r\n\t} else {\r\n\t\tfor (let key in obj) {\r\n\t\t\tif (Object.prototype.hasOwnProperty.call(obj, key)) {\r\n\t\t\t\tfunc(obj[key], key, obj);\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n//合并对象属性\r\nfunction merge(...arg) {\r\n\tlet res = {};\r\n\tfunction mergeValue(value, key) {\r\n\t\t//若为对象则递归调用\r\n\t\tif (typeof res[key] === \"object\" && typeof value === \"object\") {\r\n\t\t\tres[key] = merge(res[key], value);\r\n\t\t} else {\r\n\t\t\tres[key] = value;\r\n\t\t}\r\n\t}\r\n\tfor (let i = 0; i < arg.length; i++) {\r\n\t\tforEach(arg[i], mergeValue);\r\n\t}\r\n\treturn res;\r\n}\r\n//实现继承\r\nfunction extend(obj1, obj2, thisArg) {\r\n\tforEach(obj2, (value, key) => {\r\n\t\tif (typeof value === \"function\" && thisArg) {\r\n\t\t\t//若为函数则用bind\r\n\t\t\tobj1[key] = bind(value, thisArg);\r\n\t\t}\r\n\t});\r\n\treturn obj1;\r\n}\r\n\r\nmodule.exports = {\r\n\tbind,\r\n\tforEach,\r\n\tmerge,\r\n\textend\r\n};\r\n\n\n//# sourceURL=webpack:///./src/helper.js?");

/***/ }),

/***/ "./src/interceptorManager.js":
/*!***********************************!*\
  !*** ./src/interceptorManager.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\r\n * @Author: your name\r\n * @Date: 2020-03-26 00:26:06\r\n * @LastEditTime: 2020-03-28 00:12:57\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\test\\src\\interceptorManager.js\r\n */\r\nconst helper = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\r\n\r\nclass interceptorManager {\r\n\tconstructor() {\r\n\t\t//该数组存放对象，每个对象属性是两个函数\r\n\t\tthis.handlerArray = [];\r\n\t}\r\n\r\n\tuse(fulfilled, rejected) {\r\n\t\t//用来传入成功和失败调用的函数\r\n\t\tthis.handlerArray.push({\r\n\t\t\tfulfilled,\r\n\t\t\trejected\r\n\t\t});\r\n\t\treturn this.handlerArray.length - 1;\r\n\t\t//返回数组中位置，便于eject删除\r\n\t}\r\n\teject(id) {\r\n\t\t//eject删除拦截\r\n\t\tif (this.handlerArray[id]) {\r\n\t\t\t//删除后不改变后续成员位置，因此可以直接继续删除其他拦截器\r\n\t\t\tthis.handlerArray[id] = null;\r\n\t\t}\r\n\t}\r\n\tforEach(func) {\r\n\t\t//重写拦截器的forEach方法\r\n\t\thelper.forEach(this.handlerArray, handler => {\r\n\t\t\tif (handler !== null) {\r\n\t\t\t\t//数组中被清楚的为null，位置不变\r\n\t\t\t\tfunc(handler);\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n}\r\n\r\nmodule.exports = interceptorManager;\r\n\n\n//# sourceURL=webpack:///./src/interceptorManager.js?");

/***/ }),

/***/ "./src/test/test.js":
/*!**************************!*\
  !*** ./src/test/test.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\r\n * @Author: your name\r\n * @Date: 2020-03-26 17:06:29\r\n * @LastEditTime: 2020-03-28 14:44:24\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\test\\src\\test.js\r\n */\r\nconst axios = __webpack_require__(/*! ../axios */ \"./src/axios.js\");\r\n\r\n// //axios({url,...})\r\n// axios({\r\n// \turl: \"https://api.myjson.com/bins/qrhbs\",\r\n// \tmethod: \"get\",\r\n// \t\"Content-Type\": \"application/json\"\r\n// })\r\n// \t.then(response => {\r\n// \t\tconsole.log(response);\r\n// \t})\r\n// \t.catch(error => {\r\n// \t\tconsole.log(error);\r\n// \t});\r\n\r\n// //axios(url,{...})\r\n// axios(\"https://api.myjson.com/bins/qrhbs\", {\r\n// \tmethod: \"get\",\r\n// \t\"Content-Type\": \"application/json\"\r\n// })\r\n// \t.then(response => {\r\n// \t\tconsole.log(response);\r\n// \t})\r\n// \t.catch(error => {\r\n// \t\tconsole.log(error);\r\n// \t});\r\n\r\n// // axios.get(url, {...})\r\n// axios\r\n// \t.get(\"https://api.myjson.com/bins/qrhbs\", {\r\n// \t\t\"Content-Type\": \"application/json\",\r\n// \t\twithCredientials: \"true\"\r\n// \t})\r\n// \t.then(response => {\r\n// \t\tconsole.log(response);\r\n// \t})\r\n// \t.catch(error => {\r\n// \t\tconsole.log(error);\r\n// \t});\r\n\r\n//axios.request(url, {...})\r\naxios\r\n\t.request(\"https://api.myjson.com/bins/qrhbs\", {\r\n\t\t\"Content-Type\": \"application/json\",\r\n\t\twithCredientials: \"true\"\r\n\t})\r\n\t.then(response => {\r\n\t\tconsole.log(response);\r\n\t})\r\n\t.catch(error => {\r\n\t\tconsole.log(error);\r\n\t});\r\n\r\n// let newinstance = axios(\"https://api.myjson.com/bins/qrhbs\", {\r\n// \tmethod: \"get\",\r\n// \t\"Content-Type\": \"application/json\"\r\n// });\r\n\r\n// console.dir(newinstance);\r\n\r\n// newinstance.interceptors.request.use(config => {\r\n// \tconsole.log(\"before sending\");\r\n// \treturn config;\r\n// });\r\n// newinstance.interceptors.response.use(\r\n// \tresponse => {\r\n// \t\tconsole.log(\"get response data:\" + response);\r\n// \t},\r\n// \terror => {\r\n// \t\tconsole.log(\"get error in response interceptor!\");\r\n// \t\treturn Promise.reject(error);\r\n// \t}\r\n// );\r\n\r\n// newinstance\r\n// \t.then(response => {\r\n// \t\tconsole.log(response);\r\n// \t})\r\n// \t.catch(error => {\r\n// \t\tconsole.log(error);\r\n// \t});\r\n\n\n//# sourceURL=webpack:///./src/test/test.js?");

/***/ }),

/***/ "./src/xhrAdapter.js":
/*!***************************!*\
  !*** ./src/xhrAdapter.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n * @Author: your name\r\n * @Date: 2020-03-26 16:17:33\r\n * @LastEditTime: 2020-03-28 00:07:48\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\test\\src\\xhrAdapter.js\r\n */\r\n// const { forEach } = require(\"./helper\");\r\n\r\nmodule.exports = function xhrAdapter(config) {\r\n\treturn new Promise(function(resolve, reject) {\r\n\t\tlet requestData = config.data;\r\n\r\n\t\tlet request = new XMLHttpRequest(); //创建实例\r\n\t\trequest.timeout = config.timeout; //设置超时时间\r\n\t\trequest.open(config.method.toUpperCase(), config.url, true);\r\n\r\n\t\trequest.onreadystatechange = function() {\r\n\t\t\tif (!request || request.readyState !== 4) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tlet responseData =\r\n\t\t\t\t!config.responseType || config.responseType === \"text\"\r\n\t\t\t\t\t? request.responseText\r\n\t\t\t\t\t: request.response;\r\n\t\t\tlet response = {\r\n\t\t\t\tdata: responseData,\r\n\t\t\t\tstatus: request.status,\r\n\t\t\t\tstatusText: request.statusText,\r\n\t\t\t\tconfig: config,\r\n\t\t\t\trequest: request\r\n\t\t\t};\r\n\t\t\tresolve(response);\r\n\t\t\trequest = null; //清除request\r\n\t\t};\r\n\t\t//错误\r\n\t\trequest.onerror = function() {\r\n\t\t\treject(new Error(\"request Error!\"));\r\n\t\t\t//清除request\r\n\t\t\trequest = null;\r\n\t\t};\r\n\t\t//超时\r\n\t\trequest.ontimeout = function() {\r\n\t\t\treject(new Error(\"request timeout!\"));\r\n\t\t\trequest = null;\r\n\t\t};\r\n\t\t//移除\r\n\t\trequest.onabort = function() {\r\n\t\t\tif (!request) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\treject(\"request Aborted!\");\r\n\t\t\trequest = null;\r\n\t\t};\r\n\r\n\t\t//设置withCredientials属性\r\n\t\tif (config.withCredientials) {\r\n\t\t\trequest.withCredientials = config.withCredientials;\r\n\t\t}\r\n\r\n\t\t// 添加responseType属性\r\n\t\tif (config.responseType) {\r\n\t\t\ttry {\r\n\t\t\t\trequest.responseType = config.responseType;\r\n\t\t\t} catch (error) {\r\n\t\t\t\tif (config.responseType !== \"json\") {\r\n\t\t\t\t\tthrow error;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t\t//发送请求\r\n\t\trequest.send(requestData);\r\n\t});\r\n};\r\n\n\n//# sourceURL=webpack:///./src/xhrAdapter.js?");

/***/ })

/******/ });