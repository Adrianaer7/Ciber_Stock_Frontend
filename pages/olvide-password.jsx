import OlvidePassword from "../components/auth/OlvidePassword";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import authContext from "../context/auth/authContext";

const ResetPassword = () => {

    const AuthContext = useContext(authContext)
    const {token, ocultarAlerta} = AuthContext

    const router = useRouter()


    useEffect(() => {
        if(token) {
            router.push("/productos")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token]) 

    useEffect(() => {
        ocultarAlerta()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="md:flex md:min-h-screen sm:min-h-screen h-screen overflow-y-auto bg-slate-100">
            <OlvidePassword/>
        </div>
    );
};

export default ResetPassword;