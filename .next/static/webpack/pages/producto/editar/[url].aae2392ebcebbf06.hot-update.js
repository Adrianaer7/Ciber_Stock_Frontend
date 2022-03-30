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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/layout/Layout */ \"./components/layout/Layout.jsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_productos_Formulario__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/productos/Formulario */ \"./components/productos/Formulario.jsx\");\n/* harmony import */ var _context_productos_productoContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/productos/productoContext */ \"./context/productos/productoContext.jsx\");\n/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/auth/authContext */ \"./context/auth/authContext.jsx\");\n/* harmony import */ var _components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/productos/NoEncontrado */ \"./components/productos/NoEncontrado.jsx\");\n/* harmony import */ var _components_auth_Login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/auth/Login */ \"./components/auth/Login.jsx\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar Edicion = function(param) {\n    var productoEditar = param.productoEditar;\n    _s();\n    var AuthContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    var usuarioAutenticado = AuthContext.usuarioAutenticado, usuario = AuthContext.usuario;\n    var productosContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_productos_productoContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    var productoActual = productosContext.productoActual;\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null), coincide = ref[0], setCoincide = ref[1];\n    //Autentico al usuario y agrego el producto actual al state\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        usuarioAutenticado();\n    }, []);\n    //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function() {\n        if (usuario) {\n            productoActual(productoEditar);\n            setCoincide(true);\n            if (productoEditar.creador !== usuario.id) {\n                setCoincide(false);\n            }\n        }\n    }, [\n        usuario\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: usuario && coincide ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n            pagina: \"Editar - \".concat(productoEditar.nombre),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_productos_Formulario__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                productoEditar: productoEditar\n            }, productoEditar._id, false, {\n                fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n                lineNumber: 39,\n                columnNumber: 11\n            }, _this)\n        }, void 0, false, {\n            fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n            lineNumber: 38,\n            columnNumber: 9\n        }, _this) : usuario && coincide === false ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n            fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n            lineNumber: 44,\n            columnNumber: 42\n        }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_Login__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, {\n            fileName: \"D:\\\\Documentos\\\\Documentos\\\\Cursos\\\\Curso React\\\\Proyectos\\\\Ciber\\\\cliente\\\\stock-ciber\\\\pages\\\\producto\\\\editar\\\\[url].jsx\",\n            lineNumber: 44,\n            columnNumber: 60\n        }, _this)\n    }, void 0, false);\n};\n_s(Edicion, \"3MfFehBqiBM7P01jbbKp8dOQVIE=\");\n_c = Edicion;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edicion);\nvar _c;\n$RefreshReg$(_c, \"Edicion\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wcm9kdWN0by9lZGl0YXIvW3VybF0uanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0Q7QUFHQztBQUNVO0FBQ087QUFDYjtBQUNVO0FBQ25COztBQUNsRCxHQUFLLENBQUNTLE9BQU8sR0FBRyxRQUFRLFFBQWMsQ0FBQztRQUFyQkMsY0FBYyxTQUFkQSxjQUFjOztJQUU5QixHQUFLLENBQUNDLFdBQVcsR0FBR1YsaURBQVUsQ0FBQ0ssaUVBQVc7SUFDMUMsR0FBSyxDQUFFTSxrQkFBa0IsR0FBYUQsV0FBVyxDQUExQ0Msa0JBQWtCLEVBQUVDLE9BQU8sR0FBSUYsV0FBVyxDQUF0QkUsT0FBTztJQUVsQyxHQUFLLENBQUNDLGdCQUFnQixHQUFHYixpREFBVSxDQUFDSSwwRUFBZTtJQUNuRCxHQUFLLENBQUVVLGNBQWMsR0FBSUQsZ0JBQWdCLENBQWxDQyxjQUFjO0lBRXJCLEdBQUssQ0FBMkJaLEdBQWMsR0FBZEEsK0NBQVEsQ0FBQyxJQUFJLEdBQXRDYSxRQUFRLEdBQWlCYixHQUFjLEtBQTdCYyxXQUFXLEdBQUlkLEdBQWM7SUFDOUMsRUFBMkQ7SUFDM0RELGdEQUFTLENBQUMsUUFBUSxHQUFGLENBQUM7UUFDZlUsa0JBQWtCO0lBQ3BCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFTCxFQUErRjtJQUMvRlYsZ0RBQVMsQ0FBQyxRQUFRLEdBQUYsQ0FBQztRQUNmLEVBQUUsRUFBQ1csT0FBTyxFQUFFLENBQUM7WUFDWEUsY0FBYyxDQUFDTCxjQUFjO1lBQzdCTyxXQUFXLENBQUMsSUFBSTtZQUNoQixFQUFFLEVBQUNQLGNBQWMsQ0FBQ1EsT0FBTyxLQUFLTCxPQUFPLENBQUNNLEVBQUUsRUFBQyxDQUFDO2dCQUN4Q0YsV0FBVyxDQUFDLEtBQUs7WUFDbkIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLEVBQUUsQ0FBQ0o7UUFBQUEsT0FBTztJQUFBLENBQUM7SUFFWixNQUFNO2tCQUVEQSxPQUFPLElBQUlHLFFBQVEsK0VBQ2pCaEIsaUVBQU07WUFBQ29CLE1BQU0sRUFBRyxDQUFTLFdBQXdCLE9BQXRCVixjQUFjLENBQUNXLE1BQU07a0dBQzlDakIsd0VBQVU7Z0JBRVRNLGNBQWMsRUFBRUEsY0FBYztlQUR6QkEsY0FBYyxDQUFDWSxHQUFHOzs7Ozs7Ozs7b0JBSTFCVCxPQUFPLElBQUlHLFFBQVEsS0FBSyxLQUFLLCtFQUFJVCwwRUFBWTs7OztnR0FBTUMsOERBQUs7Ozs7OztBQUtqRSxDQUFDO0dBdkNLQyxPQUFPO0tBQVBBLE9BQU87O0FBbURiLCtEQUFlQSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcHJvZHVjdG8vZWRpdGFyL1t1cmxdLmpzeD9hYjUxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXlvdXQgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvbGF5b3V0L0xheW91dFwiO1xyXG5pbXBvcnQgY2xpZW50ZUF4aW9zIGZyb20gXCIuLi8uLi8uLi9jb25maWcvYXhpb3NcIjtcclxuaW1wb3J0IGRiQ29ubmVjdCBmcm9tIFwiLi4vLi4vLi4vbGliL2RiQ29ubmVjdFwiO1xyXG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRm9ybXVsYXJpbyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0b3MvRm9ybXVsYXJpb1wiO1xyXG5pbXBvcnQgcHJvZHVjdG9Db250ZXh0IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L3Byb2R1Y3Rvcy9wcm9kdWN0b0NvbnRleHRcIjtcclxuaW1wb3J0IGF1dGhDb250ZXh0IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L2F1dGgvYXV0aENvbnRleHRcIjtcclxuaW1wb3J0IE5vRW5jb250cmFkbyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0b3MvTm9FbmNvbnRyYWRvXCI7XHJcbmltcG9ydCBMb2dpbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9hdXRoL0xvZ2luXCI7XHJcbmNvbnN0IEVkaWNpb24gPSAoe3Byb2R1Y3RvRWRpdGFyfSkgPT4ge1xyXG5cclxuICBjb25zdCBBdXRoQ29udGV4dCA9IHVzZUNvbnRleHQoYXV0aENvbnRleHQpXHJcbiAgY29uc3Qge3VzdWFyaW9BdXRlbnRpY2FkbywgdXN1YXJpb30gPSBBdXRoQ29udGV4dFxyXG5cclxuICBjb25zdCBwcm9kdWN0b3NDb250ZXh0ID0gdXNlQ29udGV4dChwcm9kdWN0b0NvbnRleHQpXHJcbiAgY29uc3Qge3Byb2R1Y3RvQWN0dWFsfSA9IHByb2R1Y3Rvc0NvbnRleHRcclxuXHJcbiAgY29uc3QgW2NvaW5jaWRlLCBzZXRDb2luY2lkZV0gPSB1c2VTdGF0ZShudWxsKVxyXG4gIC8vQXV0ZW50aWNvIGFsIHVzdWFyaW8geSBhZ3JlZ28gZWwgcHJvZHVjdG8gYWN0dWFsIGFsIHN0YXRlXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHVzdWFyaW9BdXRlbnRpY2FkbygpXHJcbiAgfSwgW10pXHJcbiAgXHJcbiAgLy9DdWFuZG8gbWUgYXV0ZW50aXF1ZSwgdmVyaWZpY28gcXVlIGVsIHByb2R1Y3RvIHF1ZSB0cmFpZ28gZXMgZWwgZGVsIHVzdWFyaW8gcXVlIGVzdMOhIGxvZ3VlYWRvXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmKHVzdWFyaW8pIHtcclxuICAgICAgcHJvZHVjdG9BY3R1YWwocHJvZHVjdG9FZGl0YXIpXHJcbiAgICAgIHNldENvaW5jaWRlKHRydWUpXHJcbiAgICAgIGlmKHByb2R1Y3RvRWRpdGFyLmNyZWFkb3IgIT09IHVzdWFyaW8uaWQpe1xyXG4gICAgICAgIHNldENvaW5jaWRlKGZhbHNlKVxyXG4gICAgICB9ICBcclxuICAgIH1cclxuICB9LCBbdXN1YXJpb10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7dXN1YXJpbyAmJiBjb2luY2lkZSA/IChcclxuICAgICAgICA8TGF5b3V0IHBhZ2luYT17YEVkaXRhciAtICR7cHJvZHVjdG9FZGl0YXIubm9tYnJlfWB9PlxyXG4gICAgICAgICAgPEZvcm11bGFyaW9cclxuICAgICAgICAgICAga2V5PXtwcm9kdWN0b0VkaXRhci5faWR9XHJcbiAgICAgICAgICAgIHByb2R1Y3RvRWRpdGFyPXtwcm9kdWN0b0VkaXRhcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9MYXlvdXQ+XHJcbiAgICAgICk6IHVzdWFyaW8gJiYgY29pbmNpZGUgPT09IGZhbHNlID8gPE5vRW5jb250cmFkby8+IDogPExvZ2luLz5cclxuICAgICAgfVxyXG4gICAgPC8+XHJcbiAgICBcclxuICApXHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKHsgcGFyYW1zOiB7dXJsfSB9KSB7XHJcbiAgYXdhaXQgZGJDb25uZWN0KClcclxuICBjb25zdCByZXNwdWVzdGEgPSBhd2FpdCBjbGllbnRlQXhpb3MuZ2V0KGAvYXBpL3Byb2R1Y3Rvcy8ke3VybH1gKVxyXG4gIGlmKHJlc3B1ZXN0YS5kYXRhLnJlZGlyZWNjaW9uYXIpIHtcclxuICAgIHJldHVybiB7bm90Rm91bmQ6IHRydWV9XHJcbiAgfVxyXG4gIGNvbnN0IHByb2R1Y3RvRWRpdGFyID0gcmVzcHVlc3RhLmRhdGEucHJvZHVjdG9cclxuICByZXR1cm4geyBwcm9wczogeyBwcm9kdWN0b0VkaXRhciB9fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGljaW9uO1xyXG4iXSwibmFtZXMiOlsiTGF5b3V0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiRm9ybXVsYXJpbyIsInByb2R1Y3RvQ29udGV4dCIsImF1dGhDb250ZXh0IiwiTm9FbmNvbnRyYWRvIiwiTG9naW4iLCJFZGljaW9uIiwicHJvZHVjdG9FZGl0YXIiLCJBdXRoQ29udGV4dCIsInVzdWFyaW9BdXRlbnRpY2FkbyIsInVzdWFyaW8iLCJwcm9kdWN0b3NDb250ZXh0IiwicHJvZHVjdG9BY3R1YWwiLCJjb2luY2lkZSIsInNldENvaW5jaWRlIiwiY3JlYWRvciIsImlkIiwicGFnaW5hIiwibm9tYnJlIiwiX2lkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/producto/editar/[url].jsx\n");

/***/ })

});