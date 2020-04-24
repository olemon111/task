/*
 * @Author: your name
 * @Date: 2020-04-08 21:34:59
 * @LastEditTime: 2020-04-10 16:51:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task2\todolist\src\App.js
 */
import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
	return (
		<div className="TodoContainer">
			<header className="App-header">
				<h1>todos</h1>
			</header>
			<section className="todoList">
				<TodoList></TodoList>
			</section>
			<footer className="documentation">
				<p>Enter your task content in the writing bar</p>
				<p>Click to edit your todo</p>
				<p>Select what you have done with a ✔</p>
				<p></p>
			</footer>
		</div>
	);
}

export default App;
