import { useReducer } from "react";
import porcentajeContext from "../porcentajes/porcentajeContext"
import porcentajeReducer from "../porcentajes/porcentajeReducer"
import clienteAxios from "../../config/axios";


import {
    OBTENER_PORCENTAJES,
    EDITAR_PORCENTAJE,
    PORCENTAJE_ACTUAL,
    LIMPIAR_PORCENTAJE_SELECCIONADO,
} from "../../types/index"

const PorcentajeState = ({children}) => {

    const initialState = {
        porcentajes: [],
        porcentajeSeleccionado: null,
        porcentajesFiltrados: [],
        mensajePorcentaje: null
    }

    const [state, dispatch] = useReducer(porcentajeReducer, initialState)



    const traerPorcentajes = async () => {
        try {
            const {data} = await clienteAxios("/api/porcentajes")
            dispatch({
                type: OBTENER_PORCENTAJES,
                payload: data.porcentajes
            })
        } catch (error) {
            console.log(error)
        }
    }

    const porcentajeActual = async id => {
        try {
            const {data} = await clienteAxios(`/api/porcentajes/${id}`)
            dispatch({
                type: PORCENTAJE_ACTUAL,
                payload: data.porcentaje
            })
        } catch (error) {
            console.log(error)
        }
    }

    const limpiarSeleccionado = async () => {
        dispatch({
            type: LIMPIAR_PORCENTAJE_SELECCIONADO
        })
    }

    const editarPorcentaje = async porcentaje => {
        try {
            const {data} = await clienteAxios.put(`/api/porcentajes/${porcentaje._id}`, porcentaje)
            dispatch({
                type: EDITAR_PORCENTAJE,
                payload: data.porcentaje
            })
        } catch (error) {
            console.log(error)
        }
    }

    
   

    return (
        <porcentajeContext.Provider
            value={{
                porcentajes: state.porcentajes,
                porcentajeSeleccionado: state.porcentajeSeleccionado,
                porcentajesFiltrados: state.porcentajesFiltrados,
                mensajePorcentaje: state.mensajePorcentaje,
                traerPorcentajes,
                porcentajeActual,
                editarPorcentaje,
                limpiarSeleccionado,
            }}
        >
            {children}
        </porcentajeContext.Provider>
    )
}

export default PorcentajeState