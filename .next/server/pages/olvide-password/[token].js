"use strict";
(() => {
var exports = {};
exports.id = 852;
exports.ids = [852];
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

/***/ 2428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _token_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./config/axios.jsx + 1 modules
var axios = __webpack_require__(4909);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./components/productos/Alerta.jsx
var Alerta = __webpack_require__(86);
// EXTERNAL MODULE: ./context/auth/authContext.jsx
var authContext = __webpack_require__(1146);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/auth/ContraseñaCambiada.jsx



const ContraseñaCambiada = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "Reestablecer contrase\xf1a"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "grid grid-cols-1 gap-52 mt-10 mx-auto",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "font-black text-4xl text-center my-auto text-blue-900 dark:text-blue-300 uppercase",
                        children: "Reestablecer contrase\xf1a"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "block mx-auto bg-red-600 rounded-lg text-white text-4xl xs:2xl text-center my-auto font-black p-6 shadow-xl ",
                        children: "Su contrase\xf1a ha sido cambiada correctamente"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: " uppercase mx-auto text-4xl hover:text-blue-900 duration-300 ",
                            children: "Volver a inicio"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Contrase_aCambiada = (ContraseñaCambiada);

;// CONCATENATED MODULE: ./components/auth/NuevaContraseña.jsx







const NuevaContraseña = ()=>{
    const AuthContext = (0,external_react_.useContext)(authContext/* default */.Z);
    const { cambiarContraseña  } = AuthContext;
    const router = (0,router_.useRouter)();
    const token = router.query.token;
    const { 0: nuevaContraseña , 1: setNuevaContraseña  } = (0,external_react_.useState)("");
    const { 0: confirmNuevaContraseña , 1: setConfirmNuevaContraseña  } = (0,external_react_.useState)("");
    const { 0: mensaje , 1: setMensaje  } = (0,external_react_.useState)();
    const { 0: cambiada , 1: setCambiada  } = (0,external_react_.useState)(false);
    const onSubmit = (e)=>{
        e.preventDefault();
        if (nuevaContraseña.trim() === "" || confirmNuevaContraseña === "") {
            setMensaje("Todos los campos son obligatorios");
            setTimeout(()=>{
                setMensaje("");
            }, 3000);
            return;
        }
        if (nuevaContraseña.length < 6 || confirmNuevaContraseña.length < 6) {
            setMensaje("La contrase\xf1a debe tener al menos 6 caracteres");
            setTimeout(()=>{
                setMensaje("");
            }, 3000);
            return;
        }
        if (nuevaContraseña != confirmNuevaContraseña) {
            setMensaje("La contrase\xf1as deben coincidir");
            setTimeout(()=>{
                setMensaje("");
            }, 3000);
            return;
        }
        cambiarContraseña(nuevaContraseña, token);
        setNuevaContraseña("");
        setConfirmNuevaContraseña("");
        setCambiada(true);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: cambiada ? /*#__PURE__*/ jsx_runtime_.jsx(Contrase_aCambiada, {}) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "w-2/4 mx-auto my-32 ",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    className: "font-black text-4xl text-center text-blue-900 dark:text-blue-300",
                    children: "Nueva Contrase\xf1a"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "mt-3 text-center text-black",
                    children: "Llena el campo para cambiar tu contrase\xf1a"
                }),
                mensaje && /*#__PURE__*/ jsx_runtime_.jsx(Alerta/* default */.Z, {
                    children: mensaje
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "bg-white mt-10 px-5 pb-3 rounded-md shadow-md md:w-3/4 mx-auto",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                        className: "mt-10",
                        onSubmit: onSubmit,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: "password",
                                        className: "text-gray-800 font-bold",
                                        children: "Contrase\xf1a nueva"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "password",
                                        autoComplete: "new-password",
                                        className: "mt-2 block w-full p-3 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300",
                                        id: "password",
                                        placeholder: "Ingresa tu contrase\xf1a",
                                        name: "password",
                                        value: nuevaContraseña,
                                        onChange: (e)=>setNuevaContraseña(e.target.value)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: "confirmar",
                                        className: "text-gray-800 font-bold",
                                        children: "Confirmar Contrase\xf1a"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "password",
                                        autoComplete: "new-password",
                                        className: "mt-2 block w-full p-3 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300",
                                        id: "confirmar",
                                        placeholder: "Ingresa tu contrase\xf1a nuevamente",
                                        name: "confirmar",
                                        value: confirmNuevaContraseña,
                                        onChange: (e)=>setConfirmNuevaContraseña(e.target.value)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "submit",
                                value: "Guardar nueva contrase\xf1a",
                                className: "mt-5 w-full bg-blue-800 dark:bg-blue-500 p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex justify-between w-3/4 mx-auto",
                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            className: "pt-5 hover:text-blue-400 font-medium",
                            children: "Iniciar sesion"
                        })
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const NuevaContrase_a = (NuevaContraseña);

// EXTERNAL MODULE: ./components/productos/NoEncontrado.jsx
var NoEncontrado = __webpack_require__(976);
;// CONCATENATED MODULE: ./pages/olvide-password/[token].jsx





const ConfirmarToken = ({ msg  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "Reestablecer contrase\xf1a"
                })
            }),
            msg ? /*#__PURE__*/ jsx_runtime_.jsx(NuevaContrase_a, {}) : /*#__PURE__*/ jsx_runtime_.jsx(NoEncontrado/* default */.Z, {})
        ]
    });
};
async function getServerSideProps({ params: { token  }  }) {
    const respuesta = await axios/* default.get */.Z.get(`/api/usuarios/olvide-password/${token}`);
    const msg = respuesta.data.msg;
    return {
        props: {
            msg
        }
    };
}
/* harmony default export */ const _token_ = (ConfirmarToken);


/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [895,664,976,667], () => (__webpack_exec__(2428)));
module.exports = __webpack_exports__;

})();