import {
    AGREGAR_PRODUCTO,
    EDITAR_PRODUCTO,
    ELIMINAR_PRODUCTO,
    LIMPIAR_SELECCIONADO,
    OBTENER_PRODUCTOS,
    OCULTAR_ALERTA,
    FILTRAR_PRODUCTO,
    OBTENER_RUBROS,
    ERROR_AGREGAR_RUBRO,
    AGREGAR_RUBRO,
    OBTENER_CODIGOS,
    ELIMINAR_PRODUCTOS,
    ELIMINAR_RUBROS,
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
    AGREGAR_GARANTIA,
    CREAR_DOLAR,
    EDITAR_DOLAR,
    MOSTRAR_MODAL,
    PRODUCTO_ACTUAL,
} from "../../types"

export default function productoReducer(state, action) {
    switch (action.type) {
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
        case ERROR_AGREGAR_RUBRO:
            return {
                ...state,
                mensajeRubro: action.payload
            }

        case OBTENER_PRODUCTOS:
            return {
                ...state,
                productos: action.payload,
                filtrados: []
            }
        case PRODUCTO_ACTUAL:
            return {
                ...state,
                productoSeleccionado: action.payload
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
        case AGREGAR_GARANTIA:
            return {
                ...state,
                garantias: [...state.garantias, action.payload]
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
                mensajeRubro: null,
            }
        case FILTRAR_PRODUCTO:
            return {
                ...state,
                filtrados: action.payload

            }
        case PRECIO_VENTA_EFECTIVO:
            return {
                ...state,
                valorDeVenta: action.payload.res3,
            }
        case LIMPIAR_VENTA:
            return {
                ...state,
                valorDeVenta: 0,
            }
        case TRAER_DOLAR_BD:
            return {
                ...state,
                dolarBD: action.payload,
                elDolarAutomatico: false
            }
        case CREAR_DOLAR:
            return {
                ...state,
                dolarBD: action.payload.precio,
                elDolarAutomatico: action.payload.automatico
            }
        case EDITAR_DOLAR:
            return {
                ...state,
                dolarBD: action.payload.precio,
                elDolarAutomatico: action.payload.automatico
            }
        case LIMPIAR_APP:
            return {
                ...state,
                productos: [],
                productoSeleccionado: null,
                mensajeRubro: null,
                filtrados: [],
                rubros: [],
                valorDeVenta: "",
                dolarBD: "",
            }
        case ORDENAR_CODIGO:
            return {
                ...state,
                //ordeno el state segun numero. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor. La sintaxis de comparar numeros y letras es un poco diferente
                productos: action.payload ? state.productos.sort((a, b) => b.codigo - a.codigo) : !action.payload ? state.productos.sort((a, b) => a.codigo - b.codigo) : state.productos
            }
        case ORDENAR_PRECIO:
            return {
                ...state,
                productos: action.payload ? state.productos.sort((a, b) => b.precio_venta_conocidos - a.precio_venta_conocidos) : !action.payload ? state.productos.sort((a, b) => a.precio_venta_conocidos - b.precio_venta_conocidos) : state.productos
            }
        case ORDENAR_NOMBRE:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                productos: action.payload ? state.productos.sort((a, b) => b.nombre > a.nombre ? 1 : -1) : !action.payload ? state.productos.sort((a, b) => a.nombre > b.nombre ? 1 : -1) : state.productos
            }
        case ORDENAR_MARCA:
            return {
                ...state,
                //ordeno el state segun letra. El primer payload es false(por default el state está asi), entonces devuelve el objeto arreglado de menor a mayor, y si es true lo devuelve de mayor a menor.
                productos: action.payload ? state.productos.sort((a, b) => b.marca > a.marca ? 1 : -1) : !action.payload ? state.productos.sort((a, b) => a.marca > b.marca ? 1 : -1) : state.productos
            }
        case ORDENAR_MODELO:
            return {
                ...state,
                productos: action.payload ? state.productos.sort((a, b) => b.modelo > a.modelo ? 1 : -1) : !action.payload ? state.productos.sort((a, b) => a.modelo > b.modelo ? 1 : -1) : state.productos
            }
        case ORDENAR_DISPONIBLES:
            return {
                ...state,
                productos: action.payload ? state.productos.sort((a, b) => b.disponibles - a.disponibles) : !action.payload ? state.productos.sort((a, b) => a.disponibles - b.disponibles) : state.productos
            }
        case ORDENAR_CODIGO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b) => b.codigo - a.codigo) : !action.payload ? state.filtrados.sort((a, b) => a.codigo - b.codigo) : state.filtrados

            }
        case ORDENAR_PRECIO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b) => a.precio_venta_conocidos - b.precio_venta_conocidos) : !action.payload ? state.filtrados.sort((a, b) => b.precio_venta_conocidos - a.precio_venta_conocidos) : state.filtrados

            }
        case ORDENAR_NOMBRE_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b) => a.nombre > b.nombre ? 1 : -1) : !action.payload ? state.filtrados.sort((a, b) => b.nombre > a.nombre ? 1 : -1) : state.filtrados

            }
        case ORDENAR_MARCA_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b) => b.marca > a.marca ? 1 : -1) : !action.payload ? state.filtrados.sort((a, b) => a.marca > b.marca ? 1 : -1) : state.filtrados

            }
        case ORDENAR_MODELO_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b) => a.modelo > b.modelo ? 1 : -1) : !action.payload ? state.filtrados.sort((a, b) => b.modelo > a.modelo ? 1 : -1) : state.filtrados

            }
        case ORDENAR_DISPONIBLES_FILTRADO:
            return {
                ...state,
                filtrados: action.payload ? state.filtrados.sort((a, b) => a.disponibles - b.disponibles) : !action.payload ? state.filtrados.sort((a, b) => b.disponibles - a.disponibles) : state.filtrados

            }
        case MOSTRAR_MODAL:
            return {
                ...state,
                modal: action.payload ? true : false
            }

        default:
            return state
    }
}
