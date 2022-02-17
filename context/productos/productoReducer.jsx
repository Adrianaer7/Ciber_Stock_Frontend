import { 
    AGREGAR_PRODUCTO, 
    EDITAR_PRODUCTO, 
    ELIMINAR_PRODUCTO, 
    LIMPIAR_SELECCIONADO, 
    OBTENER_PRODUCTOS, 
    OCULTAR_ALERTA, 
    PRODUCTO_ACTUAL, 
    FILTRAR_PRODUCTO,
    OBTENER_RUBROS,
    ERROR_AGREGAR_PRODUCTO,
    ERROR_AGREGAR_RUBRO,
    AGREGAR_RUBRO,
    OBTENER_PROVEEDORES,
    ELIMINAR_PRODUCTOS,
    ELIMINAR_RUBROS
} from "../../types"

export default function productoReducer(state, action) {
    switch(action.type) {   
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                productos: [...state.productos, action.payload],
            }
        case AGREGAR_RUBRO: {
            return {
                ...state,
                rubros: [...state.rubros, action.payload]
            }
        }
        case ERROR_AGREGAR_PRODUCTO:
            return {
                ...state,
                mensajeCodigo: action.payload
            }
        case ERROR_AGREGAR_RUBRO:
            return {
                ...state,
                mensajeRubro: action.payload
            }
        case OBTENER_PRODUCTOS:
            return {
                ...state,
                productos: action.payload,
            }
        case OBTENER_RUBROS:
            return {
                ...state,
                rubros: action.payload
            }
        case ELIMINAR_RUBROS:
            return {
                ...state,
                rubros: []
            }
        case OBTENER_PROVEEDORES:
            return {
                ...state,
                proveedores: action.payload
            }
        case PRODUCTO_ACTUAL:
            return {
                ...state,
                productoSeleccionado: action.payload
            }
        case EDITAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.map(producto => producto._id === action.payload._id ? action.payload : producto)
            }
        case ELIMINAR_PRODUCTOS: 
        return {
            ...state,
            productos: []
        }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto._id !== action.payload),   //Va a eliminar al que le demos click
                productoSeleccionado: null,  //una vez que se elimina el producto, no lo muestro mas en la vista
                filtrados: state.filtrados.filter(producto => producto._id !== action.payload)  //y tampoco lo muestro cuando lo esté filtrando
            }
        case LIMPIAR_SELECCIONADO:
            return {
                ...state,
                productoSeleccionado: null
            }
       
        
        case OCULTAR_ALERTA: 
            return {
                ...state,
                mensajeCodigo: null,
                mensajeRubro: null
            }
        case FILTRAR_PRODUCTO:
            return {
                ...state,
                filtrados : state.productos.filter(producto => 
                        producto.nombre
                                .toString()
                                .toLowerCase()  //convierto el campo a string minuscula
                                .includes(action.payload.toLowerCase() ? action.payload  : producto) //trato de encontrar un producto que contenga lo que escribo en el buscador. Convierto el input a minusculas para comparar
                    || producto.modelo
                                .toString()
                                .toLowerCase()
                                .includes(action.payload.toLowerCase() ? action.payload  : producto)
                    || producto.proveedor
                                .toString()
                                .toLowerCase()
                                .includes(action.payload.toLowerCase() ? action.payload  : producto)
                    || producto.rubro
                                .toString()
                                .toLowerCase()
                                .includes(action.payload.toLowerCase() ? action.payload  : producto)
                    || producto.notas
                                .toString()
                                .toLowerCase()
                                .includes(action.payload.toLowerCase() ? action.payload  : producto)

                    || producto.codigo.includes(action.payload.toLowerCase() ? action.payload  : producto)  //al codigo lo guardo como string en el modelo, por eso no lo convierto
                    
                )
            }
        
    default:
        return state
    }
}