import { useEffect, useContext } from "react"
import Formulario from "./Formulario"

import productoContext from "../../context/productos/productoContext"
import authContext from "../../context/auth/authContext"
const ProductoNuevo = () => {
    const AuthContext = useContext(authContext)
    const {usuarioAutenticado} = AuthContext

    const productosContext = useContext(productoContext)
    const {limpiarSeleccionado} = productosContext

    useEffect(() => {
        limpiarSeleccionado()
        usuarioAutenticado()
    },[])

    return (          
        <Formulario/>
    )
}

export default ProductoNuevo
