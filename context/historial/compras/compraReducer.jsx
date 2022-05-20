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
                compras: [...state.compras, action.payload]
            }
        case TRAER_COMPRAS:
            return {
                ...state,
                compras: action.payload
            }
            case FILTRO_COMPRA:
                return {
                    ...state,
                    filtrados: state.compras.filter(compra => 
                        compra.nombre
                                .toString()
                                .toLowerCase()
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(action.payload.toLowerCase() ? action.payload : compra)
                        || compra.marca
                                .toString()
                                .toLowerCase()
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(action.payload.toLowerCase() ? action.payload : compra)
                        || compra.modelo
                                .toString()
                                .toLowerCase()
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(action.payload.toLowerCase() ? action.payload : compra)
                        || compra.codigo
                                .toString()
                                .toLowerCase()
                                .includes(action.payload.toLowerCase() ? action.payload : compra)
                        || compra.proveedor
                                .toString()
                                .toLowerCase()
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(action.payload.toLowerCase() ? action.payload : compra)
                        || compra.rubro
                                .toString()
                                .toLowerCase()
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(action.payload.toLowerCase() ? action.payload : compra)
                        || compra.notas
                                .toString()
                                .toLowerCase()
                                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                .includes(action.payload.toLowerCase() ? action.payload : compra)
                        
                    )
                }
            case ORDENAR_CODIGO_COMPRA: 
                return {
                    ...state,
                    compras: action.payload ? state.compras.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.compras.sort((a,b) => a.codigo - b.codigo ) : state.compras
                }
            case ORDENAR_NOMBRE_COMPRA:
                return {
                    ...state,
                    //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                    compras: action.payload ? state.compras.sort((a,b) => b.nombre > a.nombre ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => a.nombre > b.nombre ? 1 : -1 ) : state.compras
                }
            case ORDENAR_MARCA_COMPRA:
                return {
                    ...state,
                    //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                    compras: action.payload ? state.compras.sort((a,b) => b.marca > a.marca ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => a.marca > b.marca ? 1 : -1 ) : state.compras
                }
            case ORDENAR_MODELO_COMPRA:
                return {
                    ...state,
                    //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                    compras: action.payload ? state.compras.sort((a,b) => b.modelo > a.modelo ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => a.modelo > b.modelo ? 1 : -1 ) : state.compras
                }
            case ORDENAR_RUBRO_COMPRA:
                return {
                    ...state,
                    //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                    compras: action.payload ? state.compras.sort((a,b) => b.rubro > a.rubro ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => a.rubro > b.rubro ? 1 : -1 ) : state.compras
                }
            case ORDENAR_PROVEEDOR_COMPRA:
                return {
                    ...state,
                    //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                    compras: action.payload ? state.compras.sort((a,b) => b.proveedor > a.proveedor ? 1 : -1 ) : !action.payload ? state.compras.sort((a,b) => a.proveedor > b.proveedor ? 1 : -1 ) : state.compras
                }
            case ORDENAR_DISPONIBLES_COMPRA: 
                return {
                    ...state,
                    compras: action.payload ? state.compras.sort((a,b) => b.disponibles - a.disponibles) : !action.payload ? state.compras.sort((a,b) => a.disponibles - b.disponibles ) : state.compras
                }
            case ORDENAR_CODIGO_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.filtrados.sort((a,b) => a.codigo - b.codigo ) : state.filtrados
                }
            case ORDENAR_NOMBRE_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.nombre > a.nombre ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.nombre > b.nombre ? 1 : -1 ) : state.filtrados
    
                }
            case ORDENAR_MARCA_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.marca > a.marca ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.marca > b.marca ? 1 : -1) : state.filtrados
    
                }
            case ORDENAR_MODELO_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.modelo > a.modelo ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.modelo > b.modelo ? 1 : -1) : state.filtrados
    
                }
            case ORDENAR_RUBRO_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.rubro > a.rubro ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.rubro > b.rubro ? 1 : -1) : state.filtrados
    
                }
            case ORDENAR_PROVEEDOR_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.proveedor > a.proveedor ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.proveedor > b.proveedor ? 1 : -1) : state.filtrados
    
                }
            case ORDENAR_DISPONIBLES_COMPRA_FILTRADO: 
                return {
                    ...state,
                    filtrados: action.payload ? state.filtrados.sort((a,b) => b.disponibles > a.disponibles ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.disponibles > b.disponibles ? 1 : -1) : state.filtrados
    
                }
        default:
            return state;
    }
}