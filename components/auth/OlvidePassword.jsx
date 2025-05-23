import React, { useContext, useState } from 'react';
import Head from 'next/head';
import Link from "next/link"
import Alerta from '../productos/Alerta';
import authContext from '../../context/auth/authContext';


const OlvidePassword = () => {

    const AuthContext = useContext(authContext)
    const { mensaje, olvideContraseña } = AuthContext

    const [correo, setCorreo] = useState("")
    const [error, setError] = useState()


    const onSubmit = e => {
        e.preventDefault()

        if (correo.trim() === "" || correo.length < 6) {
            setError("El email es obligatorio")
            setTimeout(() => {
                setError("")
            }, 3000);
            return
        }

        olvideContraseña(correo)
        setCorreo("")
    }

    return (
        <>
            <Head>
                <title>Reestablecer contraseña</title>
            </Head>

            <div className='sm:w-3/5 xl:w-2/5 sm:mx-auto mr-1 ml-1 my-10 sm:my-32 '>
                <h1 className="font-black text-4xl text-center text-blue-900">Reestablece tu contraseña</h1>
                <p className="mt-3 text-center text-black">Recupera tu contraseña para no perder tus datos</p>
                {mensaje ? <Alerta>{mensaje}</Alerta> : error ? <Alerta>{error}</Alerta> : null}
                <div className='bg-white  mt-10 px-5 pb-3 rounded-md shadow-md md:w-3/4 mx-auto'>
                    <form
                        className="mt-10 pt-5"
                        onSubmit={onSubmit}
                    >
                        <div className="mb-4">
                            <label htmlFor="email" className="text-gray-800 font-bold ">Email</label>
                            <input
                                type="email"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="email"
                                placeholder="Ingresa tu email"
                                name="email"
                                value={correo}
                                onChange={e => setCorreo(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Recuperar contraseña"
                            className="mt-5 w-full bg-blue-800  p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                        />
                    </form>
                </div>
                <div className="flex flex-col items-center sm:mx-auto sm:justify-between sm:w-3/4">
                    <Link href="/" className="pt-5 hover:text-blue-400 font-medium">
                        Iniciar Sesión
                    </Link>
                    <Link href="/crear-cuenta" className="pt-5 hover:text-blue-400 font-medium">
                        Registrarme
                    </Link>
                </div>
            </div>
        </>
    )

}

export default OlvidePassword;