/*
 * @Author: your name
 * @Date: 2020-04-11 13:48:19
 * @LastEditTime: 2020-04-11 20:41:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Node-React-MongoDB-TodoList-master\src\models\todo.js
 */
const mongoose = require("mongoose");
const TodoSchema = require("../schemas/todo");
const TodoBox = mongoose.model("TodoBox", TodoSchema);

module.exports = TodoBox;
