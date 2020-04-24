/*
 * @Author: your name
 * @Date: 2020-04-11 21:23:50
 * @LastEditTime: 2020-04-12 13:19:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1\src\pages\comps\todo-list.js
 */
import React, { Component, Fragment } from "react";
import TodoItem from "./todo-item";
const shortId = require("shortid");

class TodoList extends React.Component {
	render() {
		// 获取从父组件传递过来的 todolist
		const todoList = this.props.todoList;
		// 循环生成每一条 todoItem，并将 delete 方法传递给子组件
		const todoItems = todoList.map((item) => {
			return (
				<TodoItem
					key={shortId.generate()}
					isFinished={item.isFinished}
					content={item.content}
					date={item.date}
					previousChecked={item.isFinished}
					onDeleteItem={this.props.onDeleteItem}
					onUpdateItem={this.props.onUpdateItem}
				/>
			);
		});

		// return <ul>{todoItems}</ul>;

		return (
			<div>
				<ul>{todoItems}</ul>
				{/* <p>{this.props.num}</p> */}
			</div>
		);
	}
}

export default TodoList;
