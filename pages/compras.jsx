import Layout from "../components/layout/Layout"
import ListadoCompras from "../components/historial/compras/ListadoCompras"

const compras = () => {
  return (
    <Layout pagina="Compras">
        <ListadoCompras/>
    </Layout>
  )
}

export default compras