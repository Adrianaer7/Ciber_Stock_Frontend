import {
    CREAR_COMPRA,
    TRAER_COMPRAS
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
        default:
            return state;
    }
}