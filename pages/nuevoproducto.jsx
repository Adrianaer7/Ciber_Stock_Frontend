import { useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout'
import ProductoNuevo from '../components/productos/ProductoNuevo'
import authContext from '../context/auth/authContext'
import productoContext from '../context/productos/productoContext'

const NuevoProducto = () => {

    const AuthContext = useContext(authContext)
    const {usuarioAutenticado, usuario} = AuthContext

    const productosContext = useContext(productoContext)
    const {limpiarSeleccionado} = productosContext

    useEffect(() => {
        limpiarSeleccionado()
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Layout
            pagina="Nuevo Producto"
        >
            {usuario && <ProductoNuevo/>}
        </Layout>
    )
}

export default NuevoProducto
