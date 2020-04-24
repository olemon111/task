/*
 * @Author: your name
 * @Date: 2020-04-21 15:36:04
 * @LastEditTime: 2020-04-21 19:43:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task\myVirtualDom\diff.js
 */

/* 改变节点
  1.类型变化
  2.属性变化
  3.文本内容变化
*/
const CHANGE_REPLACE = Symbol("REPLACE");
const CHANGE_TEXT = Symbol("TEXT");
const CHANGE_PROP = Symbol("PROP");

function typeChanged(oldNode, newNode) {
	if (
		//类型改变
		typeof newNode !== typeof oldNode ||
		newNode.tagName !== oldNode.tagName
	) {
		return CHANGE_REPLACE;
	}

	if (typeof newNode === "string") {
		//文本内容改变
		if (newNode !== oldNode) {
			return CHANGE_TEXT;
		}
		return null;
	}

	//遍历判断属性props是否改变
	let isPropsChanged = false;
	Reflect.ownKeys(newNode.props).forEach(prop => {
		if (newNode[prop] !== oldNode[prop]) {
			isPropsChanged = true;
		}
	});
	if (isPropsChanged) {
		//属性改变
		return CHANGE_PROP;
	}

	return null;
}

function updateElement(parent, newNode, oldNode, index = 0) {
	//index表示在父节点的下标，方便删除
	const checkChange = typeChanged(oldNode, newNode); //改变类型

	if (!oldNode) {
		// 增加节点
		parent.appendChild(newNode.render());
	} else if (!newNode) {
		// 删除节点
		parent.removeChild(parent.childNodes[index]);
	} else if (checkChange) {
		// 改变节点
		if (checkChange === CHANGE_TEXT) {
			//文本替换
			parent.replaceChild(
				document.createTextNode(newNode),
				parent.childNodes[index]
			);
		} else if (checkChange === CHANGE_PROP) {
			//属性替换
			changeAttribute(parent.childNodes[index], oldNode.props, newNode.props);
		} else {
			//checkChange === CHANGE_REPLACE
			//类型替换
			parent.replaceChild(newNode.render(), parent.childNodes[index]);
		}
	} else if (newNode.tagName) {
		//自身没变化，递归处理子节点children
		const length =
			newNode.children.length > oldNode.children.length
				? newNode.children.length
				: oldNode.children.length; //保留节点多的
		for (let i = 0; i < length; i++) {
			updateElement(
				parent.childNodes[index],
				newNode.children[i],
				oldNode.children[i]
			);
		}
	}
}

function changeAttribute(node, oldAttr, newAttr) {
	//改变节点属性
	if (!node) {
		return;
	}
	Reflect.ownKeys(oldAttr).forEach(attr => {
		node.removeAttribute(attr); //删旧
	});
	Reflect.ownKeys(newAttr).forEach(attr => {
		node.setAttribute(attr, newAttr[attr]); //添新
	});
}

export default updateElement;
