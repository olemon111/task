/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/test/main.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/test/main.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"body {\\r\\n\\tbackground-color: wheat;\\r\\n}\\r\\n\\r\\n.container {\\r\\n\\twidth: 200px;\\r\\n\\tbackground-color: coral;\\r\\n}\\r\\n\\r\\na {\\r\\n\\tcolor: grey;\\r\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/test/main.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/diff.js":
/*!*********************!*\
  !*** ./src/diff.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\r\n * @Author: your name\r\n * @Date: 2020-04-21 15:36:04\r\n * @LastEditTime: 2020-04-21 19:43:03\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\task\\myVirtualDom\\diff.js\r\n */\r\n\r\n/* 改变节点\r\n  1.类型变化\r\n  2.属性变化\r\n  3.文本内容变化\r\n*/\r\nconst CHANGE_REPLACE = Symbol(\"REPLACE\");\r\nconst CHANGE_TEXT = Symbol(\"TEXT\");\r\nconst CHANGE_PROP = Symbol(\"PROP\");\r\n\r\nfunction typeChanged(oldNode, newNode) {\r\n\tif (\r\n\t\t//类型改变\r\n\t\ttypeof newNode !== typeof oldNode ||\r\n\t\tnewNode.tagName !== oldNode.tagName\r\n\t) {\r\n\t\treturn CHANGE_REPLACE;\r\n\t}\r\n\r\n\tif (typeof newNode === \"string\") {\r\n\t\t//文本内容改变\r\n\t\tif (newNode !== oldNode) {\r\n\t\t\treturn CHANGE_TEXT;\r\n\t\t}\r\n\t\treturn null;\r\n\t}\r\n\r\n\t//遍历判断属性props是否改变\r\n\tlet isPropsChanged = false;\r\n\tReflect.ownKeys(newNode.props).forEach(prop => {\r\n\t\tif (newNode[prop] !== oldNode[prop]) {\r\n\t\t\tisPropsChanged = true;\r\n\t\t}\r\n\t});\r\n\tif (isPropsChanged) {\r\n\t\t//属性改变\r\n\t\treturn CHANGE_PROP;\r\n\t}\r\n\r\n\treturn null;\r\n}\r\n\r\nfunction updateElement(parent, newNode, oldNode, index = 0) {\r\n\t//index表示在父节点的下标，方便删除\r\n\tconst checkChange = typeChanged(oldNode, newNode); //改变类型\r\n\r\n\tif (!oldNode) {\r\n\t\t// 增加节点\r\n\t\tparent.appendChild(newNode.render());\r\n\t} else if (!newNode) {\r\n\t\t// 删除节点\r\n\t\tparent.removeChild(parent.childNodes[index]);\r\n\t} else if (checkChange) {\r\n\t\t// 改变节点\r\n\t\tif (checkChange === CHANGE_TEXT) {\r\n\t\t\t//文本替换\r\n\t\t\tparent.replaceChild(\r\n\t\t\t\tdocument.createTextNode(newNode),\r\n\t\t\t\tparent.childNodes[index]\r\n\t\t\t);\r\n\t\t} else if (checkChange === CHANGE_PROP) {\r\n\t\t\t//属性替换\r\n\t\t\tchangeAttribute(parent.childNodes[index], oldNode.props, newNode.props);\r\n\t\t} else {\r\n\t\t\t//checkChange === CHANGE_REPLACE\r\n\t\t\t//类型替换\r\n\t\t\tparent.replaceChild(newNode.render(), parent.childNodes[index]);\r\n\t\t}\r\n\t} else if (newNode.tagName) {\r\n\t\t//自身没变化，递归处理子节点children\r\n\t\tconst length =\r\n\t\t\tnewNode.children.length > oldNode.children.length\r\n\t\t\t\t? newNode.children.length\r\n\t\t\t\t: oldNode.children.length; //保留节点多的\r\n\t\tfor (let i = 0; i < length; i++) {\r\n\t\t\tupdateElement(\r\n\t\t\t\tparent.childNodes[index],\r\n\t\t\t\tnewNode.children[i],\r\n\t\t\t\toldNode.children[i]\r\n\t\t\t);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction changeAttribute(node, oldAttr, newAttr) {\r\n\t//改变节点属性\r\n\tif (!node) {\r\n\t\treturn;\r\n\t}\r\n\tReflect.ownKeys(oldAttr).forEach(attr => {\r\n\t\tnode.removeAttribute(attr); //删旧\r\n\t});\r\n\tReflect.ownKeys(newAttr).forEach(attr => {\r\n\t\tnode.setAttribute(attr, newAttr[attr]); //添新\r\n\t});\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (updateElement);\r\n\n\n//# sourceURL=webpack:///./src/diff.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\r\n * @Author: your name\r\n * @Date: 2020-04-21 15:35:57\r\n * @LastEditTime: 2020-04-24 21:38:21\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\task\\myVirtualDom\\virtualDom.js\r\n */\r\nclass Element {\r\n\tconstructor(tagName, props, children) {\r\n\t\tthis.tagName = tagName;\r\n\t\tthis.props = props;\r\n\t\tthis.children = children;\r\n\t}\r\n\r\n\trender() {\r\n\t\t//先设置一波属性\r\n\t\tconst vDom = document.createElement(this.tagName);\r\n\t\tReflect.ownKeys(this.props).forEach(key => {\r\n\t\t\tif (\r\n\t\t\t\tkey === \"value\" &&\r\n\t\t\t\t(this.tagName.toUpperCase === \"INPUT\" ||\r\n\t\t\t\t\tthis.tagName.toUpperCase === \"TEXTAREA\")\r\n\t\t\t) {\r\n\t\t\t\tvDom.value = this.props[key];\r\n\t\t\t}\r\n\t\t\tvDom.setAttribute(key, this.props[key]);\r\n\t\t});\r\n\t\t//更新一波子节点\r\n\t\tthis.children.forEach(child => {\r\n\t\t\t//如果字节点是Element的实例则递归调用render，否则生成文本节点\r\n\t\t\tconst childDom =\r\n\t\t\t\tchild instanceof Element\r\n\t\t\t\t\t? child.render()\r\n\t\t\t\t\t: document.createTextNode(child);\r\n\t\t\tvDom.appendChild(childDom); //加到父节点上\r\n\t\t});\r\n\r\n\t\t//返回该节点\r\n\t\treturn vDom;\r\n\t}\r\n}\r\n\r\nfunction createVdom(tagName, props, children) {\r\n\tif (Array.isArray(props) || !props) {\r\n\t\t//未传入props只有tagName和children时\r\n\t\tchildren = [...props];\r\n\t\tprops = {};\r\n\t}\r\n\tchildren = children ? children : [];\r\n\treturn new Element(tagName, props, children);\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (createVdom);\r\n\n\n//# sourceURL=webpack:///./src/dom.js?");

/***/ }),

/***/ "./src/test/main.css":
/*!***************************!*\
  !*** ./src/test/main.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/test/main.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\nvar exported = content.locals ? content.locals : {};\n\n\n\nmodule.exports = exported;\n\n//# sourceURL=webpack:///./src/test/main.css?");

/***/ }),

/***/ "./src/test/test.js":
/*!**************************!*\
  !*** ./src/test/test.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.css */ \"./src/test/main.css\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_main_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../diff */ \"./src/diff.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom */ \"./src/dom.js\");\n/*\r\n * @Author: your name\r\n * @Date: 2020-04-21 17:02:42\r\n * @LastEditTime: 2020-04-24 22:12:35\r\n * @LastEditors: Please set LastEditors\r\n * @Description: In User Settings Edit\r\n * @FilePath: \\task\\myVirtualDom\\test\\test.js\r\n */\r\n\r\n\r\n\r\n\r\nconst container = Object(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"div\", { class: \"container\" }, [\r\n\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"li\", { class: \"li\" }),\r\n\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"span\", [\"I'm old node\"])\r\n]);\r\n\r\nconst newLi = Object(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"li\", { class: \"li\" }, [\r\n\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"span\", [\"I'm new node\"])\r\n]);\r\n\r\nconst root = document.getElementById(\"root\");\r\nObject(_diff__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(root, container);\r\n\r\nconst btns = document.getElementsByTagName(\"button\");\r\n//add\r\nbtns[0].addEventListener(\"click\", () => {\r\n\tObject(_diff__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(root, newLi); //点击新增Li节点\r\n});\r\n\r\nconst moreNode = Object(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"ul\", [\r\n\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"li\", [\r\n\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"input\", { type: \"text\", value: \"hello\" }, [\"input\"])\r\n\t]),\r\n\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"div\", { class: \"more\" }, [\r\n\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"span\", { class: \"span\" }, [\"span\"]),\r\n\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"div\", [\r\n\t\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"a\", { class: \"a\", href: \"#\" }, [\"我是a标签啊\"])\r\n\t\t])\r\n\t])\r\n]);\r\n\r\n//addmore\r\nbtns[1].addEventListener(\"click\", () => {\r\n\tObject(_diff__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(root, moreNode, container);\r\n});\r\n\r\nconst anotherNode = Object(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"ul\", [\r\n\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"li\", [\r\n\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"input\", { type: \"text\", value: \"world\" }, [\"input\"])\r\n\t]),\r\n\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"div\", { class: \"more\" }, [\r\n\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"span\", { class: \"span\" }, [\"span\"]),\r\n\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"div\", [\r\n\t\t\tObject(_dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"a\", { class: \"a\", href: \"#\" }, [\"content changed\"])\r\n\t\t])\r\n\t])\r\n]);\r\n\r\nbtns[2].addEventListener(\"click\", () => {\r\n\tObject(_diff__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(root, anotherNode, container);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/test/test.js?");

/***/ })

/******/ });