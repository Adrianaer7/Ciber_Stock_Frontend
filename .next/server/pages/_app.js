"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
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

/***/ 349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const faltanteContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (faltanteContext);


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


/***/ }),

/***/ 449:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./context/auth/authContext.jsx
var authContext = __webpack_require__(1146);
;// CONCATENATED MODULE: ./types/index.jsx
//Autenticacion
const REGISTRO_EXITOSO = "RREGISTRO_EXITOSO";
const REGISTRO_ERROR = "REGISTRO_ERROR";
const LOGIN_EXITOSO = "LOGIN_EXITOSO";
const LOGIN_ERROR = "LOGIN_ERROR";
const USUARIO_AUTENTICADO = "USUARIO_AUTENTICADO";
const SOLICITAR_TOKEN_PASSWORD = "SOLICITAR_TOKEN_PASSWORD";
const SOLICITAR_TOKEN_PASSWORD_ERROR = "SOLICITAR_TOKEN_PASSWORD_ERROR";
const GUARDAR_TEMA = "GUARDAR_TEMA";
const CERRAR_SESION = "CERRAR_SESION";
const LIMPIAR_STATE = "LIMPIAR_STATE";
//Alerta
const OCULTAR_ALERTA = "OCULTAR_ALERTA";
//Producto
const AGREGAR_PRODUCTO = "AGREGAR_PRODUCTO";
const ERROR_AGREGAR_PRODUCTO = "ERROR_AGREGAR_PRODUCTO";
const OBTENER_PRODUCTOS = "OBTENER_PRODUCTOS";
const PRODUCTOS_CAMBIADOS = "PRODUCTOS_CAMBIADOS";
const PRODUCTO_ACTUAL = "PRODUCTO_ACTUAL";
const EDITAR_PRODUCTO = "EDITAR_PRODUCTO";
const LIMPIAR_SELECCIONADO = "LIMPIAR_SELECCIONADO";
const ELIMINAR_PRODUCTO = "ELIMINAR_PRODUCTO";
const FILTRAR_PRODUCTO = "FILTRAR_PRODUCTO";
const ELIMINAR_PRODUCTOS = "ELIMINAR_PRODUCTOS";
const ORDENAR_CODIGO = "ORDENAR_CODIGO";
const ORDENAR_CODIGO_FILTRADO = "ORDENAR_CODIGO_FILTRADO";
const ORDENAR_PRECIO = "ORDENAR_PRECIO";
const ORDENAR_PRECIO_FILTRADO = "ORDENAR_PRECIO_FILTRADO";
const ORDENAR_NOMBRE = "ORDENAR_NOMBRE";
const ORDENAR_NOMBRE_FILTRADO = "ORDENAR_NOMBRE_FILTRADO";
const ORDENAR_MARCA = "ORDENAR_MARCA";
const ORDENAR_MARCA_FILTRADO = "ORDENAR_MARCA_FILTRADO";
const ORDENAR_MODELO = "ORDENAR_MODELO";
const ORDENAR_MODELO_FILTRADO = "ORDENAR_MODELO_FILTRADO";
const ORDENAR_DISPONIBLES = "ORDENAR_DISPONIBLES";
const ORDENAR_DISPONIBLES_FILTRADO = "ORDENAR_DISPONIBLES_FILTRADO";
//Faltantes
const AGREGAR_FALTANTE = "AGREGAR_FALTANTE";
const ELIMINAR_FALTANTE = "ELIMINAR_FALTANTE";
const TRAER_FALTANTES = "TRAER_FALTANTES";
const FILTRO_FALTANTE = "FILTRO_FALTANTE";
const PRECIO_VENTA = "PRECIO_VENTA";
const LIMPIAR_VENTA = "LIMPIAR_VENTA";
const TRAER_DOLAR_BD = "TRAER_DOLAR_BD";
const ORDENAR_CODIGO_FALTANTE = "ORDENAR_CODIGO_FALTANTE";
const ORDENAR_NOMBRE_FALTANTE = "ORDENAR_NOMBRE_FALTANTE";
const ORDENAR_MARCA_FALTANTE = "ORDENAR_MARCA_FALTANTE";
const ORDENAR_MODELO_FALTANTE = "ORDENAR_MODELO_FALTANTE";
const ORDENAR_RUBRO_FALTANTE = "ORDENAR_RUBRO_FALTANTE";
const ORDENAR_PROVEEDOR_FALTANTE = "ORDENAR_PROVEEDOR_FALTANTE";
const ORDENAR_DISPONIBLES_FALTANTE = "ORDENAR_DISPONIBLES_FALTANTE";
const ORDENAR_CODIGO_FALTANTE_FILTRADO = "ORDENAR_CODIGO_FALTANTE_FILTRADO";
const ORDENAR_NOMBRE_FALTANTE_FILTRADO = "ORDENAR_NOMBRE_FALTANTE_FILTRADO";
const ORDENAR_MARCA_FALTANTE_FILTRADO = "ORDENAR_MARCA_FALTANTE_FILTRADO";
const ORDENAR_MODELO_FALTANTE_FILTRADO = "ORDENAR_MODELO_FALTANTE_FILTRADO";
const ORDENAR_RUBRO_FALTANTE_FILTRADO = "ORDENAR_RUBRO_FALTANTE_FILTRADO";
const ORDENAR_PROVEEDOR_FALTANTE_FILTRADO = "ORDENAR_PROVEEDOR_FALTANTE_FILTRADO";
const ORDENAR_DISPONIBLES_FALTANTE_FILTRADO = "ORDENAR_DISPONIBLES_FALTANTE_FILTRADO";
//Rubro
const AGREGAR_RUBRO = "AGREGAR_RUBRO";
const ERROR_AGREGAR_RUBRO = "ERROR_AGREGAR_RUBRO";
const OBTENER_RUBROS = "OBTENER_RUBROS";
const FILTRAR_RUBRO = "FILTRAR_RUBRO";
const LIMPIAR_RUBRO = "LIMPIAR_RUBRO";
const ELIMINAR_RUBROS = "ELIMINAR_RUBROS";
//Proveedor
const AGREGAR_PROVEEDOR = "AGREGAR_PROVEEDOR";
const ERROR_AGREGAR_PROVEEDOR = "ERROR_AGREGAR_PROVEEDOR";
const OBTENER_PROVEEDORES = "OBTENER_PROVEEDORES";
const ELIMINAR_PROVEEDORES = "ELIMINAR_PROVEEDORES";
const LIMPIAR_APP = "LIMPIAR_APP";

;// CONCATENATED MODULE: ./context/auth/authReducer.jsx

function authReducer(state, action) {
    switch(action.type){
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: action.payload
            };
        case LOGIN_EXITOSO:
            localStorage.setItem("token", action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true
            };
        case SOLICITAR_TOKEN_PASSWORD:
        case SOLICITAR_TOKEN_PASSWORD_ERROR:
            return {
                ...state,
                mensaje: action.payload
            };
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            localStorage.removeItem("token") //se elimina el token generado al querer iniciar sesion o crear usuario con datos incorrectos
            ;
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            };
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            };
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje: null
            };
        case GUARDAR_TEMA:
            return {
                ...state,
                modo: action.payload
            };
        case LIMPIAR_STATE:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                autenticado: null,
                usuario: null,
                mensaje: null
            };
        default:
            return state;
    }
};

// EXTERNAL MODULE: ./config/axios.jsx + 1 modules
var axios = __webpack_require__(4909);
;// CONCATENATED MODULE: ./config/tokenAuth.jsx

const tokenAuth = (token)=>{
    if (token) {
        axios/* default.defaults.headers.common.Authorization */.Z.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        //si no existe el token, no permito al usuario que haga una peticion en donde se requiera un auth
        delete axios/* default.defaults.headers.common.Authorization */.Z.defaults.headers.common.Authorization;
        console.log(axios/* default.defaults.headers.common */.Z.defaults.headers.common);
    }
};
/* harmony default export */ const config_tokenAuth = (tokenAuth);

;// CONCATENATED MODULE: ./context/auth/authState.jsx







const AuthState = ({ children  })=>{
    //Definir un state inicial
    const initialState = {
        token:  false ? 0 : "",
        autenticado: null,
        usuario: null,
        mensaje: null,
        modo:  false ? 0 : ""
    };
    //Definir el reducer
    const { 0: state , 1: dispatch  } = (0,external_react_.useReducer)(authReducer, initialState);
    //Registrar nuevos usuarios
    const registrarUsuario = async (datos)=>{
        try {
            const respuesta = await axios/* default.post */.Z.post("/api/usuarios", datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }
    };
    const olvideContraseña = async (email)=>{
        try {
            const { data  } = await axios/* default.post */.Z.post("/api/usuarios/olvide-password", {
                email
            });
            dispatch({
                type: SOLICITAR_TOKEN_PASSWORD,
                payload: data.msg
            });
        } catch (error) {
            dispatch({
                type: SOLICITAR_TOKEN_PASSWORD_ERROR,
                payload: error.response.data.msg
            });
        }
    };
    const cambiarContraseña = async (contraseña, token)=>{
        const url = `/api/usuarios/olvide-password/${token}`;
        await axios/* default.post */.Z.post(url, {
            contraseña
        });
    };
    //Autenticar usuario
    const iniciarSesion = async (datos)=>{
        try {
            const respuesta = await axios/* default.post */.Z.post("/api/auth", datos) //envio los datos para que me cree un token
            ;
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
            usuarioAutenticado();
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
        //Limpia la alerta despues de 3s
        setTimeout(()=>{
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    };
    //Usuario autenticado
    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem("token");
        if (token) {
            config_tokenAuth(token);
        }
        try {
            const respuesta = await axios/* default.get */.Z.get("/api/auth");
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    };
    //Cerrar sesion
    const cerrarSesion = ()=>{
        dispatch({
            type: LIMPIAR_STATE
        });
    };
    const ocultarAlerta = ()=>{
        dispatch({
            type: OCULTAR_ALERTA
        });
    };
    const traerTema = (tema)=>{
        dispatch({
            type: GUARDAR_TEMA,
            payload: tema
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(authContext/* default.Provider */.Z.Provider, {
        value: {
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            modo: state.modo,
            registrarUsuario,
            olvideContraseña,
            cambiarContraseña,
            iniciarSesion,
            usuarioAutenticado,
            olvideContraseña,
            cerrarSesion,
            traerTema,
            ocultarAlerta
        },
        children: children
    });
};
/* harmony default export */ const authState = (AuthState);

// EXTERNAL MODULE: ./context/productos/productoContext.jsx
var productoContext = __webpack_require__(7581);
;// CONCATENATED MODULE: ./context/productos/productoReducer.jsx

function productoReducer(state, action) {
    switch(action.type){
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                productos: [
                    ...state.productos,
                    action.payload
                ]
            };
        case AGREGAR_RUBRO:
            return {
                ...state,
                rubros: [
                    ...state.rubros,
                    action.payload
                ]
            };
        case AGREGAR_PROVEEDOR:
            return {
                ...state,
                proveedores: [
                    ...state.proveedores,
                    action.payload
                ]
            };
        case ERROR_AGREGAR_PRODUCTO:
            return {
                ...state,
                mensajeCodigo: action.payload
            };
        case ERROR_AGREGAR_RUBRO:
            return {
                ...state,
                mensajeRubro: action.payload
            };
        case ERROR_AGREGAR_PROVEEDOR:
            return {
                ...state,
                mensajeProveedor: action.payload
            };
        case OBTENER_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            };
        case OBTENER_RUBROS:
            return {
                ...state,
                rubros: action.payload
            };
        case OBTENER_PROVEEDORES:
            return {
                ...state,
                proveedores: action.payload
            };
        case ELIMINAR_PRODUCTOS:
            return {
                ...state,
                productos: []
            };
        case ELIMINAR_RUBROS:
            return {
                ...state,
                rubros: []
            };
        case ELIMINAR_PROVEEDORES:
            return {
                ...state,
                proveedores: []
            };
        case PRODUCTO_ACTUAL:
            return {
                ...state,
                productoSeleccionado: action.payload
            };
        case EDITAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.map((producto)=>producto._id === action.payload._id ? action.payload : producto
                )
            };
        case PRODUCTOS_CAMBIADOS:
            return {
                ...state,
                productos: state.productos !== action.payload ? action.payload : productos
            };
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.filter((producto)=>producto._id !== action.payload
                ),
                productoSeleccionado: null,
                filtrados: state.filtrados.filter((producto)=>producto._id !== action.payload
                ) //y tampoco lo muestro cuando lo esté filtrando
            };
        case LIMPIAR_SELECCIONADO:
            return {
                ...state,
                productoSeleccionado: null
            };
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensajeCodigo: null,
                mensajeRubro: null,
                mensajeProveedor: null
            };
        case FILTRAR_PRODUCTO:
            return {
                ...state,
                filtrados: state.productos.filter((producto)=>producto.nombre.toString().toLowerCase() //convierto el campo a string minuscula
                    .includes(action.payload.toLowerCase() ? action.payload : producto) //trato de encontrar un producto que contenga lo que escribo en el buscador. Convierto el input a minusculas para comparar
                     || producto.marca.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : producto) || producto.modelo.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : producto) || producto.codigo.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : producto) || producto.proveedor.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : producto) || producto.rubro.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : producto) || producto.notas.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : producto) || producto.descripcion.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : producto)
                )
            };
        case PRECIO_VENTA:
            return {
                ...state,
                valorDeVenta: action.payload
            };
        case LIMPIAR_VENTA:
            return {
                ...state,
                valorDeVenta: ""
            };
        case TRAER_DOLAR_BD:
            return {
                ...state,
                dolarBD: action.payload
            };
        case LIMPIAR_APP:
            return {
                ...state,
                productos: [],
                productoSeleccionado: null,
                mensajeRubro: null,
                mensajeCodigo: null,
                mensajeProveedor: null,
                filtrados: [],
                rubros: [],
                proveedores: [],
                valorDeVenta: "",
                dolarBD: ""
            };
        case ORDENAR_CODIGO:
            return {
                ...state,
                //ordeno el state segun numero. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor. La sintaxis de comparar numeros y letras es un poco diferente
                productos: action.payload ? state.productos.sort((a, b)=>b.codigo - a.codigo
                ) : !action.payload ? state.productos.sort((a, b)=>a.codigo - b.codigo
                ) : state.productos
            };
        case ORDENAR_PRECIO:
            return {
                ...state,
                productos: action.payload ? state.productos.sort((a, b)=>b.precio_venta_conocidos - a.precio_venta_conocidos
                ) : !action.payload ? state.productos.sort((a, b)=>a.precio_venta_conocidos - b.precio_venta_conocidos
                ) : state.productos
            };
        case ORDENAR_NOMBRE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                productos: action.payload ? state.productos.sort((a, b)=>b.nombre > a.nombre ? 1 : -1
                ) : !action.payload ? state.productos.sort((a, b)=>a.nombre > b.nombre ? 1 : -1
                ) : state.productos
            };
        case ORDENAR_MARCA:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                productos: action.payload ? state.productos.sort((a, b)=>b.marca > a.marca ? 1 : -1
                ) : !action.payload ? state.productos.sort((a, b)=>a.marca > b.marca ? 1 : -1
                ) : state.productos
            };
        case ORDENAR_MODELO:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                productos: action.payload ? state.productos.sort((a, b)=>b.modelo > a.modelo ? 1 : -1
                ) : !action.payload ? state.productos.sort((a, b)=>a.modelo > b.modelo ? 1 : -1
                ) : state.productos
            };
        case ORDENAR_DISPONIBLES:
            return {
                ...state,
                //ordeno el state segun numero. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor. La sintaxis de comparar numeros y letras es un poco diferente
                productos: action.payload ? state.productos.sort((a, b)=>b.disponibles - a.disponibles
                ) : !action.payload ? state.productos.sort((a, b)=>a.disponibles - b.disponibles
                ) : state.productos
            };
        case ORDENAR_CODIGO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.codigo - a.codigo
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.codigo - b.codigo
                ) : state.filtrados
            };
        case ORDENAR_PRECIO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.precio_venta_conocidos - a.precio_venta_conocidos
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.precio_venta_conocidos - b.precio_venta_conocidos
                ) : state.filtrados
            };
        case ORDENAR_NOMBRE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.nombre > a.nombre ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.nombre > b.nombre ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_MARCA_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.marca > a.marca ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.marca > b.marca ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_MODELO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.modelo > a.modelo ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.modelo > b.modelo ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_DISPONIBLES_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.disponibles - a.disponibles
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.disponibles - b.disponibles
                ) : state.filtrados
            };
        default:
            return state;
    }
};

;// CONCATENATED MODULE: ./context/productos/productoState.jsx






const ProductoState = ({ children  })=>{
    const initialState = {
        productos: [],
        productoSeleccionado: null,
        mensajeRubro: null,
        mensajeCodigo: null,
        mensajeProveedor: null,
        filtrados: [],
        rubros: [],
        proveedores: [],
        valorDeVenta: "",
        dolarBD: ""
    };
    const { 0: state , 1: dispatch  } = (0,external_react_.useReducer)(productoReducer, initialState) // se renombra initialState como state
    ;
    //crea un producto nuevo
    const agregarProducto = async (producto)=>{
        try {
            const respuesta = await axios/* default.post */.Z.post("/api/productos", producto);
            dispatch({
                type: AGREGAR_PRODUCTO,
                payload: respuesta.data.producto
            });
        } catch (error) {
            dispatch({
                type: ERROR_AGREGAR_PRODUCTO,
                payload: error.response.data.msg
            });
            setTimeout(()=>{
                dispatch({
                    type: OCULTAR_ALERTA
                });
            }, 3000);
        }
    };
    //crea un nuevo rubro
    const agregarRubro = async (nombre)=>{
        try {
            const respuesta = await axios/* default.post */.Z.post("/api/rubros", {
                nombre
            });
            dispatch({
                type: AGREGAR_RUBRO,
                payload: respuesta.data.rubro.nombre
            });
        } catch (error) {
            dispatch({
                type: ERROR_AGREGAR_RUBRO,
                payload: error.response.data.msg
            });
            setTimeout(()=>{
                dispatch({
                    type: OCULTAR_ALERTA
                });
            }, 3000);
        }
    };
    //crea un nuevo proveedor
    const agregarProveedor = async (nombre)=>{
        try {
            const respuesta = await axios/* default.post */.Z.post("/api/proveedores", {
                nombre
            });
            dispatch({
                type: AGREGAR_PROVEEDOR,
                payload: respuesta.data.proveedor
            });
        } catch (error) {
            dispatch({
                type: ERROR_AGREGAR_PROVEEDOR,
                payload: error.response.data.msg
            });
            setTimeout(()=>{
                dispatch({
                    type: OCULTAR_ALERTA
                });
            }, 3000);
        }
    };
    //modifico el producto
    const editarProducto = async (producto)=>{
        try {
            const respuesta = await axios/* default.put */.Z.put(`/api/productos/${producto._id}`, producto);
            dispatch({
                type: EDITAR_PRODUCTO,
                payload: respuesta.data.producto
            });
        } catch (error) {
            console.log(error);
        }
    };
    const editarProductos = async (precio)=>{
        try {
            if (precio) {
                const respuesta = await axios/* default.put */.Z.put("/api/productos", {
                    precio
                });
                dispatch({
                    type: PRODUCTOS_CAMBIADOS,
                    payload: respuesta.data.productos
                });
                respuesta.data.productos.map((producto)=>{
                    editarProducto(producto);
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    //trae todos los productos creados
    const traerProductos = async ()=>{
        try {
            const respuesta = await axios/* default.get */.Z.get("/api/productos");
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: respuesta.data.productos
            });
        } catch (error) {
            console.log(error);
        }
    };
    //trae todos los rubros creados
    const traerRubros = async ()=>{
        try {
            const respuesta = await axios/* default.get */.Z.get("/api/rubros");
            dispatch({
                type: OBTENER_RUBROS,
                payload: respuesta.data.rubros
            });
        } catch (error) {
            console.log(error);
        }
    };
    const traerProveedores = async ()=>{
        try {
            const respuesta = await axios/* default.get */.Z.get("/api/proveedores");
            dispatch({
                type: OBTENER_PROVEEDORES,
                payload: respuesta.data.proveedores
            });
        } catch (error) {
            console.log(error);
        }
    };
    //guarda el producto seleccionado
    const productoActual = async (producto)=>{
        try {
            dispatch({
                type: PRODUCTO_ACTUAL,
                payload: producto
            });
        } catch (error) {
            console.log(error);
        }
    };
    //saco el producto seleccionado del state cuando no estoy en la vista propia
    const limpiarSeleccionado = ()=>{
        try {
            dispatch({
                type: LIMPIAR_SELECCIONADO
            });
        } catch (error) {
            console.log(error);
        }
    };
    //elimino un producto
    const eliminarProducto = async (id)=>{
        try {
            await axios/* default.delete */.Z["delete"](`/api/productos/${id}`);
            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    };
    //eliminar todos los productos
    const eliminarProductos = async ()=>{
        await axios/* default.delete */.Z["delete"]("/api/productos");
        dispatch({
            type: ELIMINAR_PRODUCTOS
        });
    };
    //eliminar todos los rubros
    const eliminarRubros = async ()=>{
        await axios/* default.delete */.Z["delete"]("/api/rubros");
        dispatch({
            type: ELIMINAR_RUBROS
        });
    };
    const eliminarProveedores = async ()=>{
        await axios/* default.delete */.Z["delete"]("/api/proveedores");
        dispatch({
            type: ELIMINAR_PROVEEDORES
        });
    };
    //filtro en el listado segun propiedades del producto
    const filtro = (valor)=>{
        try {
            dispatch({
                type: FILTRAR_PRODUCTO,
                payload: valor
            });
        } catch (error) {
            console.log(error);
        }
    };
    //quito disponibilidad del producto
    const venderProducto = async (producto, unidades)=>{
        producto.disponibles = producto.disponibles - unidades;
        try {
            editarProducto(producto);
        } catch (error) {
            console.log(error);
        }
    };
    const precioVenta = (valor1, valor2, valor3, valor4)=>{
        if (valor1 > 0 && valor2 > 0 && valor3 > 0 && valor4 === "") {
            const val1 = parseFloat(valor1) //precio compra dolar
            ;
            const val2 = parseFloat(valor2) //valor dolar compra
            ;
            const res1 = val1 * val2;
            const res2 = parseInt(Math.round(valor3)) + 100 //redondeo el porcentaje y convierto a integer el resultado de la operacion
            ;
            const res3 = res1 * res2;
            const res4 = (res3 / 100).toFixed(2);
            try {
                dispatch({
                    type: PRECIO_VENTA,
                    payload: res4
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            limpiarPrecioVenta();
        }
        if (valor3 > 0 && valor4 > 0 && valor1 === "") {
            const res3 = parseInt(valor4 * (parseInt(valor3) + 100) / 100).toFixed(2);
            try {
                dispatch({
                    type: PRECIO_VENTA,
                    payload: res3
                });
            } catch (error) {
                console.log(error);
            }
        }
    };
    const limpiarPrecioVenta = ()=>{
        dispatch({
            type: LIMPIAR_VENTA
        });
    };
    const traerDolarAPI = async ()=>{
        try {
            const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            const valor = {
                precio: parseInt(resultado[0].casa.venta)
            };
            await axios/* default.post */.Z.post("/api/dolares", valor);
        } catch (error) {
            console.log(error);
        }
    };
    const traerDolarBD = async ()=>{
        try {
            const respuesta = await axios/* default.get */.Z.get("/api/dolares");
            if (respuesta.data.dolar.length !== 0) {
                const dolar = respuesta.data.dolar[0].precio;
                dispatch({
                    type: TRAER_DOLAR_BD,
                    payload: dolar
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const orderCodigo = (ordenCodigo)=>{
        dispatch({
            type: ORDENAR_CODIGO,
            payload: ordenCodigo
        });
    };
    const orderPrecio = (ordenPrecio)=>{
        dispatch({
            type: ORDENAR_PRECIO,
            payload: ordenPrecio
        });
    };
    const orderNombre = (ordenNombre)=>{
        dispatch({
            type: ORDENAR_NOMBRE,
            payload: ordenNombre
        });
    };
    const orderMarca = (ordenMarca)=>{
        dispatch({
            type: ORDENAR_MARCA,
            payload: ordenMarca
        });
    };
    const orderModelo = (ordenModelo)=>{
        dispatch({
            type: ORDENAR_MODELO,
            payload: ordenModelo
        });
    };
    const orderDisponibles = (ordenDisponibles)=>{
        dispatch({
            type: ORDENAR_DISPONIBLES,
            payload: ordenDisponibles
        });
    };
    const orderCodigoFiltrados = (ordenCodigo)=>{
        dispatch({
            type: ORDENAR_CODIGO_FILTRADO,
            payload: ordenCodigo
        });
    };
    const orderPrecioFiltrados = (ordenPrecio)=>{
        dispatch({
            type: ORDENAR_PRECIO_FILTRADO,
            payload: ordenPrecio
        });
    };
    const orderNombreFiltrados = (ordenNombre)=>{
        dispatch({
            type: ORDENAR_NOMBRE_FILTRADO,
            payload: ordenNombre
        });
    };
    const orderMarcaFiltrados = (ordenMarca)=>{
        dispatch({
            type: ORDENAR_MARCA_FILTRADO,
            payload: ordenMarca
        });
    };
    const orderModeloFiltrados = (ordenModelo)=>{
        dispatch({
            type: ORDENAR_MODELO_FILTRADO,
            payload: ordenModelo
        });
    };
    const orderDisponiblesFiltrados = (ordenDisponibles)=>{
        dispatch({
            type: ORDENAR_DISPONIBLES_FILTRADO,
            payload: ordenDisponibles
        });
    };
    const limpiarApp = ()=>{
        dispatch({
            type: LIMPIAR_APP
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(productoContext/* default.Provider */.Z.Provider, {
        value: {
            productos: state.productos,
            productoSeleccionado: state.productoSeleccionado,
            mensajeCodigo: state.mensajeCodigo,
            mensajeRubro: state.mensajeRubro,
            mensajeProveedor: state.mensajeProveedor,
            filtrados: state.filtrados,
            rubros: state.rubros,
            proveedores: state.proveedores,
            valorDeVenta: state.valorDeVenta,
            dolarBD: state.dolarBD,
            agregarProducto,
            traerProductos,
            traerRubros,
            traerProveedores,
            productoActual,
            editarProducto,
            limpiarSeleccionado,
            eliminarProducto,
            filtro,
            agregarRubro,
            venderProducto,
            agregarProveedor,
            eliminarProductos,
            eliminarRubros,
            eliminarProveedores,
            precioVenta,
            limpiarPrecioVenta,
            traerDolarAPI,
            traerDolarBD,
            editarProductos,
            orderCodigo,
            orderCodigoFiltrados,
            orderPrecio,
            orderPrecioFiltrados,
            orderNombre,
            orderNombreFiltrados,
            orderMarca,
            orderMarcaFiltrados,
            orderModelo,
            orderModeloFiltrados,
            orderDisponibles,
            orderDisponiblesFiltrados,
            limpiarApp
        },
        children: children
    });
};
/* harmony default export */ const productoState = (ProductoState);

;// CONCATENATED MODULE: ./context/faltantes/faltantesReducer.jsx

function faltantesReducer(state, action) {
    switch(action.type){
        case AGREGAR_FALTANTE:
            return {
                ...state,
                faltantes: [
                    ...state.faltantes,
                    action.payload
                ]
            };
        case ELIMINAR_FALTANTE:
            return {
                ...state,
                faltantes: state.faltantes.filter((faltante)=>faltante._id !== action.payload
                )
            };
        case TRAER_FALTANTES:
            return {
                ...state,
                faltantes: action.payload
            };
        case FILTRO_FALTANTE:
            return {
                ...state,
                filtrados: state.faltantes.filter((faltante)=>faltante.nombre.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : faltante) || faltante.marca.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : faltante) || faltante.modelo.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : faltante) || faltante.codigo.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : faltante) || faltante.proveedor.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : faltante) || faltante.rubro.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : faltante) || faltante.notas.toString().toLowerCase().includes(action.payload.toLowerCase() ? action.payload : faltante)
                )
            };
        case ORDENAR_CODIGO_FALTANTE:
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a, b)=>b.codigo - a.codigo
                ) : !action.payload ? state.faltantes.sort((a, b)=>a.codigo - b.codigo
                ) : state.faltantes
            };
        case ORDENAR_NOMBRE_FALTANTE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                faltantes: action.payload ? state.faltantes.sort((a, b)=>b.nombre > a.nombre ? 1 : -1
                ) : !action.payload ? state.faltantes.sort((a, b)=>a.nombre > b.nombre ? 1 : -1
                ) : state.faltantes
            };
        case ORDENAR_MARCA_FALTANTE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                faltantes: action.payload ? state.faltantes.sort((a, b)=>b.marca > a.marca ? 1 : -1
                ) : !action.payload ? state.faltantes.sort((a, b)=>a.marca > b.marca ? 1 : -1
                ) : state.faltantes
            };
        case ORDENAR_MODELO_FALTANTE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                faltantes: action.payload ? state.faltantes.sort((a, b)=>b.modelo > a.modelo ? 1 : -1
                ) : !action.payload ? state.faltantes.sort((a, b)=>a.modelo > b.modelo ? 1 : -1
                ) : state.faltantes
            };
        case ORDENAR_RUBRO_FALTANTE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                faltantes: action.payload ? state.faltantes.sort((a, b)=>b.rubro > a.rubro ? 1 : -1
                ) : !action.payload ? state.faltantes.sort((a, b)=>a.rubro > b.rubro ? 1 : -1
                ) : state.faltantes
            };
        case ORDENAR_PROVEEDOR_FALTANTE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                faltantes: action.payload ? state.faltantes.sort((a, b)=>b.proveedor > a.proveedor ? 1 : -1
                ) : !action.payload ? state.faltantes.sort((a, b)=>a.proveedor > b.proveedor ? 1 : -1
                ) : state.faltantes
            };
        case ORDENAR_DISPONIBLES_FALTANTE:
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a, b)=>b.disponibles - a.disponibles
                ) : !action.payload ? state.faltantes.sort((a, b)=>a.disponibles - b.disponibles
                ) : state.faltantes
            };
        case ORDENAR_CODIGO_FALTANTE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.codigo - a.codigo
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.codigo - b.codigo
                ) : state.filtrados
            };
        case ORDENAR_NOMBRE_FALTANTE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.nombre > a.nombre ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.nombre > b.nombre ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_MARCA_FALTANTE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.marca > a.marca ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.marca > b.marca ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_MODELO_FALTANTE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.modelo > a.modelo ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.modelo > b.modelo ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_RUBRO_FALTANTE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.rubro > a.rubro ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.rubro > b.rubro ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_PROVEEDOR_FALTANTE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.proveedor > a.proveedor ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.proveedor > b.proveedor ? 1 : -1
                ) : state.filtrados
            };
        case ORDENAR_DISPONIBLES_FALTANTE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b)=>b.disponibles > a.disponibles ? 1 : -1
                ) : !action.payload ? state.filtrados.sort((a, b)=>a.disponibles > b.disponibles ? 1 : -1
                ) : state.filtrados
            };
        default:
            return state;
    }
};

// EXTERNAL MODULE: ./context/faltantes/faltantesContext.jsx
var faltantesContext = __webpack_require__(349);
;// CONCATENATED MODULE: ./context/faltantes/faltantesState.jsx






const FaltanteState = ({ children  })=>{
    const initialState = {
        faltantes: [],
        filtrados: []
    };
    const { 0: state , 1: dispatch  } = (0,external_react_.useReducer)(faltantesReducer, initialState);
    const agregarFaltante = async (id)=>{
        try {
            const resultado = await axios/* default.put */.Z.put(`/api/faltantes/${id}`);
            dispatch({
                type: AGREGAR_FALTANTE,
                payload: resultado.data.producto
            });
        } catch (error) {
            console.log(error);
        }
    };
    const traerFaltantes = async ()=>{
        try {
            const resultado = await axios/* default.get */.Z.get("/api/faltantes");
            dispatch({
                type: TRAER_FALTANTES,
                payload: resultado.data.faltantes
            });
        } catch (error) {
            console.log(error);
        }
    };
    const eliminarFaltante = async (id)=>{
        try {
            await axios/* default.put */.Z.put(`/api/faltantes/${id}`);
            dispatch({
                type: ELIMINAR_FALTANTE,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    };
    const filtroFaltante = (filtro)=>{
        try {
            dispatch({
                type: FILTRO_FALTANTE,
                payload: filtro
            });
        } catch (error) {
            console.log(error);
        }
    };
    const orderCodigo = (ordenCodigo)=>{
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE,
            payload: ordenCodigo
        });
    };
    const orderNombre1 = (ordenNombre)=>{
        dispatch({
            type: ORDENAR_NOMBRE_FALTANTE,
            payload: ordenNombre
        });
    };
    const orderMarca = (ordenMarca)=>{
        dispatch({
            type: ORDENAR_MARCA_FALTANTE,
            payload: ordenMarca
        });
    };
    const orderModelo = (ordenModelo)=>{
        dispatch({
            type: ORDENAR_MODELO_FALTANTE,
            payload: ordenModelo
        });
    };
    const orderRubro = (ordenRubro)=>{
        dispatch({
            type: ORDENAR_RUBRO_FALTANTE,
            payload: ordenRubro
        });
    };
    const orderProveedor = (ordenProveedor)=>{
        dispatch({
            type: ORDENAR_PROVEEDOR_FALTANTE,
            payload: ordenProveedor
        });
    };
    const orderDisponibles = (ordenDisponibles)=>{
        dispatch({
            type: ORDENAR_DISPONIBLES_FALTANTE,
            payload: ordenDisponibles
        });
    };
    const orderCodigoFiltrados = (ordenCodigo)=>{
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE_FILTRADO,
            payload: ordenCodigo
        });
    };
    const orderNombreFiltrados = (orderNombre)=>{
        dispatch({
            type: ORDENAR_NOMBRE_FALTANTE_FILTRADO,
            payload: orderNombre
        });
    };
    const orderMarcaFiltrados = (ordenMarca)=>{
        dispatch({
            type: ORDENAR_MARCA_FALTANTE_FILTRADO,
            payload: ordenMarca
        });
    };
    const orderModeloFiltrados = (ordenModelo)=>{
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE_FILTRADO,
            payload: ordenModelo
        });
    };
    const orderRubroFiltrados = (ordenRubro)=>{
        dispatch({
            type: ORDENAR_RUBRO_FALTANTE_FILTRADO,
            payload: ordenRubro
        });
    };
    const orderProveedorFiltrados = (ordenproveedor)=>{
        dispatch({
            type: ORDENAR_PROVEEDOR_FALTANTE_FILTRADO,
            payload: ordenproveedor
        });
    };
    const orderDisponiblesFiltrados = (ordenDisponibles)=>{
        dispatch({
            type: ORDENAR_DISPONIBLES_FALTANTE_FILTRADO,
            payload: ordenDisponibles
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(faltantesContext/* default.Provider */.Z.Provider, {
        value: {
            faltantes: state.faltantes,
            filtrados: state.filtrados,
            agregarFaltante,
            traerFaltantes,
            eliminarFaltante,
            orderCodigo,
            orderCodigoFiltrados,
            orderNombre: orderNombre1,
            orderNombreFiltrados,
            orderMarca,
            orderMarcaFiltrados,
            orderModelo,
            orderModeloFiltrados,
            orderRubro,
            orderRubroFiltrados,
            orderProveedor,
            orderProveedorFiltrados,
            orderDisponibles,
            orderDisponiblesFiltrados,
            filtroFaltante
        },
        children: children
    });
};
/* harmony default export */ const faltantesState = (FaltanteState);

;// CONCATENATED MODULE: ./pages/_app.jsx





function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(productoState, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(faltantesState, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(authState, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(449));
module.exports = __webpack_exports__;

})();