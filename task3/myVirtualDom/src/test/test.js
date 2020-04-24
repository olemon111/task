/*
 * @Author: your name
 * @Date: 2020-04-21 17:02:42
 * @LastEditTime: 2020-04-24 22:12:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task\myVirtualDom\test\test.js
 */
import "./main.css";
import updateElement from "../diff";
import createVdom from "../dom";

const container = createVdom("div", { class: "container" }, [
	createVdom("li", { class: "li" }),
	createVdom("span", ["I'm old node"])
]);

const newLi = createVdom("li", { class: "li" }, [
	createVdom("span", ["I'm new node"])
]);

const root = document.getElementById("root");
updateElement(root, container);

const btns = document.getElementsByTagName("button");
//add
btns[0].addEventListener("click", () => {
	updateElement(root, newLi); //点击新增Li节点
});

const moreNode = createVdom("ul", [
	createVdom("li", [
		createVdom("input", { type: "text", value: "hello" }, ["input"])
	]),
	createVdom("div", { class: "more" }, [
		createVdom("span", { class: "span" }, ["span"]),
		createVdom("div", [
			createVdom("a", { class: "a", href: "#" }, ["我是a标签啊"])
		])
	])
]);

//addmore
btns[1].addEventListener("click", () => {
	updateElement(root, moreNode, container);
});

const anotherNode = createVdom("ul", [
	createVdom("li", [
		createVdom("input", { type: "text", value: "world" }, ["input"])
	]),
	createVdom("div", { class: "more" }, [
		createVdom("span", { class: "span" }, ["span"]),
		createVdom("div", [
			createVdom("a", { class: "a", href: "#" }, ["content changed"])
		])
	])
]);

btns[2].addEventListener("click", () => {
	updateElement(root, anotherNode, container);
});
