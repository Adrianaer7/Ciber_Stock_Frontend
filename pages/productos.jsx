import Layout from "../components/layout/Layout"
import ListadoProductos from "../components/productos/ListadoProductos"
import authContext from "../context/auth/authContext"
import { useContext, useEffect } from "react"

const Productos = () => {

    const AuthContext = useContext(authContext)
    const { usuarioAutenticado, usuario } = AuthContext

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Layout
            pagina="Todos los productos"
        >
            {usuario && <ListadoProductos />}
        </Layout>
    )
}

export default Productos
