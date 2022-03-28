import Layout from "../../../components/layout/Layout";
import clienteAxios from "../../../config/axios";
import dbConnect from "../../../lib/dbConnect";
import { useContext, useEffect } from 'react';
import Formulario from "../../../components/productos/Formulario";
import productoContext from "../../../context/productos/productoContext";
import authContext from "../../../context/auth/authContext";
import NoEncontrado from "../../../components/productos/NoEncontrado";

const Edicion = ({productoEditar}) => {

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado, usuario} = AuthContext

  const productosContext = useContext(productoContext)
  const {productoActual} = productosContext

  useEffect(() => {
    usuarioAutenticado()
    if(productoEditar) {
      productoActual(productoEditar)
    }
    
  }, [])


  return (
    <Layout pagina={`Editar - ${productoEditar.nombre}`}>
      {usuario && (
        productoEditar ? (
          <Formulario
            key={productoEditar._id}
            productoEditar={productoEditar}
          />
      ): <NoEncontrado/>
      )}
    </Layout>
  )
};

export async function getServerSideProps({ params: {url} }) {
  await dbConnect()
  const respuesta = await clienteAxios.get(`/api/productos/${url}`)
  if(respuesta.data.redireccionar) {
    return {notFound: true}
  }
  const productoEditar = respuesta.data.producto
  return { props: { productoEditar }}
}

export default Edicion;
