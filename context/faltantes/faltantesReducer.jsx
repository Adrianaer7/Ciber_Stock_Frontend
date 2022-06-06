import { 
    AGREGAR_FALTANTE, 
    ELIMINAR_FALTANTE, 
    FILTRO_FALTANTE, 
    ORDENAR_CODIGO_FALTANTE, 
    ORDENAR_CODIGO_FALTANTE_FILTRADO, 
    ORDENAR_DISPONIBLES_FALTANTE, 
    ORDENAR_DISPONIBLES_FALTANTE_FILTRADO, 
    ORDENAR_MARCA_FALTANTE, 
    ORDENAR_MARCA_FALTANTE_FILTRADO, 
    ORDENAR_MODELO_FALTANTE, 
    ORDENAR_MODELO_FALTANTE_FILTRADO, 
    ORDENAR_NOMBRE_FALTANTE, 
    ORDENAR_NOMBRE_FALTANTE_FILTRADO, 
    ORDENAR_PROVEEDOR_FALTANTE, 
    ORDENAR_PROVEEDOR_FALTANTE_FILTRADO, 
    ORDENAR_RUBRO_FALTANTE, 
    ORDENAR_RUBRO_FALTANTE_FILTRADO, 
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
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.marca
                            .toString()
                            .toLowerCase()
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.modelo
                            .toString()
                            .toLowerCase()
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.codigo
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.proveedor
                            .toString()
                            .toLowerCase()
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.rubro
                            .toString()
                            .toLowerCase()
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    || faltante.notas
                            .toString()
                            .toLowerCase()
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .includes(action.payload.toLowerCase() ? action.payload : faltante)
                    
                )
            }
        case ORDENAR_CODIGO_FALTANTE: 
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.faltantes.sort((a,b) => a.codigo - b.codigo ) : state.faltantes
            }
        case ORDENAR_NOMBRE_FALTANTE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.nombre > a.nombre ? 1 : -1 ) : !action.payload ? state.faltantes.sort((a,b) => a.nombre > b.nombre ? 1 : -1 ) : state.faltantes
            }
        case ORDENAR_MARCA_FALTANTE:
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.marca > a.marca ? 1 : -1 ) : !action.payload ? state.faltantes.sort((a,b) => a.marca > b.marca ? 1 : -1 ) : state.faltantes
            }
        case ORDENAR_MODELO_FALTANTE:
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.modelo > a.modelo ? 1 : -1 ) : !action.payload ? state.faltantes.sort((a,b) => a.modelo > b.modelo ? 1 : -1 ) : state.faltantes
            }
        case ORDENAR_RUBRO_FALTANTE:
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.rubro > a.rubro ? 1 : -1 ) : !action.payload ? state.faltantes.sort((a,b) => a.rubro > b.rubro ? 1 : -1 ) : state.faltantes
            }
        case ORDENAR_PROVEEDOR_FALTANTE:
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.proveedor > a.proveedor ? 1 : -1 ) : !action.payload ? state.faltantes.sort((a,b) => a.proveedor > b.proveedor ? 1 : -1 ) : state.faltantes
            }
        case ORDENAR_DISPONIBLES_FALTANTE: 
            return {
                ...state,
                faltantes: action.payload ? state.faltantes.sort((a,b) => b.disponibles - a.disponibles) : !action.payload ? state.faltantes.sort((a,b) => a.disponibles - b.disponibles ) : state.faltantes
            }
        case ORDENAR_CODIGO_FALTANTE_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.filtrados.sort((a,b) => a.codigo - b.codigo ) : state.filtrados
            }
        case ORDENAR_NOMBRE_FALTANTE_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.nombre > a.nombre ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.nombre > b.nombre ? 1 : -1 ) : state.filtrados

            }
        case ORDENAR_MARCA_FALTANTE_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.marca > a.marca ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.marca > b.marca ? 1 : -1) : state.filtrados

            }
        case ORDENAR_MODELO_FALTANTE_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.modelo > a.modelo ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.modelo > b.modelo ? 1 : -1) : state.filtrados

            }
        case ORDENAR_RUBRO_FALTANTE_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.rubro > a.rubro ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.rubro > b.rubro ? 1 : -1) : state.filtrados

            }
        case ORDENAR_PROVEEDOR_FALTANTE_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.proveedor > a.proveedor ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.proveedor > b.proveedor ? 1 : -1) : state.filtrados

            }
        case ORDENAR_DISPONIBLES_FALTANTE_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.disponibles > a.disponibles ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.disponibles > b.disponibles ? 1 : -1) : state.filtrados

            }
    default : 
        return state;
    }
    
}