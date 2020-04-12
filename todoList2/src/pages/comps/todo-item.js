/*
 * @Author: your name
 * @Date: 2020-04-11 21:23:50
 * @LastEditTime: 2020-04-12 12:37:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1\src\pages\comps\todo-item.js
 */
import React from "react";

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDel: false, // 控制删除 icon 的显示隐藏
		};
	}

	handleDelete() {
		// 获取父组件传递过来的 date
		const date = this.props.date;
		// 执行父组件的 delete 方法
		this.props.onDeleteItem(date);
	}

	handleUpdate(event) {
		const flag = event.target.checked;
		const date = this.props.date;
		const newItem = {
			date: date,
			isFinished: flag,
		};
		this.props.onUpdateItem(newItem);
	}

	render() {
		return (
			<li className="todoItem">
				<input
					type="checkbox"
					defaultChecked={this.props.previousChecked}
					onChange={this.handleUpdate.bind(this)}
				></input>
				<span>{this.props.isFinished}</span>
				<span className="itemCont">{this.props.content}</span>
				<span className="itemTime">{this.props.date}</span>
				<button className="delBtn" onClick={this.handleDelete.bind(this)}>
					×
				</button>
			</li>
		);
	}
}

export default TodoItem;
