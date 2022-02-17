import NuevaCuenta from "../components/auth/NuevaCuenta";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import authContext from "../context/auth/authContext";

const CrearCuenta = () => {

    const AuthContext = useContext(authContext)
    const {token} = AuthContext

    const router = useRouter()


    useEffect(() => {
        if(token) {
            router.push("/productos")
        }
    },[token]) 

    return (
        <div className="md:flex md:min-h-screen sm:min-h-screen bg-slate-100">
            <NuevaCuenta/>
        </div>
    );
};

export default CrearCuenta;