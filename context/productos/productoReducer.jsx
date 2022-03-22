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
    ELIMINAR_RUBROS,
    ELIMINAR_PROVEEDORES,
    AGREGAR_PROVEEDOR,
    ERROR_AGREGAR_PROVEEDOR,
    PRECIO_VENTA,
    LIMPIAR_VENTA,
    TRAER_DOLAR_BD,
    PRODUCTOS_CAMBIADOS,
    LIMPIAR_APP,
    ORDENAR_CODIGO,
    ORDENAR_PRECIO,
    ORDENAR_CODIGO_FILTRADO,
    ORDENAR_PRECIO_FILTRADO
} from "../../types"

export default function productoReducer(state, action) {
    switch(action.type) {   
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                productos: [...state.productos, action.payload],
            }
        case AGREGAR_RUBRO:
            return {
                ...state,
                rubros: [...state.rubros, action.payload]
            }
        case AGREGAR_PROVEEDOR:
            return {
                ...state,
                proveedores: [...state.proveedores, action.payload]
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
        case ERROR_AGREGAR_PROVEEDOR:
            return {
                ...state,
                mensajeProveedor: action.payload
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
        case OBTENER_PROVEEDORES:
        return {
            ...state,
            proveedores: action.payload
        }
        case ELIMINAR_PRODUCTOS: 
            return {
                ...state,
                productos: []
            }
        case ELIMINAR_RUBROS:
            return {
                ...state,
                rubros: []
            }
        case ELIMINAR_PROVEEDORES:
            return {
                ...state,
                proveedores: []
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
        case PRODUCTOS_CAMBIADOS:
        return {
            ...state,
            productos: state.productos !== action.payload ? action.payload : productos
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
                mensajeRubro: null,
                mensajeProveedor: null
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
                    || producto.marca
                                .toString()
                                .toLowerCase()
                                .includes(action.payload.toLowerCase() ? action.payload  : producto)
                    || producto.codigo
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
                )
            }
        case PRECIO_VENTA:
            return {
                ...state,
                valorDeVenta: action.payload
            }
        case LIMPIAR_VENTA:
            return {
                ...state,
                valorDeVenta: ""
            }
        case TRAER_DOLAR_BD:
            return {
                ...state,
                dolarBD: action.payload
            }
        case LIMPIAR_APP: 
            return {
            ...state,
            productos: [],
            productoSeleccionado: null,
            mensajeRubro: null,
            mensajeCodigo: null,
            mensajeProveedor: null,
            filtrados: [],  //guarda los productos filtrados
            rubros: [], //guarda todos los rubros
            proveedores: [],
            valorDeVenta: "",
            dolarBD: "",
            }
        case ORDENAR_CODIGO:
            return {
                ...state,
                //ordeno el state. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor
                productos: action.payload ? state.productos.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.productos.sort((a,b) => a.codigo - b.codigo ) : state.productos
            }
        case ORDENAR_PRECIO: 
            return {
                ...state,
                productos: action.payload ? state.productos.sort((a,b) => b.precio_venta_recomendado - a.precio_venta_recomendado) : !action.payload ? state.productos.sort((a,b) => a.precio_venta_recomendado - b.precio_venta_recomendado ) : state.productos
            }
        case ORDENAR_CODIGO_FILTRADO: 
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.filtrados.sort((a,b) => a.codigo - b.codigo ) : state.filtrados

            }
        case ORDENAR_PRECIO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.precio_venta_recomendado - a.precio_venta_recomendado) : !action.payload ? state.filtrados.sort((a,b) => a.precio_venta_recomendado - b.precio_venta_recomendado ) : state.filtrados

            }
    default:
        return state
    }
}