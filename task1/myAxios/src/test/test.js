/*
 * @Author: your name
 * @Date: 2020-03-26 17:06:29
 * @LastEditTime: 2020-03-28 14:44:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\test.js
 */
const axios = require("../axios");

// //axios({url,...})
// axios({
// 	url: "https://api.myjson.com/bins/qrhbs",
// 	method: "get",
// 	"Content-Type": "application/json"
// })
// 	.then(response => {
// 		console.log(response);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

// //axios(url,{...})
// axios("https://api.myjson.com/bins/qrhbs", {
// 	method: "get",
// 	"Content-Type": "application/json"
// })
// 	.then(response => {
// 		console.log(response);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

// // axios.get(url, {...})
// axios
// 	.get("https://api.myjson.com/bins/qrhbs", {
// 		"Content-Type": "application/json",
// 		withCredientials: "true"
// 	})
// 	.then(response => {
// 		console.log(response);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

//axios.request(url, {...})
axios
	.request("https://api.myjson.com/bins/qrhbs", {
		"Content-Type": "application/json",
		withCredientials: "true"
	})
	.then(response => {
		console.log(response);
	})
	.catch(error => {
		console.log(error);
	});

// let newinstance = axios("https://api.myjson.com/bins/qrhbs", {
// 	method: "get",
// 	"Content-Type": "application/json"
// });

// console.dir(newinstance);

// newinstance.interceptors.request.use(config => {
// 	console.log("before sending");
// 	return config;
// });
// newinstance.interceptors.response.use(
// 	response => {
// 		console.log("get response data:" + response);
// 	},
// 	error => {
// 		console.log("get error in response interceptor!");
// 		return Promise.reject(error);
// 	}
// );

// newinstance
// 	.then(response => {
// 		console.log(response);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});
