import Layout from "../components/layout/Layout"
import ListadoProductos from "../components/productos/ListadoProductos"
import authContext from "../context/auth/authContext"
import { useContext, useEffect } from "react"

const Productos = () => {

    const AuthContext = useContext(authContext)
    const {usuarioAutenticado} = AuthContext

    useEffect(() => {
      usuarioAutenticado()
    },[])


    return (
        <Layout
           pagina="Todos los productos" 
        >
            <ListadoProductos/>
        </Layout>
    )
}

export default Productos
