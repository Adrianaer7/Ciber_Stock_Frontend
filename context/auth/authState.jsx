import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios"
import tokenAuth from "../../config/tokenAuth";
import { mensajeAxios } from "../../helpers/axiosError";

import {
    USUARIO_AUTENTICADO,
    REGISTRO_ERROR,
    LIMPIAR_STATE,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO,
    SOLICITAR_TOKEN_PASSWORD,
    SOLICITAR_TOKEN_PASSWORD_ERROR,
    GUARDAR_TEMA
} from "../../types";

const AuthState = ({ children }) => {
    const initialState = {
        token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
        autenticado: null,
        usuario: null,
        mensaje: null,
        modo: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("Modo oscuro") ?? "false") : false
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registrarUsuario = async datos => {
        try {
            const { data } = await clienteAxios.post("/usuarios", datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: data.msg
            })
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: mensajeAxios(error, "No se pudo registrar el usuario")
            })
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA,
                })
            }, 3000);
        }
    }

    const olvideContraseña = async email => {
        try {
            const { data } = await clienteAxios.post("/usuarios/olvide-password", { email })
            dispatch({
                type: SOLICITAR_TOKEN_PASSWORD,
                payload: data.msg
            })
        } catch (error) {
            dispatch({
                type: SOLICITAR_TOKEN_PASSWORD_ERROR,
                payload: mensajeAxios(error, "No se pudo solicitar el cambio de contraseña")
            })
        }
    }

    const cambiarContraseña = async (contraseña, token) => {
        const url = `/usuarios/olvide-password/${token}`
        try {
            await clienteAxios.post(url, { contraseña })
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: mensajeAxios(error, "No se pudo cambiar la contraseña")
            })
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA,
                })
            }, 3000);
        }
    }

    const iniciarSesion = async datos => {
        try {
            const { data } = await clienteAxios.post("/auth", datos)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: data.token
            })
            usuarioAutenticado(data.token)
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: mensajeAxios(error, "No se pudo iniciar sesión")
            })
        }

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
            })
        }, 3000);
    }

    const usuarioAutenticado = async (token = "") => {
        if (!token) token = localStorage.getItem("token")

        if (token) {
            tokenAuth(token)
        }
        try {
            const { data } = await clienteAxios("/auth")
            if (data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: data.usuario
                })
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: mensajeAxios(error)
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: LIMPIAR_STATE,
        })
    }

    const ocultarAlerta = () => {
        dispatch({
            type: OCULTAR_ALERTA
        })
    }

    const traerTema = tema => {
        dispatch({
            type: GUARDAR_TEMA,
            payload: tema
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                modo: state.modo,
                registrarUsuario,
                olvideContraseña,
                cambiarContraseña,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion,
                traerTema,
                ocultarAlerta
            }}
        >
            {children}
        </authContext.Provider>
    );
}

export default AuthState;
