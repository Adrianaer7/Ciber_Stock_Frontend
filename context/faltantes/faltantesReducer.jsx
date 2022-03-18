import { AGREGAR_FALTANTE, ELIMINAR_FALTANTE, TRAER_FALTANTES } from "../../types";


export default function  faltantesReducer(state, action) {
    switch(action.type) {
        case AGREGAR_FALTANTE:
            return {
                ...state,
                faltantes: [...state.faltantes, action.payload]
            }
        case ELIMINAR_FALTANTE:
            return {
                ...state,
                faltantes: state.faltantes.filter(faltante => faltante._id !== action.payload)
            }
        case TRAER_FALTANTES:
            return {
                ...state,
                faltantes: [...state.faltantes, action.payload]
            }
    default : 
        return state;
    }
    
}