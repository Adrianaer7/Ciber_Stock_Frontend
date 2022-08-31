import {useReducer } from "react"
import ventaContext from "./ventaContext"
import ventaReducer from "./ventaReducer"
import clienteAxios from "../../../config/axios"

import {
    FILTRO_VENTA
} from "../../../types/index"


const VentaState = ({children}) => {

    const initialState = {
        ventas: [],
        filtradas: []
    }

    const [state, dispatch] = useReducer(ventaReducer, initialState)

    const traerVentas = async () => {
        const {data} = await clienteAxios("/api/ventas")
        console.log(data)
    }

    const filtroVenta = palabras => {
        let filtrados = []
        state.ventas.map(venta => {
            const {descripcion} = venta

            const incluyeTodas = () => {
                return !palabras
                        .split(' ')
                        .some(p => !descripcion.includes(p))    //.some() comprueba si al menos 1 elemento cumple con la concidion.
            }
            
            const resultado = incluyeTodas()
            if(resultado) {
                filtrados = [...filtrados, venta]
            }
        })
        try {
            dispatch({
                type: FILTRO_VENTA,
                payload: filtrados
            })
        } catch (error) {
            console.log(error)
        }
        
    }

   


  return (
    <ventaContext.Provider
        value={{
            ventas: state.ventas,
            filtradas: state.filtradas,
            traerVentas,

        }}
    >
        {children}
    </ventaContext.Provider>
  )
}

export default VentaState;