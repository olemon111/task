/*
 * @Author: your name
 * @Date: 2020-04-08 22:47:38
 * @LastEditTime: 2020-04-10 17:20:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task2\todolist\src\components\TodoFooter.js
 */
import React, { Component } from "react";

class TodoFooter extends Component {
	render() {
		return (
			<div className="bottomBar">
				<div className="footer">
					<div>
						<p>{this.props.unFinishedNum} items left</p>
						<p>{this.props.finishedNum} items done</p>
					</div>
					<section>
						<button
							onClick={(event) => {
								this.props.handleShowAll(event.target.className);
							}}
							className="showAll"
						>
							All
						</button>
						<button
							onClick={(event) => {
								this.props.handleShowAll(event.target.className);
							}}
							className="showActive"
						>
							Active
						</button>
						<button
							onClick={(event) => {
								this.props.handleShowAll(event.target.className);
							}}
							className="showCompleted"
						>
							Completed
						</button>
					</section>
					<button
						className="clearCompleted"
						onClick={this.props.handleClearCompleted}
					>
						Clear completed
					</button>
				</div>
				<div className="repeat">
					<div className="repeatFirst"></div>
					<div className="repeatSecond"></div>
				</div>
			</div>
		);
	}
}

export default TodoFooter;
