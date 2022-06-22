import {
    AGREGAR_PROVEEDOR,
    ERROR_AGREGAR_PROVEEDOR,
    OBTENER_PROVEEDORES,
    EDITAR_PROVEEDOR,
    FILTRO_PROVEEDOR,
    ELIMINAR_PROVEEDOR, 
    ELIMINAR_PROVEEDORES,
    ORDENAR_EMPRESA_PROVEEDOR,
    ORDENAR_EMPRESA_PROVEEDOR_FILTRADO,
    PROVEEDOR_ACTUAL,
    LIMPIAR_PROVEEDOR_SELECCIONADO
} from "../../types/index"

export default function proveedorreducer (state, action) {
    switch(action.type) {
        case AGREGAR_PROVEEDOR:
            return {
                ...state,
                proveedores: [...state.proveedores, action.payload]
            }
        case ERROR_AGREGAR_PROVEEDOR:
            return {
                ...state,
                mensajeProveedor: action.payload
            }
        case OBTENER_PROVEEDORES:
            return {
                ...state,
                proveedores: action.payload
            }
        case PROVEEDOR_ACTUAL:
            return {
                ...state,
                proveedorSeleccionado: action.payload
            }
        case LIMPIAR_PROVEEDOR_SELECCIONADO:
            return {
                ...state,
                proveedorSeleccionado: null
            }
        case EDITAR_PROVEEDOR:
            return {
                ...state,
                proveedores: state.proveedores.map(proveedor => proveedor._id === action.payload._id ? action.payload : proveedor)
            }
        case FILTRO_PROVEEDOR:
            return {
                ...state,
                proveedoresFiltrados: action.payload
            }
        case ELIMINAR_PROVEEDOR: 
        return {
            ...state,
            proveedores: state.proveedores.filter(proveedor => proveedor._id !== action.payload)
        }
        case ELIMINAR_PROVEEDORES:
            return {
                ...state,
                proveedores: []
            }
        case ORDENAR_EMPRESA_PROVEEDOR:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                proveedores: action.payload ? state.proveedores.sort((a,b) => b.empresa > a.empresa ? 1 : -1 ) : !action.payload ? state.proveedores.sort((a,b) => a.empresa > b.empresa ? 1 : -1 ) : state.proveedores
            }
        case ORDENAR_EMPRESA_PROVEEDOR_FILTRADO:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                proveedores: action.payload ? state.proveedores.sort((a,b) => b.empresa > a.empresa ? 1 : -1 ) : !action.payload ? state.proveedores.sort((a,b) => a.empresa > b.empresa ? 1 : -1 ) : state.proveedores
            }
        default:
            return state;
    }
}