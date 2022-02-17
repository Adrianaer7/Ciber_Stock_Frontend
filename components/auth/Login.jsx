import { useContext, useState } from "react";
import Head from "next/head"
import Alerta from "../productos/Alerta";
import authContext from "../../context/auth/authContext";

const Login = () => {

    const AuthContext = useContext(authContext)
    const {mensaje, iniciarSesion} = AuthContext

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState()

    const {email, password} = login

    const onChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if(email.trim() === "" || password.trim() === ""){
            setError("Todos los campos son obligatorios")
            setTimeout(() => {
                setError("")
            }, 3000);
            return
        }
        iniciarSesion(login)
    }

    return (
        <>
            <Head>
                <title>Iniciar sesión</title>
            </Head>

            <div className='w-2/4 mx-auto my-32 '>
                <h1 className="font-black text-4xl text-center text-blue-900 dark:text-blue-300">Ingresar</h1>
                <p className="mt-3 text-center text-black">Llena los siguientes campos para iniciar sesion con tu cuenta</p>
                {mensaje ? <Alerta>{mensaje}</Alerta> : error ? <Alerta>{error}</Alerta> : null}
                    <div className='bg-white  mt-10 px-5 pb-3 rounded-md shadow-md md:w-3/4 mx-auto'>
                            <form 
                                className="mt-10"
                                onSubmit={onSubmit}
                            >
                                <div className="mb-4 py-2">
                                    <label htmlFor="email" className="text-gray-800 font-bold">Email</label>
                                    <input
                                        type="email"
                                        autoComplete="nope"
                                        className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="email"
                                        placeholder="Ingresa tu email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="text-gray-800 font-bold">Contraseña</label>
                                    <input
                                        type="password"
                                        autoComplete="nope"
                                        className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                    />
                                </div>                            

                                <input
                                    type="submit"
                                    value="Iniciar Sesion"
                                    className="mt-5 w-full bg-blue-800  p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                                />
                                <p className="text-center mx-auto mt-2">¿No tenes cuenta?</p>
                            </form>
                            
                            <button 
                                className="mt-3 w-full bg-green-700  p-3  text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                            >
                                <a href="/crear-cuenta">Registrarse</a>
                            </button>
                    </div>
            </div>
        </>
    );
};

export default Login;