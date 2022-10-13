import { useReducer } from "react";
import rubroContext from "../rubros/rubroContext"
import rubroReducer from "../rubros/rubroReducer"
import clienteAxios from "../../config/axios";


import {
    AGREGAR_RUBRO,
    ERROR_AGREGAR_RUBRO,
    OBTENER_RUBROS,
    RUBRO_ACTUAL,
    EDITAR_RUBRO,
    LIMPIAR_RUBRO,
    ELIMINAR_RUBRO,
    LIMPIAR_RUBRO_SELECCIONADO,
    ELIMINAR_RUBROS,
    VACIAR_FORMULARIO_RUBRO,
    OCULTAR_ALERTA
} from "../../types/index"

const RubroState = ({children}) => {

    const initialState = {
        rubros: [],
        rubroSeleccionado: null,
        rubrosFiltrados: [],
        mensajeRubro: null
    }

    const [state, dispatch] = useReducer(rubroReducer, initialState)

    //crea un nuevo rubro
    const agregarRubro = async rubro => {
        const {data} = await clienteAxios.post("/api/rubros", rubro)
        if(data.rubro) {
            try {
            
                dispatch({
                    type: AGREGAR_RUBRO,
                    payload: data.rubro
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            dispatch({
                type: ERROR_AGREGAR_RUBRO,
                payload: data.msg
            })
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                })
            }, 3000);
        }
    }

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

    const rubroActual = async id => {
        try {
            const {data} = await clienteAxios.get(`/api/rubros/${id}`)
            dispatch({
                type: RUBRO_ACTUAL,
                payload: data.rubro
            })
        } catch (error) {
            console.log(error)
        }
    }

    const limpiarSeleccionado = async () => {
        dispatch({
            type: LIMPIAR_RUBRO_SELECCIONADO
        })
    }

    const editarRubro = async rubro => {
        try {
            const {data} = await clienteAxios.put(`/api/rubros/${rubro._id}`, rubro)
            dispatch({
                type: EDITAR_RUBRO,
                payload: data.rubro
            })
        } catch (error) {
            console.log(error)
        }
    }

    
    const eliminarUnRubro = async id => {
        try {
            await clienteAxios.delete(`/api/rubros/${id}`)
            dispatch({
                type: ELIMINAR_RUBRO,
                payload: id
            })  
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const eliminarRubros = async () => {
        await clienteAxios.delete("/api/rubros")
        dispatch({
            type: ELIMINAR_RUBROS
        })
    }
    

    return (
        <rubroContext.Provider
            value={{
                rubros: state.rubros,
                rubroSeleccionado: state.rubroSeleccionado,
                rubrosFiltrados: state.rubrosFiltrados,
                mensajeRubro: state.mensajeRubro,
                traerRubros,
                rubroActual,
                editarRubro,
                agregarRubro,
                eliminarUnRubro,
                eliminarRubros,
                limpiarSeleccionado,
            }}
        >
            {children}
        </rubroContext.Provider>
    )
}

export default RubroState