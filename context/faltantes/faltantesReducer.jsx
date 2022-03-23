import { 
    AGREGAR_FALTANTE, 
    ELIMINAR_FALTANTE, 
    FILTRO_FALTANTE, 
    ORDENAR_CODIGO_FALTANTE, 
    ORDENAR_DISPONIBLES_FALTANTE, 
    TRAER_FALTANTES 
} from "../../types";


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
        case FILTRO_FALTANTE:
            return {
                ...state,
                filtrados: state.faltantes.filter(faltante => 
                    faltante.nombre
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.marca
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.modelo
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.codigo
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.proveedor
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.rubro
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.notas
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    
                )
            }
        case ORDENAR_CODIGO_FALTANTE: 
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.faltantes.sort((a,b) => a.codigo - b.codigo ) : state.faltantes
            }
        case ORDENAR_DISPONIBLES_FALTANTE: 
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.disponibles - a.disponibles) : !action.payload ? state.faltantes.sort((a,b) => a.disponibles - b.disponibles ) : state.faltantes
            }
    default : 
        return state;
    }
    
}