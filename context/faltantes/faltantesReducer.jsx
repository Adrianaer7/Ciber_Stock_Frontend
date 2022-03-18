import { AGREGAR_FALTANTE, ELIMINAR_FALTANTE, ORDENAR_CODIGO_FALTANTE, TRAER_FALTANTES } from "../../types";


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
                faltantes: action.payload
            }
        case ORDENAR_CODIGO_FALTANTE: 
            return {
                ...state,
                faltantes: action.payload === true ? state.faltantes.sort((a,b) => b.codigo - a.codigo) : action.payload === false ? state.faltantes.sort((a,b) => a.codigo - b.codigo ) : state.faltantes}
    default : 
        return state;
    }
    
}