import faltantesReducer from "./faltantesReducer"
import faltantesContext from "./faltantesContext"
import { useReducer } from "react"
import { AGREGAR_FALTANTE, ELIMINAR_FALTANTE, ORDENAR_CODIGO_FALTANTE, TRAER_FALTANTES } from "../../types"
import clienteAxios from "../../config/axios"

const FaltanteState = ({children}) => {

    const initialState = {
        faltantes: []
    }

    const [state, dispatch] = useReducer(faltantesReducer, initialState)

    const agregarFaltante = async (producto) => {
        try {
            const resultado = await clienteAxios.put(`/api/faltantes/${producto._id}`)
            dispatch({
                type: AGREGAR_FALTANTE,
                payload: resultado.data.producto
            })
        } catch (error) {
            console.log(error)
        }
    }

    const traerFaltantes = async () => {
        try {
            const resultado = await clienteAxios("/api/faltantes")
            dispatch({
                type: TRAER_FALTANTES,
                payload: resultado.data.faltantes
            })
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarFaltante = async (id) => {
        const resultado = confirm("¿Desea eliminar el producto con faltante de stock?")
        if(resultado) {
            try {
                await clienteAxios.put(`/api/faltantes/${id}`)
                dispatch({
                    type: ELIMINAR_FALTANTE,
                    payload: id
                })
            } catch (error) {
                console.log(error)
            }
        }
       
    }

    const orderCodigo = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE,
            payload: ordenCodigo
        })
    }

  return (
      <faltantesContext.Provider
        value={{
            faltantes: state.faltantes,
            agregarFaltante,
            traerFaltantes,
            eliminarFaltante,
            orderCodigo
        }}
      >
          {children}
      </faltantesContext.Provider>
  )
}

export default FaltanteState