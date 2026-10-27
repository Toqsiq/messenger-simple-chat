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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n\nvar form = document.querySelector('.form');\nvar input = document.querySelector('.form-input');\nvar messagesList = document.getElementById('chat-messages');\nvar savedMessages = JSON.parse(localStorage.getItem('chat-history')) || [];\nfunction createMessageBubble(message) {\n  var newBubble = document.createElement('div');\n  newBubble.classList.add('message-bubble');\n\n  // Создаем HTML-структуру внутри пузыря: имя, текст и время\n  newBubble.innerHTML = \"\\n    <div class=\\\"message-info\\\">\\n      <span class=\\\"sender\\\">\".concat(message.sender, \"</span>\\n      <span class=\\\"time\\\">\").concat(message.time, \"</span>\\n    </div>\\n    <div class=\\\"message-text\\\">\").concat(message.text, \"</div>\\n  \");\n  messagesList.appendChild(newBubble);\n}\nfunction loadHistory() {\n  savedMessages.forEach(function (message) {\n    createMessageBubble(message); // Передаем весь объект message\n  });\n  messagesList.scrollTop = messagesList.scrollHeight;\n}\nloadHistory();\nfunction handleSubmit(event) {\n  event.preventDefault();\n  var text = input.value.trim();\n  if (text === '') return;\n\n  // Получаем текущее время в формате ЧЧ:ММ\n  var now = new Date();\n  var timeString = now.toLocaleTimeString([], {\n    hour: '2-digit',\n    minute: '2-digit'\n  });\n\n  // Создаем объект сообщения\n  var newMessage = {\n    text: text,\n    sender: 'Я',\n    // Пока пишем \"Я\", так как нет авторизации\n    time: timeString\n  };\n\n  // Отправляем объект в функцию отрисовки\n  createMessageBubble(newMessage);\n\n  // Сохраняем объект в массив и в localStorage\n  savedMessages.push(newMessage);\n  localStorage.setItem('chat-history', JSON.stringify(savedMessages));\n  input.value = '';\n  messagesList.scrollTop = messagesList.scrollHeight;\n}\nform.addEventListener('submit', handleSubmit);\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });