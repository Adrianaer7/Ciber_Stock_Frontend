import React from 'react'
import Layout from '../components/layout/Layout'
import ProductoNuevo from '../components/productos/ProductoNuevo'

const NuevoProducto = () => {
    return (
        <Layout
            pagina="Nuevo Producto"
        >
            <ProductoNuevo/>
        </Layout>
    )
}

export default NuevoProducto
