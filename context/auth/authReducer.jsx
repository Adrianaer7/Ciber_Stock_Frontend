import {
    USUARIO_AUTENTICADO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    LIMPIAR_STATE,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO,
    SOLICITAR_TOKEN_PASSWORD,
    SOLICITAR_TOKEN_PASSWORD_ERROR,
    GUARDAR_TEMA
} from "../../types";



export default function authReducer(state, action) {
    switch (action.type) {
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: action.payload
            }
        case LOGIN_EXITOSO:
            localStorage.setItem("token", action.payload)
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }


        case SOLICITAR_TOKEN_PASSWORD:
        case SOLICITAR_TOKEN_PASSWORD_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            localStorage.removeItem("token")    //se elimina el token generado al querer iniciar sesion o crear usuario con datos incorrectos
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case GUARDAR_TEMA:
            return {
                ...state,
                modo: action.payload
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
        default:
            return state
    }
}