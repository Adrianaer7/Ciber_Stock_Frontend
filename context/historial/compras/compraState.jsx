import {useReducer } from "react"
import compraContext from "./compraContext"
import compraReducer from "./compraReducer"
import clienteAxios from "../../../config/axios"

import {
    CREAR_COMPRA,
    TRAER_COMPRAS
} from "../../../types/index"


const CompraState = ({children}) => {

    const initialState = {
        compras: [],
        filtrados: []
    }

    const [state, dispatch] = useReducer(compraReducer, initialState)

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

  return (
    <compraContext.Provider
        value={{
            compras: state.compras,
            compraDeProducto,
            traerCompras
        }}
    >
        {children}
    </compraContext.Provider>
  )
}

export default CompraState