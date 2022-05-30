"use strict";
exports.id = 213;
exports.ids = [213];
exports.modules = {

/***/ 213:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ productos_Formulario)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./components/productos/Rubro.jsx

const Rubro = ({ rubro  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("option", {
        value: rubro.nombre,
        children: rubro.nombre
    });
};
/* harmony default export */ const productos_Rubro = (Rubro);

;// CONCATENATED MODULE: ./components/productos/Proveedor.jsx

const Proveedor = ({ proveedor  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("option", {
        value: proveedor.nombre,
        children: proveedor.nombre
    });
};
/* harmony default export */ const productos_Proveedor = (Proveedor);

// EXTERNAL MODULE: ./helpers/index.jsx
var helpers = __webpack_require__(463);
// EXTERNAL MODULE: ./context/productos/productoContext.jsx
var productoContext = __webpack_require__(7581);
// EXTERNAL MODULE: ./context/auth/authContext.jsx
var authContext = __webpack_require__(1146);
// EXTERNAL MODULE: external "sweetalert2"
var external_sweetalert2_ = __webpack_require__(271);
var external_sweetalert2_default = /*#__PURE__*/__webpack_require__.n(external_sweetalert2_);
// EXTERNAL MODULE: ./context/historial/compras/compraContext.jsx
var compraContext = __webpack_require__(9112);
;// CONCATENATED MODULE: ./components/productos/Formulario.jsx









const Formulario = ({ productoEditar  })=>{
    const AuthContext = (0,external_react_.useContext)(authContext/* default */.Z);
    const { modo , usuario  } = AuthContext;
    const CompraContext = (0,external_react_.useContext)(compraContext/* default */.Z);
    const { traerCompras  } = CompraContext;
    const productosContext = (0,external_react_.useContext)(productoContext/* default */.Z);
    const { productos , productoSeleccionado , agregarProducto , agregarRubro , agregarProveedor , editarProducto , mensajeCodigo , mensajeRubro , mensajeProveedor , traerProductos , traerRubros , rubros , proveedores , traerProveedores , valorDeVenta , valorDeVentaConocidos , valorDeVentaEfectivo , valorDeVentaTarjeta , limpiarPrecioVenta , precioVenta , traerDolarAPI , traerDolarBD ,  } = productosContext;
    const { 0: valoresR , 1: setValoresR  } = (0,external_react_.useState)("") //contiene lo que voy escribiendo en rubro
    ;
    const { 0: valoresP , 1: setValoresP  } = (0,external_react_.useState)("") //contiene lo que voy escribiendo en proveedor
    ;
    var ref;
    const { 0: rubroSelect , 1: setRubroSelect  } = (0,external_react_.useState)((ref = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.rubro) !== null && ref !== void 0 ? ref : "");
    var ref1;
    const { 0: proveedorSelect , 1: setProveedorSelect  } = (0,external_react_.useState)((ref1 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.proveedor) !== null && ref1 !== void 0 ? ref1 : "");
    var ref2;
    const { 0: valorFaltante , 1: setValorFaltante  } = (0,external_react_.useState)((ref2 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.añadirFaltante) !== null && ref2 !== void 0 ? ref2 : false);
    const { 0: cantidad , 1: setCantidad  } = (0,external_react_.useState)("");
    const desdeForm = true //con esto me aseguro que los datos que envio para agregar producto/compra o editar producto/compra, vienen desde el formulario, y no se editan en el listado
    ;
    var ref3, ref4, ref5, ref6, ref7, ref8, ref9, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref20, ref21, ref22, ref23, ref24, ref25;
    const { 0: producto1 , 1: setProducto  } = (0,external_react_.useState)({
        nombre: (ref3 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.nombre) !== null && ref3 !== void 0 ? ref3 : "",
        modelo: (ref4 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.modelo) !== null && ref4 !== void 0 ? ref4 : "",
        marca: (ref5 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.marca) !== null && ref5 !== void 0 ? ref5 : "",
        codigo: (ref6 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.codigo) !== null && ref6 !== void 0 ? ref6 : "",
        barras: (ref7 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.barras) !== null && ref7 !== void 0 ? ref7 : "",
        valor_dolar_compra: (ref8 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.valor_dolar_compra) !== null && ref8 !== void 0 ? ref8 : "",
        precio_venta: (ref9 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.precio_venta) !== null && ref9 !== void 0 ? ref9 : 0,
        precio_venta_conocidos: (ref10 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.precio_venta_conocidos) !== null && ref10 !== void 0 ? ref10 : 0,
        precio_venta_efectivo: (ref11 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.precio_venta_efectivo) !== null && ref11 !== void 0 ? ref11 : 0,
        precio_venta_tarjeta: (ref12 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.precio_venta_tarjeta) !== null && ref12 !== void 0 ? ref12 : 0,
        precio_compra_dolar: (ref13 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.precio_compra_dolar) !== null && ref13 !== void 0 ? ref13 : "",
        precio_compra_peso: (ref14 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.precio_compra_peso) !== null && ref14 !== void 0 ? ref14 : "",
        rubro: (ref15 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.rubro) !== null && ref15 !== void 0 ? ref15 : "",
        proveedor: (ref16 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.proveedor) !== null && ref16 !== void 0 ? ref16 : "",
        todos_proveedores: (ref17 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.todos_proveedores) !== null && ref17 !== void 0 ? ref17 : [],
        fecha_compra: (ref19 = (ref18 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.fecha_compra) !== null && ref18 !== void 0 ? ref18 : helpers/* hoy */.Ns) !== null && ref19 !== void 0 ? ref19 : "",
        disponibles: (ref20 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.disponibles) !== null && ref20 !== void 0 ? ref20 : "",
        rentabilidad: (ref21 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.rentabilidad) !== null && ref21 !== void 0 ? ref21 : "",
        notas: (ref22 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.notas) !== null && ref22 !== void 0 ? ref22 : "",
        faltante: (ref23 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.faltante) !== null && ref23 !== void 0 ? ref23 : false,
        limiteFaltante: (ref24 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.limiteFaltante) !== null && ref24 !== void 0 ? ref24 : "",
        añadirFaltante: (ref25 = productoEditar === null || productoEditar === void 0 ? void 0 : productoEditar.añadirFaltante) !== null && ref25 !== void 0 ? ref25 : false
    });
    const { nombre , marca , modelo , codigo , barras , rubro: rubro1 , precio_venta , precio_venta_conocidos , precio_venta_efectivo , precio_venta_tarjeta , precio_compra_dolar , fecha_compra , precio_compra_peso , valor_dolar_compra , proveedor: proveedor1 , todos_proveedores , disponibles , rentabilidad , notas , faltante , limiteFaltante , añadirFaltante  } = producto1;
    //hago un get a todas estas colecciones para tenerlos en este componente
    (0,external_react_.useEffect)(()=>{
        if (usuario) {
            traerDolarBD();
            traerDolarAPI();
            traerRubros();
            traerProveedores();
            traerCompras();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        usuario,
        productos
    ]) //cuando cambie cualquiera de las 2 se ejecuta el useefect
    ;
    (0,external_react_.useEffect)(()=>{
        if (usuario) {
            traerProductos();
        }
    }, [
        usuario
    ]);
    //cada vez que cambie el producto seleccionado me vacia el input de precio sugerido
    (0,external_react_.useEffect)(()=>{
        limpiarPrecioVenta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        productoSeleccionado
    ]);
    //cada vez que escriba en los inputs se realiza el calculo aprox para el precio de la venta
    (0,external_react_.useEffect)(()=>{
        precioVenta(valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rentabilidad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        valor_dolar_compra,
        precio_compra_dolar,
        precio_compra_peso,
        rentabilidad
    ]);
    (0,external_react_.useEffect)(()=>{
        producto1.proveedor = proveedorSelect;
    }, [
        proveedorSelect
    ]);
    (0,external_react_.useEffect)(()=>{
        producto1.proveedor = valoresP;
    }, [
        valoresP
    ]);
    const onChange = (e)=>{
        setProducto({
            ...producto1,
            [e.target.name]: e.target.value
        });
    };
    const onChangeNumeros = (e)=>{
        setProducto({
            ...producto1,
            [e.target.name]: e.target.value.replace(",", ".")
        });
    };
    const onChangeRubroInput = (e)=>{
        setValoresR(e.target.value.toUpperCase());
    };
    const onChangeRubroSelect = (e)=>{
        setRubroSelect(e.target.value.toUpperCase());
    };
    if (valoresR && !rubroSelect) {
        producto1.rubro = valoresR;
    }
    if (rubroSelect && !valoresR) {
        producto1.rubro = rubroSelect;
    }
    const onChangeProveedorInput = (e)=>{
        setValoresP(e.target.value.toUpperCase());
    };
    const onChangeProveedorSelect = (e)=>{
        setProveedorSelect(e.target.value.toUpperCase());
    };
    if (valoresP && !proveedorSelect) {
        producto1.proveedor = valoresP;
    }
    if (proveedorSelect && !valoresP) {
        producto1.proveedor = proveedorSelect;
    }
    if (valorFaltante) {
        producto1.añadirFaltante = true;
    } else {
        producto1.añadirFaltante = false;
    }
    if (!valor_dolar_compra || !rentabilidad && precio_compra_peso) {
        producto1.precio_venta = 0;
        producto1.precio_venta_conocidos = 0;
        producto1.precio_venta_efectivo = 0;
        producto1.precio_venta_tarjeta = 0;
    }
    if (!valor_dolar_compra || !rentabilidad && precio_compra_dolar || !precio_compra_dolar) {
        producto1.precio_venta = 0;
        producto1.precio_venta_conocidos = 0;
        producto1.precio_venta_efectivo = 0;
        producto1.precio_venta_tarjeta = 0;
    }
    const alertaNuevoCorrecto = ()=>{
        external_sweetalert2_default().fire({
            position: "top-end",
            icon: "success",
            title: `${modo ? '<h3 style="color:white">Se cre\xf3 el producto correctamente</h3>' : '<h3 style="color:#545454">Se cre\xf3 el producto correctamente</h3>'}`,
            showConfirmButton: false,
            timer: 1500,
            background: `${modo ? "rgb(31 41 55)" : "white"}`
        });
    };
    const alertaEditarCorrecto = ()=>{
        external_sweetalert2_default().fire({
            position: "top-end",
            icon: "success",
            title: `${modo ? '<h3 style="color:white">Se modific\xf3 el producto correctamente</h3>' : '<h3 style="color:#545454">Se modific\xf3 el producto correctamente</h3>'}`,
            showConfirmButton: false,
            timer: 1500,
            background: `${modo ? "rgb(31 41 55)" : "white"}`
        });
    };
    //! ENVIAR FORMULARIO
    const onSubmit = (e)=>{
        e.preventDefault();
        //Validar nombre
        if (nombre === "") {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>nombre</b> es obligatorio.</p>' : '<p style="color:#545454">El <b>nombre</b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //valido codigo. Esto lo hago para que no se vacíe el campo en caso de que haya algun error de backend
        if (productos) {
            const boolean = productos.map((producto)=>producto.codigo == codigo ? true : false
            );
            const contiene = boolean.includes(true) //si existe el codigo del formulario en un producto ya creado guardo un true
            ;
            const productoeditar = productoEditar === null || productoEditar === void 0 //en caso de que el producto sea a editar, guardo su codigo
             ? void 0 : productoEditar.codigo;
            if (contiene && productoeditar !== codigo) {
                external_sweetalert2_default().fire({
                    icon: "error",
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">El <b>codigo</b> ya esta ingresado.</p>' : '<p style="color:#545454">El <b>codigo</b> ya esta ingresado.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`
                });
                return;
            }
        }
        //convierto el valor del state a numero
        const codigoCambiado = Number(codigo);
        if (!codigo || codigo < 1 || isNaN(codigo) || !Number.isInteger(codigoCambiado)) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>c\xf3digo</b> debe ser un n\xfamero entero mayor a 0.</p>' : '<p style="color:#545454">El <b>c\xf3digo</b> debe ser un n\xfamero entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        if (codigo.length > 3) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>c\xf3digo</b> debe ser un n\xfamero menor a 4 d\xedgitos</p>' : '<p style="color:#545454">El <b>c\xf3digo</b> debe ser un n\xfamero menor a 4 d\xedgitos</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //validar el nuevo rubro. Esto lo hago para que no se vacíe el campo en caso de que haya algun error de backend
        if (valoresR) {
            if (rubroSelect && valoresR) {
                external_sweetalert2_default().fire({
                    icon: "error",
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">Ingrese 1 solo <b>rubro</b> a la vez.</p>' : '<p style="color:#545454">Ingrese un solo <b>rubro</b> a la vez.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`
                });
                return;
            }
            if (rubros) {
                const boolean = rubros.map((rubro)=>rubro.nombre == valoresR ? true : false
                ) //recorro el state de rubros
                ;
                const contiene = boolean.includes(true) //devuelvo si existe un rubro con el mismo nombre
                ;
                if (contiene) {
                    external_sweetalert2_default().fire({
                        icon: "error",
                        title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                        html: `${modo ? '<p style="color:white">El <b>rubro</b> ya est\xe1 ingresado.</p>' : '<p style="color:#545454">El <b>rubro</b> ya est\xe1 ingresado.</p>'}`,
                        background: `${modo ? "rgb(31 41 55)" : "white"}`
                    });
                    return;
                }
            }
        }
        const cantidadCambiada = Number(cantidad);
        if (cantidad < 0 || isNaN(cantidad) || !Number.isInteger(cantidadCambiada)) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>cantidad</b> de productos a ingresar debe ser un n\xfamero entero mayor a 0.</p>' : '<p style="color:#545454">La <b>cantidad</b> de productos a ingresar debe ser un n\xfamero entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        if (codigo.length > 3) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>c\xf3digo</b> debe ser un n\xfamero menor a 4 d\xedgitos</p>' : '<p style="color:#545454">El <b>c\xf3digo</b> debe ser un n\xfamero menor a 4 d\xedgitos</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //Validar precio del dolar
        if (!valor_dolar_compra) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio del dolar </b> es obligatorio.</p>' : '<p style="color:#545454">El <b>precio del dolar </b> es obligatorio.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        } else {
            if (isNaN(valor_dolar_compra) || valor_dolar_compra < 1) {
                external_sweetalert2_default().fire({
                    icon: "error",
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">El <b>precio del dolar</b> debe ser 1 como m\xednimo.</p>' : '<p style="color:#545454">El <b>precio del dolar</b> debe ser 1 como m\xednimo.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`
                });
                return;
            }
        }
        //validar valor compra dolar
        if (isNaN(precio_compra_dolar) || precio_compra_dolar < 0) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de compra en USD</b> debe ser un n\xfamero entero mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de compra en USD</b> debe ser un n\xfamero entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //validar valor compra peso
        if (isNaN(precio_compra_peso) || precio_compra_peso < 0) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de compra en ARS</b> debe ser un n\xfamero entero mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de compra en ARS</b> debe ser un n\xfamero entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //validar los 2 input juntos del precio
        if (precio_compra_dolar && precio_compra_peso) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">Solo se puede ingresar un tipo de moneda en la compra.</p>' : '<p style="color:#545454">Solo se puede ingresar un tipo de moneda en la compra.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //validar rentabilidad
        if (isNaN(rentabilidad) || rentabilidad < 0) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">La <b>rentabilidad</b> tiene que ser mayor a 0.</p>' : '<p style="color:#545454">La <b>rentabilidad</b> tiene que ser mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //Validar el precio de venta
        if (isNaN(precio_venta) || precio_venta < 0) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">El <b>precio de venta</b> debe ser mayor a 0.</p>' : '<p style="color:#545454">El <b>precio de venta</b> debe ser mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //validar numero de faltantes
        const limiteFaltanteCambiado = Number(limiteFaltante);
        if (limiteFaltante < 0 || isNaN(limiteFaltante) || !Number.isInteger(limiteFaltanteCambiado)) {
            external_sweetalert2_default().fire({
                icon: "error",
                title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                html: `${modo ? '<p style="color:white">Los <b>faltantes</b> debe ser un n\xfamero entero mayor a 0.</p>' : '<p style="color:#545454">Los <b>faltantes</b> debe ser un n\xfamero entero mayor a 0.</p>'}`,
                background: `${modo ? "rgb(31 41 55)" : "white"}`
            });
            return;
        }
        //validar el nuevo proveedor. Esto lo hago para que no se vacíe el campo en caso de que haya algun error de backend
        if (valoresP) {
            if (proveedorSelect && valoresP) {
                external_sweetalert2_default().fire({
                    icon: "error",
                    title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                    html: `${modo ? '<p style="color:white">Ingrese 1 solo <b>proveedor</b> a la vez.</p>' : '<p style="color:#545454">Ingrese un solo <b>proveedor</b> a la vez.</p>'}`,
                    background: `${modo ? "rgb(31 41 55)" : "white"}`
                });
                return;
            }
            if (proveedores) {
                const boolean = proveedores.map((proveedor)=>proveedor.nombre == valoresP ? true : false
                ) //recorro el state de proveedores
                ;
                const contiene = boolean.includes(true) //devuelvo si existe un proveedor con el mismo nombre
                ;
                if (contiene) {
                    external_sweetalert2_default().fire({
                        icon: "error",
                        title: `${modo ? '<h1 style="color:white">Error</h1>' : '<h1 style="color:#545454">Error</h3>'}`,
                        html: `${modo ? '<p style="color:white">El <b>proveedor</b> ya est\xe1 ingresado.</p>' : '<p style="color:#545454">El <b>proveedor</b> ya est\xe1 ingresado.</p>'}`,
                        background: `${modo ? "rgb(31 41 55)" : "white"}`
                    });
                    return;
                }
            }
            const boolean = producto1.todos_proveedores.map((provider)=>provider === proveedor1 ? true : false
            );
            const prov = boolean.includes(true);
            if (!prov || prov.length === 0) {
                producto1.todos_proveedores.push(valoresP);
            }
        }
        if (proveedorSelect) {
            const boolean = producto1.todos_proveedores.map((provider)=>provider === proveedor1 ? true : false
            );
            const prov = boolean.includes(true);
            if (!prov || prov.length === 0) {
                producto1.todos_proveedores.push(proveedorSelect);
            }
        }
        //si no se cumple ninguna condicion que le puse arriba, y tampoco está vacio el input, lo envio a la bd
        if (valoresP) {
            agregarProveedor(proveedor1);
        }
        //si no se cumple ninguna condicion que le puse arriba, y tampoco está vacio el input, lo envio a la bd
        if (valoresR) {
            agregarRubro(rubro1);
        }
        //si es nuevo producto
        if (!productoEditar) {
            if (cantidad) {
                producto1.disponibles = cantidad;
            }
            if (valorDeVenta) {
                producto1.precio_venta = valorDeVenta;
                producto1.precio_venta_conocidos = valorDeVentaConocidos;
                producto1.precio_venta_efectivo = valorDeVentaEfectivo;
                producto1.precio_venta_tarjeta = valorDeVentaTarjeta;
            }
            agregarProducto(producto1, cantidad, desdeForm);
            setCantidad("");
            setRubroSelect("");
            setProveedorSelect("");
            setProducto({
                nombre: "",
                marca: "",
                modelo: "",
                codigo: "",
                barras: "",
                rubro: "",
                proveedor: "",
                precio_venta: "",
                precio_venta_conocidos: "",
                precio_venta_efectivo: "",
                precio_venta_tarjeta: "",
                precio_compra_dolar: "",
                fecha_compra: helpers/* hoy */.Ns,
                precio_compra_peso: "",
                valor_dolar_compra: "",
                rentabilidad: "",
                notas: "",
                faltante: false,
                limiteFaltante: "",
                añadirFaltante: false
            });
            setValoresR("");
            setValoresP("");
            traerProductos();
            alertaNuevoCorrecto();
        } else {
            //si hay que editar
            if (cantidad && disponibles) {
                producto1.disponibles = Number(producto1.disponibles) + Number(cantidad);
            } else {
                if (cantidad && !disponibles) {
                    producto1.disponibles = Number(cantidad);
                }
            }
            if (valorDeVenta) {
                producto1.precio_venta = valorDeVenta;
                producto1.precio_venta_conocidos = valorDeVentaConocidos;
                producto1.precio_venta_efectivo = valorDeVentaEfectivo;
                producto1.precio_venta_tarjeta = valorDeVentaTarjeta;
            }
            producto1._id = productoEditar._id;
            editarProducto(producto1, cantidad, desdeForm);
            setCantidad("");
            setProveedorSelect(producto1.proveedor);
            setValoresP("");
            traerProductos();
            alertaEditarCorrecto();
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: `${productoEditar ? "text-green-600 dark:text-green-700" : "text-blue-900"} font-black text-3xl sm:text-4xl  dark:text-blue-300 text-center`,
                children: productoEditar ? "Editar Producto" : "Agregar Producto"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                className: "mt-3 text-center text-black dark:text-gray-50",
                children: [
                    "Llena los siguientes campos para ",
                    productoEditar ? "editar" : "agregar",
                    " un producto"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "bg-white dark:bg-gray-900 mt-10 px-5 pt-1 pb-5 rounded-md shadow-md xl:w-auto 2xl:w-11/12 mx-auto ",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "text-gray-600 dark:text-white font-bold text-xl uppercase text-center"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                        className: "mt-10",
                        onSubmit: onSubmit,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "grid lg:grid-cols-2 xl:grid-cols-2 lg:gap-2 xl:gap-4 ",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "nombre",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold font ",
                                                    children: "Nombre *"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                autoComplete: "off",
                                                className: "mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "nombre",
                                                placeholder: "Ej. Pendrive 8Gb 3.0",
                                                name: "nombre",
                                                value: nombre,
                                                onChange: onChange
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                htmlFor: "marca",
                                                className: "text-gray-800 dark:text-gray-300 font-bold font ",
                                                children: "Marca"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                autoComplete: "off",
                                                className: "mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "marca",
                                                placeholder: "Ej. Kingston",
                                                name: "marca",
                                                value: marca,
                                                onChange: onChange
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                htmlFor: "modelo",
                                                className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                children: "Modelo"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                autoComplete: "off",
                                                className: "mt-2 uppercase block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "modelo",
                                                placeholder: "DTKN/64GB",
                                                name: "modelo",
                                                value: modelo,
                                                onChange: onChange
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "codigo",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold",
                                                    children: "C\xf3digo *"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "tel",
                                                autoComplete: "off",
                                                className: " mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "codigo",
                                                placeholder: "123",
                                                name: "codigo",
                                                value: codigo,
                                                onChange: onChange
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "barras",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold",
                                                    children: "C\xf3digo de barras"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "tel",
                                                autoComplete: "off",
                                                className: " mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "barras",
                                                placeholder: "893247539457",
                                                name: "barras",
                                                value: barras,
                                                onChange: onChange
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "rubro",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                        children: "Rubro"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "rubro",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                        children: "Rubros"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "text",
                                                        autoComplete: "off",
                                                        className: ` mt-2  block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`,
                                                        id: "rubro",
                                                        placeholder: "Cables",
                                                        name: "rubro",
                                                        value: valoresR,
                                                        onChange: onChangeRubroInput
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                                        onChange: onChangeRubroSelect,
                                                        value: rubroSelect,
                                                        className: "uppercase text-center mt-2 ml-4 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                value: "",
                                                                className: "uppercase",
                                                                children: " -- Seleccione --"
                                                            }),
                                                            Object.keys(rubros).length > 0 && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                children: rubros.map((rubro, i)=>/*#__PURE__*/ jsx_runtime_.jsx(productos_Rubro, {
                                                                        rubro: rubro
                                                                    }, i)
                                                                )
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "grid grid-cols-9",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "cantidad",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold text-center col-span-1",
                                                        children: "N\xb0"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "proveedor",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold text-left col-span-4",
                                                        children: "Proveedor"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "selectp",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold text-right col-span-4",
                                                        children: "Proveedores"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "grid grid-cols-9",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "tel",
                                                        autoComplete: "off",
                                                        className: `text-center mt-2 block col-span-1 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`,
                                                        id: "cantidad",
                                                        name: "cantidad",
                                                        value: cantidad,
                                                        onChange: (e)=>setCantidad(e.target.value)
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "text",
                                                        autoComplete: "off",
                                                        className: ` mt-2 ml-1 col-span-4 block  p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`,
                                                        id: "proveedor",
                                                        placeholder: "MercadoLibre",
                                                        name: "proveedor",
                                                        value: valoresP,
                                                        onChange: onChangeProveedorInput
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                                        id: "selectp",
                                                        className: "uppercase text-center mt-2 ml-1 block col-span-4 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                        value: proveedorSelect,
                                                        onChange: onChangeProveedorSelect,
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                                value: "",
                                                                className: "uppercase",
                                                                children: "-- Seleccione --"
                                                            }),
                                                            Object.keys(proveedores).length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                children: proveedores.map((proveedor, i)=>/*#__PURE__*/ jsx_runtime_.jsx(productos_Proveedor, {
                                                                        proveedor: proveedor
                                                                    }, i)
                                                                )
                                                            }) : null
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "valor_dolar_compra",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold font ",
                                                    children: "Precio dolar *"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "tel",
                                                step: "any",
                                                autoComplete: "off",
                                                className: "mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "valor_dolar_compra",
                                                placeholder: "$112",
                                                name: "valor_dolar_compra",
                                                value: valor_dolar_compra,
                                                onChange: onChangeNumeros
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "precio_compra_dolar",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold font ",
                                                    children: "Precio compra en USD"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "tel",
                                                autoComplete: "off",
                                                className: "mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "precio_compra_dolar",
                                                placeholder: "$28,84",
                                                name: "precio_compra_dolar",
                                                value: precio_compra_dolar,
                                                onChange: onChangeNumeros
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "precio_compra_peso",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold font ",
                                                    children: "Precio compra en AR$"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "tel",
                                                autoComplete: "off",
                                                className: "mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "precio_compra_peso",
                                                placeholder: "$1250",
                                                name: "precio_compra_peso",
                                                value: precio_compra_peso,
                                                onChange: onChangeNumeros
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "rentabilidad",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold font ",
                                                    children: "Rentabilidad"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "tel",
                                                autoComplete: "off",
                                                className: "mt-2 block w-full p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "rentabilidad",
                                                placeholder: "40%",
                                                name: "rentabilidad",
                                                value: rentabilidad,
                                                onChange: onChangeNumeros
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "grid grid-cols-4",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "precio_venta",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                        children: " al ingreso"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "precio_venta_conocidos",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                        children: " conocidos "
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "precio_venta_efectivo",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                        children: " efectivo "
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        htmlFor: "precio_venta_tarjeta",
                                                        className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                        children: " tarjeta "
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "grid grid-cols-4 gap-1",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "tel",
                                                        autoComplete: "off",
                                                        className: "mt-2 block w-full p-3 pr-0 hover:cursor-pointer justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                        id: "precio_venta",
                                                        placeholder: "$0",
                                                        name: "precio_venta",
                                                        value: valorDeVenta > 0 ? valorDeVenta : precio_venta,
                                                        readOnly: true
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "tel",
                                                        autoComplete: "off",
                                                        className: "mt-2 block w-full p-3 pr-0 hover:cursor-pointer justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                        id: "precio_venta_conocidos",
                                                        placeholder: "$0",
                                                        name: "precio_venta_conocidos",
                                                        value: valorDeVentaConocidos > 0 ? valorDeVentaConocidos : precio_venta_conocidos,
                                                        readOnly: true
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "tel",
                                                        autoComplete: "off",
                                                        className: "mt-2 block w-full p-3 pr-0 hover:cursor-pointer justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                        id: "precio_venta_efectivo",
                                                        placeholder: "$0",
                                                        name: "precio_venta_efectivo",
                                                        value: valorDeVentaEfectivo > 0 ? valorDeVentaEfectivo : precio_venta_efectivo,
                                                        readOnly: true
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "tel",
                                                        autoComplete: "off",
                                                        className: "mt-2 block w-full p-3 pr-0 hover:cursor-pointer justify-end rounded-md font-bold text-red-600 bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                        id: "precio_venta_tarjeta",
                                                        placeholder: "$0",
                                                        name: "precio_venta_tarjeta",
                                                        value: valorDeVentaTarjeta > 0 ? valorDeVentaTarjeta : precio_venta_tarjeta,
                                                        readOnly: true
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                htmlFor: "fecha_compra",
                                                className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                children: "Fecha de compra"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "date",
                                                autoComplete: "off",
                                                className: "mt-2 block w-full p-3 appearance-none rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                                id: "fecha_compra",
                                                placeholder: "fecha_compra",
                                                name: "fecha_compra",
                                                value: fecha_compra,
                                                onChange: onChange
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex justify-between",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                    htmlFor: "limiteFaltante",
                                                    className: "text-gray-800 dark:text-gray-300 font-bold ",
                                                    children: "A\xf1adir como faltante cuanto llegue a: "
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "button",
                                                        className: `w-2/4 lg:w-1/4 rounded-md mt-2 block p-3 hover:cursor-pointer ${valorFaltante ? "bg-blue-200" : "bg-gray-400 "}`,
                                                        onClick: ()=>setValorFaltante(!valorFaltante)
                                                        ,
                                                        value: valorFaltante ? "Si" : "No"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "tel",
                                                        autoComplete: "off",
                                                        className: ` ${!valorFaltante && "hover:cursor-not-allowed"} mt-2 block w-full p-3 text-right rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none  focus:ring-1 focus:ring-blue-300`,
                                                        id: "limiteFalante",
                                                        placeholder: "2 UNIDADES",
                                                        name: "limiteFaltante",
                                                        value: limiteFaltante,
                                                        onChange: onChange,
                                                        disabled: !valorFaltante
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: "notas",
                                        className: "text-gray-800 dark:text-gray-300 font-bold ",
                                        children: "Notas"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                        className: " mt-2 block w-full h-48 p-3 rounded-md bg-gray-50 dark:bg-gray-800 dark:autofill:bg-orange-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-300",
                                        id: "notas",
                                        placeholder: "Ingresa tu notas",
                                        name: "notas",
                                        value: notas,
                                        onChange: onChange
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "submit",
                                value: productoEditar ? "Editar producto" : "Agregar producto",
                                className: `${productoEditar ? "bg-green-600 active:bg-green-700 dark:bg-green-800 dark:active:bg-green-900" : "bg-blue-800 active:bg-blue-900 dark:bg-blue-500 dark:active:bg-blue-600"} mt-5 w-full  p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer`
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const productos_Formulario = (Formulario);


/***/ }),

/***/ 9112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const compraContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compraContext);


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
        month: "numeric",
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


/***/ })

};
;