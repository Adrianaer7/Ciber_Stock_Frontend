import React, { useContext, useEffect } from 'react';
import Login from '../components/auth/Login';
import authContext from '../context/auth/authContext';
import { useRouter } from 'next/router';

const index = () => {

  
  const AuthContext = useContext(authContext)
  const {token, ocultarAlerta} = AuthContext
  
  const router = useRouter()

  useEffect(() => {
      if(token) {
        router.push("/productos")
      }
  }, [token])


  //oculto la alerta en caso de que haya enviado un token para resetear la contraseña
  useEffect(() => {
    ocultarAlerta()
  }, [])

  return (
    <div className="md:flex md:min-h-screen sm:min-h-screen bg-slate-100">
      <Login/>
    </div>
  );
};

export default index;