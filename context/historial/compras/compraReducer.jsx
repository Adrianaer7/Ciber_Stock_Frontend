import {
    CREAR_COMPRA,
    TRAER_COMPRAS,
    FILTRO_COMPRA,
    ORDENAR_CODIGO_COMPRA,
    ORDENAR_NOMBRE_COMPRA,
    ORDENAR_MARCA_COMPRA,
    ORDENAR_MODELO_COMPRA,
    ORDENAR_RUBRO_COMPRA,
    ORDENAR_PROVEEDOR_COMPRA,
    ORDENAR_CODIGO_COMPRA_FILTRADO,
    ORDENAR_NOMBRE_COMPRA_FILTRADO,
    ORDENAR_MARCA_COMPRA_FILTRADO,
    ORDENAR_MODELO_COMPRA_FILTRADO,
    ORDENAR_RUBRO_COMPRA_FILTRADO,
    ORDENAR_PROVEEDOR_COMPRA_FILTRADO,
} from "../../../types/index"

export default function comprareducer (state, action) {
    switch(action.type) {
        case CREAR_COMPRA:
            return {
                ...state,
                compras: state.compras.map(compra => compra.idProducto === action.payload.idProducto ? action.payload : [...state.compras, action.payload])
            }
        case TRAER_COMPRAS:
            return {
                ...state,
                compras: action.payload
            }
            case FILTRO_COMPRA:
                return {
                    ...state,
                    filtrados: action.payload
                }
            case ORDENAR_NOMBRE_COMPRA:
                return {
                    ...state,
                    //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                    compras: action.payload ? state.compras.sort((a,b) => a.nombre > b.nombre ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => b.nombre > a.nombre ? 1 : -1 ) : state.compras
                }
            case ORDENAR_MARCA_COMPRA:
                return {
                    ...state,
                    compras: action.payload ? state.compras.sort((a,b) => b.marca > a.marca ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => a.marca > b.marca ? 1 : -1 ) : state.compras
                }
            case ORDENAR_MODELO_COMPRA:
                return {
                    ...state,
                    compras: action.payload ? state.compras.sort((a,b) => a.modelo > b.modelo ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => b.modelo > a.modelo ? 1 : -1 ) : state.compras
                }
            case ORDENAR_NOMBRE_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => a.nombre > b.nombre ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => b.nombre > a.nombre ? 1 : -1 ) : state.filtrados
    
                }
            case ORDENAR_MARCA_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.marca > a.marca ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.marca > b.marca ? 1 : -1) : state.filtrados
    
                }
            case ORDENAR_MODELO_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => a.modelo > b.modelo ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => b.modelo > a.modelo ? 1 : -1) : state.filtrados
    
                }
            
        default:
            return state;
    }
}