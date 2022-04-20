"use strict";
(() => {
var exports = {};
exports.id = 370;
exports.ids = [370];
exports.modules = {

/***/ 4909:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ axios)
});

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./config/axios.jsx

const clienteAxios = external_axios_default().create({
    baseURL: "http://localhost:4000"
});
/* harmony default export */ const axios = (clienteAxios);


/***/ }),

/***/ 4274:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7207);
/* harmony import */ var _config_axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4909);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_productos_Formulario__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(213);
/* harmony import */ var _context_productos_productoContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7581);
/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1146);
/* harmony import */ var _components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(976);








async function getServerSideProps({ params: { url  }  }) {
    const respuesta = await _config_axios__WEBPACK_IMPORTED_MODULE_2__/* ["default"].get */ .Z.get(`/api/productos/${url}`);
    if (respuesta.data.redireccionar) {
        return {
            notFound: true
        };
    }
    const productoEditar = respuesta.data.producto;
    return {
        props: {
            productoEditar
        }
    };
}
const Edicion = ({ productoEditar  })=>{
    const AuthContext = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z);
    const { usuarioAutenticado , usuario  } = AuthContext;
    const productosContext = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_productos_productoContext__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z);
    const { productoActual  } = productosContext;
    const { 0: coincide , 1: setCoincide  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
    //Autentico al usuario y agrego el producto actual al state
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (usuario) {
            productoActual(productoEditar);
            if (productoEditar.creador !== usuario._id) {
                setCoincide(false);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        usuario
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: coincide ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
            pagina: `Ver - ${productoEditar.nombre}`,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_productos_Formulario__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                productoEditar: productoEditar
            }, productoEditar._id)
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_productos_NoEncontrado__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {})
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edicion);


/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 271:
/***/ ((module) => {

module.exports = require("sweetalert2");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [895,664,675,207,976,213], () => (__webpack_exec__(4274)));
module.exports = __webpack_exports__;

})();