/*
 * @Author: your name
 * @Date: 2020-03-25 22:41:08
 * @LastEditTime: 2020-03-28 00:11:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\helper.js
 */
//绑定指向
function bind(func, thisArg) {
	return function wrap() {
		return func.apply(thisArg, [...arguments]);
	};
}
//可遍历对象
function forEach(obj, func) {
	if (obj === null || typeof obj === "undefined") {
		return;
	}
	if (typeof obj !== "object") {
		obj = [obj];
	}
	if (Array.isArray(obj)) {
		for (let i = 0; i < obj.length; i++) {
			func(obj[i], obj);
		}
	} else {
		for (let key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				func(obj[key], key, obj);
			}
		}
	}
}
//合并对象属性
function merge(...arg) {
	let res = {};
	function mergeValue(value, key) {
		//若为对象则递归调用
		if (typeof res[key] === "object" && typeof value === "object") {
			res[key] = merge(res[key], value);
		} else {
			res[key] = value;
		}
	}
	for (let i = 0; i < arg.length; i++) {
		forEach(arg[i], mergeValue);
	}
	return res;
}
//实现继承
function extend(obj1, obj2, thisArg) {
	forEach(obj2, (value, key) => {
		if (typeof value === "function" && thisArg) {
			//若为函数则用bind
			obj1[key] = bind(value, thisArg);
		}
	});
	return obj1;
}

module.exports = {
	bind,
	forEach,
	merge,
	extend
};
