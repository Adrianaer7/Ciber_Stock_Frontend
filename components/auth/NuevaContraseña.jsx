import React, { useContext, useState } from 'react';
import Link from "next/link"
import Alerta from '../productos/Alerta';
import authContext from '../../context/auth/authContext';
import { useRouter } from 'next/router';
import ContraseñaCambiada from './ContraseñaCambiada';


const NuevaContraseña = () => {

    const AuthContext = useContext(authContext)
    const {cambiarContraseña} = AuthContext

    const router = useRouter()
    const token = router.query.token
    const [nuevaContraseña, setNuevaContraseña] = useState("")
    const [confirmNuevaContraseña, setConfirmNuevaContraseña] = useState("")
    const [mensaje, setMensaje] = useState()
    const [cambiada, setCambiada] = useState(false)

    

    const onSubmit = e => {
        e.preventDefault()

        if(nuevaContraseña.trim() === ""  || confirmNuevaContraseña === "") {
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return
        }

        if(nuevaContraseña.length < 6 || confirmNuevaContraseña.length < 6) {
            setMensaje("La contraseña debe tener al menos 6 caracteres")
            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return
        }

        if(nuevaContraseña != confirmNuevaContraseña) {
            setMensaje("La contraseñas deben coincidir")
            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return
        }

        cambiarContraseña(nuevaContraseña, token)
        setNuevaContraseña("")
        setConfirmNuevaContraseña("")
        setCambiada(true)
    }

  return (
    <>
        {cambiada ? (<ContraseñaCambiada/>): (
            <div className='w-2/4 mx-auto my-32 '>
                <h1 className="font-black text-4xl text-center text-blue-900 dark:text-blue-300">Nueva Contraseña</h1>
                <p className="mt-3 text-center text-black">Llena el campo para cambiar tu contraseña</p>
                {mensaje && <Alerta>{mensaje}</Alerta>}
                <div className='bg-white  mt-10 px-5 pb-3 rounded-md shadow-md md:w-3/4 mx-auto'>
                    <form 
                        className="mt-10"
                        onSubmit={onSubmit}
                    >
                        <div className="mb-4">
                            <label htmlFor="password" className="text-gray-800 font-bold">Contraseña nueva</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                name="password"
                                value={nuevaContraseña}
                                onChange={e => setNuevaContraseña(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmar" className="text-gray-800 font-bold">Confirmar Contraseña</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                className="mt-2 block w-full p-3 rounded-md bg-gray-50  focus:outline-none  focus:ring-1 focus:ring-blue-300"
                                id="confirmar"
                                placeholder="Ingresa tu contraseña nuevamente"
                                name="confirmar"
                                value={confirmNuevaContraseña}
                                onChange={e => setConfirmNuevaContraseña(e.target.value)}
                            />
                        </div>               

                        <input
                            type="submit"
                            value="Guardar nueva contraseña"
                            className="mt-5 w-full bg-blue-800 dark:bg-blue-500 p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer"
                        />
                    </form>
                </div>
                <div className="flex justify-between w-3/4 mx-auto">
                    <Link href="/">
                        <a
                            className="pt-5 hover:text-blue-400 font-medium"
                        >
                            Iniciar sesion
                        </a>
                    </Link>                   
                </div>
            </div>
        )}
        
    </>
  )
}

export default NuevaContraseña