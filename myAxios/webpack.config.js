/*
 * @Author: your name
 * @Date: 2020-03-24 12:13:47
 * @LastEditTime: 2020-03-26 19:55:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myAxiose:\web\task\test\webpack.config.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		bundle: "./src/test/test.js"
	},
	module: {
		rules: []
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/test/index.html"
		}),
		new CleanWebpackPlugin()
	],
	//clean-webpack-plugin在打包之前运行，删除dist文件夹
	//Html-webpack-plugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
	output: {
		// publicPath: "http://cdn.com.cn",
		filename: "[name].js",
		path: path.resolve(__dirname, "bundle")
	}
};
