/*
 * @Author: your name
 * @Date: 2020-04-21 15:35:57
 * @LastEditTime: 2020-04-24 21:38:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \task\myVirtualDom\virtualDom.js
 */
class Element {
	constructor(tagName, props, children) {
		this.tagName = tagName;
		this.props = props;
		this.children = children;
	}

	render() {
		//先设置一波属性
		const vDom = document.createElement(this.tagName);
		Reflect.ownKeys(this.props).forEach(key => {
			if (
				key === "value" &&
				(this.tagName.toUpperCase === "INPUT" ||
					this.tagName.toUpperCase === "TEXTAREA")
			) {
				vDom.value = this.props[key];
			}
			vDom.setAttribute(key, this.props[key]);
		});
		//更新一波子节点
		this.children.forEach(child => {
			//如果字节点是Element的实例则递归调用render，否则生成文本节点
			const childDom =
				child instanceof Element
					? child.render()
					: document.createTextNode(child);
			vDom.appendChild(childDom); //加到父节点上
		});

		//返回该节点
		return vDom;
	}
}

function createVdom(tagName, props, children) {
	if (Array.isArray(props) || !props) {
		//未传入props只有tagName和children时
		children = [...props];
		props = {};
	}
	children = children ? children : [];
	return new Element(tagName, props, children);
}

export default createVdom;
