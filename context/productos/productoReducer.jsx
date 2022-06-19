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
    OBTENER_CODIGOS,
    ELIMINAR_PRODUCTOS,
    ELIMINAR_RUBROS,
    ELIMINAR_PROVEEDORES,
    AGREGAR_PROVEEDOR,
    ERROR_AGREGAR_PROVEEDOR,
    PRECIO_VENTA_EFECTIVO,
    LIMPIAR_VENTA,
    TRAER_DOLAR_BD,
    PRODUCTOS_CAMBIADOS,
    LIMPIAR_APP,
    ORDENAR_CODIGO,
    ORDENAR_PRECIO,
    ORDENAR_CODIGO_FILTRADO,
    ORDENAR_PRECIO_FILTRADO,
    ORDENAR_NOMBRE,
    ORDENAR_DISPONIBLES,
    ORDENAR_DISPONIBLES_FILTRADO,
    ORDENAR_MARCA,
    ORDENAR_MODELO,
    ORDENAR_NOMBRE_FILTRADO,
    ORDENAR_MARCA_FILTRADO,
    ORDENAR_MODELO_FILTRADO,
    OBTENER_GARANTIAS,
    FILTRO_PROVEEDOR,
    ELIMINAR_PROVEEDOR,
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
        case OBTENER_CODIGOS:
            return {
                ...state,
                codigos: action.payload
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
        case OBTENER_GARANTIAS:
            return {
                ...state,
                garantias: action.payload
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
                filtrados : action.payload

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
        case PRECIO_VENTA_EFECTIVO:
            return {
                ...state,
                valorDeVenta: action.payload.res3,
                valorDeVentaConocidos: action.payload.res3,
                valorDeVentaEfectivo: action.payload.res4,
                valorDeVentaTarjeta: action.payload.res5
            }
        case LIMPIAR_VENTA:
            return {
                ...state,
                valorDeVenta: 0,
                valorDeVentaConocidos: 0,
                valorDeVentaEfectivo: 0,
                valorDeVentaTarjeta: 0
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
            filtrados: [], 
            rubros: [],
            proveedores: [],
            valorDeVenta: "",
            dolarBD: "",
            }
        case ORDENAR_CODIGO:
            return {
                ...state,
                //ordeno el state segun numero. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor. La sintaxis de comparar numeros y letras es un poco diferente
                productos: action.payload ? state.productos.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.productos.sort((a,b) => a.codigo - b.codigo ) : state.productos
            }
        case ORDENAR_PRECIO:
            return {
                ...state,
                productos: action.payload ? state.productos.sort((a,b) => b.precio_venta_conocidos - a.precio_venta_conocidos) : !action.payload ? state.productos.sort((a,b) => a.precio_venta_conocidos - b.precio_venta_conocidos ) : state.productos
            }
        case ORDENAR_NOMBRE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                productos: action.payload ? state.productos.sort((a,b) => b.nombre > a.nombre ? 1 : -1 ) : !action.payload ? state.productos.sort((a,b) => a.nombre > b.nombre ? 1 : -1 ) : state.productos
            }
        case ORDENAR_MARCA:
                return {
                    ...state,
                    //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                    productos: action.payload ? state.productos.sort((a,b) => b.marca > a.marca ? 1 : -1 ) : !action.payload ? state.productos.sort((a,b) => a.marca > b.marca ? 1 : -1 ) : state.productos
                }
        case ORDENAR_MODELO:
                return {
                    ...state,
                    productos: action.payload ? state.productos.sort((a,b) => b.modelo > a.modelo ? 1 : -1 ) : !action.payload ? state.productos.sort((a,b) => a.modelo > b.modelo ? 1 : -1 ) : state.productos
                }
        case ORDENAR_DISPONIBLES:
            return {
                ...state,
                productos: action.payload ? state.productos.sort((a,b) => b.disponibles - a.disponibles) : !action.payload ? state.productos.sort((a,b) => a.disponibles - b.disponibles ) : state.productos
            }
        case ORDENAR_CODIGO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.codigo - a.codigo) : !action.payload ? state.filtrados.sort((a,b) => a.codigo - b.codigo ) : state.filtrados

            }
        case ORDENAR_PRECIO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => a.precio_venta_conocidos - b.precio_venta_conocidos) : !action.payload ? state.filtrados.sort((a,b) => b.precio_venta_conocidos - a.precio_venta_conocidos ) : state.filtrados

            }
        case ORDENAR_NOMBRE_FILTRADO:
            console.log(action.payload)
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => a.nombre > b.nombre ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => b.nombre > a.nombre ? 1 : -1) : state.filtrados

            }
        case ORDENAR_MARCA_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => b.marca > a.marca ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => a.marca > b.marca ? 1 : -1) : state.filtrados

            }
        case ORDENAR_MODELO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => a.modelo > b.modelo ? 1 : -1) : !action.payload ? state.filtrados.sort((a,b) => b.modelo > a.modelo ? 1 : -1) : state.filtrados

            }
        case ORDENAR_DISPONIBLES_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a,b) => a.disponibles - b.disponibles) : !action.payload ? state.filtrados.sort((a,b) => b.disponibles - a.disponibles ) : state.filtrados

            }
    default:
        return state
    }
}
