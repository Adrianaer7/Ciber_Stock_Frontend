import {
    AGREGAR_RUBRO,
    ERROR_AGREGAR_RUBRO,
    OBTENER_RUBROS,
    EDITAR_RUBRO,
    ELIMINAR_RUBRO, 
    RUBRO_ACTUAL,
    LIMPIAR_RUBRO_SELECCIONADO,
    VACIAR_FORMULARIO_RUBRO,
    OCULTAR_ALERTA,

} from "../../types/index"

export default function rubroreducer (state, action) {
    switch(action.type) {
        case AGREGAR_RUBRO:
            return {
                ...state,
                rubros: [...state.rubros, action.payload]
            }
        case ERROR_AGREGAR_RUBRO:
            return {
                ...state,
                mensajeRubro: action.payload
            }
        
        case OBTENER_RUBROS:
            return {
                ...state,
                rubros: action.payload
            }
        case RUBRO_ACTUAL:
            return {
                ...state,
                rubroSeleccionado: action.payload
            }
        case LIMPIAR_RUBRO_SELECCIONADO:
            return {
                ...state,
                rubroSeleccionado: null
            }
        case EDITAR_RUBRO:
            return {
                ...state,
                rubros: state.rubros.map(rubro => rubro._id === action.payload._id ? action.payload : rubro)
            }
        case ELIMINAR_RUBRO: 
        return {
            ...state,
            rubros: state.rubros.filter(rubro => rubro._id !== action.payload)
        }
        case OCULTAR_ALERTA: 
            return {
                ...state,
                mensajeRubro: null
            }
        default:
            return state;
    }
}