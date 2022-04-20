"use strict";
exports.id = 207;
exports.ids = [207];
exports.modules = {

/***/ 7207:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1146);
/* harmony import */ var _context_productos_productoContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7581);








const Layout = ({ children , pagina  })=>{
    const AuthContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z);
    const { usuario , cerrarSesion , token , traerTema  } = AuthContext;
    const productosContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_productos_productoContext__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);
    const { limpiarSeleccionado , limpiarApp  } = productosContext;
    const { 0: oscuro , 1: setOscuro  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: panel , 1: setPanel  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const urlActual = router.route;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!token) {
            router.push("/");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        token
    ]);
    //traigo el tema del LS
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        var ref;
        const temaLS = (ref = JSON.parse(localStorage.getItem("Modo oscuro"))) !== null && ref !== void 0 ? ref : false;
        setOscuro(temaLS);
    }, []);
    //guardo el tema en LS
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        localStorage.setItem("Modo oscuro", JSON.stringify(oscuro));
        traerTema(oscuro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        oscuro
    ]);
    //cambio el estado del tema a oscuro o claro
    const darkMode = ()=>{
        setOscuro(!oscuro);
    };
    const tuerca = ()=>{
        setPanel(!panel);
    };
    const vaciarStates = ()=>{
        cerrarSesion();
        limpiarApp();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("title", {
                    children: [
                        "Inventario - ",
                        pagina
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `lg:flex md:min-h-screen sm:min-h-screen bg-gray-100 ${oscuro && "dark"}`,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:w-1/5 bg-blue-900 px-5 dark:bg-gray-900 flex flex-col justify-between lg:justify-start ",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between mt-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-white text-2xl md:text-4xl font-black text-center",
                                        children: [
                                            "Hola, ",
                                            usuario ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: usuario.nombre
                                            }) : null
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                        src: "/settings-claro.svg",
                                        alt: "Settings",
                                        width: 30,
                                        height: 30,
                                        priority: true,
                                        className: "cursor-pointer",
                                        onClick: tuerca
                                    })
                                ]
                            }),
                            panel ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col mt-2 py-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: darkMode,
                                        className: `${oscuro ? "text-white" : "text-black"} text-left py-2`,
                                        children: oscuro ? "Tema claro" : "Tema oscuro"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: vaciarStates,
                                        className: `${oscuro ? "text-white" : "text-black"} text-left py-2`,
                                        children: "Cerrar sesi\xf3n"
                                    })
                                ]
                            }) : null,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                                className: "flex mt-4 justify-between sm:mt-10 lg:flex-col lg:justify-start h-5/6",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                        href: "/productos",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: `${urlActual === "/productos" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm  md:text-2xl block p-2 mt-2 hover:text-blue-300`,
                                            children: "Productos"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                        href: "/nuevoproducto",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            onClick: ()=>limpiarSeleccionado()
                                            ,
                                            className: `${urlActual === "/nuevoproducto" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm  md:text-2xl block p-2 mt-2 hover:text-blue-300`,
                                            children: "Nuevo Producto"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                        href: "/faltantes",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            onClick: ()=>limpiarSeleccionado()
                                            ,
                                            className: `${urlActual === "/faltantes" ? "lg:bg-blue-300 lg:border-none border-b-gray-300 border-b-2 lg:bg-opacity-10 lg:rounded-md  text-white" : "text-white"} text-sm  md:text-2xl block p-2 mt-2 hover:text-blue-300`,
                                            children: "Faltantes"
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: " lg:w-4/5 sm:p-2 lg:p-10 h-screen dark:bg-gray-800 overflow-x-auto ",
                        children: children
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);


/***/ }),

/***/ 1146:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const authContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authContext);


/***/ }),

/***/ 7581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const productoContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (productoContext);


/***/ })

};
;