/*
 * @Author: your name
 * @Date: 2020-04-08 21:44:52
 * @LastEditTime: 2020-04-12 12:16:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task2\todolist\src\components\items.js
 */
import React, { Component } from "react";

class TodoItem extends Component {
	render() {
		return (
			<li>
				<input
					type="checkbox"
					defaultChecked={this.props.isChecked}
					onClick={this.props.handleCheck}
					ref={this.props.inputRef}
				/>
				<span
					maxLength="22"
					contentEditable
					onFocus={(event) => {
						//编辑时改变样式
						event.target.className = "editing";
					}}
					onBlur={(event) => {
						event.target.className = "";
					}}
					onKeyDown={(event) => {
						if (event.keyCode === 13) {
							event.preventDefault();
							event.target.blur();
						}
						this.props.handleEnterEdit(event.target.innerText);
					}}
				>
					{this.props.text}
				</span>
				<button onClick={this.props.handleDelete}>×</button>
			</li>
		);
	}
}

export default TodoItem;
