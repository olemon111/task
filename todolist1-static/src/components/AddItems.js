/*
 * @Author: your name
 * @Date: 2020-04-08 21:45:47
 * @LastEditTime: 2020-04-10 11:09:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task2\todolist\src\components\Add.js
 */
import React, { Component } from "react";

class AddItems extends Component {
	handleEnter(event) {
		//输入后回车
		if (event.keyCode === 13 && event.target.value) {
			this.props.handleInput(event.target.value);
			event.target.value = "";
		}
	}

	render() {
		return (
			<div className="addBar">
				<button onClick={this.props.handleSelect} id="selectAll">
					✔
				</button>
				<input
					maxLength="22"
					type="text"
					autoFocus="autofocus"
					placeholder="What needs to be done?"
					onKeyUp={this.handleEnter.bind(this)}
				/>
			</div>
		);
	}
}

export default AddItems;
