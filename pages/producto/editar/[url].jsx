import Layout from "../../../components/layout/Layout";
import clienteAxios from "../../../config/axios";
import dbConnect from "../../../lib/dbConnect";
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Formulario from "../../../components/productos/Formulario";
import productoContext from "../../../context/productos/productoContext";
import authContext from "../../../context/auth/authContext";

const Edicion = ({productoEditar}) => {

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado} = AuthContext

  const productosContext = useContext(productoContext)
  const {productoActual} = productosContext

  useEffect(() => {
    usuarioAutenticado()
    if(productoEditar) {
      productoActual(productoEditar)
    }
  }, [])


  return (
    <Layout>
      {productoEditar ? (
        <Formulario
          key={productoEditar._id}
          productoEditar={productoEditar}
        />
      ): (
        <>
        <Head>
          <title>{noEncontrado}</title>
        </Head>
        <div className={styles.no_encontrado}>
            <h1 className="heading">Pagina no encontrada</h1>
            <Link href="/"><a>Volver a inicio</a></Link>
        </div>
        </>
      )}
      
    </Layout>
  )
};


export async function getServerSideProps({ params: {url} }) {
  await dbConnect()
  const respuesta = await clienteAxios.get(`/api/productos/${url}`)
  const productoEditar = respuesta.data.producto

return { props: { productoEditar }}
}


export default Edicion;
