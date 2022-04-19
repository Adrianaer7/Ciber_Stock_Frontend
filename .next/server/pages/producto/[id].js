"use strict";
(() => {
var exports = {};
exports.id = 335;
exports.ids = [335];
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
    baseURL: "https://lit-dawn-31866.herokuapp.com"
});
/* harmony default export */ const axios = (clienteAxios);


/***/ }),

/***/ 463:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ns": () => (/* binding */ hoy),
/* harmony export */   "qU": () => (/* binding */ generarFecha)
/* harmony export */ });
/* unused harmony export generarId */
//genero fecha formateada
const generarFecha = (fecha)=>{
    const fechaNueva = new Date(fecha + "T00:00:00") //le agrego T00:00:00 para que no haga conflicto la zona horaria y agende mal el dia de la fecha
    ;
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    };
    return fechaNueva.toLocaleString("es-AR", opciones);
};
//genero id
const generarId = ()=>{
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
};
//genero fecha de hoy, para dejar el input listo
const hoy = new Date(Date.now()).toISOString().slice(0, 10);


/***/ }),

/***/ 741:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _id_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/layout/Layout.jsx
var Layout = __webpack_require__(7207);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./helpers/index.jsx
var helpers = __webpack_require__(463);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./context/productos/productoContext.jsx
var productoContext = __webpack_require__(7581);
// EXTERNAL MODULE: ./context/auth/authContext.jsx
var authContext = __webpack_require__(1146);
// EXTERNAL MODULE: external "sweetalert2"
var external_sweetalert2_ = __webpack_require__(271);
var external_sweetalert2_default = /*#__PURE__*/__webpack_require__.n(external_sweetalert2_);
;// CONCATENATED MODULE: ./components/productos/VerProducto.jsx







const VerProducto = ({ producto  })=>{
    const router = (0,router_.useRouter)();
    const productosContext = (0,external_react_.useContext)(productoContext/* default */.Z);
    const { eliminarProducto  } = productosContext;
    const AuthContext = (0,external_react_.useContext)(authContext/* default */.Z);
    const { modo  } = AuthContext;
    const { _id , nombre , codigo , rubro , marca , precio_venta_tarjeta , precio_venta_efectivo , precio_venta_conocidos , precio_compra_dolar , precio_compra_peso , valor_dolar_compra , fecha_compra , proveedor , disponibles , rentabilidad , modelo , notas  } = producto;
    const fecha = (0,helpers/* generarFecha */.qU)(fecha_compra) //formateo la fecha ya que me llega y-m-d
    ;
    const Eliminado = external_sweetalert2_default().mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
    });
    const eliminarElProducto = ()=>{
        external_sweetalert2_default().fire({
            title: `${modo ? '<h5 style="color:white">\xbfEst\xe1s seguro?</h5>' : '<h5 style="color:#545454">\xbfEst\xe1s seguro?</h5>'}`,
            text: "\xa1No se puede revertir esto!",
            icon: "warning",
            color: `${modo ? "white" : "#545454"}`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "<b>Si, eliminar!</b>",
            confirmButtonColor: "#d33",
            cancelButtonText: "<p>Cancelar</p>",
            background: `${modo ? "rgb(31 41 55)" : "white"}`
        }).then((result)=>{
            if (result.isConfirmed) {
                eliminarProducto(_id);
                router.push("/productos");
                Eliminado.fire({
                    icon: "success",
                    title: "Se elimin\xf3 el producto correctamente",
                    background: `${modo ? "#505050" : "white"}`,
                    width: "25%",
                    color: `${modo ? "white" : "#545454"}`
                });
            }
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "lg:w-2/3 mx-auto dark:bg-gray-800 bg-slate-100 flex flex-col gap-4",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    className: "font-black text-4xl dark:text-blue-300 text-blue-900 text-left sm:text-center",
                    children: nombre
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: " overflow-x-auto shadow-md sm:rounded-lg",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("table", {
                        className: " sm:table-fixed w-full text-lg text-left text-gray-500 dark:text-gray-400",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tbody", {
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: "dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "NOMBRE"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4 ",
                                            children: nombre
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "MARCA"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: marca ? marca : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "MODELO"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: modelo ? modelo : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "C\xd3DIGO"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: codigo
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ",
                                            children: "PRECIO DE VENTA CON TARJETA"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: precio_venta_tarjeta ? "$" + precio_venta_tarjeta : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "PRECIO DE VENTA EN EFECTIVO"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: precio_venta_efectivo ? "$" + precio_venta_efectivo : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "PRECIO DE VENTA CONOCIDOS"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: precio_venta_conocidos ? "$" + precio_venta_tarjeta : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "RUBRO"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: rubro ? rubro : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "PROVEEDOR"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: proveedor ? proveedor : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "VALOR DEL D\xd3LAR AL COMPRARLO"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                            className: "px-6 py-4",
                                            children: [
                                                "$",
                                                valor_dolar_compra
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "PRECIO DE LA COMPRA EN D\xd3LARES"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: precio_compra_dolar ? "$" + precio_compra_dolar : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "PRECIO DE LA COMPRA EN PESOS"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: precio_compra_peso ? "$" + precio_compra_peso : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "DISPONIBLES"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: disponibles > 0 ? disponibles : "SIN STOCK"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "FECHA DE LA ULTIMA COMPRA"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4 uppercase",
                                            children: fecha
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "RENTABILIDAD"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: rentabilidad ? rentabilidad + "%" : "-"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: " dark:bg-gray-900 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-900 even:dark:bg-gray-700 break-words",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                            scope: "row",
                                            className: "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap",
                                            children: "NOTAS"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-6 py-4",
                                            children: notas ? notas : "-"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    type: "button",
                    className: "bg-red-600 hover:bg-red-900 w-1/4 text-white p-4 uppercase font-bold my-4 mx-auto block rounded-md",
                    onClick: eliminarElProducto,
                    children: "Eliminar Producto"
                })
            ]
        })
    });
};
/* harmony default export */ const productos_VerProducto = (VerProducto);

// EXTERNAL MODULE: ./config/axios.jsx + 1 modules
var axios = __webpack_require__(4909);
// EXTERNAL MODULE: ./components/productos/NoEncontrado.jsx
var NoEncontrado = __webpack_require__(976);
;// CONCATENATED MODULE: ./pages/producto/[id].jsx








async function getServerSideProps({ params: { id  }  }) {
    const respuesta = await axios/* default.get */.Z.get(`/api/productos/${id}`);
    if (respuesta.data.redireccionar) {
        return {
            notFound: true
        } //redirecciono a la pagina 404. notFound es una funcion de next
        ;
    }
    const producto = respuesta.data.producto;
    return {
        props: {
            producto
        }
    };
}
const Ver = ({ producto  })=>{
    const AuthContext = (0,external_react_.useContext)(authContext/* default */.Z);
    const { usuarioAutenticado , usuario  } = AuthContext;
    const productosContext = (0,external_react_.useContext)(productoContext/* default */.Z);
    const { productoActual  } = productosContext;
    const { 0: coincide , 1: setCoincide  } = (0,external_react_.useState)(true);
    //Autentico al usuario y agrego el producto actual al state
    (0,external_react_.useEffect)(()=>{
        usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado
    (0,external_react_.useEffect)(()=>{
        if (usuario) {
            productoActual(producto);
            if (producto.creador !== usuario._id) {
                setCoincide(false);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        usuario
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: coincide ? /*#__PURE__*/ jsx_runtime_.jsx(Layout/* default */.Z, {
            pagina: `Ver - ${producto.nombre}`,
            children: /*#__PURE__*/ jsx_runtime_.jsx(productos_VerProducto, {
                producto: producto
            }, producto._id)
        }) : /*#__PURE__*/ jsx_runtime_.jsx(NoEncontrado/* default */.Z, {})
    });
};
/* harmony default export */ const _id_ = (Ver);


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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [895,664,675,207,976], () => (__webpack_exec__(741)));
module.exports = __webpack_exports__;

})();