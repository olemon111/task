import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import TodoList from "./comps/todo-list";

const axios = require("axios");

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			showTooltip: false, // 控制 tooltip 的显示隐藏
		};
	}

	componentDidMount() {
		// 获取所有的 todolist
		this._getTodoList();
	}

	// 获取 todolist
	_getTodoList() {
		const that = this;
		axios
			.get("/getAllItems", { "Content-Type": "application/json" })
			.then((response) => {
				// console.log(response.data);
				that.setState({
					todoList: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// 添加 todo

	_onNewItem(newItem) {
		let params = new URLSearchParams();
		console.log("IN _oNnEWItem");
		// console.log(newItem.content);
		// console.log(newItem.date);
		params.append("content", newItem.content);
		params.append("date", newItem.date);
		params.append("isFinished", newItem.isFinished);

		const that = this;

		axios({ method: "post", url: "/addItem", data: params })
			.then((response) => {
				// console.log("response");
				// console.log(response);

				// const todoList = that.todoSort(response.data);
				const todoList = response.data.reverse();
				console.log("todoList");
				console.log(todoList);
				that.setState({ todoList });
			})
			.catch((error) => {
				console.log(error);
			});
		// console.log(111);
		// console.log("params: ");
		// console.log(params);
		// console.log(that.state.todoList);
		// console.log(222);
	}

	// 删除 todo

	_onDeleteItem(date) {
		const that = this;
		const postData = {
			date: date,
		};
		axios({ method: "post", url: "/deleteItem", data: postData })
			.then((response) => {
				that._getTodoList();
				// console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	_onUpdateItem(newItem) {
		const that = this;

		let params = new URLSearchParams();
		console.log("修改UPDATE: new" + newItem.isFinished);
		// console.log(newItem.content);
		// console.log(newItem.date);
		params.append("date", newItem.date);
		params.append("isFinished", newItem.isFinished);

		axios({ method: "post", url: "/verifyItem", data: params })
			.then((response) => {
				that._getTodoList();
				// console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// 提交表单操作
	handleSubmit(event) {
		event.preventDefault();
		// 表单输入为空验证
		if (this.refs.content.value == "") {
			this.refs.content.focus();
			this.setState({
				showTooltip: true,
			});
			return;
		}

		let month = new Date().getMonth() + 1;
		let date = new Date().getDate();
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let seconds = new Date().getMilliseconds();

		// 生成参数
		const newItem = {
			content: this.refs.content.value,
			date: month + "/" + date + " " + hours + ":" + minutes + ":" + seconds,
			isFinished: false,
		};

		// console.log(newItem);
		// 添加 todo
		this._onNewItem(newItem);
		// 重置表单
		this.refs.todoForm.reset();
		// 隐藏提示信息
		this.setState({
			showTooltip: false,
		});
	}

	render() {
		console.log("this.state.todoList in render" + this.state.todoList);
		return (
			<div className="container">
				<h2 className="header">Todos</h2>
				<form
					className="todoForm"
					ref="todoForm"
					onSubmit={this.handleSubmit.bind(this)}
				>
					<input
						ref="content"
						type="text"
						placeholder="What needs to be done?"
						className="todoContent"
					/>
					{this.state.showTooltip && (
						<span className="tooltip">输入内容不能为空</span>
					)}
				</form>
				<TodoList
					// num={this.state.todoList.filter((item) => !item.isFinished).length}
					todoList={this.state.todoList}
					onDeleteItem={this._onDeleteItem.bind(this)}
					onUpdateItem={this._onUpdateItem.bind(this)}
				/>
			</div>
		);
	}
}

export default Todo;
