/*
 * @Author: your name
 * @Date: 2020-04-11 13:48:19
 * @LastEditTime: 2020-04-11 20:40:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Node-React-MongoDB-TodoList-master\routes\users.js
 */
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		title: "React TodoList",
	});
});

module.exports = router;
