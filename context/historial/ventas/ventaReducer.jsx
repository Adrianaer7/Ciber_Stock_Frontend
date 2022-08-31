import { 
    CREAR_VENTA,
    EDITAR_VENTA,
    ELIMINAR_VENTA,
    TRAER_VENTAS,

 } from "../../../types/index"

export default function ventareducer (state, action) {
    switch(action.type) {
        case CREAR_VENTA: 
            return {
                ...state,
                ventas: [...state.ventas, action.payload]
            }
        case TRAER_VENTAS:
            return {
                ...state,
                ventas: action.payload
            }
        case ELIMINAR_VENTA:
            return {
                ...state,
                ventas: state.ventas.filter(venta => venta._id !== action.payload)
            }
        case EDITAR_VENTA:
            return {
                ...state,
                ventas: state.ventas.map(venta => venta._id === action.payload._id ? action.payload : venta)
            }
        default:
            return state;
    }
}