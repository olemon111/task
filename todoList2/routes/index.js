/*
 * @Author: your name
 * @Date: 2020-04-11 13:48:19
 * @LastEditTime: 2020-04-12 12:24:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Node-React-MongoDB-TodoList-master\routes\index.js
 */
const express = require("express");
const router = express.Router();
const Todo = require("../src/models/todo");

router.get("/", (req, res) => {
	res.render("index", {
		title: "React TodoList",
	});
});

router.get("/getAllItems", (req, res) => {
	//请求所有代办
	Todo.find({})
		.sort({ date: -1 })
		.exec((err, todoList) => {
			if (err) {
				console.log(err);
			} else {
				res.json(todoList);
			}
		});
});

router.post("/addItem", (req, res) => {
	//增加代办
	let newItem = req.body;
	Todo.create(newItem, (err) => {
		if (err) {
			console.log(err);
		} else {
			Todo.find({}, (err, todoList) => {
				if (err) {
					console.log(err);
				} else {
					res.json(todoList);
				}
			});
		}
	});
});

router.post("/deleteItem", (req, res) => {
	//删除代办
	console.log(req.body);
	let delete_date = req.body.date;
	Todo.remove({ date: delete_date }, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

router.post("/verifyItem", (req, res) => {
	console.log("IN verifying!!!");
	let verify_date = req.body.date;
	let verify_finish = req.body.isFinished;
	Todo.update(
		{ date: verify_date },
		{ isFinished: verify_finish },
		(err, docs) => {
			if (err) {
				console.log(err);
			}
			console.log("sucess IN VERIFYING" + docs);
		}
	);
});

module.exports = router;
