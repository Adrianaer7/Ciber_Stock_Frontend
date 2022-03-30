import Layout from "../../../components/layout/Layout";
import clienteAxios from "../../../config/axios";
import dbConnect from "../../../lib/dbConnect";
import { useContext, useEffect, useState } from 'react';
import Formulario from "../../../components/productos/Formulario";
import productoContext from "../../../context/productos/productoContext";
import authContext from "../../../context/auth/authContext";
import NoEncontrado from "../../../components/productos/NoEncontrado";
import Login from "../../../components/auth/Login";
const Edicion = ({productoEditar}) => {

  const AuthContext = useContext(authContext)
  const {usuarioAutenticado, usuario} = AuthContext

  const productosContext = useContext(productoContext)
  const {productoActual} = productosContext

  const [coincide, setCoincide] = useState(null)
  const [pepe, setPepe] = useState(true)
  //Autentico al usuario y agrego el producto actual al state
  useEffect(() => {
    usuarioAutenticado()
    setTimeout(() => {
      setPepe(false)
    }, 10);
  }, [])

  //Cuando me autentique, verifico que el producto que traigo es el del usuario que está logueado
  useEffect(() => {
    if(usuario) {
      productoActual(productoEditar)
      setCoincide(true)
      if(productoEditar.creador !== usuario.id){
        setCoincide(false)
      }  
    }
  }, [usuario])

  return (
    <>
      {pepe ? null : usuario && coincide ? (
        <Layout pagina={`Editar - ${productoEditar.nombre}`}>
          <Formulario
            key={productoEditar._id}
            productoEditar={productoEditar}
          />
        </Layout>
      ): usuario && coincide === false && <NoEncontrado/>
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
