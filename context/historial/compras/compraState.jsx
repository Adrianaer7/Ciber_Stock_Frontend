import {useReducer } from "react"
import compraContext from "./compraContext"
import compraReducer from "./compraReducer"
import clienteAxios from "../../../config/axios"

import {
    CREAR_COMPRA,
    TRAER_COMPRAS,
    FILTRO_COMPRA,
    ORDENAR_CODIGO_COMPRA,
    ORDENAR_NOMBRE_COMPRA,
    ORDENAR_MARCA_COMPRA,
    ORDENAR_MODELO_COMPRA,
    ORDENAR_RUBRO_COMPRA,
    ORDENAR_PROVEEDOR_COMPRA,
    ORDENAR_CODIGO_COMPRA_FILTRADO,
    ORDENAR_NOMBRE_COMPRA_FILTRADO,
    ORDENAR_MARCA_COMPRA_FILTRADO,
    ORDENAR_MODELO_COMPRA_FILTRADO,
    ORDENAR_RUBRO_COMPRA_FILTRADO,
    ORDENAR_PROVEEDOR_COMPRA_FILTRADO,
} from "../../../types/index"


const CompraState = ({children}) => {

    const initialState = {
        compras: [],
        filtrados: []
    }

    const [state, dispatch] = useReducer(compraReducer, initialState)

    //agregar compra
    const compraDeProducto = async (producto, cantidad) => {
        const respuesta = await clienteAxios.post("/api/compras", {producto, cantidad}) //envio producto como objeto porque sino no puedo extraer su _id en el backend
        dispatch({
            type: CREAR_COMPRA,
            payload: respuesta.data.compra
        })
    }

    const traerCompras = async () => {
        const respuesta = await clienteAxios("/api/compras")
        dispatch({
            type: TRAER_COMPRAS,
            payload: respuesta.data.compras
        })
    }

    const filtroCompra = (filtro) => {
        try {
            dispatch({
                type: FILTRO_COMPRA,
                payload: filtro
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const orderCodigo = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_COMPRA,
            payload: ordenCodigo
        })
    }
    const orderNombre = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_COMPRA,
            payload: ordenNombre
        })
    }
    const orderMarca = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_COMPRA,
            payload: ordenMarca
        })
    }
    const orderModelo = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO_COMPRA,
            payload: ordenModelo
        })
    }
    const orderRubro = (ordenRubro) => {
        dispatch({
            type: ORDENAR_RUBRO_COMPRA,
            payload: ordenRubro
        })
    }
    const orderProveedor = (ordenProveedor) => {
        dispatch({
            type: ORDENAR_PROVEEDOR_COMPRA,
            payload: ordenProveedor
        })
    }

    const orderCodigoFiltrados = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_COMPRA_FILTRADO,
            payload: ordenCodigo
        })
    }
    const orderNombreFiltrados = (orderNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_COMPRA_FILTRADO,
            payload: orderNombre
        })
    }
    const orderMarcaFiltrados = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_COMPRA_FILTRADO,
            payload: ordenMarca
        })
    }
    const orderModeloFiltrados = (ordenModelo) => {
        dispatch({
            type: ORDENAR_CODIGO_COMPRA_FILTRADO,
            payload: ordenModelo
        })
    }
    const orderRubroFiltrados = (ordenRubro) => {
        dispatch({
            type: ORDENAR_RUBRO_COMPRA_FILTRADO,
            payload: ordenRubro
        })
    }
    const orderProveedorFiltrados = (ordenproveedor) => {
        dispatch({
            type: ORDENAR_PROVEEDOR_COMPRA_FILTRADO,
            payload: ordenproveedor
        })
    }


  return (
    <compraContext.Provider
        value={{
            compras: state.compras,
            compraDeProducto,
            traerCompras,
            orderCodigo,
            orderCodigoFiltrados,
            orderNombre,
            orderNombreFiltrados,
            orderMarca,
            orderMarcaFiltrados,
            orderModelo,
            orderModeloFiltrados,
            orderRubro,
            orderRubroFiltrados,
            orderProveedor,
            orderProveedorFiltrados,
            filtroCompra
        }}
    >
        {children}
    </compraContext.Provider>
  )
}

export default CompraState