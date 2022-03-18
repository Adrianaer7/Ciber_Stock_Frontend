import Layout from "../components/layout/Layout"
import ListadoProductos from "../components/productos/ListadoProductos"
import authContext from "../context/auth/authContext"
import { useContext, useEffect } from "react"

const Productos = () => {

    const AuthContext = useContext(authContext)
    const {usuarioAutenticado, usuario} = AuthContext

    //si no inicie sesion, no hay token. Si no hay token no me puedo autenticar. La consola del navegador tirará error si se intenta acceder a esta pagina sin autenticacion.
    useEffect(() => {
      usuarioAutenticado()
    },[])


    return (
        <Layout
           pagina="Todos los productos" 
        >
            {usuario && <ListadoProductos/>}
        </Layout>
    )
}

export default Productos
