"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/producto/editar/[url]",{

/***/ "./pages/producto/editar/[url].jsx":
/*!*****************************************!*\
  !*** ./pages/producto/editar/[url].jsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/layout/Layout */ \"./components/layout/Layout.jsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_productos_Formulario__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/productos/Formulario */ \"./components/productos/Formulario.jsx\");\n/* harmony import */ var _context_productos_productoContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/productos/productoContext */ \"./context/productos/productoContext.jsx\");\n/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/auth/authContext */ \"./context/auth/authContext.jsx\");\n/* harmony import */ var _components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/productos/NoEncontrado */ \"./components/productos/NoEncontrado.jsx\");\nvar _this = undefined;\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Edicion = function(param) {\n    var productoEditar = param.productoEditar;\n    _s();\n    var AuthContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    var usuarioAutenticado = AuthContext.usuarioAutenticado, usuario = AuthContext.usuario;\n    var productosContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_productos_productoContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    var productoActual = productosContext.productoActual;\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true), coincide = ref[0], setCoincide = ref[1];\n    //Autentico al usuario y agrego el producto actual al state\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        usuarioAutenticado();\n    }, []);\n    //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        if (usuario) {\n            if (productoEditar) {\n                productoActual(productoEditar);\n            }\n            if (productoEditar.creador !== usuario.id) {\n                setCoincide(false);\n            }\n        }\n    }, [\n        usuario\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: coincide ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n            pagina: \"Editar - \".concat(productoEditar.nombre),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_productos_Formulario__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                productoEditar: productoEditar\n            }, productoEditar._id, false, {\n                fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n                lineNumber: 42,\n                columnNumber: 11\n            }, _this)\n        }, void 0, false, {\n            fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n            lineNumber: 41,\n            columnNumber: 9\n        }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n            fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n            lineNumber: 47,\n            columnNumber: 10\n        }, _this)\n    }, void 0, false);\n};\n_s(Edicion, \"vZtnCCGGBzkBG5vrjET6tNkJKJg=\");\n_c = Edicion;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edicion);\nvar _c;\n$RefreshReg$(_c, \"Edicion\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wcm9kdWN0by9lZGl0YXIvW3VybF0uanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRDtBQUdDO0FBQ1U7QUFDTztBQUNiO0FBQ1U7O0FBRXJFLEdBQUssQ0FBQ1EsT0FBTyxHQUFHLFFBQVEsUUFBYyxDQUFDO1FBQXJCQyxjQUFjLFNBQWRBLGNBQWM7O0lBRTlCLEdBQUssQ0FBQ0MsV0FBVyxHQUFHVCxpREFBVSxDQUFDSyxpRUFBVztJQUMxQyxHQUFLLENBQUVLLGtCQUFrQixHQUFhRCxXQUFXLENBQTFDQyxrQkFBa0IsRUFBRUMsT0FBTyxHQUFJRixXQUFXLENBQXRCRSxPQUFPO0lBRWxDLEdBQUssQ0FBQ0MsZ0JBQWdCLEdBQUdaLGlEQUFVLENBQUNJLDBFQUFlO0lBQ25ELEdBQUssQ0FBRVMsY0FBYyxHQUFJRCxnQkFBZ0IsQ0FBbENDLGNBQWM7SUFFckIsR0FBSyxDQUEyQlgsR0FBYyxHQUFkQSwrQ0FBUSxDQUFDLElBQUksR0FBdENZLFFBQVEsR0FBaUJaLEdBQWMsS0FBN0JhLFdBQVcsR0FBSWIsR0FBYztJQUU5QyxFQUEyRDtJQUMzREQsZ0RBQVMsQ0FBQyxRQUFRLEdBQUYsQ0FBQztRQUNmUyxrQkFBa0I7SUFDcEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVMLEVBQStGO0lBQy9GVCxnREFBUyxDQUFDLFFBQVEsR0FBRixDQUFDO1FBQ2YsRUFBRSxFQUFDVSxPQUFPLEVBQUUsQ0FBQztZQUNYLEVBQUUsRUFBQ0gsY0FBYyxFQUFFLENBQUM7Z0JBQ2xCSyxjQUFjLENBQUNMLGNBQWM7WUFDL0IsQ0FBQztZQUNELEVBQUUsRUFBQ0EsY0FBYyxDQUFDUSxPQUFPLEtBQUtMLE9BQU8sQ0FBQ00sRUFBRSxFQUFDLENBQUM7Z0JBQ3hDRixXQUFXLENBQUMsS0FBSztZQUNuQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsRUFBRSxDQUFDSjtRQUFBQSxPQUFPO0lBQUEsQ0FBQztJQUdaLE1BQU07a0JBRURHLFFBQVEsK0VBQ05mLGlFQUFNO1lBQUNtQixNQUFNLEVBQUcsQ0FBUyxXQUF3QixPQUF0QlYsY0FBYyxDQUFDVyxNQUFNO2tHQUM5Q2hCLHdFQUFVO2dCQUVUSyxjQUFjLEVBQUVBLGNBQWM7ZUFEekJBLGNBQWMsQ0FBQ1ksR0FBRzs7Ozs7Ozs7O2dHQUl6QmQsMEVBQVk7Ozs7OztBQUt0QixDQUFDO0dBMUNLQyxPQUFPO0tBQVBBLE9BQU87O0FBc0RiLCtEQUFlQSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcHJvZHVjdG8vZWRpdGFyL1t1cmxdLmpzeD9hYjUxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXlvdXQgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvbGF5b3V0L0xheW91dFwiO1xyXG5pbXBvcnQgY2xpZW50ZUF4aW9zIGZyb20gXCIuLi8uLi8uLi9jb25maWcvYXhpb3NcIjtcclxuaW1wb3J0IGRiQ29ubmVjdCBmcm9tIFwiLi4vLi4vLi4vbGliL2RiQ29ubmVjdFwiO1xyXG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRm9ybXVsYXJpbyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0b3MvRm9ybXVsYXJpb1wiO1xyXG5pbXBvcnQgcHJvZHVjdG9Db250ZXh0IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L3Byb2R1Y3Rvcy9wcm9kdWN0b0NvbnRleHRcIjtcclxuaW1wb3J0IGF1dGhDb250ZXh0IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L2F1dGgvYXV0aENvbnRleHRcIjtcclxuaW1wb3J0IE5vRW5jb250cmFkbyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0b3MvTm9FbmNvbnRyYWRvXCI7XHJcblxyXG5jb25zdCBFZGljaW9uID0gKHtwcm9kdWN0b0VkaXRhcn0pID0+IHtcclxuXHJcbiAgY29uc3QgQXV0aENvbnRleHQgPSB1c2VDb250ZXh0KGF1dGhDb250ZXh0KVxyXG4gIGNvbnN0IHt1c3VhcmlvQXV0ZW50aWNhZG8sIHVzdWFyaW99ID0gQXV0aENvbnRleHRcclxuXHJcbiAgY29uc3QgcHJvZHVjdG9zQ29udGV4dCA9IHVzZUNvbnRleHQocHJvZHVjdG9Db250ZXh0KVxyXG4gIGNvbnN0IHtwcm9kdWN0b0FjdHVhbH0gPSBwcm9kdWN0b3NDb250ZXh0XHJcblxyXG4gIGNvbnN0IFtjb2luY2lkZSwgc2V0Q29pbmNpZGVdID0gdXNlU3RhdGUodHJ1ZSlcclxuXHJcbiAgLy9BdXRlbnRpY28gYWwgdXN1YXJpbyB5IGFncmVnbyBlbCBwcm9kdWN0byBhY3R1YWwgYWwgc3RhdGVcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgdXN1YXJpb0F1dGVudGljYWRvKClcclxuICB9LCBbXSlcclxuICBcclxuICAvL0N1YW5kbyBtZSBhdXRlbnRpcXVlLCB2ZXJpZmljbyBxdWUgZWwgcHJvZHVjdG8gcXVlIHRyYWlnbyBlcyBlbCBkZWwgdXN1YXJpbyBxdWUgZXN0w6EgbG9ndWVhZG9cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYodXN1YXJpbykge1xyXG4gICAgICBpZihwcm9kdWN0b0VkaXRhcikge1xyXG4gICAgICAgIHByb2R1Y3RvQWN0dWFsKHByb2R1Y3RvRWRpdGFyKVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHByb2R1Y3RvRWRpdGFyLmNyZWFkb3IgIT09IHVzdWFyaW8uaWQpe1xyXG4gICAgICAgIHNldENvaW5jaWRlKGZhbHNlKVxyXG4gICAgICB9ICBcclxuICAgIH1cclxuICB9LCBbdXN1YXJpb10pXHJcblxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAge2NvaW5jaWRlID8gKFxyXG4gICAgICAgIDxMYXlvdXQgcGFnaW5hPXtgRWRpdGFyIC0gJHtwcm9kdWN0b0VkaXRhci5ub21icmV9YH0+XHJcbiAgICAgICAgICA8Rm9ybXVsYXJpb1xyXG4gICAgICAgICAgICBrZXk9e3Byb2R1Y3RvRWRpdGFyLl9pZH1cclxuICAgICAgICAgICAgcHJvZHVjdG9FZGl0YXI9e3Byb2R1Y3RvRWRpdGFyfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0xheW91dD5cclxuICAgICAgKTogPE5vRW5jb250cmFkby8+XHJcbiAgICAgIH1cclxuICAgIDwvPlxyXG4gICAgXHJcbiAgKVxyXG59O1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyh7IHBhcmFtczoge3VybH0gfSkge1xyXG4gIGF3YWl0IGRiQ29ubmVjdCgpXHJcbiAgY29uc3QgcmVzcHVlc3RhID0gYXdhaXQgY2xpZW50ZUF4aW9zLmdldChgL2FwaS9wcm9kdWN0b3MvJHt1cmx9YClcclxuICBpZihyZXNwdWVzdGEuZGF0YS5yZWRpcmVjY2lvbmFyKSB7XHJcbiAgICByZXR1cm4ge25vdEZvdW5kOiB0cnVlfVxyXG4gIH1cclxuICBjb25zdCBwcm9kdWN0b0VkaXRhciA9IHJlc3B1ZXN0YS5kYXRhLnByb2R1Y3RvXHJcbiAgcmV0dXJuIHsgcHJvcHM6IHsgcHJvZHVjdG9FZGl0YXIgfX1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRWRpY2lvbjtcclxuIl0sIm5hbWVzIjpbIkxheW91dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkZvcm11bGFyaW8iLCJwcm9kdWN0b0NvbnRleHQiLCJhdXRoQ29udGV4dCIsIk5vRW5jb250cmFkbyIsIkVkaWNpb24iLCJwcm9kdWN0b0VkaXRhciIsIkF1dGhDb250ZXh0IiwidXN1YXJpb0F1dGVudGljYWRvIiwidXN1YXJpbyIsInByb2R1Y3Rvc0NvbnRleHQiLCJwcm9kdWN0b0FjdHVhbCIsImNvaW5jaWRlIiwic2V0Q29pbmNpZGUiLCJjcmVhZG9yIiwiaWQiLCJwYWdpbmEiLCJub21icmUiLCJfaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/producto/editar/[url].jsx\n");

/***/ })

});