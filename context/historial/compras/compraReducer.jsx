import {
    CREAR_COMPRA,

} from "../../../types/index"

export default function comprareducer (state, action) {
    switch(action.type) {
        case CREAR_COMPRA:
            return {
                ...state,
                compras: [...state.compras, action.payload]
            }

        default:
            return state;
    }
}