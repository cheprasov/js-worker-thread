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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Blob/BlobFileFactory.js":
/*!*************************************!*\
  !*** ./src/Blob/BlobFileFactory.js ***!
  \*************************************/
/*! exports provided: objectUrlMap, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"objectUrlMap\", function() { return objectUrlMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BlobFileFactory; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar objectUrlMap = new Map();\n\nvar BlobFileFactory =\n/*#__PURE__*/\nfunction () {\n  function BlobFileFactory() {\n    _classCallCheck(this, BlobFileFactory);\n  }\n\n  _createClass(BlobFileFactory, null, [{\n    key: \"createJavaScriptObjectUrl\",\n    value: function createJavaScriptObjectUrl(content) {\n      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n\n      if (useCache && objectUrlMap.has(content)) {\n        return objectUrlMap.get(content);\n      }\n\n      var blob = new Blob([content], {\n        type: 'text/javascript'\n      });\n      var objectUrl = URL.createObjectURL(blob);\n\n      if (useCache) {\n        objectUrlMap.set(content, objectUrl);\n      }\n\n      return objectUrl;\n    }\n  }]);\n\n  return BlobFileFactory;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Blob/BlobFileFactory.js?");

/***/ }),

/***/ "./src/Error/WorkerError.js":
/*!**********************************!*\
  !*** ./src/Error/WorkerError.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WorkerError; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === \"function\" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== \"function\") { throw new TypeError(\"Super expression must either be null or a function\"); } if (typeof _cache !== \"undefined\") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf(\"[native code]\") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar WorkerError =\n/*#__PURE__*/\nfunction (_Error) {\n  _inherits(WorkerError, _Error);\n\n  function WorkerError(type) {\n    var _this;\n\n    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n\n    _classCallCheck(this, WorkerError);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(WorkerError).call(this, message));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"type\", void 0);\n\n    _this.type = type;\n    return _this;\n  }\n\n  _createClass(WorkerError, [{\n    key: \"getType\",\n    value: function getType() {\n      return this.type;\n    }\n  }]);\n\n  return WorkerError;\n}(_wrapNativeSuper(Error));\n\n\n\n//# sourceURL=webpack:///./src/Error/WorkerError.js?");

/***/ }),

/***/ "./src/Thread/NoopThread.js":
/*!**********************************!*\
  !*** ./src/Thread/NoopThread.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return NoopThread; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar NoopThread =\n/*#__PURE__*/\nfunction () {\n  function NoopThread() {\n    _classCallCheck(this, NoopThread);\n  }\n\n  _createClass(NoopThread, [{\n    key: \"exec\",\n    value: function exec() {\n      return Promise.resolve();\n    }\n  }, {\n    key: \"close\",\n    value: function close() {\n      return Promise.resolve(true);\n    }\n  }, {\n    key: \"terminate\",\n    value: function terminate() {}\n  }], [{\n    key: \"isSupported\",\n    value: function isSupported() {\n      return true;\n    }\n  }]);\n\n  return NoopThread;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Thread/NoopThread.js?");

/***/ }),

/***/ "./src/Thread/TimeoutThread.js":
/*!*************************************!*\
  !*** ./src/Thread/TimeoutThread.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TimeoutThread; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar TimeoutThread =\n/*#__PURE__*/\nfunction () {\n  function TimeoutThread(threadFunc) {\n    _classCallCheck(this, TimeoutThread);\n\n    _defineProperty(this, \"threadFunc\", void 0);\n\n    this.threadFunc = threadFunc;\n  }\n\n  _createClass(TimeoutThread, [{\n    key: \"exec\",\n    value: function exec() {\n      var _this = this;\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return new Promise(function (resolve) {\n        setTimeout(function () {\n          return resolve(_this.threadFunc.apply(_this, args));\n        }, 0);\n      });\n    }\n  }, {\n    key: \"close\",\n    value: function close() {\n      this.threadFunc = function () {};\n\n      return Promise.resolve(true);\n    }\n  }, {\n    key: \"terminate\",\n    value: function terminate() {\n      this.threadFunc = function () {};\n    }\n  }], [{\n    key: \"isSupported\",\n    value: function isSupported() {\n      try {\n        return setTimeout && typeof setTimeout === 'function' || false;\n      } catch (e) {\n        return false;\n      }\n    }\n  }]);\n\n  return TimeoutThread;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Thread/TimeoutThread.js?");

/***/ }),

/***/ "./src/Thread/WorkerThread.js":
/*!************************************!*\
  !*** ./src/Thread/WorkerThread.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WorkerThread; });\n/* harmony import */ var _Blob_BlobFileFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Blob/BlobFileFactory */ \"./src/Blob/BlobFileFactory.js\");\n/* harmony import */ var _Error_WorkerError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Error/WorkerError */ \"./src/Error/WorkerError.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar STATUS_OK = 'ok';\nvar STATUS_ERROR = 'error';\nvar ERROR_TYPE_MESSAGE_ERROR = 'WorkerMessageError';\nvar ERROR_TYPE_MESSAGE_STATUS = 'WrongMessageStatus';\nvar COMMAND_EXEC = 'exec';\nvar COMMAND_CLOSE = 'close';\n\nvar WorkerThread =\n/*#__PURE__*/\nfunction () {\n  function WorkerThread(threadFunc) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, WorkerThread);\n\n    _defineProperty(this, \"worker\", void 0);\n\n    _defineProperty(this, \"promiseCompletionsMap\", void 0);\n\n    _defineProperty(this, \"options\", void 0);\n\n    this.options = options;\n    this.promiseCompletionsMap = new Map();\n    this.worker = new Worker(WorkerThread.createWorkerBlobFile(threadFunc, options), {\n      name: options.name,\n      type: options.type,\n      credentials: options.credentials\n    });\n    this.worker.onmessage = this._onMessage.bind(this);\n    this.worker.onmessageerror = this._onMessageError.bind(this);\n    this.worker.onerror = this._onError.bind(this);\n  }\n\n  _createClass(WorkerThread, [{\n    key: \"_getNewPromiseId\",\n\n    /**\n     * @private\n     */\n    value: function _getNewPromiseId() {\n      var now = Date.now();\n      var promiseId;\n      var i = 0;\n\n      do {\n        promiseId = \"\".concat(now, \"-\").concat(i);\n        i += 1;\n      } while (this.promiseCompletionsMap.has(promiseId));\n\n      return promiseId;\n    }\n    /**\n     * @private\n     */\n\n  }, {\n    key: \"_createError\",\n    value: function _createError(errorData) {\n      return new _Error_WorkerError__WEBPACK_IMPORTED_MODULE_1__[\"default\"](errorData.name, errorData.message);\n    }\n    /**\n     * @private\n     */\n\n  }, {\n    key: \"_onMessage\",\n    value: function _onMessage(message) {\n      var promiseCompletions = this.promiseCompletionsMap.get(message.data.promiseId);\n\n      if (!promiseCompletions) {\n        return;\n      }\n\n      switch (message.data.status) {\n        case STATUS_OK:\n          promiseCompletions.resolve(message.data.result);\n          break;\n\n        case STATUS_ERROR:\n          promiseCompletions.reject(this._createError(message.data.error));\n          break;\n\n        default:\n          promiseCompletions.reject(new _Error_WorkerError__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('WrongMessageStatus', \"Incorrect message status: \".concat(message.data.status)));\n          break;\n      }\n\n      this.promiseCompletionsMap.delete(message.data.promiseId);\n    }\n    /**\n     * @see https://developer.mozilla.org/en-US/docs/Web/API/Worker/onmessageerror\n     * @private\n     */\n\n  }, {\n    key: \"_onMessageError\",\n    value: function _onMessageError(msgError) {\n      var promiseCompletions = this.promiseCompletionsMap.get(msgError.data.promiseId);\n\n      if (promiseCompletions) {\n        promiseCompletions.reject(msgError.data.result);\n        this.promiseCompletionsMap.delete(msgError.data.promiseId);\n      }\n    }\n    /**\n     * @private\n     */\n\n  }, {\n    key: \"_onError\",\n    value: function _onError(error) {\n      var _this = this;\n\n      console.log('_onError', error);\n      this.promiseCompletionsMap.forEach(function (promiseCompletions, promiseId) {\n        promiseCompletions.reject(error);\n\n        _this.promiseCompletionsMap.delete(promiseId);\n      });\n\n      if (this.options.onError) {\n        this.options.onError(error);\n      }\n    }\n    /**\n     * @private\n     */\n\n  }, {\n    key: \"_postMessage\",\n    value: function _postMessage(message) {\n      var _this2 = this;\n\n      return new Promise(function (resolve, reject) {\n        if (!message.promiseId) {\n          message.promiseId = _this2._getNewPromiseId();\n        }\n\n        _this2.promiseCompletionsMap.set(message.promiseId, {\n          resolve: resolve,\n          reject: reject\n        });\n\n        try {\n          _this2.worker.postMessage(message);\n        } catch (error) {\n          reject(error);\n        }\n      });\n    }\n  }, {\n    key: \"exec\",\n    value: function exec() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      var message = {\n        command: COMMAND_EXEC,\n        args: args\n      };\n      return this._postMessage(message);\n    }\n  }, {\n    key: \"close\",\n    value: function close() {\n      var message = {\n        command: COMMAND_CLOSE\n      };\n      return this._postMessage(message);\n    }\n  }, {\n    key: \"terminate\",\n    value: function terminate() {\n      this.worker.terminate();\n    }\n  }], [{\n    key: \"isSupported\",\n    value: function isSupported() {\n      try {\n        return URL && URL.createObjectURL && Blob && Worker && true || false;\n      } catch (e) {\n        return false;\n      }\n    }\n    /**\n     * @see https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope\n     */\n\n  }, {\n    key: \"createWorkerBlobFile\",\n    value: function createWorkerBlobFile(threadFunc, options) {\n      var importScripts = options.importScripts ? \"importScripts(\".concat(JSON.stringify(options.importScripts), \");\") : '';\n      var threadFuncString = typeof threadFunc === 'function' ? Function.toString.call(threadFunc) : threadFunc;\n      return _Blob_BlobFileFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createJavaScriptObjectUrl(\"'use strict';\\n            \\n                \".concat(importScripts, \"\\n\\n                var workerCommandExec = function(data) {\\n                    var result = threadFunc.apply(threadFunc, data.args);\\n                    self.postMessage({\\n                        status: '\").concat(STATUS_OK, \"',\\n                        promiseId: data.promiseId,\\n                        result: result\\n                    });\\n                };\\n\\n                var workerCommandClose = function(data) {\\n                    self.postMessage({\\n                        status: '\").concat(STATUS_OK, \"',\\n                        promiseId: data.promiseId,\\n                        result: true\\n                    });\\n                    self.close();\\n                };\\n\\n                var workerSendError = function(data, error) {\\n                    self.postMessage({\\n                        status: '\").concat(STATUS_ERROR, \"',\\n                        promiseId: data.promiseId,\\n                        error: {\\n                            name: error.name,\\n                            message: error.message\\n                        }\\n                    });\\n                };\\n\\n                var threadFunc = \").concat(threadFuncString, \";\\n\\n                self.onmessage = function(event) {\\n                    try {\\n                        switch (event.data.command) {\\n                            case '\").concat(COMMAND_EXEC, \"':\\n                                workerCommandExec(event.data);\\n                                break;\\n                            case '\").concat(COMMAND_CLOSE, \"':\\n                                workerCommandClose(event.data);\\n                                break;\\n                            default:\\n                                workerSendError(event.data, {\\n                                    name: '\").concat(ERROR_TYPE_MESSAGE_STATUS, \"',\\n                                    message: 'Wrong message status',\\n                                });\\n                        }\\n                    } catch (error) {\\n                        workerSendError(event.data, error);\\n                    }\\n                };\\n\\n                // see: https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/onmessageerror\\n                self.onmessageerror = function(event) {\\n                    var error = {\\n                        name: '\").concat(ERROR_TYPE_MESSAGE_ERROR, \"',\\n                        message: 'The onmessageerror event handler of the DedicatedWorkerGlobalScope interface is '\\n                            + 'an EventListener, called whenever an MessageEvent of type messageerror is fired on '\\n                            + 'the worker\\u2014that is, when it receives a message that cannot be deserialized.',\\n                    };\\n                    workerSendError(event.data, error);\\n                };\\n            \"));\n    }\n  }]);\n\n  return WorkerThread;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Thread/WorkerThread.js?");

/***/ }),

/***/ "./src/ThreadFactory.js":
/*!******************************!*\
  !*** ./src/ThreadFactory.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ThreadFactory; });\n/* harmony import */ var _Thread_WorkerThread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Thread/WorkerThread */ \"./src/Thread/WorkerThread.js\");\n/* harmony import */ var _Thread_TimeoutThread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Thread/TimeoutThread */ \"./src/Thread/TimeoutThread.js\");\n/* harmony import */ var _Thread_NoopThread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Thread/NoopThread */ \"./src/Thread/NoopThread.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\nvar ThreadFactory =\n/*#__PURE__*/\nfunction () {\n  function ThreadFactory() {\n    _classCallCheck(this, ThreadFactory);\n  }\n\n  _createClass(ThreadFactory, null, [{\n    key: \"createThread\",\n    value: function createThread(threadFunc) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n      if (_Thread_WorkerThread__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isSupported()) {\n        return this.createWorkerThread(threadFunc, options);\n      }\n\n      if (_Thread_TimeoutThread__WEBPACK_IMPORTED_MODULE_1__[\"default\"].isSupported()) {\n        return this.createTimeoutThread(threadFunc, options);\n      }\n\n      return this.createNoopThread(threadFunc, options);\n    }\n  }, {\n    key: \"createWorkerThread\",\n    value: function createWorkerThread(threadFunc) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      return new _Thread_WorkerThread__WEBPACK_IMPORTED_MODULE_0__[\"default\"](threadFunc, options);\n    }\n  }, {\n    key: \"createTimeoutThread\",\n    value: function createTimeoutThread(threadFunc) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      return new _Thread_TimeoutThread__WEBPACK_IMPORTED_MODULE_1__[\"default\"](threadFunc, options);\n    }\n  }, {\n    key: \"createNoopThread\",\n    value: function createNoopThread(threadFunc) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      return new _Thread_NoopThread__WEBPACK_IMPORTED_MODULE_2__[\"default\"](threadFunc, options);\n    }\n  }]);\n\n  return ThreadFactory;\n}();\n\n\n\n//# sourceURL=webpack:///./src/ThreadFactory.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ThreadFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThreadFactory */ \"./src/ThreadFactory.js\");\n // const thread1 = ThreadFactory.createThread((a, b) => a + b);\n// thread1.exec(1, 2).then((result) => {\n//     console.log('result', result);\n// });\n// thread1.exec(window, 2).catch((error) => {\n//     console.log('Error', error);\n// });\n//\n// const thread2 = ThreadFactory.createThread(\n//     'a(a, b) => a + b',\n//     {\n//         onError: (error) => {\n//             console.dir(error);\n//         }\n//     }\n// );\n//\n// thread2.exec(1, 2).then((result) => {\n//     console.log('result', result);\n// }).catch((e) => {\n//     console.log('error', e);\n// });\n// const thread3 = ThreadFactory.createThread(() => {\n//     throw new Error('SOME ERROR');\n// });\n//\n// thread3.exec(1, 2).then((result) => {\n//     console.log('result', result);\n// }).catch((e) => {\n//     console.log('error', e);\n// });\n\nvar thread4 = _ThreadFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createThread(Function('a', \"\\n    if (a === 0) {\\n        return 0;\\n    }\\n    if (a === 1) {\\n        return self;\\n    }\\n    if (a === 2) {\\n        throw new Error('SOME ERROR')\\n    }\\n    if (a === 3) {\\n        return a * b * c;\\n    }\\n    if (a === 4) {\\n        return new SharedArrayBuffer();\\n    }\\n    return a;\\n\")); // thread4.exec(0).then((result) => {\n//     console.log('result', result);\n// }).catch((e) => {\n//     console.log('error', e);\n// });\n//\n// thread4.exec(1).then((result) => {\n//     console.log('result', result);\n// }).catch((e) => {\n//     console.log('error', e);\n// });\n//\n// thread4.exec(2).then((result) => {\n//     console.log('result', result);\n// }).catch((e) => {\n//     console.log('error', e);\n// });\n//\n// thread4.exec(3).then((result) => {\n//     console.log('result', result);\n// }).catch((e) => {\n//     console.log('error', e);\n// });\n\nthread4.exec(2).then(function (result) {\n  console.log('result', result);\n}).catch(function (e) {\n  console.log('error', e);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });