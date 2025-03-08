import { useReducer } from "react";
import proveedorContext from "../proveedores/proveedorContext"
import proveedorReducer from "../proveedores/proveedorReducer"
import clienteAxios from "../../config/axios";


import {
    AGREGAR_PROVEEDOR,
    ERROR_AGREGAR_PROVEEDOR,
    OBTENER_PROVEEDORES, 
    EDITAR_PROVEEDOR,
    FILTRO_PROVEEDOR,
    ELIMINAR_PROVEEDOR, 
    ELIMINAR_PROVEEDORES,
    ORDENAR_EMPRESA_PROVEEDOR,
    ORDENAR_EMPRESA_PROVEEDOR_FILTRADO,
    PROVEEDOR_ACTUAL,
    LIMPIAR_PROVEEDOR_SELECCIONADO
} from "../../types/index"

const ProveedorState = ({children}) => {

    const initialState = {
        proveedores: [],
        proveedorSeleccionado: null,
        proveedoresFiltrados: [],
        mensajeProveedor: null
    }

    const [state, dispatch] = useReducer(proveedorReducer, initialState)

    //crea un nuevo proveedor
    const agregarProveedor = async proveedor => {
        try {
            const {data} = await clienteAxios.post("/proveedores", proveedor)
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

    const traerProveedores = async () => {
        try {
            const {data} = await clienteAxios("/proveedores")
            dispatch({
                type: OBTENER_PROVEEDORES,
                payload: data.proveedores
            })
        } catch (error) {
            console.log(error)
        }
    }

    const proveedorActual = async id => {
        try {
            const {data} = await clienteAxios(`/proveedores/${id}`)
            dispatch({
                type: PROVEEDOR_ACTUAL,
                payload: data.proveedor
            })
        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }
    }

    const limpiarSeleccionado = async () => {
        dispatch({
            type: LIMPIAR_PROVEEDOR_SELECCIONADO
        })
    }

    const editarProveedor = async proveedor => {
        try {
            const {data} = await clienteAxios.put(`/proveedores/${proveedor._id}`, proveedor)
            dispatch({
                type: EDITAR_PROVEEDOR,
                payload: data.proveedor
            })
        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }
    }

    
    const filtroProveedor = palabras => {
        let filtrados = []
        state.proveedores.map(proveedor => {
            const {datos} = proveedor
                const incluyeTodas = () => {
                return !palabras
                        .split(' ')
                        .some(p => !datos.includes(p))    //.some() comprueba si al menos 1 elemento cumple con la concidion.
            }
            
            const resultado = incluyeTodas()
            if(resultado) {
                filtrados = [...filtrados, proveedor]
            }
        })
        try {
            dispatch({
                type: FILTRO_PROVEEDOR,
                payload: filtrados
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const eliminarUnProveedor = async id => {
        try {
            await clienteAxios.delete(`/proveedores/${id}`)
            dispatch({
                type: ELIMINAR_PROVEEDOR,
                payload: id
            })  
            
        } catch (error) {
            console.log(error.response.data)
            return error.response.data.msg
        }
    }
    
    const eliminarProveedores = async () => {
        await clienteAxios.delete("/proveedores")
        dispatch({
            type: ELIMINAR_PROVEEDORES
        })
    }
    const orderEmpresa = (ordenEmpresa) => {
        dispatch({
            type:ORDENAR_EMPRESA_PROVEEDOR,
            payload: ordenEmpresa
        })
    }
    const orderEmpresaFiltrados = (ordenEmpresa) => {
        dispatch({
            type: ORDENAR_EMPRESA_PROVEEDOR_FILTRADO,
            payload: ordenEmpresa
        })
    }


    return (
        <proveedorContext.Provider
            value={{
                proveedores: state.proveedores,
                proveedorSeleccionado: state.proveedorSeleccionado,
                proveedoresFiltrados: state.proveedoresFiltrados,
                mensajeProveedor: state.mensajeProveedor,
                traerProveedores,
                proveedorActual,
                editarProveedor,
                filtroProveedor,
                agregarProveedor,
                eliminarUnProveedor,
                eliminarProveedores,
                orderEmpresa,
                orderEmpresaFiltrados,
                limpiarSeleccionado,
            }}
        >
            {children}
        </proveedorContext.Provider>
    )
}

export default ProveedorState