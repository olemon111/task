/*
 * @Author: your name
 * @Date: 2020-04-08 21:44:07
 * @LastEditTime: 2020-04-10 17:18:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task2\todolist\src\components\Todo.js
 */
import React, { Component, Fragment } from "react";
import AddItems from "./AddItems";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import shortId from "shortid";

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.refArray = []; //用于全选

		const defaultItems = [
			//自定义默认事项
			{
				id: shortId.generate(),
				text: "吃饭",
				isFinished: false,
			},
			{
				id: shortId.generate(),
				text: "睡觉",
				isFinished: false,
			},
			{
				id: shortId.generate(),
				text: "敲代码",
				isFinished: false,
			},
		];

		this.state = {
			listArray: defaultItems,
			show: "all",
			isDefault: true,
		};
	}

	handleInput(newValue) {
		let newListArray = this.state.listArray;

		newListArray = this.state.isDefault ? [] : newListArray;
		this.setState({ isDefault: false });
		newListArray.push({
			id: shortId.generate(),
			text: newValue,
			isFinished: false,
		});
		this.setState({ listArray: newListArray });
	}

	handleCheck(id, event) {
		//针对单个todo
		const isChecked = event.target.checked;

		event.target.className = isChecked ? "checked" : "";
		//加上checked类名,便于改变样式
		const newListArray = this.state.listArray.map((todo) => {
			//改变isFinished属性
			if (todo.id === id) {
				todo.isFinished = isChecked ? true : false;
			}
			return todo;
		});
		this.setState({ listArray: newListArray });
	}

	handleSelect(event) {
		//全选todo
		const isAllSelected = event.target.className === "selected"; //是否全选
		this.refArray = this.refArray.filter((value) => value.current); //更新数组
		this.refArray.forEach((inputRef) => {
			inputRef.current.checked = isAllSelected ? false : true;
		});

		const newListArray = this.state.listArray;
		//切换类名
		event.target.className = isAllSelected ? "" : "selected";
		newListArray.map(
			(todo) =>
				//改变isFinished属性
				(todo.isFinished = event.target.className === "selected" ? true : false)
		);
		this.setState({ listArray: newListArray });
	}

	handleDelete(id) {
		//删除
		const newListArray = this.state.listArray;
		newListArray.forEach((todo, index) => {
			if (todo.id === id) {
				newListArray.splice(index, 1);
			}
		});
		this.setState({ listArray: newListArray });
	}

	handleShow(className) {
		//处理渲染的数组
		switch (className) {
			case "showAll":
				this.setState({ show: "all" });
				break;
			case "showActive":
				this.setState({ show: "active" });
				break;
			case "showCompleted":
				this.setState({ show: "completed" });
				break;
			default:
				break;
		}
	}

	handleClearCompleted() {
		//删除所有完成事项
		const newListArray = this.state.listArray.filter(
			(todo) => !todo.isFinished
		);
		this.setState({ listArray: newListArray });
	}

	handleEnterEdit(newText) {
		console.log(newText);
	}

	render() {
		let renderArray =
			this.state.show === "active"
				? this.state.listArray.filter((todo) => !todo.isFinished)
				: this.state.listArray.filter((todo) => todo.isFinished);
		switch (this.state.show) {
			case "all":
				return (
					<Fragment>
						<AddItems
							handleInput={this.handleInput.bind(this)}
							handleSelect={this.handleSelect.bind(this)}
						></AddItems>

						<ul>
							{this.state.listArray.map((todo) => {
								const inputRef = React.createRef();
								this.refArray.push(inputRef);
								return (
									<TodoItem
										key={todo.id}
										text={todo.text}
										isChecked={todo.isFinished}
										handleCheck={this.handleCheck.bind(this, todo.id)}
										handleDelete={this.handleDelete.bind(this, todo.id)}
										inputRef={inputRef}
										isShow={this.handleShow.bind(this)}
										handleEnterEdit={this.handleEnterEdit.bind(this)}
									></TodoItem>
								);
							})}
						</ul>
						<TodoFooter
							unFinishedNum={
								this.state.listArray.filter((todo) => !todo.isFinished).length
							}
							finishedNum={
								this.state.listArray.filter((todo) => todo.isFinished).length
							}
							handleShowAll={this.handleShow.bind(this)}
							handleShowActive={this.handleShow.bind(this)}
							handleShowCompleted={this.handleShow.bind(this)}
							handleClearCompleted={this.handleClearCompleted.bind(this)}
						></TodoFooter>
					</Fragment>
				);
			case "active":
				return (
					<Fragment>
						<AddItems
							handleInput={this.handleInput.bind(this)}
							handleSelect={this.handleSelect.bind(this)}
						></AddItems>

						<ul>
							{renderArray.map((todo) => {
								const inputRef = React.createRef();
								this.refArray.push(inputRef);
								return (
									<TodoItem
										key={todo.id}
										text={todo.text}
										isChecked={todo.isFinished}
										handleCheck={this.handleCheck.bind(this, todo.id)}
										handleDelete={this.handleDelete.bind(this, todo.id)}
										inputRef={inputRef}
										isShow={this.handleShow.bind(this)}
									></TodoItem>
								);
							})}
						</ul>
						<TodoFooter
							unFinishedNum={
								this.state.listArray.filter((todo) => !todo.isFinished).length
							}
							finishedNum={
								this.state.listArray.filter((todo) => todo.isFinished).length
							}
							handleShowAll={this.handleShow.bind(this)}
							handleShowActive={this.handleShow.bind(this)}
							handleShowCompleted={this.handleShow.bind(this)}
							handleClearCompleted={this.handleClearCompleted.bind(this)}
						></TodoFooter>
					</Fragment>
				);
			case "completed":
				return (
					<Fragment>
						<AddItems
							handleInput={this.handleInput.bind(this)}
							handleSelect={this.handleSelect.bind(this)}
						></AddItems>

						<ul>
							{renderArray.map((todo) => {
								const inputRef = React.createRef();
								this.refArray.push(inputRef);
								return (
									<TodoItem
										key={todo.id}
										text={todo.text}
										isChecked={todo.isFinished}
										handleCheck={this.handleCheck.bind(this, todo.id)}
										handleDelete={this.handleDelete.bind(this, todo.id)}
										inputRef={inputRef}
										isShow={this.handleShow.bind(this)}
									></TodoItem>
								);
							})}
						</ul>
						<TodoFooter
							unFinishedNum={
								this.state.listArray.filter((todo) => !todo.isFinished).length
							}
							finishedNum={
								this.state.listArray.filter((todo) => todo.isFinished).length
							}
							handleShowAll={this.handleShow.bind(this)}
							handleShowActive={this.handleShow.bind(this)}
							handleShowCompleted={this.handleShow.bind(this)}
							handleClearCompleted={this.handleClearCompleted.bind(this)}
						></TodoFooter>
					</Fragment>
				);
			default:
				break;
		}
	}
}

export default TodoList;
