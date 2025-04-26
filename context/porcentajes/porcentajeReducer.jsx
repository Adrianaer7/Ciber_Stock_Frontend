import {
    OBTENER_PORCENTAJES,
    EDITAR_PORCENTAJE,
    PORCENTAJE_ACTUAL,
    LIMPIAR_PORCENTAJE_SELECCIONADO,
} from "../../types/index"

export default function porcentajereducer(state, action) {
    switch (action.type) {
        case OBTENER_PORCENTAJES:
            return {
                ...state,
                porcentajes: action.payload
            }
        case PORCENTAJE_ACTUAL:
            return {
                ...state,
                porcentajeSeleccionado: action.payload
            }
        case LIMPIAR_PORCENTAJE_SELECCIONADO:
            return {
                ...state,
                porcentajeSeleccionado: null
            }
        case EDITAR_PORCENTAJE:
            return {
                ...state,
                porcentajes: state.porcentajes.map(porcentaje => porcentaje._id === action.payload._id ? action.payload : porcentaje)
            }
        default:
            return state;
    }
}