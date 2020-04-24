/*
 * @Author: your name
 * @Date: 2020-03-26 16:17:33
 * @LastEditTime: 2020-03-28 00:07:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\xhrAdapter.js
 */
// const { forEach } = require("./helper");

module.exports = function xhrAdapter(config) {
	return new Promise(function(resolve, reject) {
		let requestData = config.data;

		let request = new XMLHttpRequest(); //创建实例
		request.timeout = config.timeout; //设置超时时间
		request.open(config.method.toUpperCase(), config.url, true);

		request.onreadystatechange = function() {
			if (!request || request.readyState !== 4) {
				return;
			}
			let responseData =
				!config.responseType || config.responseType === "text"
					? request.responseText
					: request.response;
			let response = {
				data: responseData,
				status: request.status,
				statusText: request.statusText,
				config: config,
				request: request
			};
			resolve(response);
			request = null; //清除request
		};
		//错误
		request.onerror = function() {
			reject(new Error("request Error!"));
			//清除request
			request = null;
		};
		//超时
		request.ontimeout = function() {
			reject(new Error("request timeout!"));
			request = null;
		};
		//移除
		request.onabort = function() {
			if (!request) {
				return;
			}
			reject("request Aborted!");
			request = null;
		};

		//设置withCredientials属性
		if (config.withCredientials) {
			request.withCredientials = config.withCredientials;
		}

		// 添加responseType属性
		if (config.responseType) {
			try {
				request.responseType = config.responseType;
			} catch (error) {
				if (config.responseType !== "json") {
					throw error;
				}
			}
		}
		//发送请求
		request.send(requestData);
	});
};
