import {useReducer } from "react"
import compraContext from "./compraContext"
import compraReducer from "./compraReducer"

import {
    CREAR_COMPRA
} from "../../../types/index"


const CompraState = ({children}) => {

    const initialState = {
        compras: [],
        filtrados: []
    }

    const [state, dispatch] = useReducer(compraReducer, initialState)

    const compraDeProducto = (producto) => {
        dispatch({
            type: CREAR_COMPRA,
            payload: producto
        })
    }

  return (
    <compraContext.Provider
        value={{
            compras: state.compras,
            compraDeProducto
        }}
    >
        {children}
    </compraContext.Provider>
  )
}

export default CompraState