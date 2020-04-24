/*
 * @Author: your name
 * @Date: 2020-03-26 14:57:23
 * @LastEditTime: 2020-03-26 16:21:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\handleRequest.js
 */
const { merge, forEach } = require("./helper");
const xhrAdapter = require("./xhrAdapter");

module.exports = function handleRequest(config) {
	config.headers = config.headers || {};
	// config.data = transformData(
	// 	config.data,
	// 	config.headers,
	// 	config.transformRequest
	// );
	//合并配置
	config.headers = merge(
		config.headers.common || {},
		config.headers[config.method] || {},
		config.headers || {}
	);

	//删除headers中的method属性
	forEach(["post", "delete", "get", "head", "put", "patch", "common"], function(
		method
	) {
		delete config.headers[method];
	});

	return xhrAdapter(config).then(
		response => {
			return response;
		},
		reason => {
			return Promise.reject(reason);
		}
	);
};
