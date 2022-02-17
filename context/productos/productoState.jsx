import { useReducer } from "react";
import productoContext from "./productoContext"
import productoReducer from "./productoReducer";
import clienteAxios from "../../config/axios"

import {
    AGREGAR_PRODUCTO, 
    AGREGAR_RUBRO, 
    EDITAR_PRODUCTO, 
    ELIMINAR_PRODUCTO, 
    ELIMINAR_PRODUCTOS, 
    ELIMINAR_RUBROS, 
    ERROR_AGREGAR_PRODUCTO, 
    ERROR_AGREGAR_RUBRO, 
    FILTRAR_PRODUCTO, 
    LIMPIAR_SELECCIONADO, 
    OBTENER_PRODUCTOS, 
    OBTENER_PROVEEDORES, 
    OBTENER_RUBROS, 
    OCULTAR_ALERTA, 
    PRODUCTO_ACTUAL, 
} from "../../types";

const ProductoState = ({children}) => {

    const initialState = {
        productos: [],
        productoSeleccionado: null,
        mensajeCodigo: null,
        mensajeRubro: null,
        mensajeCodigo: null,
        mensajeProveedor: null,
        filtrados: [],  //guarda los productos filtrados
        rubros: [], //guarda todos los rubros
        proveedores: []
    }

    const [state, dispatch] = useReducer(productoReducer, initialState) // se renombra initialState como state

    //crea un producto nuevo
    const agregarProducto = async producto => {
        try {
            const respuesta = await clienteAxios.post("/api/productos", producto)
            dispatch({
                type: AGREGAR_PRODUCTO,
                payload: respuesta.data.producto
            })

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
    const agregarRubro = async elRubro => {
        try {
            const rubro = { nombre: elRubro}
            const respuesta = await clienteAxios.post("/api/rubros", rubro)
            dispatch({
                type: AGREGAR_RUBRO,
                payload: respuesta.data.rubro.nombre
                
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

    const agregarProveedor = async elProveedor => {
        try {
            const proveedor = {nombre: elProveedor}
            const respuesta = await clienteAxios.post("/api/proveedores", proveedor)
        } catch (error) {
            console.log(error)
        }
    }

    //modifico el producto
    const editarProducto = async producto => {
        const respuesta = await clienteAxios.put(`/api/productos/${producto._id}`, producto)
        
        dispatch({
            type: EDITAR_PRODUCTO,
            payload: respuesta.data.producto
        })
    }

    //trae todos los productos creados
    const traerProductos = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/productos")
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: respuesta.data.productos
            })  
        } catch (error) {
            console.log(error)
        }
    }

    
    //trae todos los rubros creados
    const traerRubros = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/rubros")
            dispatch({
                type: OBTENER_RUBROS,
                payload: respuesta.data.rubros
            })
        } catch (error) {
            console.log(error)
        }
    }

    const traerProveedores = async () => {
        try {
            const respuesta = await clienteAxios.get("/api/proveedores")
            dispatch({
                type: OBTENER_PROVEEDORES,
                payload: respuesta.data.proveedor
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
        const resultado = confirm("Deseas eliminar este producto")
        if(resultado) {
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
    const venderProducto = async producto => {
        const unidades = prompt("¿Cuántas unidades querés vender?", 1)
        if(unidades > producto.disponibles) return confirm("No se pueden vender mas unidades de las que existen")
        producto.disponibles = producto.disponibles - unidades
        
        try {
            editarProducto(producto)
        } catch (error) {
            console.log(error)
        }
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
                eliminarRubros
            }}
        >
            {children}
        </productoContext.Provider>
    )

}

export default ProductoState