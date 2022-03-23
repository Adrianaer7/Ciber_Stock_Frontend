import { useReducer } from "react"
import clienteAxios from "../../config/axios"
import faltantesReducer from "./faltantesReducer"
import faltantesContext from "./faltantesContext"

import { 
    AGREGAR_FALTANTE, 
    ELIMINAR_FALTANTE, 
    FILTRO_FALTANTE, 
    ORDENAR_CODIGO_FALTANTE, 
    ORDENAR_DISPONIBLES_FALTANTE, 
    ORDENAR_MARCA_FALTANTE, 
    ORDENAR_MODELO_FALTANTE, 
    ORDENAR_NOMBRE_FALTANTE, 
    TRAER_FALTANTES 
} from "../../types"

const FaltanteState = ({children}) => {

    const initialState = {
        faltantes: [],
        filtrados: []
    }

    const [state, dispatch] = useReducer(faltantesReducer, initialState)

    const agregarFaltante = async (id) => {   //modifico el valor de faltante a true y agrego el producto al state
        try {
            const resultado = await clienteAxios.put(`/api/faltantes/${id}`)
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

    const eliminarFaltante = async (id) => {    //modifico el valor de faltante a false y elimino el producto del state
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
    
    const filtroFaltante = (filtro) => {
        try {
            dispatch({
                type: FILTRO_FALTANTE,
                payload: filtro
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    const orderCodigo = (ordenCodigo) => {
        dispatch({
            type: ORDENAR_CODIGO_FALTANTE,
            payload: ordenCodigo
        })
    }
    const orderNombre = (ordenNombre) => {
        dispatch({
            type: ORDENAR_NOMBRE_FALTANTE,
            payload: ordenNombre
        })
    }
    const orderMarca = (ordenMarca) => {
        dispatch({
            type: ORDENAR_MARCA_FALTANTE,
            payload: ordenMarca
        })
    }
    const orderModelo = (ordenModelo) => {
        dispatch({
            type: ORDENAR_MODELO_FALTANTE,
            payload: ordenModelo
        })
    }
    const orderDisponibles = (ordenDisponibles) => {
        dispatch({
            type: ORDENAR_DISPONIBLES_FALTANTE,
            payload: ordenDisponibles
        })
    }
  return (
      <faltantesContext.Provider
        value={{
            faltantes: state.faltantes,
            filtrados: state.filtrados,
            agregarFaltante,
            traerFaltantes,
            eliminarFaltante,
            orderCodigo,
            orderNombre,
            orderMarca,
            orderModelo,
            orderDisponibles,
            filtroFaltante
        }}
      >
          {children}
      </faltantesContext.Provider>
  )
}

export default FaltanteState