/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"about":"about"}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_hero_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/hero.vue */ \"./src/components/hero.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App',\n  components: {\n    Hero: _components_hero_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  data: function data() {\n    return {//\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/forms.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/forms.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      icons: ['mdi-instagram', 'mdi-facebook', 'mdi-linkedin', 'mdi-twitter']\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/components/forms.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/header.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {};\n  }\n});\n\n//# sourceURL=webpack:///./src/components/header.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/hero.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/hero.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'HelloWorld',\n  data: function data() {\n    return {};\n  }\n});\n\n//# sourceURL=webpack:///./src/components/hero.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/plansandpricing.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/plansandpricing.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      items: [{\n        title: 'Explorer',\n        desc: 'Pay Per Minute',\n        hrRate: '$3/minute'\n      }, {\n        title: 'Starter',\n        desc: '60 Minutes',\n        hrRate: '$99/month'\n      }, {\n        title: 'EnterPenure',\n        desc: '210 Minutes',\n        hrRate: '$280/month'\n      }, {\n        title: 'Established',\n        desc: '360 Minute',\n        hrRate: '$420/minute'\n      }]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/components/plansandpricing.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/whatyouget.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/whatyouget.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      items: [{\n        title: 'Call overflow',\n        subtitle: 'We can design a plan which specifies how many times your phone rings before Epic Receptionist takes over.',\n        img: __webpack_require__(/*! ../assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\")\n      }, {\n        title: 'Appointment scheduling',\n        subtitle: 'We will happily answer calls the exact way you want them to be answered. Just provide a customized script.',\n        img: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\")\n      }, {\n        title: 'Custom voicemail, delivered via email',\n        subtitle: 'Any calls received outside of hours of operation will be delivered to your email address.',\n        img: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\")\n      }, {\n        title: 'Toll-free or local number included',\n        subtitle: 'We will provide you with a local or toll-free phone number that is unique to your business.',\n        img: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\")\n      }, {\n        title: 'Custom call answering experience',\n        subtitle: 'We will happily answer calls the exact way you want them to be answered. Just provide a customized script.',\n        img: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\")\n      }],\n      bgblueItem: [{\n        title: 'Real, live humans answer every call',\n        icon: 'check-box-outline'\n      }, {\n        title: 'No monthly contracts',\n        icon: 'check-box-outline'\n      }, {\n        title: 'All receptionists are US-based',\n        icon: 'check-box-outline'\n      }, {\n        title: '5-day free trial with all plans',\n        icon: 'check-box-outline'\n      }]\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/components/whatyouget.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_header_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/header.vue */ \"./src/components/header.vue\");\n/* harmony import */ var _components_whatyouget_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/whatyouget.vue */ \"./src/components/whatyouget.vue\");\n/* harmony import */ var _components_plansandpricing_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/plansandpricing.vue */ \"./src/components/plansandpricing.vue\");\n/* harmony import */ var _components_forms_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/forms.vue */ \"./src/components/forms.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Home',\n  components: {\n    Header: _components_header_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    Wuget: _components_whatyouget_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    PlanPrice: _components_plansandpricing_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    Forms: _components_forms_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  },\n  data: function data() {\n    return {\n      icons: ['mdi-instagram', 'mdi-facebook', 'mdi-linkedin']\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e885572-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-app\",\n    [\n      _c(\"Hero\"),\n      _c(\"v-main\", [_c(\"router-view\")], 1),\n      _c(\n        \"v-footer\",\n        { attrs: { dark: \"\", padless: \"\" } },\n        [\n          _c(\n            \"v-card\",\n            { staticClass: \"flex\", attrs: { flat: \"\", tile: \"\" } },\n            [\n              _c(\n                \"v-card-text\",\n                {\n                  staticClass: \"py-1 white--text my-4\",\n                  staticStyle: { \"font-size\": \"12px\" }\n                },\n                [\n                  _c(\n                    \"v-row\",\n                    [\n                      _c(\"v-col\", { attrs: { cols: \"4\" } }, [\n                        _c(\n                          \"span\",\n                          {},\n                          [\n                            _vm._v(\" Epic Receptionists, LLC \"),\n                            _vm._l(_vm.icons, function(icon) {\n                              return _c(\n                                \"v-icon\",\n                                {\n                                  key: icon,\n                                  staticClass: \"ml-2\",\n                                  staticStyle: {\n                                    \"font-size\": \"16px\",\n                                    \"vertical-align\": \"text-bottom\"\n                                  }\n                                },\n                                [_vm._v(_vm._s(icon))]\n                              )\n                            })\n                          ],\n                          2\n                        )\n                      ]),\n                      _c(\"v-col\", { attrs: { cols: \"2\" } }),\n                      _c(\"v-col\", { attrs: { cols: \"6\" } }, [\n                        _c(\n                          \"div\",\n                          { staticClass: \"d-flex justify-end\" },\n                          [\n                            _c(\"div\", [_vm._v(\" Made in Michigan \")]),\n                            _c(\n                              \"div\",\n                              [\n                                _c(\"v-img\", {\n                                  staticStyle: { width: \"20px !important\" },\n                                  attrs: {\n                                    src: __webpack_require__(/*! @/assets/sharkform.svg */ \"./src/assets/sharkform.svg\")\n                                  }\n                                })\n                              ],\n                              1\n                            ),\n                            _c(\"div\", { staticClass: \"ml-3\" }, [\n                              _vm._v(\n                                \" Epic Receptionists Is A Black Owned Company \"\n                              )\n                            ]),\n                            _c(\"v-divider\", {\n                              staticClass: \"ml-2\",\n                              staticStyle: { width: \"400px !important\" },\n                              attrs: { vertical: \"\" }\n                            }),\n                            _c(\"div\", { staticClass: \"ml-2\" }, [\n                              _vm._v(\" Privacy Policy \")\n                            ]),\n                            _c(\"v-divider\", {\n                              staticClass: \"ml-2\",\n                              attrs: { vertical: \"\" }\n                            }),\n                            _c(\"div\", { staticClass: \"ml-2\" }, [\n                              _vm._v(\" TOS \")\n                            ])\n                          ],\n                          1\n                        )\n                      ])\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225e885572-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/forms.vue?vue&type=template&id=3784ae62&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e885572-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/forms.vue?vue&type=template&id=3784ae62&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticStyle: { background: \"linear-gradient(135deg,#33f,#0cecdc 99%)\" } },\n    [\n      _c(\n        \"v-container\",\n        [\n          _c(\n            \"v-row\",\n            { staticClass: \"pb-16\" },\n            [\n              _c(\n                \"v-col\",\n                {\n                  staticClass: \"white--text mt-10 px-15 \",\n                  attrs: { cols: \"5\" }\n                },\n                [\n                  _c(\"div\", [\n                    _vm._v(\" Allow \"),\n                    _c(\"span\", { staticClass: \"font-italic\" }, [\n                      _vm._v(\" Epic Receptionists \")\n                    ]),\n                    _vm._v(\n                      \" to answer your small business phones when you can't. Our dedicated, trained receptionists are here to create a seamless, warm experience for your customers. We care about small business owners and offer a personalized touch to our clients. \"\n                    )\n                  ]),\n                  _c(\"div\", { staticClass: \"mt-3\" }, [\n                    _vm._v(\n                      \" Isn't it time you got some help? Get in touch today start your free 5-day trial \"\n                    )\n                  ]),\n                  _c(\"div\", { staticClass: \"mt-3 font-weight-medium\" }, [\n                    _vm._v(\" Contact Details: \")\n                  ]),\n                  _c(\"div\", [\n                    _c(\"ul\", [\n                      _c(\"li\", [\n                        _vm._v(\"Email: \"),\n                        _c(\n                          \"span\",\n                          { staticClass: \"text-decoration-underline\" },\n                          [_vm._v(\" hello@epicreceptionists.com\")]\n                        )\n                      ]),\n                      _c(\"li\", [\n                        _vm._v(\"Phone: \"),\n                        _c(\n                          \"span\",\n                          { staticClass: \"text-decoration-underline\" },\n                          [_vm._v(\" 1-844-923-4321 \")]\n                        )\n                      ])\n                    ])\n                  ]),\n                  _c(\"v-divider\", { staticClass: \"mt-8\" }),\n                  _c(\"div\", { staticClass: \"mt-5\" }, [\n                    _c(\"span\", { staticClass: \"font-italic\" }, [\n                      _vm._v(\" Epic Receptionists \")\n                    ]),\n                    _vm._v(\" is a proud Michigan based \")\n                  ]),\n                  _c(\"div\", { staticClass: \"float-left mr-1 mt-2\" }, [\n                    _vm._v(\"company \")\n                  ]),\n                  _c(\"v-img\", {\n                    attrs: {\n                      src: __webpack_require__(/*! @/assets/sharkform.svg */ \"./src/assets/sharkform.svg\"),\n                      width: \"40px\"\n                    }\n                  }),\n                  _c(\n                    \"v-row\",\n                    { staticClass: \"mt-8\", staticStyle: { clear: \"both\" } },\n                    _vm._l(_vm.icons, function(icon) {\n                      return _c(\n                        \"v-col\",\n                        { key: icon, attrs: { cols: \"3\" } },\n                        [\n                          _c(\"v-icon\", { staticClass: \"text-h3 white--text\" }, [\n                            _vm._v(_vm._s(icon))\n                          ])\n                        ],\n                        1\n                      )\n                    }),\n                    1\n                  )\n                ],\n                1\n              ),\n              _c(\n                \"v-col\",\n                {\n                  staticClass: \"mt-10\",\n                  staticStyle: { \"max-height\": \"90%\" },\n                  attrs: { cols: \"1\" }\n                },\n                [_c(\"v-divider\", { attrs: { vertical: \"\" } })],\n                1\n              ),\n              _c(\n                \"v-col\",\n                { staticClass: \"mt-10\", attrs: { cols: \"5\" } },\n                [\n                  _c(\n                    \"v-card\",\n                    { attrs: { color: \"white\" } },\n                    [\n                      _c(\"v-card-title\", [\n                        _vm._v(\" Have a Question? Get in touch! \")\n                      ]),\n                      _c(\"v-divider\"),\n                      _c(\n                        \"v-card-text\",\n                        { staticClass: \"py-0\" },\n                        [\n                          _c(\n                            \"label\",\n                            {\n                              staticClass: \"subtitle-1 black--text\",\n                              attrs: { for: \"Full Name\" }\n                            },\n                            [\n                              _vm._v(\"Full Name \"),\n                              _c(\"span\", { staticClass: \"red--text\" }, [\n                                _vm._v(\"*\")\n                              ])\n                            ]\n                          ),\n                          _c(\"v-text-field\", {\n                            attrs: { outlined: \"\", dense: \"\" }\n                          }),\n                          _c(\n                            \"label\",\n                            {\n                              staticClass: \"subtitle-1 black--text\",\n                              attrs: { for: \"Email\" }\n                            },\n                            [\n                              _vm._v(\"Email \"),\n                              _c(\"span\", { staticClass: \"red--text\" }, [\n                                _vm._v(\"*\")\n                              ])\n                            ]\n                          ),\n                          _c(\"v-text-field\", {\n                            attrs: { outlined: \"\", dense: \"\" }\n                          }),\n                          _c(\n                            \"label\",\n                            {\n                              staticClass: \"subtitle-1 black--text\",\n                              attrs: { for: \"Phone Number\" }\n                            },\n                            [\n                              _vm._v(\"Phone Number \"),\n                              _c(\"span\", { staticClass: \"red--text\" }, [\n                                _vm._v(\"*\")\n                              ])\n                            ]\n                          ),\n                          _c(\"v-text-field\", {\n                            attrs: { outlined: \"\", dense: \"\" }\n                          }),\n                          _c(\n                            \"label\",\n                            {\n                              staticClass: \"subtitle-1 black--text\",\n                              attrs: { for: \"Company Name\" }\n                            },\n                            [\n                              _vm._v(\"Company Name \"),\n                              _c(\"span\", { staticClass: \"red--text\" }, [\n                                _vm._v(\"*\")\n                              ])\n                            ]\n                          ),\n                          _c(\"v-text-field\", {\n                            attrs: { outlined: \"\", dense: \"\" }\n                          }),\n                          _c(\n                            \"label\",\n                            {\n                              staticClass: \"subtitle-1 black--text\",\n                              attrs: { for: \"Message\" }\n                            },\n                            [\n                              _vm._v(\"Message \"),\n                              _c(\"span\", { staticClass: \"red--text\" }, [\n                                _vm._v(\"*\")\n                              ])\n                            ]\n                          ),\n                          _c(\"v-textarea\", { attrs: { outlined: \"\" } })\n                        ],\n                        1\n                      ),\n                      _c(\"v-divider\", {\n                        staticClass: \"mx-auto\",\n                        attrs: { width: \"95%\" }\n                      }),\n                      _c(\n                        \"v-card-actions\",\n                        { staticClass: \"mt-1 pb-9\" },\n                        [\n                          _c(\n                            \"v-btn\",\n                            {\n                              staticClass: \"success py-6 \",\n                              attrs: { block: \"\", text: \"\" }\n                            },\n                            [_vm._v(\" SUBMIT \")]\n                          )\n                        ],\n                        1\n                      )\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/forms.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225e885572-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/header.vue?vue&type=template&id=29e8c3c6&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e885572-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/header.vue?vue&type=template&id=29e8c3c6&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticStyle: {\n        height: \"650px\",\n        \"background-color\": \"#000052\",\n        \"border-top\": \"1px solid #055852\"\n      }\n    },\n    [\n      _c(\n        \"v-container\",\n        [\n          _c(\n            \"v-row\",\n            [\n              _c(\n                \"v-col\",\n                {\n                  staticStyle: {\n                    \"margin-top\": \"140px\",\n                    \"margin-left\": \"125px\",\n                    \"z-index\": \"1 !important\"\n                  },\n                  attrs: { cols: \"8\" }\n                },\n                [\n                  _c(\n                    \"div\",\n                    { staticClass: \"display-2 font-weight-black white--text\" },\n                    [_vm._v(\" Let us handle the phone calls \")]\n                  ),\n                  _c(\n                    \"div\",\n                    {\n                      staticClass:\n                        \"display-2 font-weight-black mb-4 white--text\"\n                    },\n                    [\n                      _vm._v(\" so you can \"),\n                      _c(\"span\", { staticClass: \"red--text\" }, [\n                        _vm._v(\" handle your business \")\n                      ])\n                    ]\n                  ),\n                  _c(\"div\", { staticClass: \"white--text\" }, [\n                    _vm._v(\" Never miss another business call again. \")\n                  ]),\n                  _c(\"div\", { staticClass: \"white--text\" }, [\n                    _vm._v(\" We will answer every call and book appointments. \")\n                  ]),\n                  _c(\"div\", { staticClass: \"white--text\" }, [\n                    _vm._v(\n                      \" Let us give you the time back to focus on growing your business. \"\n                    )\n                  ]),\n                  _c(\n                    \"v-row\",\n                    { staticClass: \"mt-3\" },\n                    [\n                      _c(\n                        \"v-col\",\n                        { attrs: { cols: \"5\" } },\n                        [\n                          _c(\n                            \"v-btn\",\n                            {\n                              attrs: {\n                                \"x-large\": \"\",\n                                color: \"#ff554d \",\n                                block: \"\"\n                              }\n                            },\n                            [_vm._v(\" START YOUR FREE TRIAL TODAY \")]\n                          ),\n                          _c(\n                            \"v-btn\",\n                            {\n                              staticClass: \"mt-5 mb-4\",\n                              attrs: { block: \"\", text: \"\", color: \"white\" }\n                            },\n                            [_vm._v(\" OR CONTACT US FOR MORE INFORMATION \")]\n                          )\n                        ],\n                        1\n                      )\n                    ],\n                    1\n                  )\n                ],\n                1\n              ),\n              _c(\n                \"v-col\",\n                {\n                  staticStyle: {\n                    \"margin-top\": \"50px\",\n                    \"margin-left\": \"-90px\",\n                    \"margin-right\": \"-255px\",\n                    height: \"400px\"\n                  },\n                  attrs: { cols: \"4\" }\n                },\n                [\n                  _vm._v(\" > \"),\n                  _c(\"v-img\", {\n                    attrs: { src: __webpack_require__(/*! @/assets/reception.png */ \"./src/assets/reception.png\") }\n                  })\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/header.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225e885572-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/hero.vue?vue&type=template&id=a54ee9ec&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e885572-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/hero.vue?vue&type=template&id=a54ee9ec& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\n        \"v-app-bar\",\n        {\n          attrs: {\n            color: \"#000052\",\n            fixed: \"\",\n            app: \"\",\n            \"elevate-on-scroll\": \"\",\n            \"scroll-target\": \"#scrolling-techniques-7\",\n            height: \"80px\"\n          }\n        },\n        [\n          _c(\"v-img\", {\n            attrs: {\n              src: __webpack_require__(/*! @/assets/weblogo.svg */ \"./src/assets/weblogo.svg\"),\n              contain: \"\",\n              \"max-width\": \"200px\",\n              height: \"130px\"\n            }\n          }),\n          _c(\n            \"v-container\",\n            {},\n            [\n              _c(\n                \"v-row\",\n                [\n                  _c(\n                    \"v-col\",\n                    { attrs: { offset: \"4\" } },\n                    [\n                      _c(\"v-btn\", { attrs: { plain: \"\", color: \"white\" } }, [\n                        _vm._v(\" Features \")\n                      ]),\n                      _c(\n                        \"v-btn\",\n                        {\n                          staticClass: \"btn-op\",\n                          attrs: { plain: \"\", color: \"white\" }\n                        },\n                        [_vm._v(\" Pricing \")]\n                      ),\n                      _c(\n                        \"v-btn\",\n                        { attrs: { to: \"faqs\", plain: \"\", color: \"white\" } },\n                        [_vm._v(\" FAQ's \")]\n                      ),\n                      _c(\n                        \"v-btn\",\n                        { attrs: { to: \"about\", plain: \"\", color: \"white\" } },\n                        [_vm._v(\" About Us \")]\n                      ),\n                      _c(\n                        \"v-btn\",\n                        {\n                          attrs: { to: \"contact-us\", plain: \"\", color: \"white\" }\n                        },\n                        [_vm._v(\" Contact Us \")]\n                      ),\n                      _c(\n                        \"v-btn\",\n                        { attrs: { to: \"blog\", plain: \"\", color: \"white\" } },\n                        [_vm._v(\" Blog \")]\n                      ),\n                      _c(\"v-btn\", { attrs: { color: \"#0cecdc\" } }, [\n                        _vm._v(\" SIGN UP \")\n                      ])\n                    ],\n                    1\n                  )\n                ],\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/hero.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225e885572-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e885572-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"grey lighten-5\" },\n    [\n      _c(\n        \"v-container\",\n        [\n          _c(\"div\", { staticClass: \"display-2 text-center\" }, [\n            _vm._v(\" Plans And Pricing \")\n          ]),\n          _c(\"div\", { staticClass: \"caption text-center underline\" }, [\n            _vm._v(\" See Our Feature Page For Details \")\n          ]),\n          _c(\n            \"v-row\",\n            { staticClass: \"mt-8 \" },\n            _vm._l(_vm.items, function(item) {\n              return _c(\n                \"v-col\",\n                {\n                  key: item.title,\n                  staticClass: \"text-center    \",\n                  attrs: { cols: \"3\" }\n                },\n                [\n                  _c(\"v-card\", { staticClass: \"px-4 \" }, [\n                    _c(\n                      \"div\",\n                      { staticClass: \"font-weight-medium caption pt-2 \" },\n                      [_vm._v(\" \" + _vm._s(item.title) + \" \")]\n                    ),\n                    _c(\"div\", { staticClass: \"font-weight-medium text-h6\" }, [\n                      _vm._v(\" \" + _vm._s(item.desc) + \" \")\n                    ]),\n                    _c(\"div\", { staticClass: \"text-Body-2 pb-2 \" }, [\n                      _vm._v(\" \" + _vm._s(item.hrRate) + \" \")\n                    ])\n                  ])\n                ],\n                1\n              )\n            }),\n            1\n          ),\n          _c(\n            \"v-row\",\n            [\n              _c(\"v-col\"),\n              _c(\n                \"v-col\",\n                { staticClass: \"text-center mt-8 px-9 py-9\" },\n                [\n                  _c(\"div\", [_vm._v(\" Isn't it time you got some help? \")]),\n                  _c(\n                    \"v-btn\",\n                    {\n                      staticClass: \" mt-1 font-weight-bold px-15 \",\n                      attrs: {\n                        block: \"\",\n                        elevation: \"10\",\n                        \"x-large\": \"\",\n                        color: \"#0cecdc\"\n                      }\n                    },\n                    [_vm._v(\" START YOUR FREE TRIAL TODAY \")]\n                  ),\n                  _c(\n                    \"v-btn\",\n                    {\n                      staticClass: \"mt-3 mb-4\",\n                      attrs: { block: \"\", text: \"\", color: \"black\" }\n                    },\n                    [_vm._v(\" OR CONTACT US FOR MORE INFORMATION \")]\n                  )\n                ],\n                1\n              ),\n              _c(\"v-col\")\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/plansandpricing.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225e885572-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e885572-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"mt-4\" },\n    [\n      _c(\n        \"v-container\",\n        [\n          _c(\"div\", { staticClass: \"display-2 text-center\" }, [\n            _vm._v(\" What You Get \")\n          ]),\n          _c(\"div\", { staticClass: \"caption text-center underline\" }, [\n            _vm._v(\" See Our Feature Page For Details \")\n          ]),\n          _c(\n            \"v-row\",\n            { staticClass: \"mt-9\" },\n            [\n              _c(\n                \"v-col\",\n                {\n                  staticStyle: { \"margin-left\": \"75px\" },\n                  attrs: { cols: \"6\" }\n                },\n                [\n                  _c(\n                    \"v-row\",\n                    [\n                      _c(\n                        \"v-col\",\n                        { staticClass: \"px-7\", attrs: { cols: \"2\" } },\n                        [\n                          _c(\"v-img\", {\n                            staticStyle: { transform: \"rotate(44deg)\" },\n                            attrs: { src: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\") }\n                          })\n                        ],\n                        1\n                      ),\n                      _c(\n                        \"v-col\",\n                        {\n                          staticStyle: { \"margin-left\": \"-17px\" },\n                          attrs: { cols: \"10\" }\n                        },\n                        [\n                          _c(\"div\", [_vm._v(\"Live Call Answering\")]),\n                          _c(\"div\", [\n                            _vm._v(\n                              \"Our friendly, US-based receptionists will make sure all your calls are answered promptly.\"\n                            )\n                          ])\n                        ]\n                      )\n                    ],\n                    1\n                  ),\n                  _c(\n                    \"v-row\",\n                    [\n                      _c(\n                        \"v-col\",\n                        { staticClass: \"px-7\", attrs: { cols: \"2\" } },\n                        [\n                          _c(\"v-img\", {\n                            staticStyle: { transform: \"rotate(44deg)\" },\n                            attrs: { src: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\") }\n                          })\n                        ],\n                        1\n                      ),\n                      _c(\n                        \"v-col\",\n                        {\n                          staticStyle: { \"margin-left\": \"-17px\" },\n                          attrs: { cols: \"10\" }\n                        },\n                        [\n                          _c(\"div\", [_vm._v(\"Outbound calls\")]),\n                          _c(\"div\", [\n                            _vm._v(\n                              \"From appointment reminders to follow-up sales calls. We can even make a dinner reservation! - you name it.\"\n                            )\n                          ])\n                        ]\n                      )\n                    ],\n                    1\n                  ),\n                  _c(\n                    \"v-row\",\n                    [\n                      _c(\n                        \"v-col\",\n                        { staticClass: \"px-7\", attrs: { cols: \"2\" } },\n                        [\n                          _c(\"v-img\", {\n                            staticStyle: { transform: \"rotate(44deg)\" },\n                            attrs: { src: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\") }\n                          })\n                        ],\n                        1\n                      ),\n                      _c(\n                        \"v-col\",\n                        {\n                          staticStyle: { \"margin-left\": \"-17px\" },\n                          attrs: { cols: \"10\" }\n                        },\n                        [\n                          _c(\"div\", [_vm._v(\"Dedicated receptionists team\")]),\n                          _c(\"div\", [\n                            _vm._v(\n                              \"You and your receptionist team will become familiar with each other and be able to communicate directly.\"\n                            )\n                          ])\n                        ]\n                      )\n                    ],\n                    1\n                  ),\n                  _c(\n                    \"v-row\",\n                    [\n                      _c(\n                        \"v-col\",\n                        { staticClass: \"px-7\", attrs: { cols: \"2\" } },\n                        [\n                          _c(\"v-img\", {\n                            staticStyle: { transform: \"rotate(44deg)\" },\n                            attrs: { src: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\") }\n                          })\n                        ],\n                        1\n                      ),\n                      _c(\n                        \"v-col\",\n                        {\n                          staticStyle: { \"margin-left\": \"-17px\" },\n                          attrs: { cols: \"10\" }\n                        },\n                        [\n                          _c(\"div\", [\n                            _vm._v(\"Call summary delivered via email\")\n                          ]),\n                          _c(\"div\", [\n                            _vm._v(\n                              \"This way, you can always be in the loop with your phone calls and your business.\"\n                            )\n                          ])\n                        ]\n                      )\n                    ],\n                    1\n                  ),\n                  _c(\n                    \"v-row\",\n                    [\n                      _c(\n                        \"v-col\",\n                        { staticClass: \"px-7\", attrs: { cols: \"2\" } },\n                        [\n                          _c(\"v-img\", {\n                            staticStyle: { transform: \"rotate(44deg)\" },\n                            attrs: { src: __webpack_require__(/*! @/assets/iconlogo.svg */ \"./src/assets/iconlogo.svg\") }\n                          })\n                        ],\n                        1\n                      ),\n                      _c(\n                        \"v-col\",\n                        {\n                          staticStyle: { \"margin-left\": \"-17px\" },\n                          attrs: { cols: \"10\" }\n                        },\n                        [\n                          _c(\"div\", [_vm._v(\"Call screening and forwarding\")]),\n                          _c(\"div\", [\n                            _vm._v(\n                              \"We will screen and announce any phone calls before we transfer them to you.\"\n                            )\n                          ])\n                        ]\n                      )\n                    ],\n                    1\n                  )\n                ],\n                1\n              ),\n              _c(\n                \"v-col\",\n                {\n                  staticStyle: { \"margin-right\": \"-102px\" },\n                  attrs: { cols: \"6\" }\n                },\n                _vm._l(_vm.items, function(item) {\n                  return _c(\n                    \"v-row\",\n                    { key: item.title },\n                    [\n                      _c(\n                        \"v-col\",\n                        { staticClass: \"px-7\", attrs: { cols: \"2\" } },\n                        [\n                          _c(\"v-img\", {\n                            staticStyle: { transform: \"rotate(44deg)\" },\n                            attrs: { src: item.img }\n                          })\n                        ],\n                        1\n                      ),\n                      _c(\n                        \"v-col\",\n                        {\n                          staticStyle: { \"margin-left\": \"-17px\" },\n                          attrs: { cols: \"10\" }\n                        },\n                        [\n                          _c(\"div\", [_vm._v(_vm._s(item.title))]),\n                          _c(\"div\", [_vm._v(_vm._s(item.subtitle))])\n                        ]\n                      )\n                    ],\n                    1\n                  )\n                }),\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      ),\n      _c(\n        \"v-row\",\n        [\n          _c(\"v-col\"),\n          _c(\n            \"v-col\",\n            { staticClass: \"text-center mt-8 px-9 py-9\" },\n            [\n              _c(\"div\", [_vm._v(\" Isn't it time you got some help? \")]),\n              _c(\n                \"v-btn\",\n                {\n                  staticClass: \"mt-1\",\n                  attrs: { block: \"\", elevation: \"10\", color: \"#ff554d\" }\n                },\n                [_vm._v(\" START YOUR FREE TRIAL TODAY \")]\n              ),\n              _c(\n                \"v-btn\",\n                {\n                  staticClass: \"mt-3 mb-4\",\n                  attrs: { block: \"\", text: \"\", color: \"black\" }\n                },\n                [_vm._v(\" OR CONTACT US FOR MORE INFORMATION \")]\n              )\n            ],\n            1\n          ),\n          _c(\"v-col\")\n        ],\n        1\n      ),\n      _c(\n        \"div\",\n        { staticClass: \"mt-6\", staticStyle: { \"background-color\": \"#33f\" } },\n        [\n          _c(\n            \"v-container\",\n            [\n              _c(\n                \"v-row\",\n                { staticClass: \" py-14 white--text \" },\n                _vm._l(_vm.bgblueItem, function(item) {\n                  return _c(\n                    \"v-col\",\n                    { key: item.title, attrs: { cols: \"6\" } },\n                    [\n                      _c(\n                        \"v-row\",\n                        {},\n                        [\n                          _c(\n                            \"v-col\",\n                            { attrs: { offset: \"4\" } },\n                            [\n                              _c(\"v-icon\", { attrs: { color: \"white\" } }, [\n                                _vm._v(\"mdi-\" + _vm._s(item.icon))\n                              ]),\n                              _vm._v(\" \" + _vm._s(item.title) + \" \")\n                            ],\n                            1\n                          )\n                        ],\n                        1\n                      )\n                    ],\n                    1\n                  )\n                }),\n                1\n              )\n            ],\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/whatyouget.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225e885572-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=template&id=fae5bece&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5e885572-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=template&id=fae5bece& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"home\" },\n    [_c(\"Header\"), _c(\"Wuget\"), _c(\"PlanPrice\"), _c(\"Forms\")],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225e885572-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VApp */ \"./node_modules/vuetify/lib/components/VApp/index.js\");\n/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ \"./node_modules/vuetify/lib/components/VCard/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ \"./node_modules/vuetify/lib/components/VDivider/index.js\");\n/* harmony import */ var vuetify_lib_components_VFooter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VFooter */ \"./node_modules/vuetify/lib/components/VFooter/index.js\");\n/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ \"./node_modules/vuetify/lib/components/VIcon/index.js\");\n/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VImg */ \"./node_modules/vuetify/lib/components/VImg/index.js\");\n/* harmony import */ var vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VMain */ \"./node_modules/vuetify/lib/components/VMain/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VApp: vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_4__[\"VApp\"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCard\"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCardText\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VCol\"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__[\"VDivider\"],VFooter: vuetify_lib_components_VFooter__WEBPACK_IMPORTED_MODULE_8__[\"VFooter\"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__[\"VIcon\"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_10__[\"VImg\"],VMain: vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_11__[\"VMain\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VRow\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5e885572-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/assets/iconlogo.svg":
/*!*********************************!*\
  !*** ./src/assets/iconlogo.svg ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/iconlogo.1a71eb8a.svg\";\n\n//# sourceURL=webpack:///./src/assets/iconlogo.svg?");

/***/ }),

/***/ "./src/assets/reception.png":
/*!**********************************!*\
  !*** ./src/assets/reception.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/reception.58093edd.png\";\n\n//# sourceURL=webpack:///./src/assets/reception.png?");

/***/ }),

/***/ "./src/assets/sharkform.svg":
/*!**********************************!*\
  !*** ./src/assets/sharkform.svg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/sharkform.bf34b841.svg\";\n\n//# sourceURL=webpack:///./src/assets/sharkform.svg?");

/***/ }),

/***/ "./src/assets/weblogo.svg":
/*!********************************!*\
  !*** ./src/assets/weblogo.svg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/weblogo.d0ca09ff.svg\";\n\n//# sourceURL=webpack:///./src/assets/weblogo.svg?");

/***/ }),

/***/ "./src/components/forms.vue":
/*!**********************************!*\
  !*** ./src/components/forms.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _forms_vue_vue_type_template_id_3784ae62_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms.vue?vue&type=template&id=3784ae62&scoped=true& */ \"./src/components/forms.vue?vue&type=template&id=3784ae62&scoped=true&\");\n/* harmony import */ var _forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms.vue?vue&type=script&lang=js& */ \"./src/components/forms.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ \"./node_modules/vuetify/lib/components/VCard/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ \"./node_modules/vuetify/lib/components/VDivider/index.js\");\n/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ \"./node_modules/vuetify/lib/components/VIcon/index.js\");\n/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VImg */ \"./node_modules/vuetify/lib/components/VImg/index.js\");\n/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ \"./node_modules/vuetify/lib/components/VTextField/index.js\");\n/* harmony import */ var vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VTextarea */ \"./node_modules/vuetify/lib/components/VTextarea/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _forms_vue_vue_type_template_id_3784ae62_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _forms_vue_vue_type_template_id_3784ae62_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"3784ae62\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__[\"VBtn\"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCard\"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCardActions\"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCardText\"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCardTitle\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VCol\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VContainer\"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_7__[\"VDivider\"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__[\"VIcon\"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_9__[\"VImg\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VRow\"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__[\"VTextField\"],VTextarea: vuetify_lib_components_VTextarea__WEBPACK_IMPORTED_MODULE_11__[\"VTextarea\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/forms.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/forms.vue?");

/***/ }),

/***/ "./src/components/forms.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/components/forms.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./forms.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/forms.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_forms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/forms.vue?");

/***/ }),

/***/ "./src/components/forms.vue?vue&type=template&id=3784ae62&scoped=true&":
/*!*****************************************************************************!*\
  !*** ./src/components/forms.vue?vue&type=template&id=3784ae62&scoped=true& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_forms_vue_vue_type_template_id_3784ae62_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./forms.vue?vue&type=template&id=3784ae62&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5e885572-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/forms.vue?vue&type=template&id=3784ae62&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_forms_vue_vue_type_template_id_3784ae62_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_forms_vue_vue_type_template_id_3784ae62_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/forms.vue?");

/***/ }),

/***/ "./src/components/header.vue":
/*!***********************************!*\
  !*** ./src/components/header.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _header_vue_vue_type_template_id_29e8c3c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.vue?vue&type=template&id=29e8c3c6&scoped=true& */ \"./src/components/header.vue?vue&type=template&id=29e8c3c6&scoped=true&\");\n/* harmony import */ var _header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.vue?vue&type=script&lang=js& */ \"./src/components/header.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VImg */ \"./node_modules/vuetify/lib/components/VImg/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _header_vue_vue_type_template_id_29e8c3c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _header_vue_vue_type_template_id_29e8c3c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"29e8c3c6\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__[\"VBtn\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__[\"VCol\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__[\"VContainer\"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_6__[\"VImg\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__[\"VRow\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/header.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/header.vue?");

/***/ }),

/***/ "./src/components/header.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/components/header.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./header.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/header.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/header.vue?");

/***/ }),

/***/ "./src/components/header.vue?vue&type=template&id=29e8c3c6&scoped=true&":
/*!******************************************************************************!*\
  !*** ./src/components/header.vue?vue&type=template&id=29e8c3c6&scoped=true& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_29e8c3c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./header.vue?vue&type=template&id=29e8c3c6&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5e885572-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/header.vue?vue&type=template&id=29e8c3c6&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_29e8c3c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_29e8c3c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/header.vue?");

/***/ }),

/***/ "./src/components/hero.vue":
/*!*********************************!*\
  !*** ./src/components/hero.vue ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hero_vue_vue_type_template_id_a54ee9ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hero.vue?vue&type=template&id=a54ee9ec& */ \"./src/components/hero.vue?vue&type=template&id=a54ee9ec&\");\n/* harmony import */ var _hero_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hero.vue?vue&type=script&lang=js& */ \"./src/components/hero.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VAppBar */ \"./node_modules/vuetify/lib/components/VAppBar/index.js\");\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VImg */ \"./node_modules/vuetify/lib/components/VImg/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _hero_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _hero_vue_vue_type_template_id_a54ee9ec___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _hero_vue_vue_type_template_id_a54ee9ec___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VAppBar: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_4__[\"VAppBar\"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__[\"VBtn\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VCol\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VContainer\"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__[\"VImg\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VRow\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/hero.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/hero.vue?");

/***/ }),

/***/ "./src/components/hero.vue?vue&type=script&lang=js&":
/*!**********************************************************!*\
  !*** ./src/components/hero.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hero_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./hero.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/hero.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hero_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/hero.vue?");

/***/ }),

/***/ "./src/components/hero.vue?vue&type=template&id=a54ee9ec&":
/*!****************************************************************!*\
  !*** ./src/components/hero.vue?vue&type=template&id=a54ee9ec& ***!
  \****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hero_vue_vue_type_template_id_a54ee9ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./hero.vue?vue&type=template&id=a54ee9ec& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5e885572-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/hero.vue?vue&type=template&id=a54ee9ec&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hero_vue_vue_type_template_id_a54ee9ec___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hero_vue_vue_type_template_id_a54ee9ec___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/hero.vue?");

/***/ }),

/***/ "./src/components/plansandpricing.vue":
/*!********************************************!*\
  !*** ./src/components/plansandpricing.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plansandpricing_vue_vue_type_template_id_435a1cce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true& */ \"./src/components/plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true&\");\n/* harmony import */ var _plansandpricing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plansandpricing.vue?vue&type=script&lang=js& */ \"./src/components/plansandpricing.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ \"./node_modules/vuetify/lib/components/VCard/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _plansandpricing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _plansandpricing_vue_vue_type_template_id_435a1cce_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _plansandpricing_vue_vue_type_template_id_435a1cce_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"435a1cce\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__[\"VBtn\"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCard\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VCol\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VContainer\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VRow\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/plansandpricing.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/plansandpricing.vue?");

/***/ }),

/***/ "./src/components/plansandpricing.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./src/components/plansandpricing.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_plansandpricing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./plansandpricing.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/plansandpricing.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_plansandpricing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/plansandpricing.vue?");

/***/ }),

/***/ "./src/components/plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./src/components/plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_plansandpricing_vue_vue_type_template_id_435a1cce_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5e885572-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/plansandpricing.vue?vue&type=template&id=435a1cce&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_plansandpricing_vue_vue_type_template_id_435a1cce_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_plansandpricing_vue_vue_type_template_id_435a1cce_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/plansandpricing.vue?");

/***/ }),

/***/ "./src/components/whatyouget.vue":
/*!***************************************!*\
  !*** ./src/components/whatyouget.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _whatyouget_vue_vue_type_template_id_6bfa632b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true& */ \"./src/components/whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true&\");\n/* harmony import */ var _whatyouget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./whatyouget.vue?vue&type=script&lang=js& */ \"./src/components/whatyouget.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ \"./node_modules/vuetify/lib/components/VIcon/index.js\");\n/* harmony import */ var vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VImg */ \"./node_modules/vuetify/lib/components/VImg/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _whatyouget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _whatyouget_vue_vue_type_template_id_6bfa632b_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _whatyouget_vue_vue_type_template_id_6bfa632b_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"6bfa632b\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__[\"VBtn\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__[\"VCol\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__[\"VContainer\"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_6__[\"VIcon\"],VImg: vuetify_lib_components_VImg__WEBPACK_IMPORTED_MODULE_7__[\"VImg\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_5__[\"VRow\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/whatyouget.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/whatyouget.vue?");

/***/ }),

/***/ "./src/components/whatyouget.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/components/whatyouget.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_whatyouget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./whatyouget.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/whatyouget.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_whatyouget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/whatyouget.vue?");

/***/ }),

/***/ "./src/components/whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true&":
/*!**********************************************************************************!*\
  !*** ./src/components/whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_whatyouget_vue_vue_type_template_id_6bfa632b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5e885572-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/whatyouget.vue?vue&type=template&id=6bfa632b&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_whatyouget_vue_vue_type_template_id_6bfa632b_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_whatyouget_vue_vue_type_template_id_6bfa632b_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/whatyouget.vue?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_umer_W_epicreceptionist_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _plugins_vuetify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plugins/vuetify */ \"./src/plugins/vuetify.js\");\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  vuetify: _plugins_vuetify__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/plugins/vuetify.js":
/*!********************************!*\
  !*** ./src/plugins/vuetify.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuetify_lib_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify/lib/framework */ \"./node_modules/vuetify/lib/framework.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuetify_lib_framework__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuetify_lib_framework__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({}));\n\n//# sourceURL=webpack:///./src/plugins/vuetify.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _views_Home_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/Home.vue */ \"./src/views/Home.vue\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar routes = [{\n  path: '/',\n  name: 'Home',\n  component: _views_Home_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n}, {\n  path: '/about',\n  name: 'About',\n  // route level code-splitting\n  // this generates a separate chunk (about.[hash].js) for this route\n  // which is lazy-loaded when the route is visited.\n  component: function component() {\n    return __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(null, /*! ../views/About.vue */ \"./src/views/About.vue\"));\n  }\n}, {\n  path: '/contact-us',\n  name: 'Contact-Us',\n  // route level code-splitting\n  // this generates a separate chunk (about.[hash].js) for this route\n  // which is lazy-loaded when the route is visited.\n  component: function component() {\n    return __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(null, /*! ../views/ContactUs.vue */ \"./src/views/ContactUs.vue\"));\n  }\n}, {\n  path: '/faqs',\n  name: 'Faqs',\n  // route level code-splitting\n  // this generates a separate chunk (about.[hash].js) for this route\n  // which is lazy-loaded when the route is visited.\n  component: function component() {\n    return __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(null, /*! ../views/faqs.vue */ \"./src/views/faqs.vue\"));\n  }\n}, {\n  path: '/blog',\n  name: 'Blog',\n  // route level code-splitting\n  // this generates a separate chunk (about.[hash].js) for this route\n  // which is lazy-loaded when the route is visited.\n  component: function component() {\n    return __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(null, /*! ../views/Blog.vue */ \"./src/views/Blog.vue\"));\n  }\n}, {\n  path: '/blog-1',\n  name: 'Blog-1',\n  // route level code-splitting\n  // this generates a separate chunk (about.[hash].js) for this route\n  // which is lazy-loaded when the route is visited.\n  component: function component() {\n    return __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(null, /*! ../components/blogs/blog-1.vue */ \"./src/components/blogs/blog-1.vue\"));\n  }\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  base: \"/\",\n  mode: 'hash',\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/views/Home.vue":
/*!****************************!*\
  !*** ./src/views/Home.vue ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=fae5bece& */ \"./src/views/Home.vue?vue&type=template&id=fae5bece&\");\n/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ \"./src/views/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/Home.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ "./src/views/Home.vue?vue&type=script&lang=js&":
/*!*****************************************************!*\
  !*** ./src/views/Home.vue?vue&type=script&lang=js& ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ "./src/views/Home.vue?vue&type=template&id=fae5bece&":
/*!***********************************************************!*\
  !*** ./src/views/Home.vue?vue&type=template&id=fae5bece& ***!
  \***********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5e885572-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=fae5bece& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5e885572-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=template&id=fae5bece&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5e885572_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });