import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios"
import tokenAuth from "../../config/tokenAuth";

import { 
    USUARIO_AUTENTICADO ,
    REGISTRO_ERROR,
    LIMPIAR_STATE,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OCULTAR_ALERTA,
    REGISTRO_EXITOSO,
    SOLICITAR_TOKEN_PASSWORD,
    SOLICITAR_TOKEN_PASSWORD_ERROR
} from "../../types";

const AuthState = ({children}) => {
    //Definir un state inicial
    const initialState = {
        token:  typeof window !== "undefined" ? localStorage.getItem("token") : "",  //una vez que me logeo, al recargar la pagina, el token del state inicia con el valor del token que hay en localstorage
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState)

    //Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post("/api/usuarios", datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })            
        }
        
    }

    const olvideContraseña = async email => {
        try {
            const {data} = await clienteAxios.post("/api/auth/olvide-password", {email})
            dispatch({
                type: SOLICITAR_TOKEN_PASSWORD,
                payload: data.msg
            })
        } catch (error) {
            dispatch({
                type: SOLICITAR_TOKEN_PASSWORD_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const cambiarContraseña = async (contraseña, token) => {
        const url = `/api/auth/olvide-password/${token}`
        const {data} = await clienteAxios.post(url, {contraseña})
    }

    //Autenticar usuario
    const iniciarSesion = async datos => {  //la uso en login.js
        try {
            const respuesta = await clienteAxios.post("/api/auth", datos)   //envio los datos para que me cree un token
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
            usuarioAutenticado()

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        //Limpia la alerta despues de 3s
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
            })
        }, 3000);
    }

    //Usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem("token")
        if(token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get("/api/auth")
            if(respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }
            
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_ERROR
            })
        }

    }

    //Cerrar sesion
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

    return ( 
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                olvideContraseña,
                cambiarContraseña,
                iniciarSesion,
                usuarioAutenticado,
                olvideContraseña,
                cerrarSesion,
                ocultarAlerta
            }}
        >
            {children}
        </authContext.Provider>
     );
}
 
export default AuthState;