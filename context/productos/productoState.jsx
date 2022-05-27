import { useReducer } from "react";
import productoContext from "./productoContext"
import productoReducer from "./productoReducer";
import clienteAxios from "../../config/axios"
import {
    AGREGAR_PRODUCTO, 
    AGREGAR_PROVEEDOR, 
    AGREGAR_RUBRO, 
    EDITAR_PRODUCTO, 
    ELIMINAR_PRODUCTO, 
    ELIMINAR_PRODUCTOS, 
    ELIMINAR_PROVEEDORES, 
    ELIMINAR_RUBROS, 
    ERROR_AGREGAR_PRODUCTO, 
    ERROR_AGREGAR_PROVEEDOR, 
    ERROR_AGREGAR_RUBRO, 
    FILTRAR_PRODUCTO, 
    LIMPIAR_APP, 
    LIMPIAR_SELECCIONADO, 
    LIMPIAR_VENTA, 
    OBTENER_PRODUCTOS, 
    OBTENER_PROVEEDORES, 
    OBTENER_RUBROS, 
    OCULTAR_ALERTA, 
    ORDENAR_CODIGO, 
    ORDENAR_CODIGO_FILTRADO, 
    ORDENAR_DISPONIBLES, 
    ORDENAR_DISPONIBLES_FILTRADO, 
    ORDENAR_MARCA, 
    ORDENAR_MARCA_FILTRADO, 
    ORDENAR_MODELO, 
    ORDENAR_MODELO_FILTRADO, 
    ORDENAR_NOMBRE, 
    ORDENAR_NOMBRE_FILTRADO, 
    ORDENAR_PRECIO, 
    ORDENAR_PRECIO_FILTRADO, 
    PRECIO_VENTA_EFECTIVO,
    PRODUCTOS_CAMBIADOS, 
    PRODUCTO_ACTUAL,
    TRAER_DOLAR_BD, 
} from "../../types";

const ProductoState = ({children}) => {


    const initialState = {
        productos: [],
        productoSeleccionado: null,
        mensajeRubro: null,
        mensajeCodigo: null,
        mensajeProveedor: null,
        filtrados: [],  //guarda los productos filtrados,
        rubros: [], //guarda todos los rubros
        proveedores: [],
        valorDeVenta: 0,
        valorDeVentaConocidos: 0,
        valorDeVentaEfectivo: 0,
        valorDeVentaTarjeta: 0,
        dolarBD: "",
    }

    const [state, dispatch] = useReducer(productoReducer, initialState) // se renombra initialState como state

    //crea un producto nuevo
    const agregarProducto = async (producto, cantidad, desdeForm) => {
        try {
            //creo el nuevo producto
            const {data} = await clienteAxios.post("/api/productos", producto)
            dispatch({
                type: AGREGAR_PRODUCTO,
                payload: data.producto
            })
            //creo la nueva compra
            if(desdeForm && cantidad > 0) {
                await clienteAxios.post("/api/compras", {producto, cantidad, desdeForm})
            }
            

        } catch (error) {
           dispatch({
               type: ERROR_AGREGAR_PRODUCTO,
               payload: error.response.data.msg
           })

           setTimeout(() => {
               dispatch({
                   type: OCULTAR_ALERTA
               })
           }, 3000);
        }
    }

    //crea un nuevo rubro
    const agregarRubro = async nombre => {  //envio el rubro
        try {
            
            const {data} = await clienteAxios.post("/api/rubros", {nombre})
            dispatch({
                type: AGREGAR_RUBRO,
                payload: data.rubro.nombre
            })
        } catch (error) {
            dispatch({
                type: ERROR_AGREGAR_RUBRO,
                payload: error.response.data.msg
            })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
        }
    }

    //crea un nuevo proveedor
    const agregarProveedor = async nombre => {
        try {
            const {data} = await clienteAxios.post("/api/proveedores", {nombre})
            dispatch({
                type: AGREGAR_PROVEEDOR,
                payload: data.proveedor
            })
        } catch (error) {
            dispatch({
                type: ERROR_AGREGAR_PROVEEDOR,
                payload: error.response.data.msg
            })
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 3000);
        }
    }

    //modifico el producto
    const editarProducto = async (producto, cantidad, desdeForm) => {
        try {
            const {data} = await clienteAxios.put(`/api/productos/${producto._id}`, {producto, desdeForm})
            dispatch({
                type: EDITAR_PRODUCTO,
                payload: data.producto
            })
            if(desdeForm) {
                await clienteAxios.post("/api/compras", {producto, cantidad, desdeForm})
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const editarProductos = async precio => {
        try {
            if(precio) {
                const {data} = await clienteAxios.put("/api/productos", {precio})
                dispatch({
                    type: PRODUCTOS_CAMBIADOS,
                    payload: data.productos
                })
                data.productos.map(producto => {
                    editarProducto(producto)
                })
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    //trae todos los productos creados
    const traerProductos = async () => {
        try {
            const {data} = await clienteAxios.get("/api/productos")
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: data.productos
            })
        } catch (error) {
            console.log(error)
        }
    }

    
    //trae todos los rubros creados
    const traerRubros = async () => {
        try {
            const {data} = await clienteAxios.get("/api/rubros")
            dispatch({
                type: OBTENER_RUBROS,
                payload: data.rubros
            })
        } catch (error) {
            console.log(error)
        }
    }

    const traerProveedores = async () => {
        try {
            const {data} = await clienteAxios.get("/api/proveedores")
            dispatch({
                type: OBTENER_PROVEEDORES,
                payload: data.proveedores
            })
        } catch (error) {
            console.log(error)
        }
    }
    //guarda el producto seleccionado
    const productoActual = async producto => {
        try {
            dispatch({
                type: PRODUCTO_ACTUAL,
                payload: producto
            })
        } catch (error) {
            console.log(error)
        }
    }
    //saco el producto seleccionado del state cuando no estoy en la vista propia
    const limpiarSeleccionado = () => {
        try {
            dispatch({
                type: LIMPIAR_SELECCIONADO,
            })
        } catch (error) {
            console.log(error)
        }
    }

    //elimino un producto
    const eliminarProducto = async id => {
        try {
            await clienteAxios.delete(`/api/productos/${id}`)
            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    //eliminar todos los productos
    const eliminarProductos = async () => {
        await clienteAxios.delete("/api/productos")
        dispatch({
            type: ELIMINAR_PRODUCTOS
        })
    }

    //eliminar todos los rubros
    const eliminarRubros = async () => {
        await clienteAxios.delete("/api/rubros")
        dispatch({
            type: ELIMINAR_RUBROS
        })
    }

    const eliminarProveedores = async () => {
        await clienteAxios.delete("/api/proveedores")
        dispatch({
            type: ELIMINAR_PROVEEDORES
        })
    }
    //filtro en el listado segun propiedades del producto
    const filtro = valor => {
        try {
            dispatch({
                type: FILTRAR_PRODUCTO,
                payload: valor
            })
        } catch (error) {
            console.log(error)
        }
    }

    //quito disponibilidad del producto
    const venderProducto = async (producto, unidades) => {
        producto.disponibles = producto.disponibles - unidades
        try {
            editarProducto(producto)
        } catch (error) {
            console.log(error)
        }
    }

    const precioVenta = (valor1, valor2, valor3, valor4) => {   //valor_dolar_compra, precio_compra_dolar, precio_compra_peso, rentabilidad
        if(valor1>0 && valor2>0 && valor4>0 && valor3 === "") {
            const val1 = parseFloat(valor1) //precio compra dolar
            const val2 = parseFloat(valor2) //valor dolar compra
            const val4 = parseInt(valor4)   //rentabilidad
            const res1 = (val1 * val2) * (parseInt(Math.round(val4))+100)   //redondeo el porcentaje y convierto a integer el resultado de la operacion
            const res3 = Number((res1 / 100).toFixed(2))
            if(res3) {
                const res4 = Number(((res3 * 105) / 100).toFixed(2))
                const res5 = Number(((res3 * 109) / 100).toFixed(2))
                try {
                    dispatch({
                        type: PRECIO_VENTA_EFECTIVO,
                        payload: {
                            res3,
                            res4,
                            res5
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            limpiarPrecioVenta()
        }
        if(valor3>0 && valor4>0  && valor2==="") {
            const val3 = parseFloat(valor3) //valor peso compra
            const val4 = parseInt(valor4)   //rentabilidad
            const res3 = parseInt(((val3 * (parseInt(val4)+100)) / 100).toFixed(2))
            if(res3) {
                const res4 = Number(((res3 * 105) / 100).toFixed(2))
                const res5 = Number(((res4 * 109) / 100).toFixed(2))
                try {
                    dispatch({
                        type: PRECIO_VENTA_EFECTIVO,
                        payload: {
                            res3,
                            res4,
                            res5
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            } else {
                limpiarPrecioVenta()
            }
        }
    }

    const limpiarPrecioVenta = () => {
        dispatch({
            type: LIMPIAR_VENTA
        })
    }

    const traerDolarAPI = async () => {
        try {
            const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const valor = {precio: parseInt(resultado[0].casa.venta)}
            await clienteAxios.post("/api/dolares", valor)
        } catch (error) {
            console.log(error)
        }
    }

    const traerDolarBD = async () => {
        try {
            const {data} = await clienteAxios.get("/api/dolares")
            if(data.dolar.length !== 0) {
                const dolar = data.dolar[0].precio
                dispatch({
                type: TRAER_DOLAR_BD,
                payload: dolar
            })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const orderCodigo = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO,
            payload: ordenCodigo
        })
    }
    const orderPrecio = (ordenPrecio) => {
        dispatch({
            type: ORDENAR_PRECIO,
            payload: ordenPrecio
        })
    }
    const orderNombre = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE,
            payload: ordenNombre
        })
    }
    const orderMarca = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA,
            payload: ordenMarca
        })
    }
    const orderModelo = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO,
            payload: ordenModelo
        })
    }
    const orderDisponibles = (ordenDisponibles) => {
        dispatch({
            type: ORDENAR_DISPONIBLES,
            payload: ordenDisponibles
        })
    }
    const orderCodigoFiltrados = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_FILTRADO,
            payload: ordenCodigo
        })
    }
    
    const orderPrecioFiltrados = (ordenPrecio) => {
        dispatch({
            type: ORDENAR_PRECIO_FILTRADO,
            payload: ordenPrecio
        })
    }
    const orderNombreFiltrados = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_FILTRADO,
            payload: ordenNombre
        })
    }
    const orderMarcaFiltrados = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_FILTRADO,
            payload: ordenMarca
        })
    }
    const orderModeloFiltrados = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO_FILTRADO,
            payload: ordenModelo
        })
    }
    const orderDisponiblesFiltrados = (ordenDisponibles) => {
        dispatch({
            type: ORDENAR_DISPONIBLES_FILTRADO,
            payload: ordenDisponibles
        })
    }

    const limpiarApp = () => {
        dispatch({
            type: LIMPIAR_APP
        })
    }
    
    return (
        <productoContext.Provider
            value={{
                productos: state.productos,
                productoSeleccionado: state.productoSeleccionado,
                mensajeCodigo: state.mensajeCodigo,
                mensajeRubro: state.mensajeRubro,
                mensajeProveedor: state.mensajeProveedor,
                filtrados: state.filtrados,
                rubros: state.rubros,
                proveedores: state.proveedores,
                valorDeVenta: state.valorDeVenta,
                valorDeVentaConocidos: state.valorDeVentaConocidos,
                valorDeVentaEfectivo: state.valorDeVentaEfectivo,
                valorDeVentaTarjeta: state.valorDeVentaTarjeta,
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
            }}
        >
            {children}
        </productoContext.Provider>
    )

}

export default ProductoState