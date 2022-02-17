import { 
    USUARIO_AUTENTICADO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    LIMPIAR_STATE,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO
} from "../../types";



export default function authReducer(state, action) {
    switch (action.type) {
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case LIMPIAR_STATE:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                autenticado: null,
                usuario: null,
                mensaje: null
            }
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem("token", action.payload)
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload,
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
            }
        default:
            return state
    }
}