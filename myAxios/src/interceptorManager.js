/*
 * @Author: your name
 * @Date: 2020-03-26 00:26:06
 * @LastEditTime: 2020-03-28 00:12:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\interceptorManager.js
 */
const helper = require("./helper.js");

class interceptorManager {
	constructor() {
		//该数组存放对象，每个对象属性是两个函数
		this.handlerArray = [];
	}

	use(fulfilled, rejected) {
		//用来传入成功和失败调用的函数
		this.handlerArray.push({
			fulfilled,
			rejected
		});
		return this.handlerArray.length - 1;
		//返回数组中位置，便于eject删除
	}
	eject(id) {
		//eject删除拦截
		if (this.handlerArray[id]) {
			//删除后不改变后续成员位置，因此可以直接继续删除其他拦截器
			this.handlerArray[id] = null;
		}
	}
	forEach(func) {
		//重写拦截器的forEach方法
		helper.forEach(this.handlerArray, handler => {
			if (handler !== null) {
				//数组中被清楚的为null，位置不变
				func(handler);
			}
		});
	}
}

module.exports = interceptorManager;
