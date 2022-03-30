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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/layout/Layout */ \"./components/layout/Layout.jsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_productos_Formulario__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/productos/Formulario */ \"./components/productos/Formulario.jsx\");\n/* harmony import */ var _context_productos_productoContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/productos/productoContext */ \"./context/productos/productoContext.jsx\");\n/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/auth/authContext */ \"./context/auth/authContext.jsx\");\n/* harmony import */ var _components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/productos/NoEncontrado */ \"./components/productos/NoEncontrado.jsx\");\nvar _this = undefined;\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Edicion = function(param) {\n    var productoEditar = param.productoEditar;\n    _s();\n    var AuthContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    var usuarioAutenticado = AuthContext.usuarioAutenticado, usuario = AuthContext.usuario;\n    var productosContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_productos_productoContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    var productoActual = productosContext.productoActual;\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true), coincide = ref[0], setCoincide = ref[1];\n    //Autentico al usuario y agrego el producto actual al state\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        usuarioAutenticado();\n        setTimeout(function() {\n            setCoincide(false);\n        }, 3000);\n    }, []);\n    //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        if (usuario) {\n            productoActual(productoEditar);\n            if (productoEditar.creador !== usuario.id) {\n                setCoincide(false);\n            }\n        }\n    }, [\n        usuario\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        console.log(usuario);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: usuario && coincide ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n            pagina: \"Editar - \".concat(productoEditar.nombre),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_productos_Formulario__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                productoEditar: productoEditar\n            }, productoEditar._id, false, {\n                fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n                lineNumber: 46,\n                columnNumber: 11\n            }, _this)\n        }, void 0, false, {\n            fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n            lineNumber: 45,\n            columnNumber: 9\n        }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n            fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n            lineNumber: 51,\n            columnNumber: 10\n        }, _this)\n    }, void 0, false);\n};\n_s(Edicion, \"g8LmkGJt8UAhs/sUvOv41ZuyMck=\");\n_c = Edicion;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edicion);\nvar _c;\n$RefreshReg$(_c, \"Edicion\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wcm9kdWN0by9lZGl0YXIvW3VybF0uanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRDtBQUdDO0FBQ1U7QUFDTztBQUNiO0FBQ1U7O0FBRXJFLEdBQUssQ0FBQ1EsT0FBTyxHQUFHLFFBQVEsUUFBYyxDQUFDO1FBQXJCQyxjQUFjLFNBQWRBLGNBQWM7O0lBRTlCLEdBQUssQ0FBQ0MsV0FBVyxHQUFHVCxpREFBVSxDQUFDSyxpRUFBVztJQUMxQyxHQUFLLENBQUVLLGtCQUFrQixHQUFhRCxXQUFXLENBQTFDQyxrQkFBa0IsRUFBRUMsT0FBTyxHQUFJRixXQUFXLENBQXRCRSxPQUFPO0lBRWxDLEdBQUssQ0FBQ0MsZ0JBQWdCLEdBQUdaLGlEQUFVLENBQUNJLDBFQUFlO0lBQ25ELEdBQUssQ0FBRVMsY0FBYyxHQUFJRCxnQkFBZ0IsQ0FBbENDLGNBQWM7SUFFckIsR0FBSyxDQUEyQlgsR0FBYyxHQUFkQSwrQ0FBUSxDQUFDLElBQUksR0FBdENZLFFBQVEsR0FBaUJaLEdBQWMsS0FBN0JhLFdBQVcsR0FBSWIsR0FBYztJQUU5QyxFQUEyRDtJQUMzREQsZ0RBQVMsQ0FBQyxRQUFRLEdBQUYsQ0FBQztRQUNmUyxrQkFBa0I7UUFDbEJNLFVBQVUsQ0FBQyxRQUFRLEdBQUYsQ0FBQztZQUNoQkQsV0FBVyxDQUFDLEtBQUs7UUFDbkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVMLEVBQStGO0lBQy9GZCxnREFBUyxDQUFDLFFBQVEsR0FBRixDQUFDO1FBQ2YsRUFBRSxFQUFDVSxPQUFPLEVBQUUsQ0FBQztZQUNYRSxjQUFjLENBQUNMLGNBQWM7WUFDN0IsRUFBRSxFQUFDQSxjQUFjLENBQUNTLE9BQU8sS0FBS04sT0FBTyxDQUFDTyxFQUFFLEVBQUMsQ0FBQztnQkFDeENILFdBQVcsQ0FBQyxLQUFLO1lBQ25CLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxFQUFFLENBQUNKO1FBQUFBLE9BQU87SUFBQSxDQUFDO0lBRVpWLGdEQUFTLENBQUMsUUFBUSxHQUFGLENBQUM7UUFDZmtCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDVCxPQUFPO0lBQ3JCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFTCxNQUFNO2tCQUVEQSxPQUFPLElBQUlHLFFBQVEsK0VBQ2pCZixpRUFBTTtZQUFDc0IsTUFBTSxFQUFHLENBQVMsV0FBd0IsT0FBdEJiLGNBQWMsQ0FBQ2MsTUFBTTtrR0FDOUNuQix3RUFBVTtnQkFFVEssY0FBYyxFQUFFQSxjQUFjO2VBRHpCQSxjQUFjLENBQUNlLEdBQUc7Ozs7Ozs7OztnR0FJekJqQiwwRUFBWTs7Ozs7O0FBS3RCLENBQUM7R0E5Q0tDLE9BQU87S0FBUEEsT0FBTzs7QUEwRGIsK0RBQWVBLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9wcm9kdWN0by9lZGl0YXIvW3VybF0uanN4P2FiNTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheW91dCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9sYXlvdXQvTGF5b3V0XCI7XHJcbmltcG9ydCBjbGllbnRlQXhpb3MgZnJvbSBcIi4uLy4uLy4uL2NvbmZpZy9heGlvc1wiO1xyXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gXCIuLi8uLi8uLi9saWIvZGJDb25uZWN0XCI7XHJcbmltcG9ydCB7IHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGb3JtdWxhcmlvIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Byb2R1Y3Rvcy9Gb3JtdWxhcmlvXCI7XHJcbmltcG9ydCBwcm9kdWN0b0NvbnRleHQgZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvcHJvZHVjdG9zL3Byb2R1Y3RvQ29udGV4dFwiO1xyXG5pbXBvcnQgYXV0aENvbnRleHQgZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvYXV0aC9hdXRoQ29udGV4dFwiO1xyXG5pbXBvcnQgTm9FbmNvbnRyYWRvIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Byb2R1Y3Rvcy9Ob0VuY29udHJhZG9cIjtcclxuXHJcbmNvbnN0IEVkaWNpb24gPSAoe3Byb2R1Y3RvRWRpdGFyfSkgPT4ge1xyXG5cclxuICBjb25zdCBBdXRoQ29udGV4dCA9IHVzZUNvbnRleHQoYXV0aENvbnRleHQpXHJcbiAgY29uc3Qge3VzdWFyaW9BdXRlbnRpY2FkbywgdXN1YXJpb30gPSBBdXRoQ29udGV4dFxyXG5cclxuICBjb25zdCBwcm9kdWN0b3NDb250ZXh0ID0gdXNlQ29udGV4dChwcm9kdWN0b0NvbnRleHQpXHJcbiAgY29uc3Qge3Byb2R1Y3RvQWN0dWFsfSA9IHByb2R1Y3Rvc0NvbnRleHRcclxuXHJcbiAgY29uc3QgW2NvaW5jaWRlLCBzZXRDb2luY2lkZV0gPSB1c2VTdGF0ZSh0cnVlKVxyXG5cclxuICAvL0F1dGVudGljbyBhbCB1c3VhcmlvIHkgYWdyZWdvIGVsIHByb2R1Y3RvIGFjdHVhbCBhbCBzdGF0ZVxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB1c3VhcmlvQXV0ZW50aWNhZG8oKVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHNldENvaW5jaWRlKGZhbHNlKVxyXG4gICAgfSwgMzAwMCk7XHJcbiAgfSwgW10pXHJcbiAgXHJcbiAgLy9DdWFuZG8gbWUgYXV0ZW50aXF1ZSwgdmVyaWZpY28gcXVlIGVsIHByb2R1Y3RvIHF1ZSB0cmFpZ28gZXMgZWwgZGVsIHVzdWFyaW8gcXVlIGVzdMOhIGxvZ3VlYWRvXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmKHVzdWFyaW8pIHtcclxuICAgICAgcHJvZHVjdG9BY3R1YWwocHJvZHVjdG9FZGl0YXIpXHJcbiAgICAgIGlmKHByb2R1Y3RvRWRpdGFyLmNyZWFkb3IgIT09IHVzdWFyaW8uaWQpe1xyXG4gICAgICAgIHNldENvaW5jaWRlKGZhbHNlKVxyXG4gICAgICB9ICBcclxuICAgIH1cclxuICB9LCBbdXN1YXJpb10pXHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyh1c3VhcmlvKVxyXG4gIH0sIFtdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAge3VzdWFyaW8gJiYgY29pbmNpZGUgPyAoXHJcbiAgICAgICAgPExheW91dCBwYWdpbmE9e2BFZGl0YXIgLSAke3Byb2R1Y3RvRWRpdGFyLm5vbWJyZX1gfT5cclxuICAgICAgICAgIDxGb3JtdWxhcmlvXHJcbiAgICAgICAgICAgIGtleT17cHJvZHVjdG9FZGl0YXIuX2lkfVxyXG4gICAgICAgICAgICBwcm9kdWN0b0VkaXRhcj17cHJvZHVjdG9FZGl0YXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTGF5b3V0PlxyXG4gICAgICApOiA8Tm9FbmNvbnRyYWRvLz5cclxuICAgICAgfVxyXG4gICAgPC8+XHJcbiAgICBcclxuICApXHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKHsgcGFyYW1zOiB7dXJsfSB9KSB7XHJcbiAgYXdhaXQgZGJDb25uZWN0KClcclxuICBjb25zdCByZXNwdWVzdGEgPSBhd2FpdCBjbGllbnRlQXhpb3MuZ2V0KGAvYXBpL3Byb2R1Y3Rvcy8ke3VybH1gKVxyXG4gIGlmKHJlc3B1ZXN0YS5kYXRhLnJlZGlyZWNjaW9uYXIpIHtcclxuICAgIHJldHVybiB7bm90Rm91bmQ6IHRydWV9XHJcbiAgfVxyXG4gIGNvbnN0IHByb2R1Y3RvRWRpdGFyID0gcmVzcHVlc3RhLmRhdGEucHJvZHVjdG9cclxuICByZXR1cm4geyBwcm9wczogeyBwcm9kdWN0b0VkaXRhciB9fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGljaW9uO1xyXG4iXSwibmFtZXMiOlsiTGF5b3V0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRm9ybXVsYXJpbyIsInByb2R1Y3RvQ29udGV4dCIsImF1dGhDb250ZXh0IiwiTm9FbmNvbnRyYWRvIiwiRWRpY2lvbiIsInByb2R1Y3RvRWRpdGFyIiwiQXV0aENvbnRleHQiLCJ1c3VhcmlvQXV0ZW50aWNhZG8iLCJ1c3VhcmlvIiwicHJvZHVjdG9zQ29udGV4dCIsInByb2R1Y3RvQWN0dWFsIiwiY29pbmNpZGUiLCJzZXRDb2luY2lkZSIsInNldFRpbWVvdXQiLCJjcmVhZG9yIiwiaWQiLCJjb25zb2xlIiwibG9nIiwicGFnaW5hIiwibm9tYnJlIiwiX2lkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/producto/editar/[url].jsx\n");

/***/ })

});