/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/***/ (() => {

eval("  `use strict`;\r\n  // import {revealSignInForm, signUpForm, signInForm, signUpBtn, signInBtn}  from '/assets/js/sharedJs/header-footer-and-sign-modal.js'\r\nconst printNowBtn = document.getElementById(`print-now-btn`) \r\nconst signInBtn = document.querySelector(\".sign-in-btn\");\r\nconst signUpBtn = document.querySelector(\".sign-up-btn\");\r\nconst signInForm = document.querySelector(\".sign-in-form\");\r\nconst signUpForm = document.querySelector(\".sign-up-form\"); \r\n\r\nprintNowBtn.addEventListener(`click` , goToPrint)\r\nfunction goToPrint() {\r\n  if (localStorage.getItem('token')) {\r\n    window.location.href = '/pages/printing-options.html'\r\n  } else {\r\n    // Make user sign in first \r\n    console.log(' print now clicked')\r\n  // revealSignInForm();\r\n  signInForm.classList.remove(\"hidden\");\r\n  signUpForm.classList.add(\"hidden\");\r\n  signInBtn.classList.add(`activeBtn`);\r\n  signUpBtn.classList.remove(`activeBtn`);\r\n  alert(' Please sign in first ')\r\n  \r\n\r\n  }\r\n  \r\n}\n\n//# sourceURL=webpack:///./assets/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/app.js"]();
/******/ 	
/******/ })()
;