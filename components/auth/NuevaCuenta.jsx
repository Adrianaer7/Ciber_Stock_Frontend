import React, { useContext, useState } from 'react';
import Head from 'next/head';
import Link from "next/link"
import Alerta from '../productos/Alerta';
import authContext from '../../context/auth/authContext';

const NuevaCuenta = () => {

    const AuthContext = useContext(authContext)
    const {mensaje, registrarUsuario} = AuthContext

    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    })
    const [error, setError] = useState()

    const {nombre, email, password, confirmar} = nuevoUsuario

    const onChange = e => {
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if(nombre.trim() === "" || email.trim() === "" || password.trim() === ""  || confirmar === "") {
            setError("Todos los campos son obligatorios")
            setTimeout(() => {
                setError("")
            }, 3000);
            return
        }

        if(password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            setTimeout(() => {
                setError("")
            }, 3000);
            return
        }

        if(password != confirmar) {
            setError("La contraseñas deben coincidir")
            setTimeout(() => {
                setError("")
            }, 3000);
            return
        }

        registrarUsuario(nuevoUsuario)
        setNuevoUsuario({
            nombre: "",
            email: "",
            password: "",
            confirmar: ""
        })
    }

    return (
        <>    
        <Head>
            <title>Crear cuenta</title>
        </Head>

        <div className='w-2/4 mx-auto my-32 '>
            <h1 className="font-black text-4xl text-center text-blue-900 dark:text-blue-300">Nueva cuenta</h1>
            <p className="mt-3 text-center text-black">Llena los siguientes campos para crear una cuenta</p>
            {mensaje ? <Alerta>{mensaje}</Alerta> : error ? <Alerta>{error}</Alerta> : null}
                <div className='bg-white  mt-10 px-5 pb-3 rounded-md shadow-md md:w-3/4 mx-auto'>
                    <form 
                        className="mt-10"
                        onSubmit={onSubmit}
                    >
                        <div className="mb-4 py-2">
                            <label htmlFor="nombre" className="text-gray-800 font-bold">Nombre</label>
                            <input  //esta etiqueta crea un input
                                type="text"
                                autoComplete="off"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="nombre"
                                placeholder="Ingresa tu nombre"
                                name="nombre"
                                value={nombre}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-gray-800 font-bold ">Email</label>
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
                                autoComplete="new-password"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmar" className="text-gray-800 font-bold">Confirmar Contraseña</label>
                            <input
                                type="password"
                                autoComplete="nope"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="confirmar"
                                placeholder="Ingresa tu contraseña"
                                name="confirmar"
                                value={confirmar}
                                onChange={onChange}
                            />
                        </div>                             

                        <input
                            type="submit"
                            value="Crear Usuario"
                            className="mt-5 w-full bg-blue-800 dark:bg-blue-500 p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                        />
                    </form>
                </div>
                <div className="flex justify-between w-3/4 mx-auto">
                    <Link href="/">
                        <a
                            className="pt-5 hover:text-blue-400 font-medium"
                        >
                            Ya tengo cuenta
                        </a>
                    </Link>
                    <Link href="/olvide-password">
                        <a
                            className="pt-5 hover:text-blue-400 font-medium"
                        >
                            Olvidé mi contraseña
                        </a>
                    </Link>
                   
                </div>
        </div>
    </>        
    )
}

export default NuevaCuenta;