import Layout from "../../../components/layout/Layout";
import clienteAxios from "../../../config/axios";
import dbConnect from "../../../lib/dbConnect";
import { useContext, useEffect, useState } from 'react';
import Formulario from "../../../components/productos/Formulario";
import productoContext from "../../../context/productos/productoContext";
import authContext from "../../../context/auth/authContext";
import NoEncontrado from "../../../components/productos/NoEncontrado";

const Edicion = ({productoEditar}) => {

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado, usuario} = AuthContext

  const productosContext = useContext(productoContext)
  const {productoActual} = productosContext

  const [coincide, setCoincide] = useState(true)

  //Autentico al usuario y agrego el producto actual al state
  useEffect(() => {
    usuarioAutenticado()
    if(productoEditar) {
      productoActual(productoEditar)
    }
  }, [])
  
  //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado
  useEffect(() => {
    if(usuario) {
      if(productoEditar.creador !== usuario.id){
        setCoincide(false)
      }
    }
  }, [usuario])


  return (
    <>
      {coincide ? (
            <Layout pagina={`Editar - ${productoEditar.nombre}`}>

          <Formulario
            key={productoEditar._id}
            productoEditar={productoEditar}
          />
              </Layout>

      ): <NoEncontrado/>
      }
    </>
    
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
