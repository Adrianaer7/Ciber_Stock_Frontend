import React, { useContext, useEffect } from 'react';
import Login from '../components/auth/Login';
import authContext from '../context/auth/authContext';
import { useRouter } from 'next/router';

const index = () => {

  
  const AuthContext = useContext(authContext)
  const {token} = AuthContext
  
  const router = useRouter()

  useEffect(() => {
      if(token) {
        router.push("/productos")
      }
  }, [token])

  return (
    <div className="md:flex md:min-h-screen sm:min-h-screen bg-slate-100">
      <Login/>
    </div>
  );
};

export default index;